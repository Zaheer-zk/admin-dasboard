import React, { useState } from 'react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import SuccessMessage from '../Common/SuccessMessage';
import ErrorMessage from '../Common/ErrorMessage';

const CreateNewUser = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [gender, setGender] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleCreateUser = async (e) => {
    e.preventDefault();
    // console.log('Creating new user:', { name, email });

    setErrorMessage('');
    setSuccessMessage('');

    try {
      const { data } = await axios.post(
        'http://localhost:8000/api/create-user',
        {
          name,
          email,
          gender,
        }
      );

      if (data) {
        setSuccessMessage(`User created with name ${data.name}`);
        setErrorMessage('');
        setTimeout(() => {
          navigate(-1);
        }, 2000);
        console.log('User created', data);
      }
    } catch (error) {
      console.error('Error creating user: ', error?.response?.data?.message);
      setSuccessMessage('');
      setErrorMessage(error?.response?.data?.message);
    }
  };

  return (
    <div className='container mx-auto px-4'>
      <h2 className='text-2xl font-semibold mb-4'>Create New User</h2>
      <form onSubmit={handleCreateUser} className='max-w-md'>
        <div className='mb-4'>
          <label
            htmlFor='name'
            className='block text-sm font-medium text-gray-700'
          >
            Name:
          </label>
          <input
            type='text'
            id='name'
            value={name}
            onChange={(e) => setName(e.target.value)}
            className='mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm'
            placeholder='Enter name'
            required
          />
        </div>
        <div className='mb-4'>
          <label
            htmlFor='email'
            className='block text-sm font-medium text-gray-700'
          >
            Email:
          </label>
          <input
            type='email'
            id='email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className='mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm'
            placeholder='Enter email'
            required
          />
        </div>
        <div className='mb-4'>
          <label
            htmlFor='email'
            className='block text-sm font-medium text-gray-700'
          >
            Gender:
          </label>
          <select
            className='mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm'
            value={gender || ''}
            onChange={(e) => setGender(e.target.value)}
            required
          >
            <option value='' disabled hidden>
              Select Gender
            </option>
            <option value='Male'>Male</option>
            <option value='Female'>Female</option>
          </select>
        </div>
        <button
          type='submit'
          className='inline-block bg-blue-500 text-white px-4 py-2 rounded-md transition duration-300 hover:bg-blue-600 focus:outline-none focus:bg-blue-600'
        >
          Create User
        </button>
      </form>
      {successMessage && <SuccessMessage message={successMessage} />}
      {errorMessage && <ErrorMessage message={errorMessage} />}
    </div>
  );
};

export default CreateNewUser;
