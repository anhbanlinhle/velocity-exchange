import React, { useEffect, useState } from 'react';
import { Grid, Pagination, Box } from '@mui/material';
import PageTitle from '../../component/PageTitle';
import Spinner from '../../component/Spinner';
import CustomCard from '../../component/CustomCard';
import formatCurrency from '../../utils/currencyFormat';
import CustomModal from '../../component/CustomModal';

function Home() {
  const serverUrl = import.meta.env.VITE_API_URL;
  const auctionListEndpoint = `${serverUrl}/home`;
  console.log(auctionListEndpoint);
  const auctionDetailEndpoint = `${serverUrl}/auction/detail/`;
  const [auctionList, setAuctionList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const itemsPerPage = 8; // Change this to the number of items you want per page

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
    try {
      const requestOptions = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ pageSize: itemsPerPage, pageNo: page }),
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
  };

  useEffect(() => {
    fetchAuctionList();
  }, [page]);

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  return (
    <>
      {/* {console.log(auctionList)} */}
      <Spinner isLoading={isLoading} />
      <PageTitle title="Public Auction" />
      <Box sx={{ display: 'flex', justifyContent: 'center', marginY: '2rem' }}>
        <Pagination count={totalPages} page={page} onChange={handlePageChange} />
      </Box>

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
                'Current Price': formatCurrency(auction.current_price),
              }}
              type="auction"
              handleDetailClick={() => handleDetailClick(auction.id)}
              // TODO: Add registered prop
            />
          </Grid>
        ))}
      </Grid>

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
          'Current Price': formatCurrency(auctionDetails.current_price),
          'Current Owner': auctionDetails.current_owner,
          Brand: auctionDetails.brand,
          Model: auctionDetails.model_code,
          Color: auctionDetails.color,
          Class: auctionDetails.class,
          Doors: auctionDetails.door,
          Seats: auctionDetails.seat,
          Layout: auctionDetails.layout,
          Tranmission: auctionDetails.transmission,
          'Engine Cylinder': auctionDetails.engine_cylinders,
          'Engine Capacity': auctionDetails.engine_capacity,
          Fuel: auctionDetails.fuel,
          Odometer: auctionDetails.odometer,
        }}
      />
    </>
  );
}

export default Home;
