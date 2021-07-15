
import React from "react";

import { useEffect, useState } from "react";
import axios from "axios";
import './hospitals.css'
import NavBar from "../NavBar/NavBar";

const url = "http://localhost:2000/api";


const api = axios.create({
  baseURL: "http://localhost:2000/api/hospitals",
});

const Hospital = () => {
  const [hospitals, setHospitals] = useState();
  const [editid, seteditid] = useState("");
  const [edithospital, setedithospital] = useState({
    Hospital: '',
    Address: '',
    District: '',
    Pincode: null,
    Beds_total: null,
    Beds_occupied: null,
    Beds_available: null
  });

  const retrieve_hospitals = async () => {
    const response = await api.get();
    return response;
  };


  // const updatehospital=async(hospital)=>{
  //    const response=await axios.put(`${url}/hospitals/${editid}`,hospital);
  //    setHospitals(hospitals.map((hospital)=>{
  //        return hospital._id===editid?{...response.data}:hospital;
  //    })
  //    );
  // }

  const update=(e)=>{
       e.preventDefault();
       console.log(edithospital);
       console.log(edithospital.Beds_occupied);
       if(!edithospital.Beds_total || !edithospital.Beds_occupied || !edithospital.Beds_available){
           alert("All the fields are required");
           return;
       }
       updatehospital(edithospital);
       seteditid("");
  }

  useEffect(() => {
    const getAllHospitals = async () => {
      const allHospitals = await retrieve_hospitals();
      if (allHospitals) setHospitals(allHospitals);
    };
    getAllHospitals();
    console.log(hospitals)
  }, []);
  console.log(hospitals)
    if (!hospitals) {
        return <NavBar/>;
    }

    const updatehospital=async(hospital)=>{
      console.log(hospitals);
      const getAllHospitals = async () => {
        const allHospitals = await retrieve_hospitals();
        if (allHospitals) setHospitals(allHospitals);
      };
      const response=await axios.put(`${url}/hospitals/${editid}`,hospital);
      getAllHospitals();
      // setHospitals(hospitals.map((hospital)=>{
      //     return hospital._id===editid?{...response.data}:hospital;
      // })
      // );
   }

    return (
    //  let occ="";
      <>
      <NavBar/>
        <div className='hospitalMain'>
          {hospitals['data'].map((hospital  => 
          <div className='hospitalCard'>
            <h1 className='hospitalHeader'>{hospital['hospital']}</h1>
            <div className='card__body'>
              <p className='hospitalPara'>{hospital['address']}</p>
              <span className='hospitalSpan'>{hospital['district']},</span>
              <span>{hospital['pincode']}</span>
            <div className='flex'>
            {editid!==hospital._id?
            <>
                <span className='beds bedstotal'>Beds Total - {hospital['beds_total']}</span>
                <span className='beds bedsoccupied'>Beds Occupied - {hospital['beds_occupied']}</span>
                <span className='beds bedsavailable'>Beds Available - {hospital['beds_available']}</span>
                <button type='submit' onClick={() => seteditid(hospital._id)}>Edit</button>
              </> 
              :<>
              {console.log(edithospital)}
               <form onSubmit={update}>
          <div className="field">
            <label>Beds Total</label>
            <input
              type="number"
            //  name="Beds_total"
              className="form-control"
              placeholder="Total Beds"
              value={edithospital.Beds_total}
              onChange={(e) =>  setedithospital({ Beds_total: e.target.value, Pincode:hospital.pincode, Hospital:hospital.hospital , Address:hospital.address,District:hospital.district })}
            />
          </div>
          <div className="field">
            <label>Beds Occupied</label>
            <input
              type="number"
            //  name="Beds_occupied"
              className="form-control"
              placeholder="Occupied Beds"
              value={edithospital.Beds_occupied}
              onChange={(e) => setedithospital({ ...edithospital,Beds_occupied: e.target.value })}
            />
          </div>
          <div className="field">
            <label>Beds Available</label>
            <input
              type="number"
            //  name="Beds_available"
              className="form-control"
              placeholder="Available Beds"
              value={edithospital.Beds_available}
              onChange={(e) => setedithospital({ ...edithospital,Beds_available: e.target.value })}
            />
          </div>
          <button type="submit" className="ui button blue">Edit</button>
        </form>
              </>
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