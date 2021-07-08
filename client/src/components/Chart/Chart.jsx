import React, {useState,useEffect} from "react";
import {fetchDailyData} from "../../api/api";
import { Line,Bar } from "react-chartjs-2";
import styles from "./Chart.module.css";

const Chart = ({data:{confirmed,recovered,deaths},country}) => {
   const [dailyData, setdailyData] = useState([]);

  useEffect(()=>{
   const fetchAPI=async()=>{
     setdailyData(await fetchDailyData());
   }

   fetchAPI();

  },[]);

  const lineChart=(
    dailyData.length!==0 ? 
    (<Line
      data={{
        labels: dailyData.map(({date})=>date),
        datasets:[{
            data: dailyData.map(({confirmed})=>confirmed),
            label: 'Infected',
            bordercolor: 'black',
            backgroundColor: 'blue',
            fill : true,
        },{
            data: dailyData.map(({deaths})=>deaths),
            label: 'Deaths',
            bordercolor: 'red',
            backgroundColor: 'rgba(255,0,0,0.5)',
            fill : true,
        }],
      }}
    />):null
  );

  const barChart=(
    confirmed?
    (
      <Bar 
        data={{
         labels:['Infected','Recovered','Deaths'],
         datasets:[{
           label:`Current state in ${country}`,
           backgroundColor:[
             'rgb(0, 0, 255, 0.5)','rgb(0, 255, 0, 0.5)','rgb(255, 0, 0, 0.5)'
           ],
           data:[confirmed,recovered,deaths]
         }]
        }}
         options={{
           legend: {dispay:false},
          // title: {display:true, text:`Current state in ${country}`},
         }}
      />
    ):null
  )

  return (
    <div classname={styles.container}>
      {country?barChart:lineChart}
    </div>
  );
};

export default Chart;
