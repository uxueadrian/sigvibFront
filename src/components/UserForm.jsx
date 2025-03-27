import React, { useState, useEffect } from "react";
import { TextField, Button, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";

const UserForm = ({ open, handleClose, handleSave, user }) => {
  const [formData, setFormData] = useState({
    nombre: "",
    usuario: "",
    contraseña: "",
    rol: "",
    lugar: "",
    status: true,
  });

  useEffect(() => {
    if (user) {
      setFormData(user);
    } else {
      setFormData({
        nombre: "",
        usuario: "",
        contraseña: "",
        rol: "",
        lugar: "",
        status: true,
      });
    }
  }, [user]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    handleSave(formData);
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>{user ? "Editar Usuario" : "Agregar Usuario"}</DialogTitle>
      <DialogContent>
        <TextField label="Nombre" name="nombre" value={formData.nombre} onChange={handleChange} fullWidth margin="normal" />
        <TextField label="Usuario" name="usuario" value={formData.usuario} onChange={handleChange} fullWidth margin="normal" />
        <TextField label="Contraseña" name="contraseña" type="password" value={formData.contraseña} onChange={handleChange} fullWidth margin="normal" />
        <TextField label="Rol" name="rol" value={formData.rol} onChange={handleChange} fullWidth margin="normal" />
        <TextField label="Lugar" name="lugar" value={formData.lugar} onChange={handleChange} fullWidth margin="normal" />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="secondary">Cancelar</Button>
        <Button onClick={handleSubmit} color="primary">Guardar</Button>
      </DialogActions>
    </Dialog>
  );
};

export default UserForm;

