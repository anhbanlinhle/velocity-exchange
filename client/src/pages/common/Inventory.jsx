import React, { useEffect, useState } from 'react';
import { Grid } from '@mui/material';
import PageTitle from '../../component/PageTitle';
import NoDataFound from '../../component/NoDataFound';
import CustomCard from '../../component/CustomCard';
import { CardType } from '../../constant';
import CustomModal from '../../component/CustomModal';
// import Spinner from '../../component/Spinner';

function Inventory() {
  const userId = localStorage.getItem('userId');
  const [inventory, setInventory] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [carDetails, setCarDetails] = useState({});
  const [openDetails, setOpenDetails] = useState(false);

  const serverUrl = import.meta.env.VITE_API_URL;
  const inventoryEndpoint = `${serverUrl}/car/inventory`;
  const carDetailEndpoint = `${serverUrl}/car/detail`;

  const fetchInventory = async () => {
    setIsLoading(true);
    try {
      const requestOptions = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId }),
      };
      const response = await fetch(inventoryEndpoint, requestOptions);
      if (!response.ok) {
        throw response;
      }
      const data = await response.json();
      setInventory(data.data);
    } catch (error) {
      console.error(error.ErrorCode);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchInventory();
  }, []);

  const handleDetailClick = (carId) => {
    const fetchCarDetails = async () => {
      try {
        const requestOptions = {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ carId }),
        };
        const response = await fetch(carDetailEndpoint, requestOptions);
        if (!response.ok) {
          throw response;
        }
        const data = await response.json();
        setCarDetails(data.data);
        console.log(data.data);
      } catch (error) {
        console.error(error.ErrorCode);
      }
    };
    fetchCarDetails();
    setOpenDetails(true);
  };

  const handleCloseDetail = () => {
    setCarDetails({});
    setOpenDetails(false);
  };

  return (
    <>
      {/* <Spinner isLoading={isLoading} /> */}
      <PageTitle title="Inventory" />
      {(inventory.length === 0 && !isLoading) ? (
        <NoDataFound />
      ) : (
        <>
          <Grid container spacing={{ xs: 2, md: 4 }} style={{ display: 'flex' }}>
            {inventory.map((car) => (
              <Grid item xs={12} sm={6} md={3} key={car.id}>
                <CustomCard
                  type={CardType.CAR}
                  name={car.model_code}
                  image={car.image}
                  carId={car.car_id}
                  description={{
                    'Current Owner': car.current_owner,
                    Class: car.class,
                  }}
                  handleDetailClick={() => handleDetailClick(car.car_id)}
                  handleCloseDetail={() => handleCloseDetail()}
                />
              </Grid>
            ))}
          </Grid>
          <CustomModal
            open={openDetails}
            onClose={handleCloseDetail}
            name={carDetails.model_code}
            image={carDetails.image}
            description={{
              id: carDetails.id,
              'Current Owner': carDetails.current_owner,
              Class: carDetails.class,
              Doors: carDetails.door,
              Seats: carDetails.seat,
              Layout: carDetails.layout,
              'Engine Cylinders': carDetails.engine_cylinders,
              'Engine Capacity': carDetails.engine_capacity,
              'Engine Type': carDetails.engine_type,
              'Fuel Type': carDetails.fuel_type,
              Transmission: carDetails.transmission,
              Color: carDetails.color,
              Fuel: carDetails.fuel,
              Odometer: carDetails.odometer,
            }}
          />
        </>
      )}
    </>
  );
}

export default Inventory;
