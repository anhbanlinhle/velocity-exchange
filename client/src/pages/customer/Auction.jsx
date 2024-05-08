/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  Grid, Box, Typography, Card,
  CardMedia,
  CardContent,
  TextField,
  InputAdornment,
  Button,
} from '@mui/material';
import IconButton from '@mui/material/IconButton';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import CountdownTimer from '../../component/CountdownTimer';
import PageTitle from '../../component/PageTitle';
import formatCurrency from '../../utils/currencyFormat';
import ResultDialog from '../../component/ResultDialog';

function Auction() {
  const { id } = useParams();
  const userId = localStorage.getItem('userId');
  const [auctionDetail, setAuctionDetail] = useState({});
  const [currentPrice, setCurrentPrice] = useState(0);
  const [bid, setBid] = useState(0);
  const [isWinner, setIsWinner] = useState(false);
  const [openResult, setOpenResult] = useState(false);
  const serverUrl = import.meta.env.VITE_API_URL;
  const auctionDetailEndpoint = `${serverUrl}/auction/detail/`;
  const placeBidEndpoint = `${serverUrl}/auction/bid`;
  const winnerBidEndpoint = `${serverUrl}/auction/winner`;
  const currentPriceEndpoint = `${serverUrl}/auction/price/`;

  const fetchAuctionDetails = async () => {
    try {
      const requestOptions = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ auctionId: id }),
      };

      const response = await fetch(auctionDetailEndpoint, requestOptions);
      if (!response.ok) {
        throw response;
      }
      const data = await response.json();
      setAuctionDetail(data[0]);
    } catch (error) {
      console.log(error.ErrorCode);
    }
  };

  const getCurrentPrice = async () => {
    try {
      const requestOptions = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ auctionId: id }),
      };

      const response = await fetch(currentPriceEndpoint, requestOptions);
      if (!response.ok) {
        throw response;
      }
      const data = await response.json();
      setCurrentPrice(data.data.currentPrice);
    } catch (error) {
      console.log(error.ErrorCode);
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      getCurrentPrice();
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     fetchAuctionDetails();
  //   }, 3000);
  //   return () => clearInterval(interval);
  // }, []);

  useEffect(() => {
    fetchAuctionDetails();
    getCurrentPrice();
  }, []);
  const bidStep = auctionDetail.bid_step;

  // useEffect(() => {
  //   setCurrentPrice(auctionDetail.highest_bid);
  // }, [auctionDetail]);

  const description = {
    'Initial Price': formatCurrency(auctionDetail.initial_price),
    Class: auctionDetail.class,
    Doors: auctionDetail.door,
    Seats: auctionDetail.seat,
    Layout: auctionDetail.layout,
    Transmission: auctionDetail.transmission,
    Fuel: auctionDetail.fuel,
  };

  const handleBid = async () => {
    try {
      const requestOptions = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ auctionId: id, price: bid, userId }),
      };

      const response = await fetch(placeBidEndpoint, requestOptions);
      if (!response.ok) {
        throw response;
      }
      const data = await response.json();
      if (data.success) {
        fetchAuctionDetails();
      } else {
        console.log(data.message);
      }
    } catch (error) {
      console.log(error.ErrorCode);
    }
  };

  const updateWinning = async () => {
    try {
      const requestOptions = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ auctionId: id, userId }),
      };

      const response = await fetch(winnerBidEndpoint, requestOptions);
      if (!response.ok) {
        throw response;
      }
      const data = await response.json();
      setIsWinner(data.isWinner);
      console.log(data);
    } catch (error) {
      console.log(error.ErrorCode);
    }
  };

  const handleEndAuction = () => {
    updateWinning();
    setOpenResult(true);
  };

  return (
    <>
      <PageTitle title="Auction Room" />
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          width: { lg: '80%', md: '100%' },
          margin: 'auto',
          marginTop: '2rem',
        }}
      >
        <Grid container spacing={5} sx={{ gridAutoRows: '1 fr' }}>
          <Grid item xs={12} sm={6}>
            {/* Auction info */}
            <Card sx={{
              width: '100%',
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 8px 40px -12px #033090',
              borderRadius: '0.5rem',
              '&:hover': {
                boxShadow: '0 16px 70px -12.125px #033090',
                cursor: 'pointer',
              },
            }}
            >
              <CardMedia
                component="img"
                height="140"
                image={auctionDetail.image}
                alt={auctionDetail.name}
              />
              <CardContent>
                <Typography variant="h6" component="div" sx={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                  {auctionDetail.name}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
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
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Card sx={{
              width: '100%',
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              alignContent: 'center',
              justifyContent: 'space-around',
              boxShadow: '0 8px 40px -12px #033090',
              borderRadius: '0.5rem',
              '&:hover': {
                cursor: 'pointer',
                boxShadow: '0 16px 70px -12.125px #033090',
              },
            }}
            >
              <Box sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
              >
                <Typography variant="h5" display="block">
                  Time remaining:
                </Typography>
                <CountdownTimer endTime={auctionDetail.date_expired} handleEnded={handleEndAuction} />
              </Box>
              <Box sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
              >
                <Typography variant="h5" display="block">
                  Current Price:
                </Typography>
                <Typography variant="h6" display="block">
                  {formatCurrency(currentPrice)}
                </Typography>
              </Box>
            </Card>
          </Grid>
          <Grid item xs={12}>
            <Box sx={{
              width: '100%',
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
            }}
            >
              <Typography variant="body1">
                <b>Bid step :</b>
                {' '}
                {formatCurrency(auctionDetail.bid_step)}
              </Typography>
              <Typography variant="body1">
                Bid:
              </Typography>
              <TextField
                autoFocus
                id="bid"
                label="Bid"
                variant="outlined"
                sx={{ width: '50%' }}
                type="number"
                InputProps={{
                  inputProps: { min: auctionDetail.highest_bid },
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        size="small"
                        onClick={() => setBid(Math.max(bid - bidStep, currentPrice))}
                      >
                        <RemoveIcon />
                      </IconButton>
                      <IconButton
                        size="small"
                        onClick={() => setBid(Math.max(currentPrice + bidStep, bid + bidStep))}
                      >
                        <AddIcon />
                      </IconButton>
                      VND
                    </InputAdornment>
                  ),
                }}
                value={bid}
                onChange={(e) => setBid(Number(e.target.value))}
              />
              <Button
                variant="contained"
                color="primary"
                sx={{ marginTop: '1rem', width: '50%' }}
                onClick={() => handleBid()}
              >
                Bid
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Box>
      <ResultDialog open={openResult} isWinner={isWinner} winningBid={currentPrice} />
    </>
  );
}

export default Auction;
