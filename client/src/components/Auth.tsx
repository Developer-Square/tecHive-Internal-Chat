import React, { useState } from 'react';
import Cookies from 'universal-cookie';
import axios from 'axios';

import SigninImage from '../assets/signup.jpg';

const initialState = {
  fullName: '',
  userName: '',
  phoneNumber: '',
  avatarURL: '',
  password: '',
  confirmPassword: '',
};

const cookies = new Cookies();

const Auth = () => {
  const [form, setForm] = useState(initialState);
  const [isSignup, setIsSignup] = useState(true);

  const handleChange = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const switchMode = () => {
    setIsSignup((prevIsSignup) => !prevIsSignup);
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    const { fullName, userName, phoneNumber, password, avatarURL } = form;
    const URL = process.env.REACT_APP_BACKEND_URL;
    const {
      data: { token, userId, hashedPassword },
    } = await axios.post(`${URL}/auth/${isSignup ? 'signup' : 'login'}`, {
      fullName,
      userName,
      phoneNumber,
      password,
      avatarURL,
    });

    cookies.set('token', token);
    cookies.set('fullName', fullName);
    cookies.set('userName', userName);
    cookies.set('userId', userId);

    if (isSignup) {
      cookies.set('phoneNumber', phoneNumber);
      cookies.set('avatarURL', avatarURL);
      cookies.set('hashedPassword', hashedPassword);
    }

    window.location.reload();
  };

  return (
    <div className='auth__form-container'>
      <div className='auth__form-container_fields'>
        <div className='auth__form-container_fields-content'>
          <p>{isSignup ? 'Sign up' : 'Sign in'}</p>
          <form onSubmit={handleSubmit}>
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
                type='password'
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
                  type='password'
                  placeholder='Confirm Password'
                  onChange={handleChange}
                  required
                />
              </div>
            ) : (
              <></>
            )}
            <div className='auth__form-container_fields-content_button'>
              <button onClick={handleSubmit}>
                {isSignup ? 'Sign Up' : 'Sign In'}
              </button>
            </div>
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
