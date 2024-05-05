import React, { useState } from 'react';
import {
  Avatar, Button, TextField, Grid, Box, FormControl, CircularProgress, Snackbar, Alert,
} from '@mui/material';
import { LockOutlined } from '@mui/icons-material';
import Typography from '@mui/material/Typography';
import { Link, useNavigate } from 'react-router-dom';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

function SignUp() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phone, setPhone] = useState('');
  const [dob, setDob] = useState(null);

  const [emailError, setEmailError] = useState('');
  const [phoneError, setPhoneError] = useState('');
  const [registerError, serRegisterError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleCloseAlert = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    serRegisterError('');
  };

  const serverUrl = import.meta.env.VITE_API_URL;
  const signUpEndpoint = `${serverUrl}/auth/sign-up`;
  const navigate = useNavigate();

  const handleSignUp = (event) => {
    event.preventDefault();
    setEmailError('');
    setPhoneError('');
    serRegisterError('');

    // Check for valid email and phone number
    let formatError = false;

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setEmailError('Please enter a valid email address.');
      formatError = true;
    }

    if (phone.length !== 0 && phone.length !== 10) {
      setPhoneError('Please enter a 10-digit phone number.');
      formatError = true;
    }

    if (formatError) {
      return;
    }

    // Send POST request to server
    const form = new FormData(event.currentTarget);
    const register = async () => {
      setLoading(true);
      try {
        const requestOptions = {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            email: form.get('email'),
            password: form.get('password'),
            username: form.get('username'),
            first_name: form.get('firstName'),
            last_name: form.get('lastName'),
            dob: new Date(dob).toISOString().slice(0, 10),
            phone_num: form.get('phone'),
          }),
        };
        const response = await fetch(signUpEndpoint, requestOptions);
        if (!response.ok) {
          throw response;
        }
        navigate('/login', { state: { registerSuccess: 'Account created successfully! Please login!' } });
      } catch (errorResponse) {
        errorResponse.json().then((error) => {
          serRegisterError(error.ErrorCode);
        });
      } finally {
        setLoading(false);
      }
    };
    register();
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        width: '35%',
        margin: 'auto',
        marginTop: '2rem',
      }}
    >
      <Snackbar
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        open={registerError !== ''}
        onClose={handleCloseAlert}
        autoHideDuration={5000}
      >
        <Alert severity="error" onClose={handleCloseAlert}>
          {registerError}
        </Alert>
      </Snackbar>
      <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
        <LockOutlined />
      </Avatar>
      <Typography component="h1" variant="h5">
        Sign up
      </Typography>

      <FormControl>
        <Box component="form" onSubmit={handleSignUp} sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="given-name"
                name="firstName"
                required
                fullWidth
                id="firstName"
                label="First Name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                autoFocus
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                id="lastName"
                label="Last Name"
                name="lastName"
                autoComplete="family-name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                error={emailError !== ''}
                helperText={emailError}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                id="phone"
                label="Phone Number"
                name="phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                error={phoneError !== ''}
                helperText={phoneError}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  label="D.O.B"
                  name="dob"
                  format="YYYY-MM-DD"
                  value={dob}
                  onChange={(newValue) => {
                    setDob(newValue);
                  }}
                />
              </LocalizationProvider>
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="username"
                label="Username"
                name="username"
                autoComplete="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                name="password"
                label="Password"
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Grid>
          </Grid>
          <Box>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              disabled={loading}
            >
              {loading ? <CircularProgress sx={{ color: 'inherit' }} size={32} /> : 'Sign Up'}
            </Button>
          </Box>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link to="/login">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </Box>
      </FormControl>
    </Box>

  );
}

export default SignUp;
