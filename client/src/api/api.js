import axios from "axios";

//const url = "https://covid19.mathdro.id/api";
const url = "http://localhost:2000/api";

export const fetchData = async (country) => {
let changeableUrl=url;

if(country){
  //changeableUrl=`${url}/countries/${country}`;
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
