import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const CreateNewUser = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const navigate = useNavigate();

  const handleCreateUser = (e) => {
    e.preventDefault();
    console.log('Creating new user:', { name, email });
    navigate(-1);
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
        <button
          type='submit'
          className='inline-block bg-blue-500 text-white px-4 py-2 rounded-md transition duration-300 hover:bg-blue-600 focus:outline-none focus:bg-blue-600'
        >
          Create User
        </button>
      </form>
    </div>
  );
};

export default CreateNewUser;
