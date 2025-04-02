import React, { useState, useEffect } from "react";
import axios from "axios";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { DataGrid } from "@mui/x-data-grid";
import { 
  Button, 
  Switch, 
  CssBaseline, 
  Box, 
  CircularProgress, 
  Modal, 
  TextField,
  Paper,
  Typography,
  useMediaQuery,
  useTheme,
  IconButton,
  Card,
  CardContent,
  CardActions,
  Chip,
  Grid,
  Tooltip
} from "@mui/material";
import { lightTheme, darkTheme } from "./../themes";
import AgregarLugarModal from "./../components/AgregarLugarModal";
import EditarLugarModal from "./../components/EditarLugarModal";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";

const Lugares = () => {
  const [lugares, setLugares] = useState([]);
  const [loading, setLoading] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalEditarOpen, setModalEditarOpen] = useState(false);
  const [nuevoLugar, setNuevoLugar] = useState("");
  const [lugarEditar, setLugarEditar] = useState({ id: null, lugar: "", status: true });
  
  // Theme and responsive breakpoints
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.between('sm', 'md'));

  useEffect(() => {
    axios.get("http://localhost:8080/lugares")
      .then((response) => {
        const lugares = response.data.result.map((lugar) => ({ ...lugar, id: lugar.idlugar }));
        setLugares(lugares);
      })
      .catch((error) => console.error("Error al obtener los lugares:", error))
      .finally(() => setLoading(false));
  }, []);

  const handleCambiarStatus = (idLugar) => {
    axios.patch(`http://localhost:8080/lugares/${idLugar}/status`)
      .then(() => {
        setLugares(lugares.map((lugar) => lugar.id === idLugar ? { ...lugar, status: !lugar.status } : lugar));
      })
      .catch((error) => console.error("Error al cambiar el estado del lugar:", error));
  };

  const handleAgregarLugar = () => {
    if (!nuevoLugar.trim()) return;
    axios.post("http://localhost:8080/lugares", { lugar: nuevoLugar, status: true })
      .then((response) => {
        setLugares([...lugares, { id: response.data.result.idlugar, lugar: nuevoLugar, status: true }]);
        setModalOpen(false);
        setNuevoLugar("");
      })
      .catch((error) => console.error("Error al agregar el lugar:", error));
  };

  const handleAbrirEditarLugar = (lugar) => {
    setLugarEditar(lugar);
    setModalEditarOpen(true);
  };

  const handleActualizarLugar = () => {
    const { id, lugar, status } = lugarEditar;
    axios.put(`http://localhost:8080/lugares/${id}`, { lugar, status })
      .then(() => {
        setLugares(lugares.map((l) => (l.id === id ? { id, lugar, status } : l)));
        setModalEditarOpen(false);
      })
      .catch((error) => console.error("Error al actualizar el lugar:", error));
  };

  const columnas = [
    { 
      field: "lugar", 
      headerName: "Lugar", 
      flex: 1,
      minWidth: 120 
    },
    {
      field: "status", 
      headerName: "Estado", 
      flex: 0.8,
      minWidth: 120,
      renderCell: (params) => (
        <Button 
          variant="outlined" 
          color={params.row.status ? "success" : "error"} 
          onClick={() => handleCambiarStatus(params.row.id)}
          size={isMobile ? "small" : "medium"}
        >
          {params.row.status ? "Activo" : "Inactivo"}
        </Button>
      ),
    },
    {
      field: "acciones", 
      headerName: "Acciones", 
      flex: 0.7,
      minWidth: 100,
      renderCell: (params) => (
        isMobile ? (
          <IconButton 
            color="primary" 
            onClick={() => handleAbrirEditarLugar(params.row)}
            size="small"
          >
            <EditIcon />
          </IconButton>
        ) : (
          <Button 
            variant="contained" 
            color="primary" 
            onClick={() => handleAbrirEditarLugar(params.row)}
            size={isTablet ? "small" : "medium"}
          >
            Editar
          </Button>
        )
      ),
    },
  ];

  // Card view for mobile devices
  const renderMobileCards = () => {
    return (
      <Grid container spacing={2}>
        {lugares.map((lugar) => (
          <Grid item xs={12} key={lugar.id}>
            <Card sx={{ 
              backgroundColor: darkMode ? "#333" : "#fff",
              boxShadow: 2,
              borderLeft: `4px solid ${lugar.status ? '#4caf50' : '#f44336'}`
            }}>
              <CardContent>
                <Typography variant="h6" component="div" sx={{ fontWeight: "bold", color: darkMode ? "#fff" : "#333" }}>
                  {lugar.lugar}
                </Typography>
                <Chip 
                  label={lugar.status ? "Activo" : "Inactivo"}
                  color={lugar.status ? "success" : "error"}
                  size="small"
                  sx={{ mt: 1 }}
                />
              </CardContent>
              <CardActions>
                <Button
                  size="small"
                  variant="outlined"
                  color={lugar.status ? "success" : "error"}
                  onClick={() => handleCambiarStatus(lugar.id)}
                >
                  {lugar.status ? "Desactivar" : "Activar"}
                </Button>
                <Button
                  size="small"
                  variant="contained"
                  color="primary"
                  onClick={() => handleAbrirEditarLugar(lugar)}
                >
                  Editar
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    );
  };

  return (
    <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
      <CssBaseline />
      <Box sx={{ 
        padding: { xs: "10px", sm: "15px", md: "20px" }, 
        minHeight: "100vh", 
        backgroundColor: darkMode ? "#1E1E1E" : "#F3F4F6" 
      }}>
        <Paper 
          elevation={2} 
          sx={{ 
            padding: { xs: "15px", sm: "20px", md: "30px" },
            borderRadius: "10px",
            backgroundColor: darkMode ? "#333" : "#FFFFFF"
          }}
        >
          <Typography 
            variant={isMobile ? "h5" : "h4"} 
            sx={{ 
              color: darkMode ? "#AED581" : "#7CB342", 
              fontWeight: "bold", 
              mb: 2 
            }}
          >
            Lugares
          </Typography>
          
          <Box sx={{ 
            display: "flex", 
            flexDirection: { xs: "column", sm: "row" },
            justifyContent: "space-between", 
            alignItems: { xs: "flex-start", sm: "center" },
            gap: { xs: 2, sm: 0 },
            mb: 2 
          }}>
            <Button 
              variant="contained" 
              color="primary" 
              startIcon={<AddIcon />}
              onClick={() => setModalOpen(true)}
              fullWidth={isMobile}
              sx={{ borderRadius: "8px" }}
            >
              Agregar Lugar
            </Button>
            
            <Box sx={{ 
              display: "flex", 
              alignItems: "center",
              alignSelf: { xs: "flex-end", sm: "auto" }
            }}>
              {darkMode ? 
                <DarkModeIcon sx={{ mr: 1, color: "#AED581" }} /> : 
                <LightModeIcon sx={{ mr: 1, color: "#7CB342" }} />
              }
              <Switch checked={darkMode} onChange={() => setDarkMode(!darkMode)} />
            </Box>
          </Box>
          
          <Box sx={{ width: "100%", margin: "20px auto" }}>
            {loading ? (
              <Box sx={{ display: "flex", justifyContent: "center", p: 3 }}>
                <CircularProgress />
              </Box>
            ) : (
              <>
                {/* Mobile view with cards */}
                {isMobile && renderMobileCards()}
                
                {/* Tablet and desktop view with DataGrid */}
                {!isMobile && (
                  <DataGrid 
                    rows={lugares} 
                    columns={columnas} 
                    pageSize={5} 
                    autoHeight
                    disableColumnMenu={isMobile}
                    sx={{
                      '& .MuiDataGrid-cell': {
                        fontSize: { xs: '0.875rem', md: '1rem' }
                      },
                      '& .MuiDataGrid-columnHeaders': {
                        backgroundColor: darkMode ? "#444" : "#f5f5f5",
                        borderRadius: "8px 8px 0 0"
                      }
                    }}
                  />
                )}
              </>
            )}
          </Box>
        </Paper>
        
        <AgregarLugarModal 
          open={modalOpen} 
          onClose={() => setModalOpen(false)} 
          nuevoLugar={nuevoLugar} 
          setNuevoLugar={setNuevoLugar} 
          handleAgregarLugar={handleAgregarLugar}
          fullScreen={isMobile}
        />
        
        <EditarLugarModal 
          open={modalEditarOpen} 
          onClose={() => setModalEditarOpen(false)} 
          lugarEditar={lugarEditar} 
          setLugarEditar={setLugarEditar} 
          handleActualizarLugar={handleActualizarLugar}
          fullScreen={isMobile}
        />
      </Box>
    </ThemeProvider>
  );
};

export default Lugares;
