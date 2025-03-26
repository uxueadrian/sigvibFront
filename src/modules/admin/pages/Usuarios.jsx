import React, { useState, useEffect } from "react";
import axios from "axios";
import { Button, TextField, MenuItem, Dialog, DialogActions, DialogContent, DialogTitle, Switch, Box, CircularProgress } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";

const Usuarios = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
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
  }, []); // ✅ Se ejecuta solo una vez
  
  

  useEffect(() => {
    axios.get("http://localhost:8080/usuarios/lugares-sin-usuarios")
      .then((response) => {
        setLugares(response.data.result);
      })
      .catch((error) => console.error("Error al obtener lugares:", error));
  }, []); // ✅ Se ejecuta solo una vez
  

  const handleChange = (e) => {
    const { name, value } = e.target;
    usuarioEditar ?
      setUsuarioEditar({ ...usuarioEditar, [name]: value }) :
      setNuevoUsuario({ ...nuevoUsuario, [name]: value });
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

  const handleEdit = () => {
    const usuarioFormateado = {
      nombre: usuarioEditar.nombre,
      usuario: usuarioEditar.usuario,
      contrasena: usuarioEditar.contrasena,
      rol: { idRol: parseInt(usuarioEditar.rol) },
      idLugar: parseInt(usuarioEditar.idLugar)
    };

    axios.put(`http://localhost:8080/usuarios/${usuarioEditar.id}`, usuarioFormateado, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
    })
      .then(response => {
        setUsuarios(usuarios.map(usuario => usuario.id === usuarioEditar.id ? response.data.result : usuario));
        setEditOpen(false);
      })
      .catch(error => console.error("Error al editar usuario:", error.response?.data || error.message));
  };

  const cambiarStatusUsuario = (idUsuario) => {
    axios.patch(`http://localhost:8080/usuarios/${idUsuario}/status`, {}, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
    })
      .then(response => {
        setUsuarios(usuarios.map(usuario =>
          usuario.id === idUsuario ? { ...usuario, status: !usuario.status } : usuario
        ));
      })
      .catch(error => console.error("Error al cambiar el estado del usuario:", error.response?.data || error.message));
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
        <>
          <Button
            variant="contained"
            color={params.row.status ? "secondary" : "primary"}
            onClick={() => cambiarStatusUsuario(params.row.id)}
          >
            {params.row.status ? "Desactivar" : "Activar"}
          </Button>
          <Button
            variant="outlined"
            color="primary"
            onClick={() => {
              setUsuarioEditar(params.row);
              setEditOpen(true);
            }}
            style={{ marginLeft: "10px" }}
          >
            Editar
          </Button>
        </>
      )
    }
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

      {/* Modal para agregar usuario */}
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

      {/* Modal para editar usuario */}
      <Dialog open={editOpen} onClose={() => setEditOpen(false)}>
        <DialogTitle>Editar Usuario</DialogTitle>
        <DialogContent>
          <TextField label="Nombre" name="nombre" value={usuarioEditar?.nombre || ""} fullWidth onChange={handleChange} margin="dense" />
          <TextField label="Usuario" name="usuario" value={usuarioEditar?.usuario || ""} fullWidth onChange={handleChange} margin="dense" />
          <TextField label="Contraseña" name="contrasena" type="password" value={usuarioEditar?.contrasena || ""} fullWidth onChange={handleChange} margin="dense" />
          <TextField
            select
            label="Lugar Asignado"
            name="idLugar"
            value={usuarioEditar?.idLugar || ""}
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
            value={usuarioEditar?.rol || ""}
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
          <Button onClick={() => setEditOpen(false)}>Cancelar</Button>
          <Button onClick={handleEdit} color="primary">Guardar Cambios</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Usuarios;