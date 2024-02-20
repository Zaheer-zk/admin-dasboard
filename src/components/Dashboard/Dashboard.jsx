import React, { useEffect, useState } from 'react';
import DashboardService from '../../services/DashboardService';
import DashboardBox from './DashboardBox';
import { Link, Outlet, useLocation } from 'react-router-dom';

const Dashboard = () => {
  const [totalUsers, setTotalUsers] = useState(0);
  const [verifiedUsers, setVerifiedUsers] = useState(0);
  const [newUsers, setNewUsers] = useState(0);
  const [loginActivity, setLoginActivity] = useState(0);
  const location = useLocation();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await DashboardService.fetchDashboardData();
        setTotalUsers(data?.totalUsers);
        setVerifiedUsers(data?.verifiedUsers);
        setNewUsers(data?.newUsers);
        setLoginActivity(data?.loginActivity);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      }
    };

    fetchData();
  }, [location]);

  return (
    <div className='flex h-screen bg-gray-100'>
      {/* Sidebar */}
      <div className='w-1/4 bg-white shadow'>
        <div className='px-4 py-6'>
          <h2 className='text-3xl font-semibold text-gray-700'>
            Admin Dashboard
          </h2>
          <nav className='mt-6'>
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
          </nav>
        </div>
      </div>
      {/* Content Area */}

      {location.pathname === '/' && (
        <div className='w-3/4 p-4'>
          <div className='flex flex-wrap justify-center mt-8'>
            <DashboardBox title='Total Users' value={totalUsers} />
            <DashboardBox title='Verified Users' value={verifiedUsers} />
            <DashboardBox title='New Users (10 days)' value={newUsers} />
            <DashboardBox title='Login Activity Today' value={loginActivity} />
          </div>
        </div>
      )}
      {location.pathname !== '/' && (
        <div className='w-3/4 p-4'>
          <Outlet />
        </div>
      )}
    </div>
  );
};

export default Dashboard;
