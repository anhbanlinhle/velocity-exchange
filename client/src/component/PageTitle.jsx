import React from 'react';
import PropTypes from 'prop-types';
import { Typography } from '@mui/material';

function PageTitle({ title }) {
  return (
    <Typography variant="h5" marginTop="1.5rem">
      {title}
    </Typography>
  );
}

PageTitle.propTypes = {
  title: PropTypes.string.isRequired,
};

export default PageTitle;
