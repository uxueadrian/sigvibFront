import React, { useState, useEffect } from "react";
import axios from "axios";

import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  CircularProgress,
  Container,
  Grid,
  Snackbar,
  Typography,
  Alert,
  Paper
} from "@mui/material";

const BienCard = ({ bien, onEliminarLugar }) => {
  return (
    <Card sx={{ maxWidth: 345, height: "100%", display: "flex", flexDirection: "column" }}>
      <CardMedia
        component="img"
        height="140"
        image={bien.modelo.foto}
        alt={bien.tipoBien.nombre}
      />
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography gutterBottom variant="h6" component="div">
          {bien.tipoBien.nombre}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Marca: {bien.marca.nombre}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Modelo: {bien.modelo.nombreModelo}
        </Typography>
      </CardContent>
      <Box sx={{ p: 2 }}>
        <Button
          variant="contained"
          color="error"
          fullWidth
          onClick={() => onEliminarLugar(bien.idBien)}
        >
          Eliminar Lugar
        </Button>
      </Box>
    </Card>
  );
};

const BienesBecario = ({ user }) => {
  const [bienes, setBienes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success"
  });

  const idLugar = user?.idLugar || localStorage.getItem("idLugar");

  const fetchBienes = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`http://localhost:8080/lugares/${idLugar}/bienes`);
      if (response.status === 200 && response.data.type === "SUCCESS") {
        setBienes(response.data.result);
        setError(null);
      } else {
        setError("No se encontraron bienes.");
      }
    } catch (error) {
      setError("Error al obtener los bienes. Por favor intenta más tarde.");
    } finally {
      setLoading(false);
    }
  };

  const eliminarLugarDeBien = async (idBien) => {
    try {
      const response = await axios.patch(`http://localhost:8080/bienes/${idBien}/eliminar-lugar`);
      if (response.status === 200 && response.data.type === "SUCCESS") {
        setSnackbar({
          open: true,
          message: "Lugar eliminado exitosamente del bien",
          severity: "success"
        });
        fetchBienes();
      } else {
        setSnackbar({
          open: true,
          message: "No se pudo eliminar el lugar del bien",
          severity: "error"
        });
      }
    } catch (error) {
      setSnackbar({
        open: true,
        message: "Error al eliminar el lugar del bien",
        severity: "error"
      });
    }
  };

  useEffect(() => {
    if (!idLugar) {
      setError("No se encontró el ID del lugar. Por favor inicia sesión nuevamente.");
      setLoading(false);
      return;
    }
    fetchBienes();
  }, [idLugar]);

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Paper elevation={3} sx={{ p: 4, backgroundColor: "#FFF3E0" }}>
        <Typography variant="h4" component="h1" gutterBottom sx={{ mb: 4 }}>
          Bienes Becario
        </Typography>

        {loading ? (
          <Box sx={{ display: "flex", justifyContent: "center", py: 4 }}>
            <CircularProgress />
          </Box>
        ) : error ? (
          <Alert severity="error" sx={{ mb: 3 }}>
            {error}
          </Alert>
        ) : bienes.length > 0 ? (
          <Grid container spacing={3}>
            {bienes.map((bien) => (
              <Grid item key={bien.idBien} xs={12} sm={6} md={4} lg={3}>
                <BienCard bien={bien} onEliminarLugar={eliminarLugarDeBien} />
              </Grid>
            ))}
          </Grid>
        ) : (
          <Alert severity="info" sx={{ mb: 3 }}>
            No hay bienes disponibles para mostrar.
          </Alert>
        )}
      </Paper>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbar.severity}
          sx={{ width: "100%" }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default BienesBecario;

