import React, { useState } from "react";
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, MenuItem } from "@mui/material";
import axios from "axios";

const UsuarioDialog = ({ open, setOpen, nuevoUsuario, setNuevoUsuario, roles, lugares, setUsuarios, usuarios }) => {
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNuevoUsuario({ ...nuevoUsuario, [name]: value });
  };

  const validate = () => {
    let tempErrors = {};
    if (!nuevoUsuario.nombre) tempErrors.nombre = "El nombre es obligatorio";
    if (!nuevoUsuario.usuario) tempErrors.usuario = "El usuario es obligatorio";
    if (!nuevoUsuario.contrasena) tempErrors.contrasena = "La contraseña es obligatoria";
    if (!nuevoUsuario.rol) tempErrors.rol = "El rol es obligatorio";
    if (!nuevoUsuario.idLugar) tempErrors.idLugar = "El lugar es obligatorio";
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = () => {
    if (!validate()) return;
    
    const usuarioFormateado = {
      nombre: nuevoUsuario.nombre,
      usuario: nuevoUsuario.usuario,
      contrasena: nuevoUsuario.contrasena,
      status: true,
      rol: { idRol: parseInt(nuevoUsuario.rol) },
      idLugar: parseInt(nuevoUsuario.idLugar),
    };

    axios.post("http://localhost:8080/usuarios/crearUsuario", usuarioFormateado, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
    })
      .then(response => {
        // Aseguramos que el nuevo usuario tenga un ID válido
        const nuevoUsuarioConId = { 
          ...response.data.result, 
          id: response.data.result.idusuario,
          lugar: response.data.result.lugar ? response.data.result.lugar.lugar : "Sin asignar",
          rolNombre: response.data.result.rol ? response.data.result.rol.nombre : "Sin rol",
        };
        
        setUsuarios([...usuarios, nuevoUsuarioConId]);
        setNuevoUsuario({
          nombre: "",
          usuario: "",
          contrasena: "",
          idLugar: "",
          rol: "",
        });
        setOpen(false);
      })
      .catch(error => console.error("Error al crear usuario:", error.response?.data || error.message));
  };

  return (
    <Dialog open={open} onClose={() => setOpen(false)}>
      <DialogTitle>Agregar Usuario</DialogTitle>
      <DialogContent>
        <TextField label="Nombre" name="nombre" fullWidth onChange={handleChange} margin="dense" error={!!errors.nombre} helperText={errors.nombre} />
        <TextField label="Usuario" name="usuario" fullWidth onChange={handleChange} margin="dense" error={!!errors.usuario} helperText={errors.usuario} />
        <TextField label="Contraseña" name="contrasena" type="password" fullWidth onChange={handleChange} margin="dense" error={!!errors.contrasena} helperText={errors.contrasena} />
        <TextField select label="Lugar Asignado" name="idLugar" value={nuevoUsuario.idLugar || ""} fullWidth onChange={handleChange} margin="dense" error={!!errors.idLugar} helperText={errors.idLugar}>
          {lugares.length > 0 ? lugares.map(lugar => (
            <MenuItem key={lugar.idlugar} value={lugar.idlugar}>{lugar.lugar}</MenuItem>
          )) : <MenuItem disabled>No hay lugares disponibles</MenuItem>}
        </TextField>
        <TextField select label="Rol" name="rol" value={nuevoUsuario.rol || ""} fullWidth onChange={handleChange} margin="dense" error={!!errors.rol} helperText={errors.rol}>
          {roles.map(rol => (
            <MenuItem key={rol.id} value={rol.id}>{rol.nombre}</MenuItem>
          ))}
        </TextField>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => setOpen(false)} variant="outlined">Cancelar</Button>
        <Button onClick={handleSubmit} variant="contained" color="primary">Guardar</Button>
      </DialogActions>
    </Dialog>
  );
};

export default UsuarioDialog;
