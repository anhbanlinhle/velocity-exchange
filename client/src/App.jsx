import React, {} from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/common/Home';
import About from './pages/common/About';
import Inventory from './pages/common/Inventory';
import Login from './pages/auth/Login';
import Logout from './pages/auth/Logout';
import SignUp from './pages/auth/Signup';
import Verification from './pages/admin/Verification';
import Auction from './pages/customer/Auction';
import CreateAuction from './pages/seller/CreateAuction';
import CarRegister from './pages/seller/CarRegister';
import NotFound from './pages/error/NotFound';
import AuthWrapper from './pages/auth/AuthWrapper';
import MainLayout from './layout/MainLayout';

function App() {
  const routes = [
    // AUTHENTICATION ROUTES
    {
      path: '/login',
      element: <Login />,
      allowedRoles: [],
    },
    {
      path: 'logout',
      element: <Logout />,
      allowedRoles: [],
    },
    {
      path: '/signup',
      element: <SignUp />,
      allowedRoles: [],
    },

    // COMMON ROUTES
    {
      path: '/',
      element: <Home />,
      allowedRoles: [],
    },
    {
      path: '/about',
      element: <About />,
      allowedRoles: [],
    },
    {
      path: '/inventory',
      element: <Inventory />,
      allowedRoles: ['USER'],
    },

    // ADMIN ROUTES
    {
      path: '/admin/verification',
      element: <Verification />,
      allowedRoles: ['ADMIN'],
    },

    // CUSTOMER ROUTES
    {
      path: '/auction/room/:id',
      element: <Auction />,
      allowedRoles: ['USER'],
    },

    // SELLER ROUTES
    {
      path: '/auction/create/:carId',
      element: <CreateAuction />,
      allowedRoles: ['USER'],
    },
    {
      path: 'car-register',
      element: <CarRegister />,
      allowedRoles: ['USER'],
    },

    // ERROR ROUTES
    {
      path: '*',
      element: <NotFound />,
      allowedRoles: [],
    },
  ];

  return (
    <BrowserRouter>
      <MainLayout>
        <Routes>
          {routes.map((route) => {
            if (route.allowedRoles.length > 0) {
              return (
                <Route
                  key={route.path}
                  element={<AuthWrapper allowedRoles={route.allowedRoles} />}
                >
                  <Route
                    key={route.path}
                    path={route.path}
                    element={route.element}
                  />
                </Route>
              );
            }
            return (
              <Route
                key={route.path}
                path={route.path}
                element={route.element}
              />
            );
          })}
        </Routes>
      </MainLayout>
    </BrowserRouter>
  );
}

export default App;
