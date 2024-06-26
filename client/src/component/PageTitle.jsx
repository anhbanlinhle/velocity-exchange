import React from 'react';
import PropTypes from 'prop-types';
import { Typography } from '@mui/material';

function PageTitle({ title }) {
  return (
    <Typography variant="h5" marginY="1rem">
      {title}
    </Typography>
  );
}

PageTitle.propTypes = {
  title: PropTypes.string.isRequired,
};

export default PageTitle;
