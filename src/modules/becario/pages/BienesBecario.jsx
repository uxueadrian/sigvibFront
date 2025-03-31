import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "../../../context/AuthContext";
import { Typography, CircularProgress, Box } from "@mui/material";
import axios from "axios";

import { Tituloh1 } from "../../../../styles/typography";
import { EliminarBtn } from "../../../../styles/buttons";
import { BienCard, CardMediaResponsiva, CardContentResponsiva } from "../../../../styles/cards";
import { ContainerResponsiva, CardsGrid, CardItem, PaperResponsiva, CustomBox } from "../../../../styles/layout";
import { CustomAlert, CustomSnackbar } from "../../../../styles/feedback";

const BienCardComponent = ({ bien, onEliminarLugar }) => {
  return (
    <BienCard>
      <CardMediaResponsiva
        image={bien.modelo.foto || '/placeholder-image.jpg'} // Añade imagen por defecto
        alt={bien.tipoBien.nombre} />
      <CardContentResponsiva >

        <Typography variant="h6" component="div">
          {bien.tipoBien.nombre}
        </Typography>

        <Typography variant="body2" color="text.secondary">
          Marca: {bien.marca.nombre}
        </Typography>
        
        <Typography variant="body2" color="text.secondary">
          Modelo: {bien.modelo.nombreModelo}
        </Typography>

      </CardContentResponsiva>

      <CustomBox>
        <EliminarBtn onClick={() => onEliminarLugar(bien.idBien)} >
          Eliminar Lugar
        </EliminarBtn>
      </CustomBox>
      
    </BienCard>
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
    <ContainerResponsiva maxWidth="xl">
      <Tituloh1> Bienes Becarios </Tituloh1>
      <PaperResponsiva elevation={3} >
        {loading ? (
          <CustomBox >
            <CircularProgress />
          </CustomBox>
        ) : error ? (
          <CustomAlert severity="error">
            Error al obtener los bienes. Por favor intenta más tarde.
          </CustomAlert>
        ) : bienes.length > 0 ? (
          <CardsGrid container spacing={3}>
            {bienes.map((bien) => (
              <CardItem item xs={12} sm={6} md={4} lg={3} key={bien.idBien}>
                <BienCardComponent bien={bien} onEliminarLugar={eliminarLugarDeBien} />
              </CardItem>
            ))}
          </CardsGrid>
        ) : (
          <CustomAlert severity="info">
            No hay bienes disponibles para mostrar.
          </CustomAlert>
        )}
      </PaperResponsiva>

      <CustomSnackbar
        open={snackbar.open}
        autoHideDuration={4000}
        onClose={handleCloseSnackbar} >
        <CustomAlert
          onClose={handleCloseSnackbar}
          severity={snackbar.severity} >
          {snackbar.message}
        </CustomAlert>
      </CustomSnackbar>
    </ContainerResponsiva>
  );
};

export default BienesBecario;

