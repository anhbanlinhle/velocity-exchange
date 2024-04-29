import React from 'react';
import { Button } from '@mui/material';
import PropTypes from 'prop-types';

function CustomButton({ children }) {
  return (
    <Button variant="contained" color="secondary" sx={{ paddingY: '0.5rem', paddingX: '1rem', margin: '1rem' }}>
      {children}
    </Button>
  );
}

export default CustomButton;

CustomButton.propTypes = {
  children: PropTypes.string.isRequired,
};
