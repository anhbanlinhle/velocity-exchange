import React from 'react';
import { Outlet, Navigate, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import { isLoggedIn } from '../../utils/auth';

function AuthWrapper({ allowedRoles }) {
  const location = useLocation();
  const isUserLoggedIn = isLoggedIn();

  const userRole = localStorage.getItem('userRole');

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
