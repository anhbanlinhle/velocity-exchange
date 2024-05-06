import React from 'react';
import {
  Card, CardMedia, CardContent, Typography, Button, CardActions, Box,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';

function CustomCard({
  name, image, description, type, handleDetailClick, registered,
}) {
  const navigate = useNavigate();

  const handleRegisterClick = () => {
    // Display a modal with payment information to deposit
    // This also depends on how you're handling modals in your application
  };

  const handleCreateAuctionClick = () => {
    navigate('/auction/create');
  };

  return (
    <Card
      sx={{
        width: '100%',
        transition: '0.3s',
        boxShadow: '0 8px 40px -12px rgba(0,0,0,0.3)',
        borderRadius: '0.5rem',
        '&:hover': {
          transform: 'scale(1.03)',
          boxShadow: '0 24px 80px -12.125px rgba(0,0,0,0.3)',
          cursor: 'pointer',
        },
      }}
    >
      {image && (
        <CardMedia
          component="img"
          height="140"
          image={image}
          alt={name}
          onClick={handleDetailClick}
        />
      )}
      <CardContent onClick={handleDetailClick}>
        <Typography variant="h6" component="div" sx={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
          {name}
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

      <CardActions sx={{ display: 'flex', justifyContent: 'flex-end' }}>
        <Button color="primary" onClick={handleDetailClick}>
          Detail
        </Button>
        {type === 'auction' ? (
          <Button variant="contained" color="secondary" onClick={handleRegisterClick}>
            {registered ? 'Unregister' : 'Register'}
          </Button>
        ) : (
          <Button variant="contained" color="secondary" onClick={handleCreateAuctionClick}>
            Create Auction
          </Button>
        )}
      </CardActions>

    </Card>
  );
}

CustomCard.propTypes = {
  name: PropTypes.string.isRequired,
  image: PropTypes.string,
  description: PropTypes.shape({}).isRequired,
  type: PropTypes.string.isRequired,
  handleDetailClick: PropTypes.func.isRequired,
  registered: PropTypes.bool,
};

CustomCard.defaultProps = {
  image: null,
  registered: false,
};

export default CustomCard;
