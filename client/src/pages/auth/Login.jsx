import React, { useEffect, useState } from 'react';
import {
  Box, TextField, FormControlLabel, Checkbox, Button, Typography, Avatar, Snackbar, Alert,
} from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { isLoggedIn } from '../../utils/auth';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [credentialsError, setCredentialsError] = useState('');

  const serverUrl = import.meta.env.VITE_API_URL;
  const loginEndpoint = `${serverUrl}/auth/login`;

  const navigate = useNavigate();
  const location = useLocation();
  const [message, setMessage] = useState(location.state?.registerSuccess || null);

  useEffect(() => {
    if (isLoggedIn()) {
      navigate('/');
    }
  }, []);
  useEffect(() => {
    if (message) {
      // Navigate to the current path without the state
      navigate(location.pathname, { replace: true });
    }
  }, [message, navigate, location.pathname]);

  const handleCloseAlert = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setMessage(null);
    setCredentialsError('');
  };

  const handleLogin = (event) => {
    event.preventDefault();

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setEmailError('Please enter a valid email address.');
      return;
    }

    const login = async () => {
      try {
        const requestOptions = {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, password }),
        };

        const response = await fetch(loginEndpoint, requestOptions);

        if (!response.ok) {
          throw response;
        }
        const data = await response.json();
        localStorage.setItem('token', data.token);
        localStorage.setItem('username', data.username);
        localStorage.setItem('userId', data.id);
        if (data.is_admin) {
          localStorage.setItem('userRole', 'ADMIN');
        } else {
          localStorage.setItem('userRole', 'USER');
        }
        localStorage.setItem('isAdmin', data.is_admin);
        navigate('/');
      } catch (errorResponse) {
        errorResponse.json().then((error) => {
          setCredentialsError(error.ErrorCode);
        });
      }
    };
    login();
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width: '35%',
        margin: 'auto',
        marginTop: '2rem',
      }}
    >
      <Snackbar
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        open={message !== null}
        onClose={handleCloseAlert}
        autoHideDuration={5000}
      >
        {message !== null && (
          <Alert severity="success" onClose={handleCloseAlert}>
            {message}
          </Alert>
        )}
      </Snackbar>

      <Snackbar
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        open={credentialsError !== ''}
        onClose={() => setEmailError('')}
        autoHideDuration={5000}
      >
        <Alert severity="error" onClose={handleCloseAlert}>
          {credentialsError}
        </Alert>
      </Snackbar>

      <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
        <LockOutlinedIcon />
      </Avatar>
      <Typography component="h1" variant="h5">
        Login
      </Typography>
      <Box component="form" onSubmit={handleLogin} sx={{ mt: 1 }}>
        <TextField
          margin="normal"
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
          autoFocus
        />
        <TextField
          margin="normal"
          required
          fullWidth
          name="password"
          label="Password"
          type="password"
          id="password"
          autoComplete="current-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <FormControlLabel
          control={<Checkbox value="remember" color="primary" />}
          label="Remember me"
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
        >
          Sign In
        </Button>
        <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
          <Link to="/signup">
            Don&apos;t have an account? Sign Up
          </Link>
        </Box>
      </Box>
    </Box>
  );
}

export default Login;
