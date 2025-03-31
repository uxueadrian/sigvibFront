import React, { useState } from 'react';
import { Box, styled, useMediaQuery } from '@mui/material';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import { APP_BAR_HEIGHT, APP_BAR_HEIGHT_MOBILE } from '../constants/layout';

const MainContent = styled('main')(({ theme, open }) => ({
  flexGrow: 1,
  padding: theme.spacing(3),
  paddingTop: `calc(${theme.spacing(2)} + ${APP_BAR_HEIGHT}px)`,
  width: '100%',
  minHeight: '100vh',
  backgroundColor: '#f5f5f5',
  marginLeft: open ? `${DRAWER_WIDTH}px` : 0,
  transition: theme.transitions.create('margin', {
    easing: theme.transitions.easing.easeOut,
    duration: theme.transitions.duration.enteringScreen,
  }),
  [theme.breakpoints.down('md')]: {
    marginLeft: 0,
    padding: theme.spacing(2),
    paddingTop: `calc(${theme.spacing(2)} + ${APP_BAR_HEIGHT_MOBILE}px)`,
  },
}));

const Layout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const isDesktop = useMediaQuery(theme => theme.breakpoints.up('md'));

  return (
    <Box sx={{ 
      display: 'flex',
      minHeight: '100vh',
      backgroundColor: '#f5f5f5'
    }}>
      <Navbar />
      <Sidebar 
        open={isDesktop ? sidebarOpen : false} 
        setOpen={setSidebarOpen}
      />
      <MainContent open={isDesktop && sidebarOpen}>
        <Box sx={{ 
          maxWidth: '1200px',
          margin: '0 auto',
          width: '100%'
        }}>
          {children}
        </Box>
      </MainContent>
    </Box>
  );
};

export default Layout;