
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
  const [filter, setFilter] = useState();
  const [search, setSearch] = useState(' ');

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
    setSearch('')
  }, []);

  const handleSearch = (event) => {
    let searchedString = event.target.value.toLowerCase()
    setSearch(searchedString)
  }

  useEffect(() => {
    // console.log(search)
    // console.log(hospitals)
    if(hospitals) {
      let displayedHospitals = hospitals['data'].filter((hospital) => {
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
        <input type="text" placeholder="Search Hospital" style={{margin:"80px 0px 0px 80px"}} onChange={handleSearch}/>
        </>
    }
    return (
      <>
      <NavBar/>
      <input type="text" placeholder="Search Hospital" style={{margin:"80px 0px 0px 80px"}} onChange={handleSearch}/>
        <div className='hospitalMain'>
          {filter.map((hospital  => 
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