import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import EditUserData from './EditUserData';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import SuccessMessage from '../Common/SuccessMessage';
import ErrorMessage from '../Common/ErrorMessage';
import ConfirmDeleteUserModel from './ConfirmDeleteUserModel';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  TextField,
} from '@mui/material';
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';
import { API_URL } from '../../Constants/constants';
import { gql, useQuery } from '@apollo/client';
import Loader from './../Common/Loader';

const USERS = gql`
  query GetAllUsers {
    users {
      _id
      name
      email
      gender
      isActive
      isVerified
      createdAt
      updatedAt
    }
  }
`;

const AllUsersTable = () => {
  const { data, loading, error } = useQuery(USERS);

  console.log('data', data);
  console.log('loading', loading);
  console.log('error', error);

  const [users, setUsers] = useState([]);
  const [editingUser, setEditingUser] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);

  const navigate = useNavigate();

  const handleEditUser = (user) => {
    setEditingUser(user);
  };

  const handleUpdateUser = (updatedUser) => {
    const updatedUsers = users.map((user) =>
      updatedUser._id === user._id ? updatedUser : user
    );

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
        const { data } = await axios.delete(`${API_URL}/api/delete-user`, {
          data: {
            id: userToDelete._id,
          },
        });

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
        const { data } = await axios.get(`${API_URL}/api/users`);
        setUsers(data);
      } catch (error) {
        console.error('Error fetching users:', error);
        setErrorMessage('Error fetching users');
      }
    };

    fetchData();
  }, []);

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const indexOfLastUser = currentPage * itemsPerPage;
  const indexOfFirstUser = indexOfLastUser - itemsPerPage;
  const reversedFilteredUsers = [...filteredUsers].reverse();
  const currentUsers = reversedFilteredUsers.slice(
    indexOfFirstUser,
    indexOfLastUser
  );

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return <h1>{`Error!!!! ${error}`}</h1>;
  }

  return (
    <div className='overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg'>
      <div className='bg-gray-50 px-4 py-3 flex justify-between items-center'>
        <h2 className='text-lg font-semibold text-gray-900'>All Users</h2>
        <div className='flex items-center justify-between '>
          <Button
            variant='contained'
            color='primary'
            onClick={() => navigate('/create-user')}
            className='bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md shadow-md transition duration-300 ease-in-out ml-4'
          >
            <FontAwesomeIcon icon={faPlus} className='mr-2' />
            Create User
          </Button>
        </div>
      </div>

      <div className='px-4 py-2 overflow-y-auto h-full'>
        <div className='flex justify-end mb-2'>
          <TextField
            label='Search'
            variant='outlined'
            value={searchQuery}
            onChange={handleSearchChange}
            className='w-[350px]'
            InputProps={{
              className:
                'bg-gray-100 border border-gray-300 focus:outline-none focus:ring focus:ring-blue-500 rounded-md',
              startAdornment: (
                <InputAdornment position='start'>
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
          />
        </div>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow className='bg-blue-500'>
                <TableCell>
                  <span className='text-white'>User Name</span>
                </TableCell>
                <TableCell>
                  <span className='text-white'>Email</span>
                </TableCell>
                <TableCell>
                  <span className='text-white'>Gender</span>
                </TableCell>
                <TableCell>
                  <span className='text-white'>Is Active</span>
                </TableCell>
                <TableCell>
                  <span className='text-white'>Is Verified</span>
                </TableCell>
                <TableCell>
                  <span className='text-white'>Actions</span>
                </TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {currentUsers.length === 0 && (
                <TableRow>
                  <TableCell colSpan={6}>No users found</TableCell>
                </TableRow>
              )}
              {currentUsers.map((user, index) => (
                <TableRow key={index}>
                  <TableCell>{user.name}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{user.gender}</TableCell>
                  <TableCell>{user.isActive.toString()}</TableCell>
                  <TableCell>{user.isVerified.toString()}</TableCell>
                  <TableCell>
                    <Button onClick={() => handleEditUser(user)}>
                      <FontAwesomeIcon icon={faEdit} className='mr-1' />
                      Edit
                    </Button>
                    <Button onClick={() => handleDeleteUser(user)}>
                      <FontAwesomeIcon icon={faTrash} className='mr-1' />
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
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
          <ConfirmDeleteUserModel
            confirmDeleteUser={confirmDeleteUser}
            setShowDeleteConfirmation={setShowDeleteConfirmation}
          />
        )}
      </div>
      <div className='flex justify-center mt-4'>
        <button
          disabled={currentPage === 1}
          onClick={() => setCurrentPage(currentPage - 1)}
          className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mr-2 ${
            currentPage === 1 ? 'opacity-50 cursor-not-allowed' : ''
          }`}
        >
          Previous
        </button>
        <button
          disabled={indexOfLastUser >= users.length}
          onClick={() => setCurrentPage(currentPage + 1)}
          className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 ${
            indexOfLastUser >= users.length
              ? 'opacity-50 cursor-not-allowed'
              : ''
          }`}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default AllUsersTable;
