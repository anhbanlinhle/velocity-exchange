import * as React from 'react';
import { Backdrop, CircularProgress } from '@mui/material';
import PropTypes from 'prop-types';

export default function SimpleBackdrop({ isLoading }) {
  return (
    <Backdrop
      sx={{ color: 'primary.main', zIndex: (theme) => theme.zIndex.drawer + 1 }}
      open={isLoading}
    >
      <CircularProgress color="inherit" />
    </Backdrop>
  );
}

SimpleBackdrop.propTypes = {
  isLoading: PropTypes.bool.isRequired,
};
