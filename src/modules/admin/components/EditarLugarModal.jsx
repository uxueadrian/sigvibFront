import React from "react";
import { Modal, Box, TextField, Button } from "@mui/material";

const EditarLugarModal = ({ open, onClose, lugarEditar, setLugarEditar, handleActualizarLugar }) => {
  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={{ padding: 4, backgroundColor: "#FFF", margin: "10% auto", width: "300px", borderRadius: "8px" }}>
        <h2>Editar Lugar</h2>
        <TextField
          fullWidth
          label="Nombre del lugar"
          value={lugarEditar.lugar}
          onChange={(e) => setLugarEditar({ ...lugarEditar, lugar: e.target.value })}
        />
        <Button
          variant="contained"
          color="primary"
          fullWidth
          style={{ marginTop: "10px" }}
          onClick={handleActualizarLugar}
        >
          Actualizar
        </Button>
      </Box>
    </Modal>
  );
};

export default EditarLugarModal;
