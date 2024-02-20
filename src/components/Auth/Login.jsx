import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthService from '../../services/AuthService';
import OTPVerification from './OTPVerification';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showModal, setShowModal] = useState(false);

  const navigate = useNavigate();

  const handleVerifyOTP = (otp) => {
    if (otp === '1234') {
      navigate('/');
    } else {
      alert('Invalid OTP. Please try again.');
    }
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    try {
      await AuthService.login(email, password);
      setShowModal(true);
    } catch (error) {
      console.error(error);
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
      />
    </div>
  );
};

export default Login;
