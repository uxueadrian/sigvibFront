import React from 'react';
import {NavLink} from 'react-router-dom';
import {Box, Drawer, Divider, IconButton, Toolbar, Typography, CssBaseline, Button} from "@mui/material";
import { styled, useTheme } from '@mui/material/styles';
import MuiAppBar from '@mui/material/AppBar';

import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

import ComponentSwitch from './Switch';
import LogoutIcon from '@mui/icons-material/Logout';

import {useAuth} from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const drawerWidth = 240;

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme, open }) => ({
      flexGrow: 1,
      padding: theme.spacing(3),
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      marginLeft: `-${drawerWidth}px`,
      ...(open && {
        transition: theme.transitions.create('margin', {
          easing: theme.transitions.easing.easeOut,
          duration: theme.transitions.duration.enteringScreen,
        }),
        marginLeft: 0,
      }),

      width: '100%',
      maxWidth: '1200px',
      margin: '0 auto',
      padding: '80px 20px 20px', // Ajuste para el AppBar
    }),
);

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
  })(({ theme, open }) => ({
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: `${drawerWidth}px`,
      transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
    }),
}));

const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
}));

const label = { inputProps: { 'aria-label': 'Switch demo' } };

export default function Sidebar({children ,linksArray}) {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const {user, logout} = useAuth();
  const navigate = useNavigate();

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleLogout = () => {
    logout(navigate); // Aqui estamos cerrando sesion
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />

      <AppBar position="fixed" open={open}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={[{mr: 2, }, open && { display: 'none' }, ]} >
            <MenuIcon />
          </IconButton>

          <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
            SIGVIB
          </Typography>
          
        </Toolbar>
      </AppBar>

      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}> 

        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </DrawerHeader>

        <Divider />

        <Box sx={{ width: 240, bgcolor: "background.paper", p: 2 }}>
          {linksArray.map(({ icon, label, to }) => (
            <NavLink
              to={to}
              key={label}
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <Box sx={{ display: "flex", alignItems: "center", p: 2 }}>
                {icon}
                <Typography variant="body1" sx={{ ml: 2 }}>
                  {label}
                </Typography>
              </Box>
            </NavLink>
          ))}
        </Box>

        <Divider/>
        
        <Button 
          variant="contained" 
          endIcon={<LogoutIcon/>}
          onClick={handleLogout}
          sx={{ m: 2 }} >
          Cerrar sesión
        </Button>

        <Box sx={{ display: 'flex', alignItems: 'center', p: 2 }}>
          <Typography component="span">Cambio de modo:</Typography>
          <ComponentSwitch/>
        </Box>
                
      </Drawer>

      <Main open={open}>
        <DrawerHeader />  
        {children}  
      </Main>

    </Box>
  );
};

