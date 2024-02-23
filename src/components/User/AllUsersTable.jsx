import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import EditUserData from './EditUserData';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import SuccessMessage from '../Common/SuccessMessage';
import ErrorMessage from '../Common/ErrorMessage';

const AllUsersTable = () => {
  const [users, setUsers] = useState([]);
  const [editingUser, setEditingUser] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);

  const navigate = useNavigate();

  const handleEditUser = (user) => {
    setEditingUser(user);
  };

  const handleUpdateUser = (updatedUser) => {
    console.log('updatedUser: ', updatedUser);
    const updatedUsers = users.map((user) =>
      updatedUser._id === user._id ? updatedUser : user
    );

    console.log('updatedUsers: ', updatedUsers);

    setUsers(updatedUsers);
    setEditingUser(null);
  };

  const handleClose = () => {
    setEditingUser(null);
  };

  const handleDeleteUser = (user) => {
    setUserToDelete(user);
    setShowDeleteConfirmation(true);
  };

  const confirmDeleteUser = async () => {
    setShowDeleteConfirmation(false);

    if (userToDelete) {
      try {
        const { data } = await axios.delete(
          'http://localhost:8000/api/delete-user',
          {
            data: {
              id: userToDelete._id,
            },
          }
        );

        if (data) {
          setSuccessMessage(data.message);
          const updatedUsers = users.filter((u) => u._id !== userToDelete._id);
          setUsers(updatedUsers);
        }
      } catch (error) {
        console.error('Error deleting user:', error);
        setErrorMessage('An error occurred while deleting the user.');
      }
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get('http://localhost:8000/api/users');

        console.log('All users data: ', data);
        setUsers(data);
      } catch (e) {
        console.log('data fetching error: ', e);
      }
    };

    fetchData();
  }, []);

  return (
    <div className='overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg'>
      <div className='flex justify-between bg-gray-50 px-4 py-3'>
        <div>
          <h2 className='text-lg font-semibold text-gray-900'>All Users</h2>
        </div>
        <div>
          <button
            className='py-2.5 px-4 rounded transition duration-200 bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800 hover:text-white shadow-md flex items-center'
            onClick={() => navigate('/create-user')}
          >
            <FontAwesomeIcon icon={faPlus} className='mr-2' />
            Create User
          </button>
        </div>
      </div>
      <div className='px-4 py-2 overflow-y-auto  h-screen'>
        <table className='min-w-full divide-y divide-gray-200'>
          <thead className='bg-gray-50'>
            <tr>
              <th
                scope='col'
                className='px-3 py-3.5 text-left text-sm font-semibold text-gray-900'
              >
                User Name
              </th>
              <th
                scope='col'
                className='px-3 py-3.5 text-left text-sm font-semibold text-gray-900'
              >
                Email
              </th>
              <th
                scope='col'
                className='px-3 py-3.5 text-left text-sm font-semibold text-gray-900'
              >
                Gender
              </th>
              <th
                scope='col'
                className='px-3 py-3.5 text-left text-sm font-semibold text-gray-900'
              >
                Is Active
              </th>
              <th
                scope='col'
                className='px-3 py-3.5 text-left text-sm font-semibold text-gray-900'
              >
                Is Verified
              </th>
              <th
                scope='col'
                className='px-3 py-3.5 text-left text-sm font-semibold text-gray-900'
              >
                Actions
              </th>
            </tr>
          </thead>
          <tbody className='divide-y divide-gray-200'>
            {users.length === 0 && <h2>No users found</h2>}
            {users.map((user, index) => (
              <tr key={index}>
                <td className='px-3 py-4 text-sm text-gray-900'>{user.name}</td>
                <td className='px-3 py-4 text-sm text-gray-900'>
                  {user.email}
                </td>
                <td className='px-3 py-4 text-sm text-gray-900'>
                  {user.gender}
                </td>
                <td className='px-3 py-4 text-sm text-gray-900'>
                  {user.isActive.toString()}
                </td>
                <td className='px-3 py-4 text-sm text-gray-900'>
                  {user.isVerified.toString()}
                </td>
                <td className='px-3 py-4 text-sm font-medium flex'>
                  <button
                    className='flex items-center text-indigo-600 hover:text-indigo-900'
                    onClick={() => handleEditUser(user)}
                  >
                    <FontAwesomeIcon icon={faEdit} className='mr-1' />
                    Edit
                  </button>

                  <button
                    className='flex items-center text-red-600 hover:text-red-900 ml-3'
                    onClick={() => handleDeleteUser(user)}
                  >
                    <FontAwesomeIcon icon={faTrash} className='mr-1' />
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {editingUser && (
          <EditUserData
            user={editingUser}
            onSave={handleUpdateUser}
            onClose={handleClose}
            setSuccessMessage={setSuccessMessage}
            setErrorMessage={setErrorMessage}
          />
        )}
        {successMessage && <SuccessMessage message={successMessage} />}
        {errorMessage && <ErrorMessage message={errorMessage} />}
        {showDeleteConfirmation && (
          <div className='fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-75 z-50'>
            <div className='bg-white p-6 rounded-lg max-w-md'>
              <p>Are you sure you want to delete this user?</p>
              <div className='mt-4 flex justify-end'>
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
        )}
      </div>
    </div>
  );
};

export default AllUsersTable;
