import React from "react";
// import { Card, CardContent, Typography, Grid } from "@material-ui/core";
import "./Cards.css";
import CountUp from "react-countup";
import cx from "classnames";

const Cards = ({ data: { confirmed, recovered, deaths, lastUpdate } }) => {
  //console.log(confirmed, recovered, deaths, lastUpdate);
  if (!confirmed) {
    return "Loading...";
  }
  return (
    <>
    <div className='container1'>
      <div class="card card--infected">
        <header class="card__header">Infected</header>
        <div class="card__body">
          <div>
            <CountUp
              start={0}
              end={confirmed}
              duration={2.5}
              separator=","
            />
          </div> 
          <div class="date">{new Date(lastUpdate).toDateString()}</div>
          <div>Number of Cases</div>
        </div>
      </div>
      <div class="card card--recovered">
        <header class="card__header">Recovered</header>
        <div class="card__body">
          <div>
            <CountUp
              start={0}
              end={recovered}
              duration={2.5}
              separator=","
            />
          </div> 
          <div class="date">{new Date(lastUpdate).toDateString()}</div>
          <div>Number of Cases</div>
        </div>
      </div>
      <div class="card card--death">
        <header class="card__header">Deaths</header>
        <div class="card__body">
          <div>
            <CountUp
              start={0}
              end={deaths}
              duration={2.5}
              separator=","
            />
          </div> 
          <div class="date">{new Date(lastUpdate).toDateString()}</div>
          <div>Number of Cases</div>
        </div>
      </div>
    </div>
    </>
  );
};

export default Cards;
