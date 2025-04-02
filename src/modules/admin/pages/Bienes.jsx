import React, { useState, useEffect } from "react";
import axios from "axios";
import { 
  Button, 
  Switch, 
  Box, 
  Typography, 
  useMediaQuery, 
  useTheme,
  Paper,
  Grid,
  Card,
  CardContent,
  CardActions,
  Chip,
  IconButton,
  Tooltip
} from "@mui/material";
import BienesTable from "../components/BienesTable";
import BienesForm from "../components/BienesForm";
import BienesBajaDialog from "../components/BienesBajaDialog";
import AddIcon from "@mui/icons-material/Add";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";

const Bienes = () => {
  const [bienes, setBienes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [openBaja, setOpenBaja] = useState(false);
  const [selectedBien, setSelectedBien] = useState(null);
  const [motivoBaja, setMotivoBaja] = useState("");
  const [lugares, setLugares] = useState([]);
  const [modelos, setModelos] = useState([]);
  const [marcas, setMarcas] = useState([]);
  const [tiposBien, setTiposBien] = useState([]);
  const [darkMode, setDarkMode] = useState(false);
  const [usuarios, setUsuarios] = useState([]);
  const [nuevoBien, setNuevoBien] = useState({
    codigoBarras: "",
    nSerie: "",
    idTipo: "",
    idLugar: "",
    idModelo: "",
    idMarca: "",
    idUsuario: ""
  });
  
  // Theme and responsive breakpoints
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.between('sm', 'md'));

  useEffect(() => {
    axios.get("http://localhost:8080/bienes")
      .then(response => {
        const bienesData = response.data.result
          .filter(bien => bien.status)
          .map(bien => ({
            ...bien,
            id: bien.idBien,
            tipoBien: bien.tipoBien ? bien.tipoBien.nombre : "Sin asignar",
            modelo: bien.modelo ? bien.modelo.nombreModelo : "Sin asignar",
            marca: bien.marca.nombre,
            lugar: bien.lugar ? bien.lugar.lugar : "Sin asignar",
            imagen: bien.modelo.foto,
            codigoBarras: bien.codigoBarras,
            usuarioResponsable: bien.usuario ? bien.usuario.nombre : "Sin asignar",
          }));
        setBienes(bienesData);
      })
      .catch(error => console.error("Error al obtener bienes:", error))
      .finally(() => setLoading(false));
  }, []);
  
  useEffect(() => {
    axios.get("http://localhost:8080/lugares")
      .then(response => setLugares(response.data.result))
      .catch(error => console.error("Error al obtener lugares:", error));
    
    axios.get("http://localhost:8080/usuarios")
      .then(response => {
        const usuariosTransformados = response.data.result.map(usuario => ({
          ...usuario,
          idUsuario: usuario.idusuario,
        }));
        setUsuarios(usuariosTransformados);
      })
      .catch(error => console.error("Error al obtener usuarios:", error));
    
    axios.get("http://localhost:8080/tipo-bien")
      .then(response => setTiposBien(response.data.result))
      .catch(error => console.error("Error al obtener tipo bien:", error));
    
    axios.get("http://localhost:8080/modelo")
      .then(response => setModelos(response.data.result))
      .catch(error => console.error("Error al obtener modelos:", error));
    
    axios.get("http://localhost:8080/marca")
      .then(response => setMarcas(response.data.result))
      .catch(error => console.error("Error al obtener marcas:", error));
  }, []);

  const handleChange = (e) => {
    setNuevoBien({ ...nuevoBien, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    const bienFormateado = {
      nSerie: nuevoBien.nSerie,
      idTipoBien: parseInt(nuevoBien.idTipo),
      idUsuario: parseInt(nuevoBien.idUsuario),
      status: true,
      idModelo: parseInt(nuevoBien.idModelo),
      idMarca: parseInt(nuevoBien.idMarca),
      idLugar: parseInt(nuevoBien.idLugar),
      fecha: new Date().toISOString().split("T")[0] + "T00:00:00Z"
    };
  
    axios.post("http://localhost:8080/bienes", bienFormateado, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
    })
      .then(response => {
        setBienes([...bienes, { ...response.data.result, id: response.data.result.idBien }]);
        setOpen(false);
      })
      .catch(error => console.error("Error al crear bien:", error.response?.data || error.message));
  };
  
  const handleDarDeBaja = () => {
    if (!selectedBien || !motivoBaja.trim()) return;
    const bajaData = { idBien: selectedBien.id, motivo: motivoBaja, fecha: new Date().toISOString() };
    axios.post("http://localhost:8080/bajas", bajaData)
      .then(() => {
        setBienes(bienes.filter(bien => bien.id !== selectedBien.id));
        setOpenBaja(false);
        setSelectedBien(null);
        setMotivoBaja("");
      })
      .catch(error => console.error("Error al dar de baja:", error.response?.data || error.message));
  };

  return (
    <Box sx={{ 
      padding: { xs: "10px", sm: "15px", md: "20px" }, 
      minHeight: "100vh", 
      backgroundColor: darkMode ? "#121212" : "#F3F4F6" 
    }}>
      <Paper 
        elevation={2} 
        sx={{ 
          padding: { xs: "15px", sm: "20px", md: "30px" },
          borderRadius: "10px",
          backgroundColor: darkMode ? "#1E1E1E" : "#FFFFFF"
        }}
      >
        <Typography 
          variant={isMobile ? "h5" : "h4"} 
          sx={{ 
            color: darkMode ? "#AED581" : "#388E3C", 
            fontWeight: "bold", 
            mb: 2 
          }}
        >
          Bienes
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
            color="success" 
            startIcon={<AddIcon />} 
            onClick={() => setOpen(true)}
            fullWidth={isMobile}
            sx={{ borderRadius: "8px" }}
          >
            Agregar Bien
          </Button>
          
          <Box sx={{ 
            display: "flex", 
            alignItems: "center",
            alignSelf: { xs: "flex-end", sm: "auto" }
          }}>
            {darkMode ? 
              <DarkModeIcon sx={{ mr: 1, color: "#AED581" }} /> : 
              <LightModeIcon sx={{ mr: 1, color: "#388E3C" }} />
            }
            <Switch 
              checked={darkMode} 
              onChange={() => setDarkMode(!darkMode)} 
              color="default" 
            />
          </Box>
        </Box>
        
        <BienesTable 
          bienes={bienes} 
          loading={loading} 
          darkMode={darkMode} 
          setSelectedBien={setSelectedBien} 
          setOpenBaja={setOpenBaja}
          isMobile={isMobile}
          isTablet={isTablet}
        />
        
        <BienesForm
          open={open}
          handleClose={() => setOpen(false)}
          handleSubmit={handleSubmit}
          handleChange={handleChange}
          nuevoBien={nuevoBien}
          tiposBien={tiposBien}
          modelos={modelos}
          marcas={marcas}
          lugares={lugares}
          usuarios={usuarios}
          isMobile={isMobile}
        />

        <BienesBajaDialog 
          openBaja={openBaja} 
          handleClose={() => setOpenBaja(false)} 
          handleDarDeBaja={handleDarDeBaja} 
          motivoBaja={motivoBaja} 
          setMotivoBaja={setMotivoBaja}
          fullScreen={isMobile}
        />
      </Paper>
    </Box>
  );
};

export default Bienes;
