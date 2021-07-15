import React, {useState,useEffect} from "react";
import {fetchDailyData} from "../../api/api";
import { Line,Bar } from "react-chartjs-2";
import styles from "./Chart.module.css";

const Chart = ({data:{confirmed,recovered,deaths},country,state,district}) => {
   const [dailyData, setdailyData] = useState([]);

  useEffect(()=>{
   const fetchAPI=async()=>{
     setdailyData(await fetchDailyData());
   }

   fetchAPI();
 console.log(country);
  },[]);

  const barChart=(
    confirmed?
    (
      <Bar 
        data={{
         labels:['Infected','Recovered','Deaths'],
         datasets:[{
           label:`Current Cases in ${country}`,
           backgroundColor:[
             '#09a9f3','#43e97b','hsl(352, 93%, 50%)'
           ],
           borderWidth:1,
          borderColor:`#777`,
          hoverBorderWidth:3,
          hoverBorderColor:`#000`,
           data:[confirmed,recovered,deaths]
         }]
        }}
       const options= {{
          scales: {
               x: [{
                  grid: {
                     display: false
                  }
               }],
               yAxes: [{
                  gridLines: {
                     display: false
                  }
               }],
               
          }
         } }
      />
    ):null
  )

  const barChart1=(
    confirmed?
    (
      <Bar 
        data={{
         labels:['Infected','Recovered','Deaths'],
         datasets:[{
           label:`Current state in ${state}`,
           backgroundColor:[
             '#09a9f3','#43e97b','hsl(352, 93%, 50%)'
           ],
           borderWidth:1,
          borderColor:`#777`,
          hoverBorderWidth:3,
          hoverBorderColor:`#000`,
           data:[confirmed,recovered,deaths]
         }]
        }}
       const options= {{
          scales: {
               x: [{
                  grid: {
                     display: false
                  }
               }],
               yAxes: [{
                  gridLines: {
                     display: false
                  }
               }],
               
          }
         } }
      />
    ):null
  )
  const barChart2=(
    confirmed?
    (
      <Bar 
        data={{
         labels:['Infected','Recovered','Deaths'],
         datasets:[{
           label:`Current state in ${district}`,
           backgroundColor:[
             '#09a9f3','#43e97b','hsl(352, 93%, 50%)'
           ],
          borderWidth:1,
          borderColor:`#777`,
          hoverBorderWidth:3,
          hoverBorderColor:`#000`,
           data:[confirmed,recovered,deaths]
         }]
        }}
       const options= {{
          scales: {
               x: [{
                  grid: {
                     display: false
                  }
               }],
               yAxes: [{
                  gridLines: {
                     display: false
                  }
               }],
               
          }
         } }
      />
    ):null
  )

  return (
    <div style={{ width: '45%',height: '45%',backgroundColor:'white' }}>
      {district?barChart2:(state?barChart1:barChart)}
    </div>
  );
};

export default Chart;
