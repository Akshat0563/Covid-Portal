// import './App.css';
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import SignUp from './components/SignUp-SignIn/SignUp';
import Hospital from './components/Hospital/hospital';
import Vaccination from './components/Vaccination/vaccination';
import Dashboard from './Dashboard'

function App() {
  
  return (
    <>
        <Router>
          <Switch>
            <Route exact path='/'>
              <Dashboard />
            </Route>
            <Route path="/SignUp">
              <SignUp />
            </Route>
            <Route path="/Vaccination">
              <Vaccination />
            </Route>
            <Route path='/Hospital'>
              <Hospital />
            </Route>
          </Switch>
        </Router>
    </>
  );
}

export default App;
