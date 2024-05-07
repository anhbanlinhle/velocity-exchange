import React, { useEffect, useState } from 'react';
import { Typography } from '@mui/material';
import PropTypes from 'prop-types';

function CountdownTimer({ endTime, handleEnded = () => {} }) {
  const [timeRemaining, setTimeRemaining] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      const remainingTime = new Date(endTime).getTime() - new Date().getTime();
      if (remainingTime <= 0) {
        clearInterval(interval);
        setTimeRemaining(0);
        handleEnded(); // Call handleEnded when timeRemaining turns to 0
      } else {
        setTimeRemaining(remainingTime);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [endTime, handleEnded]);

  const formatTime = (time) => {
    const seconds = Math.floor(time / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    let formattedTime = '';
    if (days > 0) formattedTime += `${days}d `;
    if (hours % 24 > 0) formattedTime += `${hours % 24}h `;
    if (minutes % 60 > 0) formattedTime += `${minutes % 60}m `;
    formattedTime += `${seconds % 60}s`;

    return formattedTime;
  };

  return (
    <Typography variant="h6" display="block">
      {formatTime(timeRemaining)}
    </Typography>
  );
}

CountdownTimer.propTypes = {
  endTime: PropTypes.string.isRequired,
  handleEnded: PropTypes.func,
};

CountdownTimer.defaultProps = {
  handleEnded: () => {},
};

export default CountdownTimer;
