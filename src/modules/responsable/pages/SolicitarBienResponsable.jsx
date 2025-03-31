import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "../../../context/AuthContext";
import { Typography, CircularProgress, Box } from "@mui/material";
import axios from "axios";

import { Tituloh1 } from "../../../../styles/typography";
import { SolicitarBtn } from "../../../../styles/buttons";
import { BienCard, CardMediaResponsiva, CardContentResponsiva } from "../../../../styles/cards";
import { ContainerResponsiva, CardsGrid, CardItem, PaperResponsiva, CustomBox } from "../../../../styles/layout";
import { CustomAlert, CustomSnackbar } from "../../../../styles/feedback";

const BienCardComponent = ({ bien, onSolicitar }) => {
  return (
    <BienCard>
      <CardMediaResponsiva
        image={bien.modelo?.foto || "/placeholder-item.png"}
        alt={bien.tipoBien?.nombre} />
      <CardContentResponsiva>
        <Typography variant="h6" component="div">
          {bien.tipoBien?.nombre || "Sin asignar"}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          <strong>Marca:</strong> {bien.marca?.nombre || "Sin asignar"}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          <strong>Modelo:</strong> {bien.modelo?.nombreModelo || "Sin asignar"}
        </Typography>
      </CardContentResponsiva>
      <SolicitarBtn onClick={() => onSolicitar(bien.idBien)}>
        Solicitar
      </SolicitarBtn>
    </BienCard>
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
      const response = await axios.get("http://localhost:8080/bienes");
      console.log("Bienes recibidos:", response.data.result);
      const bienesLibres = response.data.result.filter(bien => bien.idBien && !bien.lugar);
      setBienes(bienesLibres);
    } catch (error) {
      console.error("Error al obtener los bienes:", error);
      setError("Error al obtener los bienes.");
    } finally {
      setLoading(false);
    }
  };

  const handleSolicitar = async (idBien) => {
    console.log("Solicitando bien con ID:", idBien);
    if (!idBien) {
      console.error("Error: ID de bien es undefined");
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
      setSuccessMessage("Bien asignado correctamente.");
      setTimeout(() => setSuccessMessage(null), 3000);
    } catch (error) {
      console.error("Error al solicitar el bien:", error);
      setError("Hubo un error al solicitar el bien.");
      setTimeout(() => setError(null), 3000);
    }
  };

  return (
    <ContainerResponsiva maxWidth="xl">
      <Tituloh1>Solicitar Bienes</Tituloh1>
      <PaperResponsiva elevation={3}>
        {successMessage && (
          <CustomAlert severity="success">
            {successMessage}
          </CustomAlert>
        )}
        {error && (
          <CustomAlert severity="error">
            {error}
          </CustomAlert>
        )}
        {loading ? (
          <CustomBox>
            <CircularProgress />
          </CustomBox>
        ) : bienes.length > 0 ? (
          <CardsGrid container spacing={3}>
            {bienes.map((bien) => (
              <CardItem item xs={12} sm={6} md={4} lg={3} key={bien.idBien}>
                <BienCardComponent bien={bien} onSolicitar={handleSolicitar} />
              </CardItem>
            ))}
          </CardsGrid>
        ) : (
          <CustomAlert severity="info">
            No hay bienes libres disponibles actualmente.
          </CustomAlert>
        )}
      </PaperResponsiva>
    </ContainerResponsiva>
  );
};

export default SolicitarBienBecario;
