import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { Drawer, List, ListItem, ListItemButton, ListItemText, Divider, Typography, Box, Button, IconButton, styled, useTheme, useMediaQuery } from "@mui/material";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import Switch from "./Switch";

import { APP_BAR_HEIGHT, APP_BAR_HEIGHT_MOBILE, DRAWER_WIDTH } from "../constants/layout";

const MenuButton = styled(IconButton)(({ theme, open }) => {
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  
  return {
    position: "fixed",
    top: isMobile ? theme.spacing(1.5) : theme.spacing(2),
    left: open ? (isMobile ? 'auto' : `${DRAWER_WIDTH - 40}px`) : theme.spacing(2),
    right: open && isMobile ? theme.spacing(2) : 'auto',
    color: "white",
    zIndex: theme.zIndex.modal + 1,
    backgroundColor: "#7033FF",
    transition: theme.transitions.create(['left', 'right'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.standard,
    }),
    '&:hover': {
      backgroundColor: "#5a2bd6",
    },
    width: 40,
    height: 40,
    borderRadius: 12,
  };
});

// Componente estilizado del Drawer
const CustomDrawer = styled(Drawer)(({ theme, open }) => ({
  width: open ? DRAWER_WIDTH : 0,
  flexShrink: 0,
  '& .MuiDrawer-paper': {
    width: DRAWER_WIDTH,
    backgroundColor: "#7033FF",
    color: "white",
    borderRight: 'none',
    borderRadius: 0,
    boxSizing: 'border-box',
    position: 'absolute', // Cambio clave IMPORTANTISIMO para eliminar espacios muertos
    height: `calc(100vh - ${APP_BAR_HEIGHT}px)`,
    top: APP_BAR_HEIGHT,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    [theme.breakpoints.down('md')]: {
      height: `calc(100vh - ${APP_BAR_HEIGHT_MOBILE}px)`,
      top: APP_BAR_HEIGHT_MOBILE,
      zIndex: theme.zIndex.drawer,
    },
    overflowX: 'hidden',
  },
}));

const Sidebar = () => {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const [open, setOpen] = useState(true);
  const isMobile = useMediaQuery(theme => theme.breakpoints.down('md'));

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/login");
  };

  const menuItems = {
    ROLE_ADMINISTRADOR: [
      { text: "Dashboard", path: "/admin/dashboard" },
      { text: "Usuarios", path: "/admin/usuarios" },
      { text: "Lugares", path: "/admin/lugares" },
      { text: "Áreas", path: "/admin/areas" },
      { text: "Categorías", path: "/admin/categorias" },
      { text: "Bienes", path: "/admin/bienes" },
      { text: "Bajas", path: "/admin/bajas" },
    ],
    ROLE_RESPONSABLE: [
      { text: "Mis Bienes", path: "/responsable/bienes" },
      { text: "Solicitar", path: "/responsable/asignar" },
      { text: "Bienes a Cargo", path: "/responsable/cargo" },
    ],
    ROLE_BECARIO: [
      { text: "Bienes Becario", path: "/becario/bienes" },
      { text: "Solicitar", path: "/becario/asignar" },
    ],
  };

  return (
    <>
      <MenuButton 
        open={open}
        onClick={() => setOpen(!open)}
        aria-label="toggle sidebar" >
        {open ? <CloseIcon /> : <MenuIcon />}
      </MenuButton>

      <CustomDrawer
        variant={isMobile ? "temporary" : "persistent"}
        open={open}
        onClose={() => setOpen(false)}
        ModalProps={{
          keepMounted: true,
        }} >
        <Box sx={{ overflow: 'hidden', display: 'flex', flexDirection: 'column', height: '100%' }}>
          <Box sx={{ textAlign: "center", py: 3 }}>
            <Typography variant="h5" fontWeight="bold" letterSpacing={1.2}>
              Menú
            </Typography>
          </Box>
          
          <Divider sx={{ bgcolor: "#ffffff40" }} />
          
          <List sx={{ flexGrow: 1, overflowY: 'auto' }}>
            {(menuItems[user?.role] || []).map(({ text, path }) => (
              <ListItem key={text} disablePadding>
  
                <ListItemButton
                  component={Link}
                  to={path}
                  sx={{
                    px: 3, // Más padding horizontal
                    '&:hover': {
                      backgroundColor: 'rgba(255, 255, 255, 0.1)',
                    },
                    '&.Mui-selected': { // Estilo para el item activo
                      backgroundColor: 'rgba(255, 255, 255, 0.15)',
                    },
                    '&.Mui-selected:hover': {
                      backgroundColor: 'rgba(255, 255, 255, 0.2)',
                    }
                  }} >
                  <ListItemText 
                    primary={text} 
                    primaryTypographyProps={{ 
                      fontWeight: 'medium', // Texto un poco más grueso
                    }} 
                  />
                </ListItemButton>
                
              </ListItem>
            ))}
          </List>

          <Divider sx={{ bgcolor: "#ffffff40" }} />
          <Box sx={{ px: 2 }}>  {/* Añade padding horizontal */}
            <Switch/>
          </Box>
          <Divider sx={{ bgcolor: "#ffffff40" }} />
          
          <Box sx={{ p: 2 }}>
            <Button
              fullWidth
              onClick={handleLogout}
              startIcon={<ExitToAppIcon />}
              sx={{
                color: "white",
                justifyContent: 'flex-start',
                '&:hover': {
                  backgroundColor: 'rgba(255, 255, 255, 0.1)',
                }
              }} > Cerrar sesión
            </Button>
          </Box>
        </Box>
      </CustomDrawer>
    </>
  );
};

export default Sidebar;

