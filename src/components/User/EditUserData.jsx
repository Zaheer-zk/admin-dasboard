import React, { useState } from 'react';
import axios from 'axios';
import { API_URL } from '../../Constants/constants';

const EditUserData = ({
  user,
  onSave,
  onClose,
  setSuccessMessage,
  setErrorMessage,
}) => {
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [isActive, setIsActive] = useState(user.isActive);

  const handleOptionChange = (e) => {
    e.preventDefault();
    setIsActive(e.target.value);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');

    console.log(user);

    try {
      const { data } = await axios.put(`${API_URL}/api/update-user`, {
        id: user._id,
        name,
        email,
        isActive,
      });

      console.log('Updated data: ', data);

      if (data) {
        onSave(data);
        onClose();
        setErrorMessage('');
        setSuccessMessage('User updated successfully');
      }
    } catch (error) {
      console.error('Error while updating user: ', error);
      setSuccessMessage('');
      setErrorMessage(error?.response?.data?.message);
    }
  };

  return (
    <div className='fixed inset-0 z-10 overflow-y-auto bg-gray-500 bg-opacity-50 flex justify-center items-center'>
      <div className='bg-white p-8 rounded-md shadow-md'>
        <h2 className='text-xl font-semibold mb-4'>Edit User Data</h2>
        <form onSubmit={(e) => handleSave(e)}>
          <input
            type='text'
            value={name}
            onChange={(e) => setName(e.target.value)}
            className='w-full px-4 py-2 border rounded-md mb-4'
          />
          <input
            type='email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className='w-full px-4 py-2 border rounded-md mb-4'
          />
          <select
            className='w-full px-4 py-2 border rounded-md mb-4'
            onChange={(e) => handleOptionChange(e)}
          >
            <option value={user.isActive} hidden>
              {user.isActive.toString()}
            </option>
            <option value={true}>True</option>
            <option value={false}>False</option>
          </select>
          <div className='flex justify-end'>
            <button
              type='submit'
              className='px-4 py-2 bg-blue-500 text-white rounded-md mr-2 hover:bg-blue-600'
            >
              Save
            </button>
            <button
              onClick={onClose}
              className='px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400'
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditUserData;
