import React, { useContext } from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import './hospitals.css'
import NavBar from "../NavBar/NavBar";
import { UserContext } from "../../UserContext";

const url = "http://localhost:2000/api/hospital";

const Hospital = () => {
	///////// Component State ///////////////////
	const {user} = useContext(UserContext);

	const [hospitals, setHospitals] = useState();
	const [filter, setFilter] = useState();
  	const [search, setSearch] = useState(' ');

	const [editid, seteditid] = useState("");
	const [edithospital, setedithospital] = useState({
		// Hospital: '',
		// Address: '',
		// District: '',
		// Pincode: null,
		beds_total: null,
		beds_occupied: null,
		beds_available: null
	});

	////// Fetching All Hospitals //////////
	useEffect(() => {
		const retrieve_hospitals = async () => {
			const response = await axios.get(url);
			setHospitals(response.data);
			return response.data;
		}
		retrieve_hospitals();
		setSearch('')
	}, []);

	////// Editing Hospital data
	const handleEdit = (hospital) => {
		seteditid(hospital._id);
		setedithospital({
			beds_total: hospital.beds_total,
			beds_occupied: hospital.beds_occupied,
			beds_available: hospital.beds_available
		});
	}
	const update = (e) => {
		e.preventDefault();
		console.log(edithospital);
		if(edithospital.beds_total===undefined || edithospital.beds_occupied===undefined || edithospital.beds_available===undefined){
			alert("All the fields are required");
			return;
		}
		updatehospital(edithospital);
		seteditid("");
		setedithospital({ beds_total: null,	beds_occupied: null, beds_available: null})
	}
	const updatehospital = async (hospital) => {
		const response = await axios.put(`${url}/${editid}`,hospital, user.auth);
		const retrieve_hospitals = async () => {
			const response = await axios.get(url);
			setHospitals(response.data);
			return response.data;
		}
		retrieve_hospitals();
	}

	const handleSearch = (event) => {
		let searchedString = event.target.value.toLowerCase()
		setSearch(searchedString)
	}
	
	useEffect(() => {
		// console.log(search)
		// console.log(hospitals)
		if(hospitals) {
			console.log(hospitals)
		let displayedHospitals = hospitals.filter((hospital) => {
			let name = hospital['hospital'].toLowerCase();
			let address = hospital['address'].toLowerCase();
			let district = hospital['district'].toLowerCase();
			// let pincode = hospital['pincode'].toLowerCase();
			return name.indexOf(search) !== -1 || address.indexOf(search) !== -1 || district.indexOf(search) !== -1;
		})
		setFilter(displayedHospitals)
		console.log(displayedHospitals)
		}
	}, [search, hospitals]);

    if (!hospitals || !filter) {
        return <>
        <NavBar/>
        <input type="text" placeholder="Search Hospital" className='inputSearch2' onChange={handleSearch}/>
        </>
    }
	return (
    //  let occ="";
	<>
		<NavBar/>
		<input type="text" placeholder="Search Hospital" className='inputSearch2' onChange={handleSearch}/>
		<div className='hospitalMain'>
			{
				filter.map((hospital  => 
				<div className='hospitalCard'>
					<h1 className='hospitalHeader'>{hospital['hospital']}</h1>
					<div className='card__body'>
						<p className='hospitalPara'>{hospital['address']}</p>
						<span className='hospitalSpan'>{hospital['district']},</span>
						<span>{hospital['pincode']}</span>
						<div className='flex'>
						{
							editid!==hospital._id?
							<>
								<span className='beds bedstotal'>Beds Total - {hospital['beds_total']}</span>
								<span className='beds bedsoccupied'>Beds Occupied - {hospital['beds_occupied']}</span>
								<span className='beds bedsavailable'>Beds Available - {hospital['beds_available']}</span>
								<button type='submit' onClick={(e) => handleEdit(hospital)} className='btnEdit'>Edit</button>
							</> 
							:
							<form className='formEdit' onSubmit={update}>
								<div className="field inputs">
									<label>Beds Total</label>
									<input
									type="number"
									//  name="Beds_total"
									className="form-control"
									// placeholder="Total Beds"
									value = {edithospital.beds_total}
									onChange={(e) =>  setedithospital({ ...edithospital, beds_total: e.target.value,})}
									/>
								</div>
								<div className="field inputs">
									<label>Beds Occupied</label>
									<input
									type="number"
									//  name="Beds_occupied"
									className="form-control"
									// placeholder="Occupied Beds"
									value={edithospital.beds_occupied}
									onChange={(e) => setedithospital({ ...edithospital, beds_occupied: e.target.value })}
									/>
								</div>
								<div className="field inputs">
									<label>Beds Available</label>
									<input
									type="number"
									//  name="Beds_available"
									className="form-control"
									// placeholder="Available Beds"
									value={edithospital.beds_available}
									onChange={(e) => setedithospital({ ...edithospital, beds_available: e.target.value })}
									/>
								</div>
								<button type="submit" className="ui button blue btnSave">Save</button>
							</form>
						}
						</div>
					</div>
				</div>
			))}
		</div>
    </>
  );

};

export default Hospital;