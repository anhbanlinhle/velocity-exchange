import React, { useState } from 'react';
import {
  Button, TextField, Grid, Box, FormControl, Snackbar, Alert, Autocomplete, Typography, MenuItem,
  InputAdornment, CircularProgress,
} from '@mui/material';
import {
  brandOptions, modelOptions, colorOptions, doorOptions, seatOptions, cylinderOptions, classOptions, fuelOptions, transmissionOptions, layoutOptions, locationOptions,
} from '../../constant';
import PaymentDialog from '../../component/PaymentDialog';

function CarRegister() {
  const [currentOwner, setCurrentOwner] = useState('');
  const [brand, setBrand] = useState(brandOptions[0]);
  const [model, setModel] = useState(null);
  const [color, setColor] = useState(colorOptions[17]);
  const [door, setDoor] = useState(doorOptions[2]);
  const [seat, setSeat] = useState(seatOptions[4]);
  const [cylinder, setCylinder] = useState(cylinderOptions[1]);
  const [carClass, setCarClass] = useState(classOptions[0]);
  const [fuel, setFuel] = useState(fuelOptions[1]);
  const [transmission, setTransmission] = useState(transmissionOptions[0]);
  const [layout, setLayout] = useState(layoutOptions[0]);
  const [engineCapacity, setEngineCapacity] = useState('');
  const [odometer, setOdometer] = useState('');
  const [location, setLocation] = useState(locationOptions[0]);
  const [image, setImage] = useState(null);
  const [imageName, setImageName] = useState(null);

  const [registerSuccess, setRegisterSuccess] = useState(false);
  const [registerError, setRegisterError] = useState('');
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const handleClosePaymentDialog = () => {
    setRegisterSuccess(true);
    setOpen(false);
  };
  const handleImageChange = (e) => {
    if (e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = async () => {
        const result = await reader.result.split(',')[1];
        const { name } = e.target.files[0];
        setImage(result);
        setImageName(name);
      };
      reader.readAsDataURL(e.target.files[0]);
    }
    console.log(image, imageName);
  };

  const handleCloseAlert = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setRegisterError('');
  };

  const userId = localStorage.getItem('userId');
  const serverUrl = import.meta.env.VITE_API_URL;
  const registerEndpoint = `${serverUrl}/car/regist`;
  // const navigate = useNavigate();

  const handleRegister = (event) => {
    event.preventDefault();
    setRegisterError('');

    // Send POST request to server

    const register = async () => {
      setLoading(true);
      try {
        const requestOptions = {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            userId,
            currentOwner,
            brand,
            model,
            color,
            class: carClass,
            door,
            seat,
            layout,
            transmission,
            cylinder,
            capacity: engineCapacity,
            image,
            location,
            status: 'available',
            fuel,
            odometer,
          }),
        };
        const response = await fetch(registerEndpoint, requestOptions);
        if (!response.ok) {
          throw response;
        }
        setOpen(true);
      } catch (errorResponse) {
        errorResponse.json().then((error) => {
          setRegisterError(error.ErrorCode);
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
        width: '50%',
        margin: 'auto',
        marginTop: '2rem',
      }}
    >
      <Snackbar
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        open={registerSuccess}
        onClose={() => setRegisterSuccess(false)}
        autoHideDuration={5000}
      >
        <Alert severity="success" onClose={() => setRegisterSuccess(false)}>
          Car registered successfully!
        </Alert>
      </Snackbar>
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
      <Typography component="h1" variant="h5">
        Car Register
      </Typography>

      <FormControl fullWidth>
        <Box component="form" onSubmit={handleRegister} sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                id="currentOwner"
                label="Current Owner"
                name="currentOwner"
                value={currentOwner}
                onChange={(event) => setCurrentOwner(event.target.value)}
                required
                autoFocus
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Autocomplete
                id="brand"
                options={brandOptions}
                value={brand}
                onChange={(event, newValue) => {
                  setBrand(newValue);
                  setModel('');
                }}
                renderInput={(params) => <TextField {...params} label="Brand" required />}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Autocomplete
                id="model"
                options={modelOptions.filter((option) => option.includes(brand))}
                value={model}
                onChange={(event, newValue) => {
                  setModel(newValue);
                }}
                fullWidth
                renderInput={(params) => <TextField {...params} label="Model" required />}
              />
            </Grid>
            <Grid item xs={12} sm={3}>
              <TextField
                id="class"
                variant="outlined"
                label="Class"
                select
                value={carClass}
                onChange={(event) => {
                  setCarClass(event.target.value);
                }}
                fullWidth
                required
              >
                {classOptions.map((option) => (
                  <MenuItem key={option} value={option}>
                    {option}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={12} sm={3}>
              <Autocomplete
                id="color"
                options={colorOptions}
                value={color}
                onChange={(event, newValue) => {
                  setColor(newValue);
                }}
                fullWidth
                renderInput={(params) => <TextField {...params} label="Color" required />}
              />
            </Grid>
            <Grid item xs={12} sm={3}>
              <TextField
                id="door"
                value={door}
                variant="outlined"
                label="Door"
                select
                onChange={(event) => {
                  setDoor(event.target.value);
                }}
                fullWidth
                required
              >
                {doorOptions.map((option) => (
                  <MenuItem key={option} value={option}>
                    {option}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={12} sm={3}>
              <TextField
                fullWidth
                id="seat"
                label="Seat"
                name="seat"
                select
                value={seat}
                onChange={(e) => setSeat(e.target.value)}
                required
              >
                {seatOptions.map((option) => (
                  <MenuItem key={option} value={option}>
                    {option}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={12} sm={3}>
              <TextField
                id="cylinder"
                value={cylinder}
                variant="outlined"
                label="Cylinder"
                select
                onChange={(event) => {
                  setCylinder(event.target.value);
                }}
                fullWidth
                required
              >
                {cylinderOptions.map((option) => (
                  <MenuItem key={option} value={option}>
                    {option}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={12} sm={3}>
              <TextField
                id="fuel"
                value={fuel}
                variant="outlined"
                label="Fuel"
                select
                onChange={(event) => {
                  setFuel(event.target.value);
                }}
                fullWidth
                required
              >
                {fuelOptions.map((option) => (
                  <MenuItem key={option} value={option}>
                    {option}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={12} sm={3}>
              <TextField
                id="transmission"
                value={transmission}
                variant="outlined"
                label="Transmission"
                select
                onChange={(event) => {
                  setTransmission(event.target.value);
                }}
                fullWidth
                required
              >
                {transmissionOptions.map((option) => (
                  <MenuItem key={option} value={option}>
                    {option}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={12} sm={3}>
              <TextField
                id="layout"
                value={layout}
                variant="outlined"
                label="Layout"
                select
                onChange={(event) => {
                  setLayout(event.target.value);
                }}
                fullWidth
                required
              >
                {layoutOptions.map((option) => (
                  <MenuItem key={option} value={option}>
                    {option}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                id="engineCapacity"
                label="Engine Capacity"
                name="engineCapacity"
                type="number"
                value={engineCapacity}
                onChange={(e) => setEngineCapacity(e.target.value)}
                InputProps={{
                  endAdornment: <InputAdornment position="end">cm3</InputAdornment>,
                }}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                id="odometer"
                label="Odometer"
                name="odometer"
                type="number"
                value={odometer}
                onChange={(e) => setOdometer(e.target.value)}
                InputProps={{
                  endAdornment: <InputAdornment position="end">km</InputAdornment>,
                }}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <Autocomplete
                id="location"
                options={locationOptions}
                value={location}
                onChange={(event, newValue) => {
                  setLocation(newValue);
                }}
                fullWidth
                renderInput={(params) => <TextField {...params} label="Location" required />}
              />
            </Grid>
            <Grid item xs={12} sm={3}>
              <FormControl required>
                <Button variant="contained" component="label" color="secondary">
                  Upload Image
                  <input
                    type="file"
                    accept="image/*"
                    hidden
                    onChange={handleImageChange}
                    required
                  />
                </Button>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={9}>
              <Typography
                variant="body2"
                color="textSecondary"
                sx={{
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  maxWidth: '100 %',
                }}
              >
                {imageName ? `${imageName}` : 'No image uploaded'}
              </Typography>
            </Grid>
          </Grid>
          <Box sx={{ display: 'flex', alignContent: 'center', justifyContent: 'right' }}>
            <Button
              type="submit"
              color="secondary"
              variant="contained"
              sx={{ mt: 3, mb: 2, width: '10ch' }}
              disabled={loading}
            >
              {loading ? <CircularProgress sx={{ color: 'inherit' }} size={32} /> : 'Register'}
            </Button>
          </Box>
        </Box>
      </FormControl>
      <PaymentDialog
        open={open}
        handleClose={handleClosePaymentDialog}
      />
    </Box>
  );
}

export default CarRegister;
