import React, { useState } from 'react';
import './SignUp-SignIn.css';

const SignUp = () => {
  document.title = 'Covid Portal | SignUp'

  return (
    <>
    <div className='container'>
      <div className='back'><a href="./">Back To Dashboard</a></div>
        <div className='form-container'>
          <h2>SignUp</h2>
          <div className='info'>
              <small>Already have an Account? <a href="/SignIn">SignIn</a></small>
          </div>
          <form>
            <div className='username'>
              <label htmlFor="username">Username</label>
              <input type='text' name='username'/>
            </div>
            <div className='email'>
              <label htmlFor="email">Email</label>
              <input type='email' name='email'/>
            </div>
            <div className='password'>
              <label htmlFor="password">Password</label>
              <input type='password' name='password'/>
            </div>
            {/* <div className='info'>
              <small>Password must have atleast 8 characters.</small>
            </div> */}
            <div className='password'>
              <label htmlFor="confirmpassword">Confirm Password</label>
              <input type='password' name='confirmpassword'/>
            </div>
            <div className='submit'>
              <button type='submit'>Create Account</button>
            </div>
          </form>
        </div>
      </div>
      </>
  );
};

export default SignUp;