import React, { useState } from 'react';

const OTPVerification = ({ showModal, onClose, handleVerifyOTP, data }) => {
  const [otp, setOTP] = useState('');

  const handleVerify = () => {
    handleVerifyOTP(otp, data);
    setOTP('');
  };

  return (
    <div
      className={`fixed top-0 left-0 w-full h-full flex items-center justify-center ${
        showModal ? '' : 'hidden'
      }`}
    >
      <div
        className='absolute w-full h-full bg-gray-900 opacity-50'
        onClick={onClose}
      ></div>
      <div className='bg-white p-8 rounded-lg shadow-lg z-10'>
        <h2 className='text-lg font-semibold mb-4'>Verify OTP</h2>
        <input
          type='text'
          placeholder='Enter OTP'
          value={otp}
          onChange={(e) => setOTP(e.target.value)}
          maxLength={4}
          className='w-full px-4 py-2 mb-4 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600'
        />
        <div className='flex justify-end'>
          <button
            onClick={handleVerify}
            className='px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700'
          >
            Verify
          </button>
          <button
            onClick={onClose}
            className='px-4 py-2 ml-4 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400'
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default OTPVerification;
