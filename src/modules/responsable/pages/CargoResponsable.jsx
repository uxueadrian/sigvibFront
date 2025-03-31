import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "../../../context/AuthContext";
import { Typography, CircularProgress, Box } from "@mui/material";
import axios from "axios";

import { Tituloh1 } from "../../../../styles/typography";
import { BienCard, CardMediaResponsiva, CardContentResponsiva } from "../../../../styles/cards";
import { ContainerResponsiva, CardsGrid, CardItem, PaperResponsiva, CustomBox } from "../../../../styles/layout";
import { CustomAlert, CustomSnackbar } from "../../../../styles/feedback";

const BienCardComponent = ({ bien }) => {
  return (
    <BienCard>
      <CardMediaResponsiva
        image={bien.modelo?.foto || "/placeholder-item.png"}
        alt={bien.tipoBien?.nombre}
      />
      <CardContentResponsiva>
        <Typography variant="h6" component="div">
          {bien.tipoBien?.nombre || "Sin tipo"} - {bien.marca?.nombre || "Sin marca"}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          <strong>Modelo:</strong> {bien.modelo?.nombreModelo || "Sin asignar"}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          <strong>Número de serie:</strong> {bien.nSerie || "No disponible"}
        </Typography>
      </CardContentResponsiva>
    </BienCard>
  );
};

const CargoResponsable = () => {
  const { user } = useContext(AuthContext);
  const [bienes, setBienes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBienes = async () => {
      if (!user?.idUsuario) return;
      
      try {
        setLoading(true);
        const response = await axios.get(`http://localhost:8080/bienes/responsable/${user.idUsuario}`);
        
        if (response.data && response.data.result) {
          setBienes(response.data.result);
        } else {
          setBienes([]);
        }
      } catch (error) {
        console.error("Error al obtener los bienes:", error);
        setError("Error al cargar los bienes asignados");
      } finally {
        setLoading(false);
      }
    };

    fetchBienes();
  }, [user]);

  return (
    <ContainerResponsiva maxWidth="xl">
      <Tituloh1>Bienes a mi cargo</Tituloh1>
      <PaperResponsiva elevation={3}>
        {error && (
          <CustomAlert severity="error" sx={{ mb: 2 }}>
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
                <BienCardComponent bien={bien} />
              </CardItem>
            ))}
          </CardsGrid>
        ) : (
          <CustomAlert severity="info">
            No tienes bienes asignados actualmente.
          </CustomAlert>
        )}
      </PaperResponsiva>
    </ContainerResponsiva>
  );
};

export default CargoResponsable;