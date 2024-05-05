import React, { useState } from 'react';
import {
  AppBar,
  Box,
  Container,
  Typography,
  Toolbar,
  IconButton,
  Menu,
  MenuItem,
  Button,
  Avatar,
  Tooltip,
  InputBase,
} from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import { styled, alpha } from '@mui/material/styles';

import Logo from '../component/Logo';
import CustomButton from '../component/CustomButton';
import isLoggedIn from '../utils/auth';

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
    width: 'auto',
  },
  marginRight: '1rem',
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  width: '100%',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    [theme.breakpoints.up('sm')]: {
      width: '25vw',
    },
  },
}));

function Header() {
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);
  const userLoggedIn = isLoggedIn();
  const username = localStorage.getItem('username');
  // TODO: Get user's role
  const isAdmin = false;
  const logoWidth = '9rem';
  const navigate = useNavigate();
  // Default navigation menu items for guest users
  let pages = ['Home', 'About'];
  let routes = ['/', '/about'];
  const settings = [];
  const settingRoutes = [];

  // Navigation menu items for logged in users (members)
  if (userLoggedIn) {
    pages = ['Home', 'Inventory', 'About'];
    routes = ['/', '/inventory', '/about'];
    // settings = ['Profile'];
    // settingRoutes = ['/profile'];
  }

  if (isAdmin) {
    pages = ['Home', 'Verification Request'];
    routes = ['/', '/admin/verification'];
    // settings = ['Profile'];
    // settingRoutes = ['/profile'];
  }

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  // TODO: Logout function
  const handleLogout = () => {
    localStorage.clear();
    navigate('/');
  };

  return (
    <>
      <AppBar position="static" sx={{ background: 'linear-gradient(to right bottom, #1D1E20, #043BC6)' }}>
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            {/* Large Screen Logo */}
            <Box
              sx={{
                display: { xs: 'none', md: 'flex' },
                width: logoWidth,
                height: 'auto',
                alignItems: 'center',
                margin: '1.5rem',
                '&:hover': { cursor: 'pointer' },
              }}
            >
              <Link to="/">
                <Logo />
              </Link>
            </Box>

            {/* Small Screen Navigation Menu */}
            <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'left',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'left',
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{
                  display: { xs: 'block', md: 'none' },
                }}
              >
                {pages.map((page, index) => (
                  <MenuItem
                    key={page}
                    onClick={handleCloseNavMenu}
                    component={Link}
                    to={routes[index]}
                  >
                    <Typography textAlign="center">{page}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>

            {/* Small Screen Logo */}
            <Box
              sx={{
                flexGrow: 1,
                justifyContent: 'center',
                display: { xs: 'flex', md: 'none' },
                width: logoWidth,
                height: 'auto',
                alignItems: 'center',
                margin: '1.5rem',
                '&:hover': { cursor: 'pointer' },
              }}
            >
              <Link to="/">
                <Logo />
              </Link>
            </Box>

            {/* Large Screen Navigation Menu */}
            <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
              {pages.map((page, index) => (
                <Button
                  key={page}
                  onClick={handleCloseNavMenu}
                  sx={{
                    my: 2, color: 'inherit', display: 'block', textAlign: 'center',
                  }}
                  component={Link}
                  to={routes[index]}
                >
                  {page}
                </Button>
              ))}
              {userLoggedIn && (<CustomButton component={Link} to="/auction/create">Sell Your Car</CustomButton>)}
            </Box>

            {/* Avatar */}
            <Box sx={{ flexGrow: 0 }}>
              {userLoggedIn ? (
                <>
                  <Tooltip title={username}>
                    <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                      <Avatar alt="User Avatar">{username.charAt(0).toLowerCase()}</Avatar>
                    </IconButton>
                  </Tooltip>
                  {/* Avatar Menu */}
                  <Menu
                    sx={{ mt: '45px' }}
                    id="menu-appbar"
                    anchorEl={anchorElUser}
                    anchorOrigin={{
                      vertical: 'top',
                      horizontal: 'right',
                    }}
                    keepMounted
                    transformOrigin={{
                      vertical: 'top',
                      horizontal: 'right',
                    }}
                    open={Boolean(anchorElUser)}
                    onClose={handleCloseUserMenu}
                  >
                    {settings.map((setting, index) => (
                      <MenuItem
                        key={setting}
                        onClick={handleCloseUserMenu}
                        component={Link}
                        to={settingRoutes[index]}
                      >
                        <Typography textAlign="center">{setting}</Typography>
                      </MenuItem>
                    ))}
                    <MenuItem key="logout" onClick={handleLogout}>
                      <Typography textAlign="center">Log out</Typography>
                    </MenuItem>
                  </Menu>
                </>

              ) : (
                <Box sx={{ display: 'flex', flexDirection: 'row' }}>
                  <CustomButton component={Link} to="/signup">Sign up</CustomButton>
                  <Button
                    onClick={() => navigate('/login')}
                    sx={{ my: 2, color: 'inherit', display: 'block' }}
                  >
                    Log in
                  </Button>
                </Box>
              )}

            </Box>
          </Toolbar>
        </Container>
      </AppBar>

      {/* Search Bar */}
      { userLoggedIn && (
        <AppBar position="static" sx={{ background: '#000' }}>
          <Container maxWidth="xl">
            <Toolbar disableGutters sx={{ justifyContent: 'left' }}>

              <Search>
                <SearchIconWrapper>
                  <SearchIcon />
                </SearchIconWrapper>
                <StyledInputBase
                  placeholder="Search…"
                  inputProps={{ 'aria-label': 'search' }}
                />
              </Search>
            </Toolbar>
          </Container>
        </AppBar>
      )}

    </>
  );
}

export default Header;
