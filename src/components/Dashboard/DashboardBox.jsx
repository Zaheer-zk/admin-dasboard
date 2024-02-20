import React from 'react';

const DashboardBox = ({ title, value }) => {
  return (
    <div className='bg-white rounded-lg shadow-lg p-6 m-4 flex items-center justify-center flex-col'>
      <h3 className='text-lg font-semibold mb-2'>{title}</h3>
      <span className='text-3xl font-bold'>{value}</span>
    </div>
  );
};

export default DashboardBox;
