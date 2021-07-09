import React from "react";
import { Cards, Chart, CountryPicker, NavBar } from "./components";
import styles from "./App.module.css";
import { fetchData } from "./api/api";

class Dashboard extends React.Component {
  state = {
    data: {},
    country: 'India',
  };

  async componentDidMount() {
    const fetchedData = await fetchData(this.state.country);
    this.setState({ ...this.state, data: fetchedData });
  }

  handleCountryChange=async(country)=>{
   const fetchedData=await fetchData(country);
   this.setState({ data: fetchedData, country: country });
  }
  
  render() {
    const { data,country } = this.state;
    console.log(data, country);
    return (
      <>
        <NavBar />
        <div className={styles.container}>  
          <Cards data={data} />
          <CountryPicker handleCountryChange={this.handleCountryChange} />
          <Chart data={data} country={country}/>
        </div>
      </>
    );
  }
}

export default Dashboard;
