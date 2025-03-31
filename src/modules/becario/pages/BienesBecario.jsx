import React, { useState, useEffect } from "react";
import axios from "axios";
import {Box, Button, Card, CardContent, CardMedia, CircularProgress, Container, Grid, Snackbar, Typography, Alert, Paper } from "@mui/material";
import { createTheme, styled } from "@mui/material/styles";

const theme = createTheme({ breakpoints: { values: { xs: 0, sm: 600, md: 900, lg: 1200, xl: 1536, }, }, 
  palette: { primary: { main: '#B0E338', }, error: { main: '#f44336', dark: '#d32f2f', }, }, });

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

const EliminarBtn = styled(Button)(({ theme }) => ({
  backgroundColor: theme.palette.error.main,
  color: theme.palette.common.white,
  fontWeight: 500,
  padding: theme.spacing(1, 1),
  borderRadius: '3px',
  textTransform: 'none',
  '&:hover': {
    backgroundColor: theme.palette.error.dark,
    transform: 'translateY(-1px)',
    boxShadow: theme.shadows[2],
  },
  '&:active': {
    transform: 'translateY(0)',
  },
}));

const BienCard = styled(Card)(({ theme }) => ({
  height: '100%',
  display: 'flex',
  flexDirection: 'column',

  backgroundColor: theme.palette.common.white,
  borderRadius: '12px',
  transition: 'all 0.3s ease',
  flexDirection: 'column','&:hover': {
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

const CardsGrid = styled(Grid)(({ theme }) => ({
  padding: theme.spacing(2),
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

const PaperResponsiva = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(1),
  borderRadius: '12px',
  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(2),
  },
}));

const CustomSnackbar = styled(Snackbar)(({ theme }) => ({
  '& .MuiAlert-root': {
    boxShadow: theme.shadows[6],
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
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbar.severity} >
          {snackbar.message}
        </Alert>
      </CustomSnackbar>
    </ContainerResponsiva>
  );
};

export default BienesBecario;

