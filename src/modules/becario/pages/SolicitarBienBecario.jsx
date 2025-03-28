import React, { useState, useEffect, useContext } from "react";
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
  Typography,
  Alert,
  Paper
} from "@mui/material";
import { AuthContext } from "../../../context/AuthContext";

const BienCard = ({ bien, onSolicitar }) => {
  return (
    <Card sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
      <CardMedia
        component="img"
        height="160"
        image={bien.modelo?.foto || "/placeholder-item.png"}
        alt={bien.tipoBien?.nombre}
        sx={{ objectFit: "cover" }}
      />
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography gutterBottom variant="h6" component="h3">
          {bien.tipoBien?.nombre || "Sin asignar"}
        </Typography>
        <Typography variant="body2" color="text.secondary" paragraph>
          <strong>Marca:</strong> {bien.marca?.nombre || "Sin asignar"}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          <strong>Modelo:</strong> {bien.modelo?.nombreModelo || "Sin asignar"}
        </Typography>
      </CardContent>
      <Button
        variant="contained"
        color="primary"
        fullWidth
        onClick={() => onSolicitar(bien.idBien)}
        sx={{ mt: "auto" }}
      >
        Solicitar
      </Button>
    </Card>
  );
};

const SolicitarBienBecario = () => {
  const { user, token } = useContext(AuthContext);
  const [bienes, setBienes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  useEffect(() => {
    fetchBienesLibres();
  }, []);

  const fetchBienesLibres = async () => {
    try {
      setLoading(true);
      const response = await axios.get("http://localhost:8080/bienes");
      const bienesLibres = response.data.result.filter(bien => bien.idBien && !bien.lugar);
      setBienes(bienesLibres);
      setError(null);
    } catch (error) {
      setError("Error al obtener los bienes. Por favor intenta más tarde.");
    } finally {
      setLoading(false);
    }
  };

  const handleSolicitar = async (idBien) => {
    if (!idBien) {
      setError("Error: No se pudo obtener el ID del bien.");
      return;
    }
    if (!user || !user.idLugar) {
      setError("No se pudo obtener la información del usuario.");
      return;
    }

    try {
      await axios.patch(
        `http://localhost:8080/bienes/${idBien}/asignar-lugar/${user.idLugar}`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setBienes(prevBienes => prevBienes.filter(bien => bien.idBien !== idBien));
      setSuccessMessage("¡Bien asignado correctamente!");
      setTimeout(() => setSuccessMessage(null), 5000);
    } catch (error) {
      setError("Hubo un error al solicitar el bien.");
    }
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Paper elevation={3} sx={{ p: 4, backgroundColor: "#E3F2FD" }}>
        <Typography variant="h4" component="h1" gutterBottom sx={{ mb: 4, color: "#1565C0" }}>
          Solicitar Bienes
        </Typography>

        {successMessage && (
          <Alert severity="success" sx={{ mb: 3 }}>
            {successMessage}
          </Alert>
        )}

        {error && (
          <Alert severity="error" sx={{ mb: 3 }}>
            {error}
          </Alert>
        )}

        {loading ? (
          <Box sx={{ display: "flex", justifyContent: "center", py: 4 }}>
            <CircularProgress />
          </Box>
        ) : bienes.length > 0 ? (
          <Grid container spacing={3}>
            {bienes.map((bien) => (
              <Grid item key={bien.idBien} xs={12} sm={6} md={4} lg={3}>
                <BienCard bien={bien} onSolicitar={handleSolicitar} />
              </Grid>
            ))}
          </Grid>
        ) : (
          <Alert severity="info">
            No hay bienes libres disponibles actualmente.
          </Alert>
        )}
      </Paper>
    </Container>
  );
};

export default SolicitarBienBecario;