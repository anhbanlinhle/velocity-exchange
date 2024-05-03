import React from 'react';
import { Outlet, Navigate, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';

function AuthWrapper({ allowedRoles }) {
  const location = useLocation();
  // TODO: Implement isLoggedIn function
  // const isUserLoggedIn = isLoggedIn();
  const isUserLoggedIn = true;

  // TODO: Get user's role
  let userRole = 'USER';
  if (isUserLoggedIn) {
    userRole = 'USER';
  }

  if (allowedRoles.includes(userRole)) {
    return <Outlet />;
  } if (isUserLoggedIn) {
    return <Navigate to="/" state={{ from: location }} replace />;
  }
  return <Navigate to="/login" state={{ from: location }} replace />;
}

AuthWrapper.propTypes = {
  allowedRoles: PropTypes.arrayOf(PropTypes.string),
};

AuthWrapper.defaultProps = {
  allowedRoles: [],
};

export default AuthWrapper;
