import React, { useState, useEffect } from "react";
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, MenuItem, Snackbar, Alert } from "@mui/material";
import axios from "axios";

const UsuarioEditDialog = ({ open, setOpen, usuarioEditar, setUsuarioEditar, roles, lugares, setUsuarios, usuarios }) => {
  const [error, setError] = useState("");
  const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "info" });

  // Evita errores si usuarioEditar es null
  useEffect(() => {
    if (!usuarioEditar) {
      setUsuarioEditar({
        nombre: "",
        usuario: "",
        contrasena: "",
        rol: "",
        idLugar: ""
      });
    }
  }, [usuarioEditar, setUsuarioEditar]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUsuarioEditar((prev) => ({ ...prev, [name]: value }));
  };

  const handleEdit = () => {
    if (!usuarioEditar.nombre || !usuarioEditar.usuario || !usuarioEditar.contrasena || !usuarioEditar.rol || !usuarioEditar.idLugar) {
      setSnackbar({ open: true, message: "Todos los campos son obligatorios.", severity: "warning" });
      return;
    }

    const usuarioFormateado = {
      nombre: usuarioEditar.nombre,
      usuario: usuarioEditar.usuario,
      contrasena: usuarioEditar.contrasena,
      rol: { idRol: parseInt(usuarioEditar.rol) },
      idLugar: parseInt(usuarioEditar.idLugar),
    };

    axios.put(`http://localhost:8080/usuarios/${usuarioEditar.id}`, usuarioFormateado, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
    })
      .then(response => {
        setUsuarios(usuarios.map(usuario => usuario.id === usuarioEditar.id ? response.data.result : usuario));
        setOpen(false);
        setSnackbar({ open: true, message: "Usuario actualizado correctamente.", severity: "success" });
      })
      .catch(error => {
        console.error("Error al editar usuario:", error.response?.data || error.message);
        setSnackbar({ open: true, message: "Hubo un error al actualizar el usuario.", severity: "error" });
      });
  };

  if (!usuarioEditar) return null; // Evita renderizar el componente si usuarioEditar es null

  return (
    <>
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Editar Usuario</DialogTitle>
        <DialogContent>
          <TextField label="Nombre" name="nombre" value={usuarioEditar.nombre} fullWidth onChange={handleChange} margin="dense" />
          <TextField label="Usuario" name="usuario" value={usuarioEditar.usuario} fullWidth onChange={handleChange} margin="dense" />
          <TextField label="Contraseña" name="contrasena" type="password" value={usuarioEditar.contrasena} fullWidth onChange={handleChange} margin="dense" />
          <TextField select label="Lugar Asignado" name="idLugar" value={usuarioEditar.idLugar} fullWidth onChange={handleChange} margin="dense">
            {lugares.length > 0 ? lugares.map(lugar => (
              <MenuItem key={lugar.idlugar} value={lugar.idlugar}>{lugar.lugar}</MenuItem>
            )) : <MenuItem disabled>No hay lugares disponibles</MenuItem>}
          </TextField>
          <TextField select label="Rol" name="rol" value={usuarioEditar.rol} fullWidth onChange={handleChange} margin="dense">
            {roles.map(rol => (
              <MenuItem key={rol.id} value={rol.id}>{rol.nombre}</MenuItem>
            ))}
          </TextField>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)} color="secondary">Cancelar</Button>
          <Button onClick={handleEdit} color="primary" disabled={!usuarioEditar.nombre || !usuarioEditar.usuario || !usuarioEditar.contrasena || !usuarioEditar.rol || !usuarioEditar.idLugar}>
            Guardar Cambios
          </Button>
        </DialogActions>
      </Dialog>

      {/* Snackbar para mostrar mensajes */}
      <Snackbar open={snackbar.open} autoHideDuration={4000} onClose={() => setSnackbar({ ...snackbar, open: false })}>
        <Alert onClose={() => setSnackbar({ ...snackbar, open: false })} severity={snackbar.severity} sx={{ width: "100%" }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </>
  );
};

export default UsuarioEditDialog;
