import React, { useEffect, useState } from 'react';
import {
  Grid, Pagination, Box, TextField, MenuItem,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import PageTitle from '../../component/PageTitle';
import Spinner from '../../component/Spinner';
import CustomCard from '../../component/CustomCard';
import formatCurrency from '../../utils/currencyFormat';
import CustomModal from '../../component/CustomModal';
import { CardType, AuctionFilter } from '../../constant';
import NoDataFound from '../../component/NoDataFound';

function Home() {
  const userId = localStorage.getItem('userId') || 0;
  const navigate = useNavigate();
  const serverUrl = import.meta.env.VITE_API_URL;
  const auctionListEndpoint = `${serverUrl}/home`;
  const filteredAuctionListEndpoint = `${serverUrl}/auction/filter`;
  const auctionDetailEndpoint = `${serverUrl}/auction/detail/`;
  const registerEndpoint = `${serverUrl}/auction/regist`;
  const unregisterEndpoint = `${serverUrl}/auction/unregist`;
  const [auctionList, setAuctionList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const itemsPerPage = 8;
  const [filter, setFilter] = useState(AuctionFilter.ALL);

  const [openDetail, setOpenDetail] = useState(false);
  const [auctionDetails, setAuctionDetails] = useState({});

  const handleDetailClick = (auctionId) => {
    const fetchAuctionDetails = async () => {
      try {
        const requestOptions = {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ auctionId }),
        };

        const response = await fetch(auctionDetailEndpoint, requestOptions);
        if (!response.ok) {
          throw response;
        }
        const data = await response.json();
        setAuctionDetails(data[0]);
      } catch (error) {
        console.log(error.ErrorCode);
      }
    };
    fetchAuctionDetails();
    setOpenDetail(true);
  };

  const handleCloseDetail = () => {
    setAuctionDetails({});
    setOpenDetail(false);
  };

  const fetchAuctionList = async () => {
    if (filter === AuctionFilter.ALL) {
      try {
        const requestOptions = {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ userId, pageSize: itemsPerPage, pageNo: page }),
        };

        const response = await fetch(auctionListEndpoint, requestOptions);
        if (!response.ok) {
          throw response;
        }
        const data = await response.json();
        setAuctionList(data.data);
        setTotalPages(data.pages);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    } else {
      try {
        const requestOptions = {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            userId, pageSize: itemsPerPage, pageNo: page, filter,
          }),
        };
        const response = await fetch(filteredAuctionListEndpoint, requestOptions);
        if (!response.ok) {
          throw response;
        }
        const data = await response.json();
        setAuctionList(data.data);
        setTotalPages(data.pages);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    }
  };

  useEffect(() => {
    setIsLoading(true);
    fetchAuctionList();
  }, [page, filter]);

  // TODO: Stop polling if not at Home page
  // useEffect(() => {
  //   setInterval(() => {
  //     fetchAuctionList();
  //   }, 5000);
  // }, []);

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  const handleRegistClick = (auctionId, isRegistered) => {
    if (userId === 0) {
      navigate('/login');
    }
    if (!isRegistered) {
      const registAuction = async () => {
        try {
          const requestOptions = {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ userId, auctionId }),
          };

          const response = await fetch(registerEndpoint, requestOptions);
          if (!response.ok) {
            throw response;
          }
          fetchAuctionList();
        } catch (error) {
          console.log(error);
        }
      };
      registAuction();
    } else {
      const unregistAuction = async () => {
        try {
          const requestOptions = {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ userId, auctionId }),
          };

          const response = await fetch(unregisterEndpoint, requestOptions);
          if (!response.ok) {
            throw response;
          }
          fetchAuctionList();
        } catch (error) {
          console.log(error);
        }
      };
      unregistAuction();
    }
  };

  const handleJoinClick = (auctionId) => {
    navigate(`/auction/room/${auctionId}`);
  };

  return (
    <>
      <Spinner isLoading={isLoading} />

      {/* Title and filter options */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', marginTop: '1rem' }}>
        <PageTitle title={`${filter.charAt(0) + filter.slice(1).toLowerCase()} Auction`} />
        {userId !== 0 && (
          <TextField
            id="filter"
            label="Filter"
            variant="outlined"
            size="small"
            sx={{ minWidth: '14ch' }}
            value={filter}
            onChange={(e) => { setPage(1); setFilter(e.target.value); }}
            select
          >
            {Object.values(AuctionFilter).map((filterOption) => (
              <MenuItem key={filterOption} value={filterOption}>
                {filterOption.charAt(0).toUpperCase() + filterOption.slice(1).toLowerCase()}
              </MenuItem>
            ))}
          </TextField>
        )}

      </Box>
      {auctionList.length === 0 && !isLoading ? (
        <NoDataFound />
      ) : (
        <>
          <Grid container spacing={{ xs: 2, md: 4 }}>
            {auctionList.map((auction) => (
              <Grid item xs={12} sm={6} md={3} key={auction.id} style={{ display: 'flex' }}>
                <CustomCard
                  name={auction.name}
                  image={auction.image}
                  description={{
                    'Start Date': auction.date_started,
                    'End Date': auction.date_expired,
                    'Bid Step': formatCurrency(auction.bid_step),
                    'Initial Price': formatCurrency(auction.initial_price),
                    'Current Price': formatCurrency(auction['max(b.price)']),
                  }}
                  type={CardType.AUCTION}
                  auctionStatus={auction.status}
                  handleDetailClick={() => handleDetailClick(auction.id)}
                  registered={auction.isRegist || filter === AuctionFilter.REGISTERED}
                  handleRegisterClick={() => handleRegistClick(auction.id, auction.isRegist || filter === AuctionFilter.REGISTERED)}
                  handleJoinClick={() => handleJoinClick(auction.id)}
                />
              </Grid>
            ))}
          </Grid>
          <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: '2rem' }}>
            <Pagination count={totalPages} page={page} onChange={handlePageChange} />
          </Box>

          {/* Details modal */}
          <CustomModal
            open={openDetail}
            onClose={handleCloseDetail}
            name={auctionDetails.name}
            image={auctionDetails.image}
            description={{
              'Start Date': auctionDetails.date_started,
              'End Date': auctionDetails.date_expired,
              'Bid Step': formatCurrency(auctionDetails.bid_step),
              'Initial Price': formatCurrency(auctionDetails.initial_price),
              'Current Price': formatCurrency(auctionDetails.highest_bid),
              'Current Owner': auctionDetails.current_owner,
              Brand: auctionDetails.brand,
              Model: auctionDetails.model_code,
              Color: auctionDetails.color,
              Class: auctionDetails.class,
              Doors: auctionDetails.door,
              Seats: auctionDetails.seat,
              Layout: auctionDetails.layout,
              Transmission: auctionDetails.transmission,
              'Engine Cylinder': auctionDetails.engine_cylinders,
              'Engine Capacity': auctionDetails.engine_capacity,
              Fuel: auctionDetails.fuel,
              Odometer: auctionDetails.odometer,
            }}
          />
        </>
      )}
    </>
  );
}

export default Home;
