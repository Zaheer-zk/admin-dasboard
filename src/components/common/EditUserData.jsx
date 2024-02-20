import React, { useState } from 'react';

const EditUserData = ({ user, onSave, onClose }) => {
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);

  const handleSave = () => {
    onSave({ id: user.id, name, email });
    onClose();
  };

  return (
    <div className='fixed inset-0 z-10 overflow-y-auto bg-gray-500 bg-opacity-50 flex justify-center items-center'>
      <div className='bg-white p-8 rounded-md shadow-md'>
        <h2 className='text-xl font-semibold mb-4'>Edit User Data</h2>
        <form onSubmit={handleSave}>
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
