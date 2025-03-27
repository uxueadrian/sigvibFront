import React from "react";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, MenuItem, TextField } from "@mui/material";

const BienesForm = ({ open, handleClose, handleChange, handleSubmit, nuevoBien, tiposBien, modelos, marcas, lugares, usuarios }) => {

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
      <DialogTitle sx={{ bgcolor: "#6A1B9A", color: "white" }}>Agregar Bien</DialogTitle>
      <DialogContent>
        <TextField label="Número de Serie" name="nSerie" fullWidth onChange={handleChange} margin="dense" variant="outlined" />
        
        <TextField select label="Tipo de Bien" name="idTipo" value={nuevoBien.idTipo} fullWidth onChange={handleChange} margin="dense" variant="outlined">
          {tiposBien.map((tipo) => (
            <MenuItem key={tipo.idTipo} value={tipo.idTipo}>{tipo.nombre}</MenuItem>
          ))}
        </TextField>
        
        <TextField select label="Modelo" name="idModelo" value={nuevoBien.idModelo} fullWidth onChange={handleChange} margin="dense" variant="outlined">
          {modelos.map((modelo) => (
            <MenuItem key={modelo.idModelo} value={modelo.idModelo}>{modelo.nombreModelo}</MenuItem>
          ))}
        </TextField>
        
        <TextField select label="Marca" name="idMarca" value={nuevoBien.idMarca} fullWidth onChange={handleChange} margin="dense" variant="outlined">
          {marcas.map((marca) => (
            <MenuItem key={marca.idmarca} value={marca.idmarca}>{marca.nombre}</MenuItem>
          ))}
        </TextField>
        
        <TextField select label="Lugar Asignado" name="idLugar" value={nuevoBien.idLugar} fullWidth onChange={handleChange} margin="dense" variant="outlined">
          {lugares.length === 0 ? (
            <MenuItem disabled>Cargando Lugares...</MenuItem>
          ) : (
            lugares.map((lugar) => (
              <MenuItem key={lugar.idlugar} value={lugar.idlugar}>{lugar.lugar}</MenuItem>
            ))
          )}
        </TextField>

        <TextField select label="Responsable" name="idUsuario" value={nuevoBien.idUsuario} fullWidth onChange={handleChange} margin="dense" variant="outlined">
  {usuarios
    ?.filter((usuario) => usuario.rol.nombre === "ROLE_RESPONSABLE") // Ahora usa "usuarios"
    .map((usuario) => (
      <MenuItem key={usuario.idusuario} value={usuario.idusuario}>
        {usuario.nombre}
      </MenuItem>
    ))}
</TextField>


      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="error">Cancelar</Button>
        <Button onClick={handleSubmit} color="primary" variant="contained">Guardar</Button>
      </DialogActions>
    </Dialog>
  );
};

export default BienesForm;
