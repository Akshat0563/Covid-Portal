import axios from "axios";

//const url = "https://covid19.mathdro.id/api";
const url = "http://localhost:2000/api";

export const fetchData = async (country,state,district) => {
let changeableUrl=url;


if(district){
  changeableUrl=`${url}/states/${state}/districts/${district}`;
}
else if(state){
  //changeableUrl=`${url}/countries/${country}`;
  changeableUrl=`${url}/country/${country}/states/${state}`;
}
else{
  changeableUrl=`${url}/country/${country}`;
}

  try {
    const {data} = await axios.get(changeableUrl);
    //console.log(data);
    return {
        confirmed : data.confirmed,
        active : data.active,
        recovered : data.recovered,
        deaths : data.deaths,
        lastUpdate : data.updatedAt
    };
  } catch (error) {}
}

export const fetchDailyData=async()=>{
  try{
  const {data} = await axios.get(`https://covid19.mathdro.id/api/daily`);

   const modifiedData=data.map((dailyData)=>({
   confirmed: dailyData.confirmed.total,
   deaths: dailyData.deaths.total,
   date: dailyData.reportDate,
   }));

   return modifiedData;

  } catch(error){
        return error;
  }
}

export const fetchCountries=async()=>{
  try{
    const {data} = await axios.get(`${url}/country`);
    const countries = data.map((country)=>country.country);
    return countries;
  } catch(error){

  }
}

export const fetchStates=async(country)=>{
  try{
    if(country==="India" || country==="USA")
    {
      const {data} = await axios.get(`${url}/country/${country}/states`);
    const states = data.map((state)=>state.state);
    return states;
    }
    else{
      return [];
    }
  } catch(error){

  }
}

export const fetchDistricts=async(state)=>{
  try{
    if(state==="Gujarat" || state==="Karnataka")
    {
      const {data} = await axios.get(`${url}/states/${state}/districts`);
    const districts = data.map((district)=>district.district);
    return districts;
    }
    else{
      return [];
    }
  } catch(error){

  }
}