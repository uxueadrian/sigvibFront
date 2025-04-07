import React, { useState, useEffect } from "react";
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, MenuItem, Snackbar, Alert } from "@mui/material";
import axios from "axios";


const EditarBienDialog = ({ open, onClose, bien, tiposBien, modelos, marcas, lugares, onEditSuccess }) => {
  const [editedBien, setEditedBien] = useState(bien);
  const [isLoading, setIsLoading] = useState(false);
  const [notification, setNotification] = useState({ open: false, message: "", severity: "success" });

  useEffect(() => {
    setEditedBien(bien);
  }, [bien]);

  const handleChange = (e) => {
    setEditedBien({ ...editedBien, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    setIsLoading(true);
    axios
      .put(`${import.meta.env.VITE_API_URL}/bienes/${bien.id}`, editedBien)
      .then((response) => {
        onEditSuccess(response.data.result); // Actualizar lista de bienes en el componente padre
        setNotification({ open: true, message: "Bien actualizado con éxito", severity: "success" });
        onClose();
      })
      .catch((error) => {
        setNotification({ open: true, message: `Error: ${error.response?.data || error.message}`, severity: "error" });
      })
      .finally(() => setIsLoading(false));
  };

  const handleCloseNotification = () => {
    setNotification({ ...notification, open: false });
  };

  return (
    <>
      <Dialog open={open} onClose={onClose}>
        <DialogTitle>Editar Bien</DialogTitle>
        <DialogContent>
          <TextField
            label="Número de Serie"
            name="nSerie"
            fullWidth
            value={editedBien?.nSerie || ""}
            onChange={handleChange}
            margin="dense"
          />
          <TextField
            select
            label="Tipo de Bien"
            name="idTipo"
            value={editedBien?.idTipo || ""}
            fullWidth
            onChange={handleChange}
            margin="dense"
          >
            {tiposBien.map((tipo) => (
              <MenuItem key={tipo.idTipo} value={tipo.idTipo}>
                {tipo.nombre}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            select
            label="Modelo"
            name="idModelo"
            value={editedBien?.idModelo || ""}
            fullWidth
            onChange={handleChange}
            margin="dense"
          >
            {modelos.map((modelo) => (
              <MenuItem key={modelo.idModelo} value={modelo.idModelo}>
                {modelo.nombreModelo}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            select
            label="Marca"
            name="idMarca"
            value={editedBien?.idMarca || ""}
            fullWidth
            onChange={handleChange}
            margin="dense"
          >
            {marcas.map((marca) => (
              <MenuItem key={marca.idmarca} value={marca.idmarca}>
                {marca.nombre}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            select
            label="Lugar"
            name="idLugar"
            value={editedBien?.idLugar || ""}
            fullWidth
            onChange={handleChange}
            margin="dense"
          >
            {lugares.map((lugar) => (
              <MenuItem key={lugar.idlugar} value={lugar.idlugar}>
                {lugar.lugar}
              </MenuItem>
            ))}
          </TextField>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose} disabled={isLoading}>Cancelar</Button>
          <Button onClick={handleSave} color="primary" disabled={isLoading}>
            {isLoading ? "Guardando..." : "Guardar"}
          </Button>
        </DialogActions>
      </Dialog>
      <Snackbar
        open={notification.open}
        autoHideDuration={6000}
        onClose={handleCloseNotification}
      >
        <Alert onClose={handleCloseNotification} severity={notification.severity} sx={{ width: "100%" }}>
          {notification.message}
        </Alert>
      </Snackbar>
    </>
  );
};

export default EditarBienDialog;
