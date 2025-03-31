import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "../../../context/AuthContext";
import { Button, Typography, Card, CardMedia, CardContent, Grid, Paper, Container, Box, Alert, CircularProgress } from "@mui/material";
import axios from "axios";
import { createTheme, styled } from "@mui/material/styles";

const theme = createTheme({ breakpoints: { values: { xs: 0, sm: 600, md: 900, lg: 1200, xl: 1536, }, },
  palette: { primary: { main: '#B0E338', }, error: { main: '#f44336', dark: '#d32f2f', }, } });

const Tituloh1 = styled(Typography)(({ theme }) => ({
  color: theme.palette.primary.main,
  fontSize: '2.5rem',
  fontWeight: 700,
  marginBottom: theme.spacing(4),
  textAlign: 'center',
  [theme.breakpoints.down('sm')]: {
    fontSize: '2rem',
    marginBottom: theme.spacing(3),
  },
}));

const BienCard = styled(Card)(({ theme }) => ({
  backgroundColor: theme.palette.common.white,
  borderRadius: '12px',
  transition: 'all 0.3s ease',
  display: 'flex',
  flexDirection: 'column',
  height: '100%',
  '&:hover': {
    transform: 'translateY(-1px)',
  },
  [theme.breakpoints.down('sm')]: {
    borderRadius: '8px',
  },
}));

const CardMediaResponsiva = styled(CardMedia)(({ theme }) => ({
  height: 0,
  paddingTop: '56.25%', // Relación 16:9
  position: 'relative',
  backgroundSize: 'contain',
  backgroundRepeat: 'no-repeat',
  backgroundPosition: 'center',
  backgroundColor: '#f5f5f5',
  borderBottom: `1px solid ${theme.palette.divider}`,
}));

const CardContentResponsiva = styled(CardContent)(({ theme }) => ({
  flexGrow: 1,
  padding: theme.spacing(2),
  '& .MuiTypography-root': {
    marginBottom: theme.spacing(1),
    '&:last-child': {
      marginBottom: 0,
    },
  },
}));

const CardsGrid = styled(Grid)(({ theme }) => ({
  padding: theme.spacing(2),
  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(1),
  },
}));

const PaperResponsiva = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(1),
  borderRadius: '12px',
  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(2),
  },
}));

const ContainerResponsiva = styled(Container)(({ theme }) => ({
  padding: theme.spacing(2),
  marginTop: '64px', // Ajusta según la altura de tu Navbar
  transition: 'margin 0.3s ease',
  '&.sidebar-open': {
    marginLeft: '240px',
    width: 'calc(100% - 240px)',
  },
  [theme.breakpoints.down('md')]: {
    '&.sidebar-open, &.sidebar-closed': {
      marginLeft: 0,
      width: '100%',
      padding: theme.spacing(2),
    },
  },
  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(1),
  },
}));

const CardItem = styled(Grid)(({ theme }) => ({
  padding: theme.spacing(2),
  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(1),
  },
}));

const CustomBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  minHeight: '50px'
}));

const CustomAlert = styled(Alert)(({ theme }) => ({
  borderRadius: '8px',
  fontWeight: 500,
}));

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