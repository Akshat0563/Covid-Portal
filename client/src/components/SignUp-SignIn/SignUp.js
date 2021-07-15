import React, { useState, useContext } from 'react';
import './SignUp-SignIn.css';
import image1 from '../../Images/iconfinder_211686_back_arrow_icon.svg';
import axios from "axios";
import { UserContext } from '../../UserContext';
import { Link, useHistory } from 'react-router-dom';

const SignUp = () => {
  ///////// Display ////////////
  document.title = 'Covid Portal | SignUp';
  const [className1, setClassName1] = useState('');

  ///////// Inputs //////////////  
  const [user1, setUser1] = useState({email: '', password: ''});
  const [user2, setUser2] = useState({email: '', password: ''});

  const handleChange = (e) => {
    const { name, value } = e.target;

    switch (name) {
      case 'email1':
        setUser1({ ...user1, email: value });
        break;
      case 'password1':
        setUser1({ ...user1, password: value });
        break;
      case 'email2':
        setUser2({ ...user2, email: value });
        break;
      case 'password2':
        setUser2({ ...user2, password: value });
        break;
      default:
        break;
    }
  }

  ////////// API call /////////////
  const {user, setUser} = useContext(UserContext);
  const history = useHistory();

  const handleSignUpIn = async(upin) => {
    const credentials = (upin === 'signUp' ? user1 : user2)
    try{
      const {data} = await axios.post("http://localhost:2000/api/"+upin, credentials)
      //console.log(data)
      setUser({
        signedIn:true,
        email: data.user.email,
        isAdmin: data.user.isAdmin,
        auth: {headers: {Authorization: "Bearer " + data.token}}
      })
    }
    catch(e){
      console.log(e)
    }
    history.push("/");
  }
  
  return (
    <>
    <div className="back">
      <img src={image1} alt="" />
      <Link to="/">Back to Dashboard</Link>
    </div>
    <div className='flex'>
    <div className={"container "+className1}>
      <div className="container__form container--signup">
        <form className="form" id="form1">
          <h2 className="formtitle">Sign Up</h2>
          <input type="email" placeholder="Email" name='email1' className="input" onChange={handleChange} noValidate/>
          <input type="password" placeholder="Password" name='password1' className="input" onChange={handleChange} noValidate/>
          <button className="btn" onClick={(e) => {e.preventDefault(); handleSignUpIn('signUp');}}>Sign Up</button>
        </form>
      </div>

      <div className="container__form container--signin">
        <form className="form" id="form2">
          <h2 className="formtitle">Sign In</h2>
          <input type="email" placeholder="Email" className="input" name='email2' onChange={handleChange} noValidate/>
          <input type="password" placeholder="Password" className="input" name='password2' onChange={handleChange} noValidate/>
          <a href="#" className="link">Forgot your password?</a>
          <button className="btn" onClick={(e) => {e.preventDefault(); handleSignUpIn('signIn');}}>Sign In</button>
        </form>
      </div>

      <div className="container__overlay">
        <div className="overlay">
          <div className="overlay__panel overlay--left">
            <button className="btn" onClick={() => {setClassName1('')}}>Sign In</button>
          </div>
          <div className="overlay__panel overlay--right">
            <button className="btn" onClick={() => {setClassName1("right-panel-active")}}>Sign Up</button>
          </div>
        </div>
      </div>
      </div>
    </div>
    </>
  );
};

export default SignUp;