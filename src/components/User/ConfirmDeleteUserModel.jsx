import React from 'react';

const ConfirmDeleteUserModel = ({
  confirmDeleteUser,
  setShowDeleteConfirmation,
}) => {
  return (
    <div className='fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-75 z-50'>
      <div className='bg-white p-6 rounded-lg max-w-md'>
        <p>Are you sure you want to delete this user?</p>
        <div className='mt-4 flex justify-around'>
          <button
            className='px-4 py-2 mr-2 bg-red-500 text-white rounded-md'
            onClick={confirmDeleteUser}
          >
            Delete
          </button>
          <button
            className='px-4 py-2 bg-gray-300 rounded-md'
            onClick={() => setShowDeleteConfirmation(false)}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmDeleteUserModel;
