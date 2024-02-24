import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthService from '../../services/AuthService';
import OTPVerification from './OTPVerification';
import axios from 'axios';
import SuccessMessage from '../Common/SuccessMessage';
import ErrorMessage from '../Common/ErrorMessage';
// import bcrypt from 'bcrypt';
import { API_URL } from './../../Constants/constants';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [user, setUser] = useState(null);

  const navigate = useNavigate();

  const handleVerifyOTP = (otp, data) => {
    if (otp === '1234') {
      localStorage.setItem('admin_user', JSON.stringify(data));
      navigate('/');
    } else {
      alert('Invalid OTP. Please try again.');
    }
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');
    try {
      // await AuthService.login(email, password);
      const loggedInUser = localStorage.getItem('admin_user');

      const { data } = await axios.post(`${API_URL}/api/login-admin`, {
        email,
        password,
      });

      console.log('Login user data', data);
      setUser(data);
      // const isPasswordMatch = await bcrypt.compare(
      //   password,
      //   adminUser.password
      // );

      // if (loggedInUser._id === data._id && isPasswordMatch) {
      //   navigate('/');
      // }

      if (data) {
        setShowModal(true);
      }
    } catch (error) {
      console.error('Error while login as admin user', error);
      setErrorMessage('Error while login as admin user', error);
      setSuccessMessage('');
    }
  };

  return (
    <div className='flex items-center justify-center min-h-screen bg-gray-100'>
      <div className='px-8 py-6 mt-4 text-left bg-white shadow-lg'>
        <h3 className='text-2xl font-bold text-center'>
          Sign in to your account
        </h3>
        <form onSubmit={handleLoginSubmit}>
          <div className='mt-4'>
            <label className='block' htmlFor='email'>
              Email
            </label>
            <input
              type='email'
              placeholder='Enter your email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className='w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600'
              id='email'
            />
          </div>
          <div className='mt-4'>
            <label className='block' htmlFor='password'>
              Password
            </label>
            <input
              type='password'
              placeholder='Enter your password'
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              required
              className='w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600'
              id='password'
            />
          </div>
          <button
            type='submit'
            className='px-6 py-2 mt-4 text-white bg-blue-600 rounded-lg hover:bg-blue-900 w-full'
          >
            Log in
          </button>
        </form>
        <div className='text-center'>
          <Link
            to={'/register'}
            className='text-sm text-blue-600 hover:underline'
          >
            Don’t have an account? Sign up
          </Link>
        </div>
      </div>
      <OTPVerification
        showModal={showModal}
        onClose={() => setShowModal(false)}
        handleVerifyOTP={handleVerifyOTP}
        data={user}
      />
      {successMessage && <SuccessMessage message={successMessage} />}
      {errorMessage && <ErrorMessage message={errorMessage} />}
    </div>
  );
};

export default Login;
