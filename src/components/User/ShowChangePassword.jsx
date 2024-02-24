import React, { useState } from 'react';

const ShowChangePassword = ({ updatePassword, setShowChangePassword }) => {
  const [password, setPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');

  const handlePasswordChange = (e) => {
    e.preventDefault();
    updatePassword(password, newPassword);
  };

  return (
    <div className='fixed inset-0 z-10 overflow-y-auto bg-gray-500 bg-opacity-50 flex justify-center items-center'>
      <form
        onSubmit={(e) => handlePasswordChange(e)}
        className='bg-white p-6 rounded-lg shadow-lg'
      >
        <h3 className='font-bold mb-5 text-xl'>
          Enter your password to update
        </h3>
        <label htmlFor='password' className='block mb-2'>
          Current Password
        </label>
        <input
          type='password'
          id='password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className='w-full p-2 mb-4 border rounded-md border-blue-600'
          required
        />
        <label htmlFor='new_password' className='block mb-2'>
          New Password
        </label>
        <input
          type='password'
          id='new_password'
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          className='w-full p-2 mb-4 border rounded-md border-blue-600'
          required
        />
        <div className='flex justify-between '>
          <button
            type='submit'
            className='px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-700 w-28'
          >
            Save
          </button>
          <button
            className='px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-700 w-28'
            onClick={() => setShowChangePassword(false)}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default ShowChangePassword;
