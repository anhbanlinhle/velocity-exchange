import React from 'react';
import {
  Dialog, DialogTitle, DialogContent, Typography, CardMedia, Box,
} from '@mui/material';
import PropTypes from 'prop-types';

function CustomModal({
  open, onClose, name, image, description,
}) {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      scroll="paper"
    >
      <DialogTitle>{name}</DialogTitle>
      <DialogContent dividers>
        <CardMedia
          component="img"
          height="140"
          image={image}
          alt={name}
        />
        <Typography variant="body2" color="text.secondary">
          {Object.entries(description).map(([key, value]) => (
            <React.Fragment key={key}>
              <Box component="span" fontWeight="fontWeightBold">
                {key}
                :
              </Box>
              {' '}
              {value}
              <br />
            </React.Fragment>
          ))}
        </Typography>
      </DialogContent>
    </Dialog>
  );
}

CustomModal.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  description: PropTypes.shape({}).isRequired,
};

export default CustomModal;
