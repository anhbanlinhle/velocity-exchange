import React from 'react';
import {
  Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography, Box,
} from '@mui/material';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import formatCurrency from '../utils/currencyFormat';
import paymentInfo from '../assets/payment_info.jpg';

function ResultDialog({ open, isWinner, winningBid }) {
  return (
    <Dialog open={open}>
      { isWinner ? (
        <>
          <DialogTitle>CONGRATULATION!!!</DialogTitle>
          <DialogContent dividers>
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <img src={paymentInfo} alt="Payment Info" style={{ width: '70%', height: 'auto' }} />
              <Typography variant="body1">
                <b>Winning bid:</b>
                {' '}
                {formatCurrency(winningBid)}
                .
                {' '}
                <br />
                Please pay the winning bid to the above account to finnish!
              </Typography>
              <Typography variant="body1" />
            </Box>
          </DialogContent>
        </>
      ) : (
        <>
          <DialogTitle>YOU HAVE LOST</DialogTitle>
          <DialogContent dividers>
            <Typography variant="body1">
              You have lost the auction. Good luck next time!
            </Typography>
          </DialogContent>
        </>
      )}

      <DialogActions>
        <Button variant="contained" color="success" component={Link} to="/">
          {isWinner ? 'I have paid' : 'Back to Home'}
        </Button>

      </DialogActions>
    </Dialog>

  );
}

ResultDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  isWinner: PropTypes.bool.isRequired,
  winningBid: PropTypes.number.isRequired,
};

export default ResultDialog;
