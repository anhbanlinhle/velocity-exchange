import React, { useState, useEffect } from 'react';
import {
  Box, Grid, Pagination, TextField, MenuItem,
} from '@mui/material';
import PageTitle from '../../component/PageTitle';
import Spinner from '../../component/Spinner';
import CustomCard from '../../component/CustomCard';
import { CardType, Status, VerificationRequestFilter } from '../../constant';
import CustomModal from '../../component/CustomModal';
import NoDataFound from '../../component/NoDataFound';

function Verification() {
  const itemsPerPage = 8;
  const adminId = localStorage.getItem('userId');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [verificationList, setVerificationList] = useState([]);
  const [verificationDetails, setVerificationDetails] = useState({});
  const [openDetail, setOpenDetail] = useState(false);
  const [filter, setFilter] = useState(VerificationRequestFilter.PENDING);

  const serverUrl = import.meta.env.VITE_API_URL;
  const verificationListEndpoint = `${serverUrl}/admin/request/`;
  const filterVerificationListEndpoint = `${serverUrl}/admin/request/filter/`;
  const verificationDetailEndpoint = `${serverUrl}/admin/request/detail/`;
  const verificationHandleEndpoint = `${serverUrl}/admin/request/handle`;

  const fetchVerificationList = async () => {
    setIsLoading(true);
    if (filter === VerificationRequestFilter.ALL) {
      try {
        const requestOptions = {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ pageNo: page, pageSize: itemsPerPage }),
        };
        const response = await fetch(verificationListEndpoint, requestOptions);
        if (!response.ok) {
          throw response;
        }
        const data = await response.json();
        setVerificationList(data.data);
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
          body: JSON.stringify({ pageNo: page, pageSize: itemsPerPage, status: filter }),
        };
        const response = await fetch(filterVerificationListEndpoint, requestOptions);
        if (!response.ok) {
          throw response;
        }
        const data = await response.json();
        setVerificationList(data.data);
        setTotalPages(data.pages);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    }
  };

  useEffect(() => {
    fetchVerificationList();
  }, [page, filter]);

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  const handleDetailClick = (requestId) => {
    const fetchVerificationDetails = async () => {
      try {
        const requestOptions = {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ requestId }),
        };
        const response = await fetch(verificationDetailEndpoint, requestOptions);
        if (!response.ok) {
          throw response;
        }
        const data = await response.json();
        setVerificationDetails(data.data[0]);
      } catch (error) {
        console.log(error);
      }
    };
    fetchVerificationDetails();
    setOpenDetail(true);
  };

  const handleCloseDetail = () => {
    setVerificationDetails({});
    setOpenDetail(false);
  };

  const handleRequestClick = (requestId, status) => {
    console.log(requestId, adminId, status);
    const postApproveRequest = async () => {
      try {
        const requestOptions = {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ requestId, adminId, status }),
        };
        const response = await fetch(verificationHandleEndpoint, requestOptions);
        if (!response.ok) {
          throw response;
        }
        fetchVerificationList();
      } catch (error) {
        console.log(error);
      }
    };
    postApproveRequest();
  };

  // TODO: Change to real data
  return (
    <>
      <Spinner isLoading={isLoading} />
      <Box sx={{ display: 'flex', justifyContent: 'space-between', marginTop: '1rem' }}>
        <PageTitle title={`${filter.charAt(0) + filter.slice(1).toLowerCase()} Verification Request`} />
        <TextField
          select
          id="filter"
          label="Filter"
          variant="outlined"
          size="small"
          value={filter}
          onChange={(e) => { setPage(1); setFilter(e.target.value); }}
          sx={{ minWidth: '14ch' }}
        >
          {Object.values(VerificationRequestFilter).map((option) => (
            <MenuItem key={option} value={option}>
              {option.charAt(0) + option.slice(1).toLowerCase()}
            </MenuItem>
          ))}
        </TextField>
      </Box>
      {(verificationList.length === 0 && !isLoading)
        ? (<NoDataFound />) : (
          <>
            <Box sx={{ display: 'flex', justifyContent: 'center', marginBottom: '2rem' }}>
              <Pagination count={totalPages} page={page} onChange={handlePageChange} />
            </Box>

            <Grid container spacing={{ xs: 2, md: 4 }}>
              {verificationList.map((request) => (
                <Grid item xs={12} sm={6} md={3} key={request.id} style={{ display: 'flex' }}>

                  <CustomCard
                    name={request.model_code}
                    description={{
                      'Request ID': request.id,
                      'Seller name': `${request.first_name} ${request.last_name}`,
                      Time: request.time,
                      Status: request.status,
                    }}
                    type={CardType.VERIFICATION_REQUEST}
                    status={request.status}
                    handleDetailClick={() => handleDetailClick(request.id)}
                    handleCloseDetail={handleCloseDetail}
                    handleApproveClick={() => handleRequestClick(request.id, Status.APPROVED)}
                    handleRejectClick={() => handleRequestClick(request.id, Status.REJECTED)}
                  />
                </Grid>
              ))}
            </Grid>

            {/* Details modal */}
            <CustomModal
              open={openDetail}
              onClose={handleCloseDetail}
              name={verificationDetails.model_code}
              image={verificationDetails.image}
              description={{
                Status: verificationDetails.status,
                Time: verificationDetails.time,
                'Seller name': `${verificationDetails.first_name} ${verificationDetails.last_name}`,
                Location: verificationDetails.location,
                'Current owner': verificationDetails.current_owner,
                Brand: verificationDetails.brand,
                Model: verificationDetails.model_code,
                Color: verificationDetails.color,
                Class: verificationDetails.class,
                Doors: verificationDetails.door,
                Seats: verificationDetails.seat,
                Layout: verificationDetails.layout,
                Tranmission: verificationDetails.transmission,
                'Engine Cylinder': verificationDetails.engine_cylinders,
                'Engine Capacity': verificationDetails.engine_capacity,
                Fuel: verificationDetails.fuel,
                Odometer: verificationDetails.odometer,
              }}
            />
          </>
        ) }
    </>
  );
}

export default Verification;
