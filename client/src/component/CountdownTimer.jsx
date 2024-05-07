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
    const days = Math.floor(time / (1000 * 60 * 60 * 24));
    const hours = Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((time % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((time % (1000 * 60)) / 1000);

    let formattedTime = '';
    if (days > 0) formattedTime += `${days}d `;
    if (hours > 0) formattedTime += `${hours}h `;
    if (minutes > 0) formattedTime += `${minutes}m `;
    formattedTime += `${seconds}s`;

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
