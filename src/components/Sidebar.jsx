import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { Drawer, List, ListItem, ListItemButton, ListItemText, Divider, Typography, Box, Button, IconButton } from "@mui/material";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import MenuIcon from "@mui/icons-material/Menu";

const Sidebar = () => {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const [open, setOpen] = useState(true); // Estado para mostrar/ocultar el sidebar

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
      {/* Botón para alternar la visibilidad */}
      <IconButton 
        onClick={() => setOpen(!open)} 
        sx={{ position: "absolute", top: 10, left: 10, color: "white", zIndex: 1301 }}
      >
        <MenuIcon />
      </IconButton>

      <Drawer
        variant={open ? "permanent" : "temporary"} // Cambia entre fijo y temporal
        open={open}
        onClose={() => setOpen(false)}
        sx={{
          width: open ? 240 : 0,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: 240,
            bgcolor: "#2c3e50",
            color: "white",
            padding: 2,
            transition: "width 0.3s ease-in-out",
          },
        }}
      >
        <Box sx={{ textAlign: "center", py: 3 }}>
          <Typography variant="h5" fontWeight="bold" letterSpacing={1.2}>
            Menú
          </Typography>
        </Box>
        <Divider sx={{ bgcolor: "#ffffff40" }} />
        <List>
          {(menuItems[user?.role] || []).map(({ text, path }) => (
            <ListItem key={text} disablePadding>
              <ListItemButton
                component={Link}
                to={path}
                sx={{
                  color: "white",
                  "&:hover": {
                    bgcolor: "rgba(255, 215, 0, 0.2)",
                    transition: "all 0.3s ease",
                  },
                }}
              >
                <ListItemText primary={text} primaryTypographyProps={{ fontSize: 16, fontWeight: "medium" }} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        <Box sx={{ position: "absolute", bottom: 20, left: 20, right: 20 }}>
          <Button
            variant="contained"
            fullWidth
            color="error"
            onClick={handleLogout}
            startIcon={<ExitToAppIcon />}
            sx={{
              background: "linear-gradient(135deg, #e74c3c, #c0392b)",
              "&:hover": {
                background: "linear-gradient(135deg, #c0392b, #e74c3c)",
              },
              transition: "all 0.3s ease",
            }}
          >
            Cerrar sesión
          </Button>
        </Box>
      </Drawer>
    </>
  );
};

export default Sidebar;
