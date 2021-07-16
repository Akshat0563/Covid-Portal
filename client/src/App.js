// import './App.css';
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import SignUp from './components/SignUp-SignIn/SignUp';
import Hospital from './components/Hospital/hospital';
import Vaccination from './components/Vaccination/vaccination';
import Dashboard from './Dashboard'
import Guidelines from './components/Guidelines/Guidelines';
import {UserContext} from './UserContext';

function App() {

  const [user,setUser] = useState({signedIn:false});
  
  return (
    <>
        <Router>
          <Switch>

            <UserContext.Provider value={{user,setUser}}>
              <Route exact path='/'>
                <SignUp />
              </Route>
              <Route path="/Dashboard">
                <Dashboard user={user}/>
              </Route>
              <Route path="/Vaccination">
                <Vaccination />
              </Route>
              <Route path='/Hospital'>
                <Hospital />
              </Route>
              <Route path='/Guidelines'>
                <Guidelines/>
              </Route>
            </UserContext.Provider>

          </Switch>
        </Router>
    </>
  );
}

export default App;
