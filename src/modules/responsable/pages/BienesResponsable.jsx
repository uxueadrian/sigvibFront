import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "../../../context/AuthContext";
import { Typography, CircularProgress, Box } from "@mui/material";
import axios from "axios";

import { Tituloh1 } from "../../../../styles/typography";
import { EliminarBtn } from "../../../../styles/buttons";
import { BienCard, CardMediaResponsiva, CardContentResponsiva } from "../../../../styles/cards";
import { ContainerResponsiva, CardsGrid, CardItem, PaperResponsiva, CustomBox } from "../../../../styles/layout";
import { CustomAlert, CustomSnackbar } from "../../../../styles/feedback";

const BienCardComponent = ({ bien, onEliminar }) => {
    return (
      <BienCard>
        <CardMediaResponsiva
          image={bien.modelo?.foto || "/placeholder-item.png"}
          alt={bien.tipoBien?.nombre}/>
        <CardContentResponsiva>
          <Typography variant="h6" component="div">
            {bien.tipoBien?.nombre || "Sin tipo"}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            <strong>Marca:</strong> {bien.marca?.nombre || "Sin marca"}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            <strong>Modelo:</strong> {bien.modelo?.nombreModelo || "Sin asignar"}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            <strong>N° Serie:</strong> {bien.nSerie || "No disponible"}
          </Typography>
        </CardContentResponsiva>
        <Box sx={{ p: 2 }}>
          <EliminarBtn 
            fullWidth 
            onClick={() => onEliminar(bien.idBien)} >
            Eliminar Lugar
          </EliminarBtn>
        </Box>
      </BienCard>
    );
  };
  
  const BienesResponsable = () => {
    const { user } = useContext(AuthContext);
    const [bienes, setBienes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [successMessage, setSuccessMessage] = useState(null);
    const idLugar = user?.idLugar || localStorage.getItem("idLugar");
  
    const fetchBienes = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`http://localhost:8080/lugares/${idLugar}/bienes`);
        
        if (response.status === 200 && response.data.type === "SUCCESS") {
          setBienes(response.data.result || []);
        } else {
          setError("No se encontraron bienes.");
        }
      } catch (error) {
        setError("Error al obtener los bienes.");
        console.error("Error fetching bienes:", error);
      } finally {
        setLoading(false);
      }
    };
  
    const eliminarLugarDeBien = async (idBien) => {
      try {
        const response = await axios.patch(
          `http://localhost:8080/bienes/${idBien}/eliminar-lugar`
        );
        
        if (response.status === 200 && response.data.type === "SUCCESS") {
          setSuccessMessage("Lugar eliminado exitosamente del bien.");
          fetchBienes(); // Refrescar lista de bienes
        } else {
          setError("No se pudo eliminar el lugar del bien.");
        }
      } catch (error) {
        setError("Error al eliminar el lugar del bien.");
        console.error("Error eliminando lugar:", error);
      }
    };
  
    useEffect(() => {
      if (!idLugar) {
        setError("No se encontró el ID del lugar.");
        setLoading(false);
        return;
      }
      fetchBienes();
    }, [idLugar]);
  
    const handleCloseSnackbar = () => {
      setSuccessMessage(null);
      setError(null);
    };
  
    return (
      <ContainerResponsiva maxWidth="xl">
        <Tituloh1>Mis Bienes</Tituloh1>
        <PaperResponsiva elevation={3}>
          {successMessage && (
            <CustomAlert severity="success" sx={{ mb: 2 }}>
              {successMessage}
            </CustomAlert>
          )}
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
                  <BienCardComponent 
                    bien={bien} 
                    onEliminar={eliminarLugarDeBien} 
                  />
                </CardItem>
              ))}
            </CardsGrid>
          ) : (
            <CustomAlert severity="info">
              No se encontraron bienes asignados a este lugar.
            </CustomAlert>
          )}
        </PaperResponsiva>
        
        <CustomSnackbar
          open={!!successMessage || !!error}
          autoHideDuration={6000}
          onClose={handleCloseSnackbar}>
          <div>
            {successMessage && (
              <CustomAlert onClose={handleCloseSnackbar} severity="success">
                {successMessage}
              </CustomAlert>
            )}
            {error && (
              <CustomAlert onClose={handleCloseSnackbar} severity="error">
                {error}
              </CustomAlert>
            )}
          </div>
        </CustomSnackbar>
      </ContainerResponsiva>
    );
};
  
export default BienesResponsable;
