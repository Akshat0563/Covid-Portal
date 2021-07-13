import React, { useState } from 'react';
import './SignUp-SignIn.css';
import image1 from '../../Images/iconfinder_211686_back_arrow_icon.svg';
import axios from "axios";

const SignUp = () => {
  document.title = 'Covid Portal | SignUp'
  
  const [className1, setClassName1] = useState('');
  const [user1, setUser1] = useState({email: '', password: ''});
  const [user2, setUser2] = useState({email: '', password: ''});

  const LeftPanelActive = () => {
    setClassName1('')
  };

  const RightPanelActive = () => {
    setClassName1("right-panel-active")
  };

 const handleSignUp = async() => {
   console.log(user1)
    const response = await axios.post('http://locahost:2000/api/signUp', user1)
    console.log(response)
  }

  const handleSignIn = async() => {
    const response = await axios.post('http://locahost:2000/api/signIn', user2)
    console.log(response)
  }

  const handleChange = (e) => {
    const { name, value } = e.target;

    switch (name) {
      case 'email1':
        setUser1({ ...user1, email: value });
        console.log(user1)
        break;
      case 'password1':
        setUser1({ ...user1, password: value });
        console.log(user1)
        break;
      case 'email2':
        setUser2({ ...user2, email: value });
        console.log(user2)
        break;
      case 'password2':
        setUser2({ ...user2, password: value });
        console.log(user2)
        break;
      default:
        break;
    }
  }

  return (
    <>
    <div className="back">
      <img src={image1} alt="" />
      <a href="./">Back to Dashboard</a>
    </div>
    <div className='flex'>
    <div className={"container "+className1}>
      <div className="container__form container--signup">
        <form action="#" className="form" id="form1">
          <h2 className="formtitle">Sign Up</h2>
          <input type="email" placeholder="Email" name='email1' className="input" onChange={handleChange} noValidate/>
          <input type="password" placeholder="Password" name='password1' className="input" onChange={handleChange} noValidate/>
          <button className="btn" onClick={handleSignUp}>Sign Up</button>
        </form>
      </div>

      <div className="container__form container--signin">
        <form action="#" className="form" id="form2">
          <h2 className="formtitle">Sign In</h2>
          <input type="email" placeholder="Email" className="input" name='email2' onChange={handleChange} noValidate/>
          <input type="password" placeholder="Password" className="input" name='password2' onChange={handleChange} noValidate/>
          <a href="#" className="link">Forgot your password?</a>
          <button className="btn" onClick={handleSignIn}>Sign In</button>
        </form>
      </div>

      <div className="container__overlay">
        <div className="overlay">
          <div className="overlay__panel overlay--left">
            <button className="btn" onClick={LeftPanelActive}>Sign In</button>
          </div>
          <div className="overlay__panel overlay--right">
            <button className="btn" onClick={RightPanelActive}>Sign Up</button>
          </div>
        </div>
      </div>
      </div>
    </div>
    </>
  );
};

export default SignUp;