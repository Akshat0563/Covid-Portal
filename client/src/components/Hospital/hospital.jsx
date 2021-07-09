// import React from "react";
// import { useEffect, useState } from "react";
// import axios from "axios";

// const Hospital = () => {
//     const [hospitals, setHospitals] = useState();

//     useEffect(() => {
//         retrieve_hospitals();
//         console.log(hospitals)
//     }, []);

//     const retrieve_hospitals = async () => {
//         const hospitalVar = await axios.get("http://localhost:2000/api/hospitals")
//         setHospitals(hospitalVar)
//     }

//   return (
//     <div>
//         {/* {
//             hospitals.map((hospital => 
//                 <div>{hospital}</div>
//             ))
//         } */}
//     </div>
//   );
// };

// export default Hospital;

import React from "react";

import { useEffect, useState } from "react";
import axios from "axios";
import './hospitals.css'

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
    <div class='hospitalMain'>
    {hospitals['data'].map((hospital  => 
        // hospital['hospital']
        <div className='hospitalCard'>
            <h1 className='hospitalHeader'>{hospital['hospital']}</h1>
            <div className='card__body'>
                <p className='hospitalPara'>{hospital['address']}</p>
                <span className='hospitalSpan'>{hospital['district']}</span>
                <span>{hospital['pincode']}</span>
                <div>
                    Beds Total - <span className='beds bedstotal'>{hospital['beds_total']}</span>
                    Beds Occupied - <span className='beds bedsoccupied'>{hospital['beds_occupied']}</span>
                    Beds Available - <span className='beds bedsavailable'>{hospital['beds_available']}</span>
                </div>
            </div>
        </div> 
      ))}
    </div>
  );

};

export default Hospital;