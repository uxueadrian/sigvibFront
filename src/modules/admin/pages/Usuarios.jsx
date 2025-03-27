import React, { useState, useEffect } from "react";
import axios from "axios";
import { Button, Switch, Box, CircularProgress, Typography, Paper } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import UsuarioDialog from "../components/UsuarioDialog";
import UsuarioEditDialog from "../components/UsuarioEditDialog";

const themeColors = {
  primary: "#673AB7", // Morado principal
  secondary: "#9575CD", // Morado más claro
  textLight: "#FFFFFF", // Blanco
  textDark: "#000000", // Negro
  backgroundLight: "#F3F4F6", // Fondo claro
  backgroundDark: "#1E1E1E", // Fondo oscuro
  paperLight: "#FFFFFF",
  paperDark: "#2C2C2C",
};

const Usuarios = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [lugares, setLugares] = useState([]);
  const [roles] = useState([
    { id: 1, nombre: "ROLE_ADMINISTRADOR" },
    { id: 2, nombre: "ROLE_RESPONSABLE" },
    { id: 3, nombre: "ROLE_BECARIO" },
  ]);
  const [nuevoUsuario, setNuevoUsuario] = useState({
    nombre: "",
    usuario: "",
    contrasena: "",
    idLugar: "",
    rol: ""
  });
  const [usuarioEditar, setUsuarioEditar] = useState(null);
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    axios.get("http://localhost:8080/usuarios")
      .then((response) => {
        const usuarios = response.data.result.map((usuario, index) => ({
          ...usuario,
          id: usuario.idusuario ?? `temp-${index}`,
          lugar: usuario.lugar ? usuario.lugar.lugar : "Sin asignar",
          rolNombre: usuario.rol ? usuario.rol.nombre : "Sin rol"
        }));
        setUsuarios(usuarios);
      })
      .catch((error) => console.error("Error al obtener usuarios:", error))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    axios.get("http://localhost:8080/usuarios/lugares-sin-usuarios")
      .then((response) => setLugares(response.data.result))
      .catch((error) => console.error("Error al obtener lugares:", error));
  }, []);

  const cambiarStatusUsuario = (idUsuario) => {
    axios.patch(`http://localhost:8080/usuarios/${idUsuario}/status`, {}, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
    })
      .then(() => {
        setUsuarios(usuarios.map(usuario =>
          usuario.id === idUsuario ? { ...usuario, status: !usuario.status } : usuario
        ));
      })
      .catch(error => console.error("Error al cambiar el estado del usuario:", error));
  };

  const columns = [
    { field: "nombre", headerName: "Nombre", width: 250 },
    { field: "usuario", headerName: "Usuario", width: 150 },
    { field: "status", headerName: "Estado", width: 100, type: "boolean" },
    { field: "rolNombre", headerName: "Rol", width: 200 },
    { field: "lugar", headerName: "Lugar", width: 200 },
    {
      field: "acciones",
      headerName: "Acciones",
      width: 250,
      renderCell: (params) => (
        <Box sx={{ display: "flex", gap: 1 }}>
          <Button
            variant="contained"
            color={params.row.status ? "error" : "success"}
            onClick={() => cambiarStatusUsuario(params.row.id)}
            sx={{ borderRadius: "8px", boxShadow: 3, fontWeight: "bold" }}
          >
            {params.row.status ? "Desactivar" : "Activar"}
          </Button>
          <Button
            variant="outlined"
            sx={{
              borderRadius: "8px",
              boxShadow: 2,
              fontWeight: "bold",
              color: darkMode ? themeColors.textLight : themeColors.primary,
              borderColor: darkMode ? themeColors.textLight : themeColors.primary,
            }}
            onClick={() => {
              setUsuarioEditar(params.row);
              setEditOpen(true);
            }}
          >
            Editar
          </Button>
        </Box>
      )
    }
  ];

  return (
    <Box sx={{ 
      display: "flex", 
      justifyContent: "center", 
      alignItems: "center", 
      minHeight: "100vh", 
      backgroundColor: darkMode ? themeColors.backgroundDark : themeColors.backgroundLight, 
      padding: "40px" 
    }}>
      <Paper 
        elevation={5} 
        sx={{ 
          width: "90%", 
          maxWidth: "1200px", 
          padding: "30px", 
          borderRadius: "15px", 
          backgroundColor: darkMode ? themeColors.paperDark : themeColors.paperLight 
        }}
      >
        <Typography 
          variant="h4" 
          align="center" 
          sx={{ 
            color: darkMode ? themeColors.secondary : themeColors.primary, 
            marginBottom: "20px", 
            fontWeight: "bold" 
          }}
        >
          Gestión de Usuarios
        </Typography>

        <Box sx={{ display: "flex", justifyContent: "space-between", marginBottom: "20px" }}>
          <Button 
            variant="contained" 
            sx={{ 
              borderRadius: "10px", 
              fontWeight: "bold",
              backgroundColor: themeColors.primary, 
              "&:hover": { backgroundColor: darkMode ? themeColors.secondary : "#5E35B1" }
            }}
            onClick={() => setOpen(true)}
          >
            Agregar Usuario
          </Button>
          <Switch checked={darkMode} onChange={() => setDarkMode(!darkMode)} />
        </Box>

        {loading ? (
          <Box sx={{ display: "flex", justifyContent: "center", padding: "50px" }}>
            <CircularProgress />
          </Box>
        ) : (
          <DataGrid
            rows={usuarios}
            columns={columns}
            pageSize={5}
            rowsPerPageOptions={[5]}
            autoHeight
            sx={{
              backgroundColor: darkMode ? themeColors.backgroundDark : themeColors.paperLight,
              borderRadius: "10px",
              boxShadow: 3,
              "& .MuiDataGrid-columnHeaders": {
                backgroundColor: darkMode ? themeColors.primary : themeColors.primary,
                color: themeColors.textLight,
                fontWeight: "bold",
                fontSize: "16px",
                borderTopLeftRadius: "10px",
                borderTopRightRadius: "10px"
              },
              "& .MuiDataGrid-cell": {
                color: darkMode ? themeColors.textLight : themeColors.textDark,
                fontSize: "14px"
              },
              "& .MuiDataGrid-footerContainer": {
                backgroundColor: darkMode ? themeColors.primary : themeColors.primary,
                color: themeColors.textLight,
                fontWeight: "bold",
                borderBottomLeftRadius: "10px",
                borderBottomRightRadius: "10px"
              },
            }}
          />
        )}
      </Paper>

      <UsuarioDialog open={open} setOpen={setOpen} nuevoUsuario={nuevoUsuario} setNuevoUsuario={setNuevoUsuario} roles={roles} lugares={lugares} setUsuarios={setUsuarios} usuarios={usuarios} />
      <UsuarioEditDialog open={editOpen} setOpen={setEditOpen} usuarioEditar={usuarioEditar} setUsuarioEditar={setUsuarioEditar} roles={roles} lugares={lugares} setUsuarios={setUsuarios} usuarios={usuarios} />
    </Box>
  );
};

export default Usuarios;
