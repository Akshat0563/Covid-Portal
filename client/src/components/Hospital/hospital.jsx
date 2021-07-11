
import React from "react";

import { useEffect, useState } from "react";
import axios from "axios";
import './hospitals.css'
import NavBar from "../NavBar/NavBar";

const api = axios.create({
  baseURL: "http://localhost:2000/api/hospitals",
});

const Hospital = () => {
  const [hospitals, setHospitals] = useState();

  const retrieve_hospitals = async () => {
    const response = await api.get();
    return response;
  };

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
        return "Loading...";
    }
    return (
      <>
      <NavBar/>
        <div className='hospitalMain'>
          {hospitals['data'].map((hospital  => 
          // hospital['hospital']
          <div className='hospitalCard'>
            <h1 className='hospitalHeader'>{hospital['hospital']}</h1>
            <div className='card__body'>
              <p className='hospitalPara'>{hospital['address']}</p>
              <span className='hospitalSpan'>{hospital['district']},</span>
              <span>{hospital['pincode']}</span>
            <div className='flex'>
                <span className='beds bedstotal'>Beds Total - {hospital['beds_total']}</span>
                <span className='beds bedsoccupied'>Beds Occupied - {hospital['beds_occupied']}</span>
                <span className='beds bedsavailable'>Beds Available - {hospital['beds_available']}</span>
            </div>
          </div>
        </div> 
    ))}
    </div>
    </>
  );

};

export default Hospital;