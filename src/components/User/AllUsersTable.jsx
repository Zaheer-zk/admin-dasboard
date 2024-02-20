import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import EditUserData from './EditUserData';
import { useNavigate } from 'react-router-dom';

const AllUsersTable = () => {
  const [users, setUsers] = useState([
    { id: 1, name: 'Aarav Sharma', email: 'aarav@example.com' },
    { id: 2, name: 'Aditi Patel', email: 'aditi@example.com' },
    { id: 3, name: 'Aryan Gupta', email: 'aryan@example.com' },
    { id: 4, name: 'Ishaan Khan', email: 'ishaan@example.com' },
    { id: 5, name: 'Ananya Kumar', email: 'ananya@example.com' },
    { id: 6, name: 'Anika Shah', email: 'anika@example.com' },
    { id: 7, name: 'Kabir Reddy', email: 'kabir@example.com' },
    { id: 8, name: 'Aisha Joshi', email: 'aisha@example.com' },
    { id: 9, name: 'Advik Singh', email: 'advik@example.com' },
    { id: 10, name: 'Diya Mishra', email: 'diya@example.com' },
    { id: 11, name: 'Reyansh Chopra', email: 'reyansh@example.com' },
    { id: 12, name: 'Shreya Nair', email: 'shreya@example.com' },
    { id: 13, name: 'Vihaan Tiwari', email: 'vihaan@example.com' },
    { id: 14, name: 'Myra Gupta', email: 'myra@example.com' },
    { id: 15, name: 'Arjun Malhotra', email: 'arjun@example.com' },
    { id: 16, name: 'Riya Sharma', email: 'riya@example.com' },
    { id: 17, name: 'Vivaan Verma', email: 'vivaan@example.com' },
    { id: 18, name: 'Prisha Singh', email: 'prisha@example.com' },
    { id: 19, name: 'Atharva Sahu', email: 'atharva@example.com' },
    { id: 20, name: 'Aadhya Mehra', email: 'aadhya@example.com' },
    { id: 21, name: 'Rudra Srivastava', email: 'rudra@example.com' },
  ]);
  const [editingUser, setEditingUser] = useState(null);

  const navigate = useNavigate();

  const handleEditUser = (user) => {
    setEditingUser(user);
  };

  const handleUpdateUser = (updatedUser) => {
    const updatedUsers = users.map((user) =>
      updatedUser.id === user.id ? updatedUser : user
    );

    setUsers(updatedUsers);
    setEditingUser(null);
  };

  const handleClose = () => {
    setEditingUser(null);
  };

  const handleDeleteUser = (user) => {
    const updatedUsers = users.filter((u) => u.id !== user.id);
    setUsers(updatedUsers);
    alert(`User ${user.name} has been successfully deleted.`);
  };

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
                Actions
              </th>
            </tr>
          </thead>
          <tbody className='divide-y divide-gray-200'>
            {users.map((user, index) => (
              <tr key={index}>
                <td className='px-3 py-4 text-sm text-gray-900'>{user.name}</td>
                <td className='px-3 py-4 text-sm text-gray-900'>
                  {user.email}
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
          />
        )}
      </div>
    </div>
  );
};

export default AllUsersTable;
