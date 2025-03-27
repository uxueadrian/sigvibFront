import React from "react";
import { Modal, Box, TextField, Button } from "@mui/material";

const AgregarLugarModal = ({ open, onClose, nuevoLugar, setNuevoLugar, handleAgregarLugar }) => {
  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={{ padding: 4, backgroundColor: "#FFF", margin: "10% auto", width: "300px", borderRadius: "8px" }}>
        <h2>Agregar Lugar</h2>
        <TextField
          fullWidth
          label="Nombre del lugar"
          value={nuevoLugar}
          onChange={(e) => setNuevoLugar(e.target.value)}
        />
        <Button
          variant="contained"
          color="primary"
          fullWidth
          style={{ marginTop: "10px" }}
          onClick={handleAgregarLugar}
        >
          Guardar
        </Button>
      </Box>
    </Modal>
  );
};

export default AgregarLugarModal;
