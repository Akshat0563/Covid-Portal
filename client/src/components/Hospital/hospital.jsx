
import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import './hospitals.css'
import NavBar from "../NavBar/NavBar";

const url = "http://localhost:2000/api/hospital";

const Hospital = () => {
	///////// Component State ///////////////////
	const [hospitals, setHospitals] = useState();

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
		const response = await axios.put(`${url}/${editid}`,hospital);
		const retrieve_hospitals = async () => {
			const response = await axios.get(url);
			setHospitals(response.data);
			return response.data;
		}
		retrieve_hospitals();
	}

  
	if(!hospitals){
		return <NavBar/>
	}
	return (
    //  let occ="";
	<>
		<NavBar/>
		<div className='hospitalMain'>
			{
				hospitals.map((hospital  => 
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
								<button type='submit' onClick={(e) => handleEdit(hospital)}>Edit</button>
							</> 
							:
							<form onSubmit={update}>
								<div className="field">
									<label>Beds Total</label>
									<input
									type="number"
									//  name="Beds_total"
									className="form-control"
									placeholder="Total Beds"
									value = {edithospital.beds_total}
									onChange={(e) =>  setedithospital({ ...edithospital, beds_total: e.target.value,})}
									/>
								</div>
								<div className="field">
									<label>Beds Occupied</label>
									<input
									type="number"
									//  name="Beds_occupied"
									className="form-control"
									placeholder="Occupied Beds"
									value={edithospital.beds_occupied}
									onChange={(e) => setedithospital({ ...edithospital, beds_occupied: e.target.value })}
									/>
								</div>
								<div className="field">
									<label>Beds Available</label>
									<input
									type="number"
									//  name="Beds_available"
									className="form-control"
									placeholder="Available Beds"
									value={edithospital.beds_available}
									onChange={(e) => setedithospital({ ...edithospital, beds_available: e.target.value })}
									/>
								</div>
								<button type="submit" className="ui button blue">Edit</button>
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