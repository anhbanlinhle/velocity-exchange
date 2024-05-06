import React from 'react';
import {
  Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography, Box,
} from '@mui/material';
import PropTypes from 'prop-types';
import formatCurrency from '../utils/currencyFormat';
import paymentInfo from '../assets/payment_info.jpg';

function PaymentDialog({ open, handleClose }) {
  return (
    <Dialog open={open}>
      <DialogTitle>Pay Deposit</DialogTitle>
      <DialogContent dividers>
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <img src={paymentInfo} alt="Payment Info" style={{ width: '70%', height: 'auto' }} />
          <Typography variant="body1">
            <b>Deposit money:</b>
            {' '}
            {formatCurrency(1000000)}
            .
            {' '}
            <br />
            Please transfer the deposit to the above account to finnish the registration process!
          </Typography>
          <Typography variant="body1" />
        </Box>
      </DialogContent>
      <DialogActions>
        <Button variant="contained" color="success" onClick={handleClose}>
          I have paid
        </Button>

      </DialogActions>
    </Dialog>
  );
}

PaymentDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
};

export default PaymentDialog;
