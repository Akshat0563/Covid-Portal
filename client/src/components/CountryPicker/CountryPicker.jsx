import React, {useState,useEffect, useContext} from "react";
import { NativeSelect,FormControl } from "@material-ui/core";
import styles from "./CountryPicker.module.css";
import Districtedit from "../Districtedit/Districtedit";
import {fetchCountries} from "../../api/api";
import { fetchStates } from "../../api/api";
import { UserContext } from "../../UserContext";

const CountryPicker = ({data,handleCountryChange,handleStateChange,handleDistrictChange,district,state,country,statelist,districtlist}) => {
  const {user} = useContext(UserContext);
  
  const [fetchedCountries, setfetchedCountries] = useState([]);

  useEffect(()=>{
    const fetchAPI=async()=>{
      setfetchedCountries(await fetchCountries());
    }
    fetchAPI();
  },[setfetchedCountries]);


  return (
    <div>
      {district && <Districtedit data={data} handleDistrictChange={handleDistrictChange} district_id={district}/>}
      <div className={styles.flexContainer}>
        <div className="select">
        <select id="standard-select" onChange={(e)=>handleCountryChange(e.target.value)}>
          {!country && <option value="">Select Country</option>}
          {fetchedCountries.map((country,i)=><option key={i} value={country._id} selected={i==79}>{country.country}</option>)}
        </select>
        </div>
        <div className="select">
        <select id="standard-select" onChange={(e)=>handleStateChange(country,e.target.value)}>
          {!state && <option value="">State not Selected</option>}
          {statelist.map((state,i)=><option key={i} value={state._id}>{state.state}</option>)}
        </select>
        </div>
        <div className="select">
        <select id="standard-select" onChange={(e)=>handleDistrictChange(country,state,e.target.value)}>
          {!district && <option value="">District not Selected</option>}
          {districtlist.map((district,i)=><option key={i} value={district._id}>{district.district}</option>)}
        </select>
        </div>
      </div>
    </div>
  );
};

export default CountryPicker;
