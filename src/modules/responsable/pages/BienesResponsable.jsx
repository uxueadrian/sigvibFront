import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "../../../context/AuthContext";
import { Button, Typography, Card, CardMedia, CardContent, Grid, Paper, Container, Box, Alert, CircularProgress, Snackbar } from "@mui/material";
import axios from "axios";
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

const BienCardComponent = ({ bien, onEliminar }) => {
    return (
      <BienCard>
        <CardMediaResponsiva
          image={bien.modelo?.foto || "/placeholder-item.png"}
          alt={bien.tipoBien?.nombre}
        />
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
          onClose={handleCloseSnackbar}
        >
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
