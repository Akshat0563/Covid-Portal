import React, { useState } from 'react';
import './SignUp-SignIn.css';
import image1 from '../../Images/iconfinder_211686_back_arrow_icon.svg';

const SignUp = () => {
  document.title = 'Covid Portal | SignUp'

  const [className1, setClassName1] = useState('');

  const LeftPanelActive = () => {
    setClassName1('')
  };

  const RightPanelActive = () => {
    setClassName1("right-panel-active")
  };

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
          <input type="text" placeholder="User" className="input" />
          <input type="email" placeholder="Email" className="input" />
          <input type="password" placeholder="Password" className="input" />
          <button className="btn">Sign Up</button>
        </form>
      </div>

      <div className="container__form container--signin">
        <form action="#" className="form" id="form2">
          <h2 className="formtitle">Sign In</h2>
          <input type="email" placeholder="Email" className="input" />
          <input type="password" placeholder="Password" className="input" />
          <a href="#" className="link">Forgot your password?</a>
          <button className="btn">Sign In</button>
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