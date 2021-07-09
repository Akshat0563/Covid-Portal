// import './App.css';
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import SignIn from './components/SignUp-SignIn/SignIn';
import SignUp from './components/SignUp-SignIn/SignUp';
// import Error from './Error';
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
            <Route path="/SignIn">
              <SignIn />
            </Route>
            {/* <Route path='*'>
              <Error />
            </Route> */}
          </Switch>
        </Router>
    </>
  );
}

export default App;
