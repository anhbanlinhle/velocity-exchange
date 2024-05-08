import React from 'react';
import { Typography } from '@mui/material';
import PageTitle from '../../component/PageTitle';

function About() {
  return (
    <>
      <PageTitle title="About" />
      <Typography variant="body1" gutterBottom>
        Velocity Exchange (VEX) is a secure and transparent web-based auction platform designed specifically for the high-value segment of the automotive marketplace, focusing on supercars and hypercars. VEX eliminates the geographical constraints of traditional in-person auctions, allowing participants to engage in the bidding process from the comfort of their web-enabled devices (laptops, personal computers, tablets, and smartphones).
        <br />
        <br />
        The project will involve developing a web-based platform accessible to end users through various internet-enabled devices such as laptops, desktops, tablets, and smartphones. Auction organizers will be able to register their car for listing listings onto the platform, providing details like product descriptions, starting prices, bid increments, auction start times, duration, and other relevant information. Users can browse through the listings, register to participate in auctions, and place bids by entering their desired bid amounts. Upon conclusion of an auction, the winning bidder will receive notification of their success and must complete payment within 24 hours. Failure to do so will result in the cancellation of the auction outcome, with arrangements made by the organizer as necessary.
      </Typography>
    </>
  );
}

export default About;
