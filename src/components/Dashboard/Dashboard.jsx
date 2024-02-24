import React, { useEffect, useState } from 'react';
import DashboardService from '../../services/DashboardService';
import DashboardBox from './DashboardBox';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import Chart from 'chart.js/auto';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faKey, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import ShowChangePassword from '../User/ShowChangePassword';
import SuccessMessage from '../Common/SuccessMessage';
import ErrorMessage from '../Common/ErrorMessage';
import { API_URL } from './../../Constants/constants';

const Dashboard = () => {
  const [totalUsers, setTotalUsers] = useState(0);
  const [verifiedUsers, setVerifiedUsers] = useState(0);
  const [newUsers, setNewUsers] = useState(0);
  const [loginActivity, setLoginActivity] = useState(0);
  const [users, setUsers] = useState([]);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem('admin_user') ? true : false
  );
  const [adminUser, setAdminUser] = useState(
    JSON.parse(localStorage.getItem('admin_user'))
  );

  const [showChangePassword, setShowChangePassword] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const data = await DashboardService.fetchDashboardData();
  //       setTotalUsers(data?.totalUsers);
  //       setVerifiedUsers(data?.verifiedUsers);
  //       setNewUsers(data?.newUsers);
  //       setLoginActivity(data?.loginActivity);

  //       const labels = [
  //         'January',
  //         'February',
  //         'March',
  //         'April',
  //         'May',
  //         'June',
  //         'July',
  //       ];
  //       const dataGraph = [65, 59, 80, 81, 56, 55, 40];

  //       // createChart('totalUsersChart', 'Total Users', labels, dataGraph);
  //       // createChart('verifiedUsersChart', 'Verified Users', labels, dataGraph);
  //       // createChart('newUsersChart', 'New Users', labels, dataGraph);
  //       // createChart('loginActivityChart', 'Login Activity', labels, dataGraph);
  //     } catch (error) {
  //       console.error('Error fetching dashboard data:', error);
  //     }
  //   };

  //   fetchData();
  // }, [location]);

  useEffect(() => {
    setIsLoggedIn(localStorage.getItem('admin_user') ? true : false);
    setAdminUser(JSON.parse(localStorage.getItem('admin_user')));
  }, []);

  const updatePassword = async (currentPassword, newChangePassword) => {
    setShowChangePassword(false);
    const id = adminUser._id;
    console.log(id);
    try {
      const { data } = await axios.post(`${API_URL}/api/change-password`, {
        id: id,
        currentPassword: currentPassword,
        newChangePassword: newChangePassword,
      });

      if (data) {
        localStorage.setItem('admin_user', JSON.stringify(data));
        setAdminUser(data);
        setSuccessMessage('Password changed successfully');
        setErrorMessage('');
      }
    } catch (error) {
      setSuccessMessage('');
      setErrorMessage(error.response.data.message);
      console.error(
        'Error while changing password: ',
        error.response.data.message
      );
    }
  };

  const handleChangePassword = () => {
    setShowChangePassword(true);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get(`${API_URL}/api/users`);

        console.log('All users data: ', data);
        setUsers(data);

        let verifiedUserCount = data.filter((user) => user.isVerified).length;
        let last10DaysUserCount = data.filter((user) => {
          const todayDate = new Date();
          const userCreatedDate = new Date(user.createdAt);

          const timeDiff = Math.abs(
            todayDate.getTime() - userCreatedDate.getTime()
          );
          const diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));

          return diffDays <= 10;
        }).length;
        let todayCreatedUserCount = data.filter((user) => {
          const todayDate = new Date();
          const userCreatedDate = new Date(user.createdAt);

          return todayDate.toDateString() === userCreatedDate.toDateString();
        }).length;

        setTotalUsers(data.length);
        setVerifiedUsers(verifiedUserCount);
        setNewUsers(last10DaysUserCount);
        setLoginActivity(todayCreatedUserCount);

        const labels = [
          'January',
          'February',
          'March',
          'April',
          'May',
          'June',
          'July',
        ];
        const totalUsersData = [1500, 1800, 2000, 2200, 2500, 2800, 3000];
        createChart('totalUsersChart', 'Total Users', labels, totalUsersData);
        const verifiedUsersData = [50, 10, 15, 60, 50, 60, 45];
        createChart(
          'verifiedUsersChart',
          'Verified Users',
          labels,
          verifiedUsersData
        );
        const newUsersData = [200, 100, 600, 20, 400, 500, 300];
        createChart('newUsersChart', 'New Users', labels, newUsersData);
        const loginActivityData = [200, 180, 220, 210, 240, 230, 250];
        createChart(
          'loginActivityChart',
          'Login Activity',
          labels,
          loginActivityData
        );
      } catch (e) {
        console.log('data fetching error: ', e);
      }
    };

    fetchData();
  }, [location]);

  const createChart = (id, label, labels, data) => {
    const ctx = document.getElementById(id);
    if (ctx) {
      new Chart(ctx, {
        type: 'line',
        data: {
          labels: labels,
          datasets: [
            {
              label: label,
              data: data,
              fill: true,
              borderColor: 'rgb(75, 192, 192)',
              tension: 0.1,
            },
          ],
        },
        options: {
          scales: {
            y: {
              beginAtZero: true,
            },
          },
        },
      });
    }
  };

  return (
    <div className='flex bg-gray-100'>
      {/* Sidebar */}
      <div className='w-1/4 bg-white shadow h-lvh'>
        <div className='px-4 py-6'>
          <h2 className='text-3xl font-semibold text-gray-700'>
            Admin Dashboard
          </h2>
          <nav className='mt-6 flex flex-col justify-between h-full'>
            <div>
              <Link
                to={'/'}
                className='block py-2.5 px-4 rounded transition duration-200 hover:bg-blue-500 hover:text-white'
              >
                Dashboard
              </Link>
              <Link
                to={'/users'}
                className='block py-2.5 px-4 rounded transition duration-200 hover:bg-blue-500 hover:text-white'
              >
                Users
              </Link>
            </div>
            <div className='absolute bottom-6 left-6'>
              <div className='flex justify-between flex-col'>
                <button
                  className='p-3 bg-blue-500 hover:bg-blue-950 rounded-lg hover:text-white w-[12rem] ml-2 shadow-lg'
                  onClick={handleChangePassword}
                >
                  <FontAwesomeIcon icon={faKey} className='mr-2' />
                  Change password
                </button>
                {isLoggedIn && (
                  <button
                    className='p-3 bg-blue-500 hover:bg-blue-950 rounded-lg hover:text-white m-2 w-[12rem] shadow-lg'
                    onClick={() => {
                      localStorage.removeItem('admin_user');
                      navigate('/login');
                    }}
                  >
                    <FontAwesomeIcon icon={faSignOutAlt} className='mr-2' />
                    Log Out
                  </button>
                )}
              </div>
            </div>
          </nav>
        </div>
      </div>
      {/* Content Area */}
      {location.pathname === '/' && (
        <div className='w-3/4 p-4'>
          <div className='grid grid-cols-2 gap-4'>
            <div>
              <DashboardBox title='Total Users' value={totalUsers} />
              <canvas id='totalUsersChart' width='400' height='200'></canvas>
            </div>
            <div>
              <DashboardBox title='Verified Users' value={verifiedUsers} />
              <canvas id='verifiedUsersChart' width='400' height='200'></canvas>
            </div>
            <div>
              <DashboardBox title='New Users (10 days)' value={newUsers} />
              <canvas id='newUsersChart' width='400' height='200'></canvas>
            </div>
            <div>
              <DashboardBox
                title='Login Activity Today'
                value={loginActivity}
              />
              <canvas id='loginActivityChart' width='400' height='200'></canvas>
            </div>
          </div>
        </div>
      )}
      {location.pathname !== '/' && (
        <div className='w-3/4 p-4'>
          <Outlet />
        </div>
      )}
      {showChangePassword && (
        <ShowChangePassword
          updatePassword={updatePassword}
          setShowChangePassword={setShowChangePassword}
        />
      )}

      {successMessage && <SuccessMessage message={successMessage} />}
      {errorMessage && <ErrorMessage message={errorMessage} />}
    </div>
  );
};

export default Dashboard;
