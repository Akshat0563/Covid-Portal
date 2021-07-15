import axios from "axios";

//const url = "https://covid19.mathdro.id/api";
const url = "http://localhost:2000/api";

export const fetchData = async (mode, id) => {
  if (mode !== "country" && mode !== "state" && mode !== "district") {
    console.log("Mode does not match in fetchData");
    return [];
  }

  let changeableUrl = `${url}/${mode}/${id}`;

  try {
    const { data } = await axios.get(changeableUrl);
    //console.log(data);
    return {
        country:data.country,
        district:data.district,
        state:data.state,
        confirmed : data.confirmed,
        active : data.active,
        recovered : data.recovered,
        deaths : data.deaths,
        lastUpdate : data.updatedAt
    };
  } catch (error) {}
};

export const fetchDailyData = async () => {
  try {
    const { data } = await axios.get(`https://covid19.mathdro.id/api/daily`);

    const modifiedData = data.map((dailyData) => ({
      confirmed: dailyData.confirmed.total,
      deaths: dailyData.deaths.total,
      date: dailyData.reportDate,
    }));

    return modifiedData;
  } catch (error) {
    return error;
  }
};

export const fetchCountries = async () => {
  try {
    const { data } = await axios.get(`${url}/country`);
    //const countries = data.map((country)=>country.country);
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const fetchStates = async (countryId) => {
  try {
    const { data } = await axios.get(`${url}/country/${countryId}/state`);
    //const states = data.map((state)=>state.state);
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const fetchDistricts = async (stateId) => {
  try {
    const { data } = await axios.get(`${url}/state/${stateId}/district`);
    //const districts = data.map((district)=>district.district);
    return data;
  } catch (error) {
    console.log(error);
  }
};
