import React, { useState, useEffect } from "react";
import axios from "axios";
import CustomTable from "../../../components/CustomTable";
import { Button, Modal, Box, TextField, Typography, CircularProgress } from "@mui/material";

const TipoBien = () => {
  const [tipoBien, setTipoBien] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [nombre, setNombre] = useState("");
  const [error, setError] = useState(null);
  const [creating, setCreating] = useState(false);

  // Columnas de la tabla
  const columnas = [
    { field: "id", headerName: "ID", width: 100 },
    { field: "nombre", headerName: "Tipo de bien", width: 120 },
    {
      field: "status",
      headerName: "Estado",
      width: 150,
      renderCell: (params) => {
        const estado = String(params.row.status).toLowerCase();
        return estado === "true" ? (
          <Button variant="outlined" color="success">
            Activo
          </Button>
        ) : (
          <Button variant="outlined" color="error">
            Inactivo
          </Button>
        );
      },
    },
  ];

  // Obtener tipos de bien
  const fetchTiposBien = async () => {
    try {
      const response = await axios.get("http://localhost:8080/tipo-bien");
      const tipos = response.data.result.map((tipobien) => ({
        ...tipobien,
        id: tipobien.idTipo,
      }));
      setTipoBien(tipos);
    } catch (error) {
      console.error("Error al obtener los tipos de bien:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTiposBien();
  }, []);

  // Crear tipo de bien
  const handleCreateTipoBien = async () => {
    if (nombre.trim() === "") {
      setError("El nombre es obligatorio.");
      return;
    }

    setCreating(true);
    setError(null);

    try {
      await axios.post("http://localhost:8080/tipos-bienes", {
        nombre: nombre.trim(),
        status: true,
      });

      setNombre("");
      setModalOpen(false);
      fetchTiposBien();
    } catch (error) {
      console.error("Error al crear el tipo de bien:", error);
      setError("Hubo un error al crear el tipo de bien. Inténtalo de nuevo.");
    } finally {
      setCreating(false);
    }
  };

  return (
    <div>
      <CustomTable columns={columnas} rows={tipoBien} loading={loading} pagina={"Tipo bien"} />
     

      {/* Modal para crear Tipo de Bien */}
      <Modal open={modalOpen} onClose={() => setModalOpen(false)}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
            borderRadius: 2,
          }}
        >
          <Typography variant="h6" component="h2" gutterBottom>
            Crear Tipo de Bien
          </Typography>
          <TextField
            fullWidth
            label="Nombre"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            error={!!error}
            helperText={error}
            margin="normal"
          />
          <Box sx={{ display: "flex", justifyContent: "space-between", mt: 2 }}>
            <Button variant="outlined" onClick={() => setModalOpen(false)} disabled={creating}>
              Cancelar
            </Button>
            <Button variant="contained" onClick={handleCreateTipoBien} disabled={creating}>
              {creating ? <CircularProgress size={24} /> : "Crear"}
            </Button>
          </Box>
        </Box>
      </Modal>
    </div>
  );
};

export default TipoBien;
