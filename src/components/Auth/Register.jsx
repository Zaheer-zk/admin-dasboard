import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthService from '../../services/AuthService';
import axios from 'axios';
import SuccessMessage from './../Common/SuccessMessage';
import ErrorMessage from './../Common/ErrorMessage';
import { API_URL } from '../../Constants/constants';

const Register = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const navigate = useNavigate();

  const handleRegistrationSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');
    try {
      // await AuthService.register(email, password);

      const { data } = await axios.post(`${API_URL}/api/create-admin`, {
        username,
        email,
        password,
      });

      console.log('Admin user created successfully', data);

      if (data) {
        setErrorMessage('');
        setSuccessMessage(`Admin user created successfully, ${data.username}`);
        localStorage.setItem('admin_user', JSON.stringify(data));
        setTimeout(() => {
          navigate('/');
        }, 2000);
      }
    } catch (error) {
      console.error('Error while registering new admin user', error);
      setErrorMessage(
        `Error while registering new admin user', ${error?.response?.data?.message}`
      );
      setSuccessMessage('');
    }
  };

  return (
    <div className='flex items-center justify-center min-h-screen bg-gray-100'>
      <div className='px-8 py-6 mt-4 text-left bg-white shadow-lg'>
        <h3 className='text-2xl font-bold text-center'>Create an account</h3>
        <form onSubmit={handleRegistrationSubmit}>
          <div className='mt-4'>
            <label htmlFor='email' className='block'>
              Username
            </label>
            <input
              type='text'
              id='username'
              placeholder='Enter your username'
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className='w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600'
            />
          </div>
          <div className='mt-4'>
            <label htmlFor='email' className='block'>
              Email
            </label>
            <input
              type='email'
              id='email'
              placeholder='Enter your email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className='w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600'
            />
          </div>
          <div className='mt-4'>
            <label htmlFor='password' className='block'>
              Password
            </label>
            <input
              type='password'
              id='password'
              placeholder='Enter your password'
              value={password}
              minLength={6}
              onChange={(e) => setPassword(e.target.value)}
              required
              className='w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600'
            />
          </div>
          <button
            type='submit'
            className='px-6 py-2 mt-4 text-white bg-blue-600 rounded-lg hover:bg-blue-900 w-full'
          >
            Register
          </button>
        </form>
        <div className='text-center mt-4'>
          <p>
            Already have an account?{' '}
            <Link to='/login' className='text-blue-600 hover:underline'>
              Log in here
            </Link>
          </p>
        </div>
      </div>
      {successMessage && <SuccessMessage message={successMessage} />}
      {errorMessage && <ErrorMessage message={errorMessage} />}
    </div>
  );
};

export default Register;
