import React, { useState, useEffect } from 'react';

const ErrorMessage = ({ message }) => {
  const [isVisible, setIsVisible] = useState(true);
  const [progress, setProgress] = useState(100);

  useEffect(() => {
    const interval = setInterval(() => {
      if (progress > 0) {
        setProgress((prevProgress) => prevProgress - 10);
      } else {
        setIsVisible(false);
        clearInterval(interval);
      }
    }, 100);

    return () => clearInterval(interval);
  }, [progress]);

  const handleChangeVisibility = () => {
    setIsVisible(false);
  };

  return (
    <>
      {isVisible && (
        <div
          className='bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative'
          role='alert'
          style={{
            position: 'fixed',
            top: '20px',
            right: '20px',
            zIndex: 9999,
          }}
        >
          <strong className='font-bold'>Error! </strong>
          <span className='block sm:inline'> {message}</span>
          <div className='bg-red-200 h-1 mt-2'>
            <div
              className='bg-red-500 h-full'
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          <button
            onClick={handleChangeVisibility}
            className='text-red-700 mt-2 focus:outline-none'
          >
            &#10006;
          </button>
        </div>
      )}
    </>
  );
};

export default ErrorMessage;
