import React, { useState } from 'react';
import './SignUp-SignIn.css';
import image1 from '../../Images/iconfinder_211686_back_arrow_icon.svg';

const SignUp = () => {
  document.title = 'Covid Portal | SignUp'

  // const signInBtn = document.getElementById("signIn");
  // const signUpBtn = document.getElementById("signUp");
  // const fistForm = document.getElementById("form1");
  // const secondForm = document.getElementById("form2");
  const container = document.querySelector(".container");

  const LeftPanelActive = () => {
    container.classList.remove("right-panel-active");
  };

  const RightPanelActive = () => {
    container.classList.add("right-panel-active");
  };

  // fistForm.addEventListener("submit", (e) => e.preventDefault());
  // secondForm.addEventListener("submit", (e) => e.preventDefault());

  return (
    <>
    <div class="back">
      <img src={image1} alt="" />
      Back to Dashboard
    </div>
    <div className='flex'>
    <div className="container right-panel-active">
      <div className="container__form container--signup">
        <form action="#" class="form" id="form1">
          <h2 className="formtitle">Sign Up</h2>
          <input type="text" placeholder="User" className="input" />
          <input type="email" placeholder="Email" className="input" />
          <input type="password" placeholder="Password" className="input" />
          <button className="btn">Sign Up</button>
        </form>
      </div>

      <div className="container__form container--signin">
        <form action="#" className="form" id="form2" onSub>
          <h2 className="formtitle">Sign In</h2>
          <input type="email" placeholder="Email" className="input" />
          <input type="password" placeholder="Password" class="input" />
          <a href="#" className="link">Forgot your password?</a>
          <button className="btn" onS>Sign In</button>
        </form>
      </div>

      <div className="container__overlay">
        <div className="overlay">
          <div className="overlay__panel overlay--left">
            <button className="btn" onClick={()=>LeftPanelActive()}>Sign In</button>
          </div>
          <div className="overlay__panel overlay--right">
            <button className="btn" onClick={()=>RightPanelActive()}>Sign Up</button>
          </div>
        </div>
      </div>
    </div>
    </div>
    </>
  );
};

export default SignUp;