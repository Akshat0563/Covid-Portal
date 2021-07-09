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
    <div>
    {hospitals['data'].map((hospital  => 
        // hospital['hospital']
        <div>
            <h1>{hospital['hospital']}</h1>
            <p>{hospital['address']}</p>
            <span>{hospital['district']}</span>
            <span>{hospital['pincode']}</span>
        </div> 
      ))}
    </div>
  );

};

export default Hospital;