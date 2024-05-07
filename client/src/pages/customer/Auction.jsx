import React from 'react';
import { useParams } from 'react-router-dom';

function Auction() {
  const { id } = useParams();
  return (
    <div>
      Auction `$
      {id}
      `
    </div>
  );
}

export default Auction;
