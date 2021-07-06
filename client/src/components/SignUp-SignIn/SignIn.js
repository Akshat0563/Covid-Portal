import React from 'react';
import './SignUp-SignIn.css';

const SignIn = () => {
    
  return (
    <>
    <div className='container'>
      <div className='back'><a href="./">Back To Dashboard</a></div>
        <div className='form-container'>
          <h2>SignIn</h2>
          <div className='info'>
              <small>Don't have an Account? <a href="/SignUp">SignUp</a></small>
          </div>
          <form>
            <div className='username'>
              <label htmlFor="username">Username</label>
              <input type='text' name='username'/>
            </div>
            <div className='password'>
              <label htmlFor="password">Password</label>
              <input type='password' name='password'/>
            </div>
            <div className='info'>
              <small><a href="#">Forgot username or password?</a></small>
            </div>
            <div className='submit'>
              <button type='submit'>SignIn</button>
            </div>
          </form>
        </div>
      </div>
      </>
  );
};

export default SignIn;