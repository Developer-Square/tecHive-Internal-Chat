import React, { useState } from 'react';
import Cookies from 'universal-cookie';
import axios from 'axios';

import SigninImage from '../assets/signup.jpg';

const Auth = () => {
  const [isSignup, setIsSignup] = useState(true);

  const handleChange = () => {};

  const switchMode = () => {
    setIsSignup((prevIsSignup) => !prevIsSignup);
  };

  return (
    <div className='auth__form-container'>
      <div className='auth__form-container_fields'>
        <div className='auth__form-container_fields-content'>
          <p>{isSignup ? 'Sign up' : 'Sign in'}</p>
          <form onSubmit={() => {}}>
            {isSignup ? (
              <div className='auth__form-container_fields-content_input'>
                <label htmlFor='fullName'>Full Name</label>
                <input
                  name='fullName'
                  type='text'
                  placeholder='Full Name'
                  onChange={handleChange}
                  required
                />
              </div>
            ) : (
              <></>
            )}
            <div className='auth__form-container_fields-content_input'>
              <label htmlFor='userName'>Username</label>
              <input
                name='userName'
                type='text'
                placeholder='Username'
                onChange={handleChange}
                required
              />
            </div>
            {isSignup ? (
              <>
                <div className='auth__form-container_fields-content_input'>
                  <label htmlFor='phoneNumber'>Phone Number</label>
                  <input
                    name='phoneNumber'
                    type='number'
                    placeholder='Phone Number'
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className='auth__form-container_fields-content_input'>
                  <label htmlFor='avatarURL'>Avatar URL</label>
                  <input
                    name='avatarURL'
                    type='text'
                    placeholder='Avatar URL'
                    onChange={handleChange}
                    required
                  />
                </div>
              </>
            ) : (
              <></>
            )}
            <div className='auth__form-container_fields-content_input'>
              <label htmlFor='password'>Password</label>
              <input
                name='password'
                type='text'
                placeholder='Password'
                onChange={handleChange}
                required
              />
            </div>
            {isSignup ? (
              <div className='auth__form-container_fields-content_input'>
                <label htmlFor='confirmPassword'>Confirm Password</label>
                <input
                  name='confirmPassword'
                  type='text'
                  placeholder='Confirm Password'
                  onChange={handleChange}
                  required
                />
              </div>
            ) : (
              <></>
            )}
          </form>
          <div className='auth__form-container_fields-account'>
            <p>
              {isSignup ? 'Already have an account?' : "Don't have an account?"}
              <span onClick={switchMode}>
                {isSignup ? ' Sign in' : ' Sign up'}
              </span>
            </p>
          </div>
        </div>
      </div>
      <div className='auth__form-container_image'>
        <img src={SigninImage} alt='sign in' />
      </div>
    </div>
  );
};

export default Auth;
