import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  Avatar, Box, FormControl, Grid, TextField, Typography, InputAdornment, Button, CircularProgress, Snackbar, Alert,
} from '@mui/material';
import { AddCircle } from '@mui/icons-material';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import dayjs from 'dayjs';

function CreateAuction() {
  const { carId } = useParams();
  const accountId = localStorage.getItem('userId');
  const deposit = 1000000;
  const serverUrl = import.meta.env.VITE_API_URL;
  const carDetailEndpoint = `${serverUrl}/car/detail`;
  const createAuctionEndpoint = `${serverUrl}/auction/create`;
  const [auctionName, setAuctionName] = useState('');
  const [startTime, setStartTime] = useState(dayjs().add(1, 'minute'));
  const [endTime, setEndTime] = useState(startTime.add(5, 'minute'));
  const [bidStep, setBidStep] = useState(1);
  const [initialPrice, setInitialPrice] = useState(1);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [success, setSuccess] = useState(false);

  const handleCloseAlert = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setErrorMessage('');
  };

  const fetchCarName = async () => {
    try {
      const response = await fetch(carDetailEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ carId }),
      });
      if (!response.ok) {
        throw response;
      }
      const data = await response.json();
      setAuctionName(data.data.model_code);
    } catch (error) {
      console.error(error.ErrorCode);
    }
  };

  useEffect(() => {
    fetchCarName();
  }, []);

  useEffect(() => {
    setEndTime(startTime.add(5, 'minute'));
  }, [startTime]);

  const handleRegister = (event) => {
    event.preventDefault();
    setLoading(true);
    setSuccess(false);
    const createAuction = async () => {
      try {
        const requestOptions = {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            accountId,
            carId,
            name: auctionName,
            startTime: startTime.format('YYYY-MM-DD HH:mm:ss'),
            endTime: endTime.format('YYYY-MM-DD HH:mm:ss'),
            initialPrice,
            bidStep,
            deposit,
          }),
        };
        const response = await fetch(createAuctionEndpoint, requestOptions);
        if (!response.ok) {
          throw response;
        }
        setSuccess(true);
      } catch (error) {
        setErrorMessage(error.ErrorCode);
      } finally {
        setLoading(false);
      }
    };
    createAuction();
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        width: '60%',
        margin: 'auto',
        marginTop: '2rem',
      }}
    >
      <Snackbar
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        open={success}
        onClose={() => setSuccess(false)}
        autoHideDuration={5000}
      >
        <Alert severity="success" onClose={() => setSuccess(false)}>
          Create auction successfully!
        </Alert>
      </Snackbar>
      <Snackbar
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        open={errorMessage !== ''}
        onClose={errorMessage}
        autoHideDuration={5000}
      >
        <Alert severity="error" onClose={handleCloseAlert}>
          {errorMessage}
        </Alert>
      </Snackbar>
      <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
        <AddCircle />
      </Avatar>
      <Typography component="h1" variant="h5">
        Create Auction
      </Typography>

      <FormControl fullWidth>
        <Box component="form" onSubmit={handleRegister} sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                autoComplete="name"
                name="auctionName"
                required
                fullWidth
                id="auctionName"
                label="Auction Name"
                value={auctionName}
                onChange={(e) => setAuctionName(e.target.value)}
                autoFocus
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DateTimePicker
                  label="Start Time"
                  value={startTime}
                  disablePast
                  onChange={(newValue) => {
                    setStartTime(newValue);
                  }}
                  renderInput={(params) => <TextField {...params} />}
                  sx={{ width: '100%', margin: '0' }}
                />
              </LocalizationProvider>
            </Grid>
            <Grid item xs={12} sm={6}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DateTimePicker
                  label="End Time"
                  value={endTime}
                  disablePast
                  onChange={(newValue) => {
                    setEndTime(newValue);
                  }}
                  renderInput={(params) => <TextField {...params} />}
                  sx={{ width: '100%', margin: '0' }}
                />
              </LocalizationProvider>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                name="initialPrice"
                required
                fullWidth
                id="initialPrice"
                label="Initial Price"
                type="number"
                InputProps={{
                  inputProps: { min: 1 },
                  endAdornment: <InputAdornment position="end">VND</InputAdornment>,
                }}
                value={initialPrice}
                onChange={(e) => setInitialPrice(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                name="bidStep"
                required
                fullWidth
                id="bidStep"
                label="Bid Step"
                type="number"
                InputProps={{
                  inputProps: { min: 1 },
                  endAdornment: <InputAdornment position="end">VND</InputAdornment>,
                }}
                value={bidStep}
                onChange={(e) => setBidStep(e.target.value)}
              />
            </Grid>
          </Grid>
          <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: '1rem' }}>
            <Button
              type="submit"
              color="secondary"
              variant="contained"
              sx={{ mt: 3, mb: 2, width: '16ch' }}
              disabled={loading}
            >
              {loading ? <CircularProgress sx={{ color: 'inherit' }} size={32} /> : 'Create Auction'}
            </Button>
          </Box>
        </Box>
      </FormControl>
    </Box>
  );
}

export default CreateAuction;
