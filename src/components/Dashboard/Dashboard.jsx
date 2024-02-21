import React, { useEffect, useState } from 'react';
import DashboardService from '../../services/DashboardService';
import DashboardBox from './DashboardBox';
import { Link, Outlet, useLocation } from 'react-router-dom';
import Chart from 'chart.js/auto';

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

        const labels = [
          'January',
          'February',
          'March',
          'April',
          'May',
          'June',
          'July',
        ];
        const dataGraph = [65, 59, 80, 81, 56, 55, 40];

        createChart('totalUsersChart', 'Total Users', labels, dataGraph);
        createChart('verifiedUsersChart', 'Verified Users', labels, dataGraph);
        createChart('newUsersChart', 'New Users', labels, dataGraph);
        createChart('loginActivityChart', 'Login Activity', labels, dataGraph);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
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
    </div>
  );
};

export default Dashboard;
