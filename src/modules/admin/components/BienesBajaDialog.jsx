// admin/components/BienesBajaDialog.jsx
import React from "react";
import { Button, TextField, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";

const BienesBajaDialog = ({ openBaja, handleClose, handleDarDeBaja, motivoBaja, setMotivoBaja }) => {
  return (
    <Dialog open={openBaja} onClose={handleClose}>
      <DialogTitle>Dar de Baja</DialogTitle>
      <DialogContent>
        <TextField
          label="Motivo de Baja"
          fullWidth
          multiline
          rows={4}
          value={motivoBaja}
          onChange={(e) => setMotivoBaja(e.target.value)}
          margin="dense"
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancelar</Button>
        <Button onClick={handleDarDeBaja} color="primary">Confirmar Baja</Button>
      </DialogActions>
    </Dialog>
  );
};

export default BienesBajaDialog;
