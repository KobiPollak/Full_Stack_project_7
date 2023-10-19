import React, { useEffect, useState } from 'react';
import { Typography } from '@mui/material';

const GoodPayment = ({ userId }) => {
  const [showMessage, setShowMessage] = useState(true);

  useEffect(() => {
    const redirectTimer = setTimeout(() => {
      setShowMessage(false);
      // Navigate to the new URL after 2000 milliseconds (2 seconds)
      // Replace 'yourPath' with your actual destination path.
      window.location.href = `/application/${userId}`;
    }, 2000);

    // Clean up the timer to avoid memory leaks
    return () => clearTimeout(redirectTimer);
  }, [userId]);

  const messageStyle = {
    fontSize: '24px',
    fontWeight: 'bold',
    padding: '16px',
    border: '2px solid #1976d2', // Replace with your desired border color
    borderRadius: '4px',
    backgroundColor: '#bbdefb', // Replace with your desired background color
    color: '#0d47a1', // Replace with your desired text color
    textAlign: 'center',
  };

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
      }}
    >
      {showMessage && (
        <Typography
          variant="body1"
          style={messageStyle}
        >
          התשלום הועבר בהצלחה
        </Typography>
      )}
    </div>
  );
};

export default GoodPayment;