import React from 'react';
import { Button } from '@mui/material';
import PropTypes from 'prop-types';

function CustomButton({ children, component, to }) {
  return (
    <Button
      variant="contained"
      color="secondary"
      sx={{ paddingY: '0.5rem', paddingX: '1rem', margin: '1rem' }}
      component={component}
      to={to}
    >
      {children}
    </Button>
  );
}

export default CustomButton;

CustomButton.propTypes = {
  children: PropTypes.string.isRequired,
  component: PropTypes.elementType,
  to: PropTypes.string,
};

CustomButton.defaultProps = {
  component: 'button',
  to: '',
};
