import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "../../../context/AuthContext";
import { Container, Typography, Grid, Card, CardMedia, CardContent } from "@mui/material";

const CardComponent = ({ image, title, description }) => {
  return (
    <Card>
      <CardMedia />
      <CardContent>
        <Typography >
          {title}
        </Typography>
        <Typography >
          {description}
        </Typography>
      </CardContent>
    </Card>
  );
};

const CargoResponsable = () => {
  const { user } = useContext(AuthContext);
  const [bienes, setBienes] = useState([]);

  useEffect(() => {
    const fetchBienes = async () => {
      if (!user?.idUsuario) return;
      try {
        const response = await fetch(`http://localhost:8080/bienes/responsable/${user.idUsuario}`);
        if (!response.ok) throw new Error("Error al obtener los bienes");
        const data = await response.json();
        setBienes(data.result || []);
      } catch (error) {
        console.error("Error al obtener los bienes:", error);
      }
    };
    fetchBienes();
  }, [user]);

  return (
    <Container >
      <Typography >
        Bienes asignados a {user?.username}
      </Typography>
      <Grid container spacing={3}>
        {bienes.length > 0 ? (
          bienes.map((bien) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={bien.idBien}>
              <CardComponent
                image={bien.modelo?.foto || "https://via.placeholder.com/140"}
                title={`${bien.tipoBien?.nombre || "Bien"} - ${bien.marca?.nombre || "Sin marca"}`}
                description={`Número de serie: ${bien.nSerie}`}
              />
            </Grid>
          ))
        ) : (
          <Typography >
            No tienes bienes asignados
          </Typography>
        )}
      </Grid>
    </Container>
  );
};

export default CargoResponsable;
