import React, { useState, useEffect } from "react";
import axios from "axios";
import { Button, TextField, MenuItem, Dialog, DialogActions, DialogContent, DialogTitle, Switch, Box, CircularProgress } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";

const Usuarios = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [lugares, setLugares] = useState([]);
  const [roles, setRoles] = useState([
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
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    axios.get("http://localhost:8080/usuarios").then((response) => {
      const usuarios = response.data.result.map((usuario) => ({
        ...usuario,
        id: usuario.idusuario || Math.random(),
        lugar: usuario.lugar ? usuario.lugar.lugar : "Sin asignar",
        rolNombre: usuario.rol ? usuario.rol.nombre : "Sin rol"
      }));
      
      setUsuarios(usuarios);
    }).catch((error) => console.error("Error al obtener usuarios:", error)).finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    axios.get("http://localhost:8080/usuarios/lugares-sin-usuarios")
      .then((response) => {
        setLugares(response.data.result);
      })
      .catch((error) => console.error("Error al obtener lugares:", error));
  }, []);

  const handleChange = (e) => {
    setNuevoUsuario({ ...nuevoUsuario, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    const usuarioFormateado = {
        nombre: nuevoUsuario.nombre,
        usuario: nuevoUsuario.usuario,
        contrasena: nuevoUsuario.contrasena,
        status: true,
        rol: { idRol: parseInt(nuevoUsuario.rol) },
        idLugar: parseInt(nuevoUsuario.idLugar)
    };

    axios.post("http://localhost:8080/usuarios/crearUsuario", usuarioFormateado, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
    })
    .then(response => {
      setUsuarios([...usuarios, { ...response.data.result, id: response.data.result.idusuario }]);
      setOpen(false);
    })
    .catch(error => console.error("Error al crear usuario:", error.response?.data || error.message));
  };

  const columns = [
    { field: "nombre", headerName: "Nombre", width: 250 },
    { field: "usuario", headerName: "Usuario", width: 150 },
    { field: "status", headerName: "Estado", width: 100, type: "boolean" },
    { field: "rolNombre", headerName: "Rol", width: 200 },
    { field: "lugar", headerName: "Lugar", width: 200 }
  ];

  return (
    <div style={{ padding: "20px", minHeight: "100vh", backgroundColor: darkMode ? "#1E1E1E" : "#F3F4F6" }}>
      <h1 style={{ color: darkMode ? "#AED581" : "#7CB342" }}>Usuarios</h1>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "10px" }}>
        <Button variant="contained" color="primary" onClick={() => setOpen(true)}>Agregar Usuario</Button>
        <Switch checked={darkMode} onChange={() => setDarkMode(!darkMode)} />
      </div>
      
      <Box sx={{ height: 400, width: "100%", margin: "20px auto" }}>
        {loading ? (
          <CircularProgress />
        ) : (
          <DataGrid
            rows={usuarios}
            columns={columns}
            pageSize={5}
            rowsPerPageOptions={[5]}
            autoHeight
            sx={{
              "& .MuiDataGrid-columnHeaders": {
                backgroundColor: darkMode ? "#333" : "#6A1B9A",
                color: "#FFF",
              },
              "& .MuiDataGrid-row": {
                backgroundColor: darkMode ? "#1E1E1E" : "#FFF",
              },
              "& .MuiDataGrid-footerContainer": {
                backgroundColor: darkMode ? "#333" : "#6A1B9A",
                color: "#FFF",
              },
            }}
          />
        )}
      </Box>

      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Agregar Usuario</DialogTitle>
        <DialogContent>
          <TextField label="Nombre" name="nombre" fullWidth onChange={handleChange} margin="dense" />
          <TextField label="Usuario" name="usuario" fullWidth onChange={handleChange} margin="dense" />
          <TextField label="Contraseña" name="contrasena" type="password" fullWidth onChange={handleChange} margin="dense" />
          <TextField
            select
            label="Lugar Asignado"
            name="idLugar"
            value={nuevoUsuario.idLugar}
            fullWidth
            onChange={handleChange}
            margin="dense"
          >
            {lugares.length > 0 ? (
              lugares.map((lugar) => (
                <MenuItem key={lugar.idlugar} value={lugar.idlugar}>{lugar.lugar}</MenuItem>
              ))
            ) : (
              <MenuItem disabled>No hay lugares disponibles</MenuItem>
            )}
          </TextField>
          <TextField
            select
            label="Rol"
            name="rol"
            value={nuevoUsuario.rol}
            fullWidth
            onChange={handleChange}
            margin="dense"
          >
            {roles.map((rol) => (
              <MenuItem key={rol.id} value={rol.id}>{rol.nombre}</MenuItem>
            ))}
          </TextField>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancelar</Button>
          <Button onClick={handleSubmit} color="primary">Guardar</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Usuarios;
