import React from 'react';
import {
  Card, CardMedia, CardContent, Typography, Button, CardActions, Box,
} from '@mui/material';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { CardType, Status, AuctionStatus } from '../constant';

function CustomCard({
  name, image, description, type, handleDetailClick, registered, auctionStatus, handleRegisterClick, handleJoinClick, handleApproveClick, handleRejectClick, status, carId,
}) {
  const auctionButton = () => {
    if (!registered) {
      return (
        <Button variant="contained" color="secondary" onClick={handleRegisterClick}>
          Register
        </Button>
      );
    }
    if (auctionStatus === AuctionStatus.INCOMING) {
      return (
        <Button variant="contained" color="primary" onClick={handleRegisterClick}>
          Unregister
        </Button>
      );
    }
    if (auctionStatus === AuctionStatus.ONGOING) {
      return (
        <Button variant="contained" color="success" onClick={handleJoinClick}>
          Join
        </Button>
      );
    }
    return (
      <Button variant="contained" color="secondary" disabled>
        Completed
      </Button>
    );
  };

  const renderButtons = () => {
    switch (type) {
    case CardType.AUCTION:

      return (
        auctionButton()
      );
    case CardType.VERIFICATION_REQUEST:
      return (
        <>
          <Button variant="outlined" color="success" onClick={handleApproveClick} disabled={status !== Status.PENDING}>
            {status === Status.APPROVED ? 'Approved' : 'Approve'}
          </Button>
          <Button variant="outlined" color="error" onClick={handleRejectClick} disabled={status !== Status.PENDING}>
            {status === Status.REJECTED ? 'Rejected' : 'Reject'}
          </Button>
        </>
      );
    default:
      return (
        <Button variant="contained" color="secondary" component={Link} to={`/auction/create/${carId}`}>
          Create Auction
        </Button>
      );
    }
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
        <Button variant="outlined" color="primary" onClick={handleDetailClick}>
          Detail
        </Button>
        {renderButtons()}
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
  auctionStatus: PropTypes.string,
  handleRegisterClick: PropTypes.func,
  handleJoinClick: PropTypes.func,
  handleApproveClick: PropTypes.func,
  handleRejectClick: PropTypes.func,
  status: PropTypes.string,
  carId: PropTypes.number,
};

CustomCard.defaultProps = {
  image: null,
  registered: false,
  auctionStatus: null,
  handleRegisterClick: null,
  handleJoinClick: null,
  handleApproveClick: null,
  handleRejectClick: null,
  status: Status.PENDING,
  carId: null,
};

export default CustomCard;
