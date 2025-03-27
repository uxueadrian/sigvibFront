import React, { useState, useEffect } from "react";
import axios from "axios";
import { Button, Switch, Box, Typography } from "@mui/material";
import BienesTable from "../components/BienesTable";
import BienesForm from "../components/BienesForm";
import BienesBajaDialog from "../components/BienesBajaDialog";
import AddIcon from "@mui/icons-material/Add";

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
    idUsuario: "" // Agregado aquí
  });
  

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
            usuarioResponsable: bien.usuario ? bien.usuario.nombre : "Sin asignar", // Agrega esto
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
          idUsuario: usuario.idusuario, // Renombrar para evitar problemas
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
      idUsuario: parseInt(nuevoBien.idUsuario), // Ahora toma el usuario seleccionado
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
    <Box sx={{ padding: "20px", minHeight: "100vh", backgroundColor: darkMode ? "#121212" : "#F3F4F6" }}>
      <Typography variant="h4" sx={{ color: darkMode ? "#AED581" : "#388E3C", fontWeight: "bold", mb: 2 }}>Bienes</Typography>
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
        <Button variant="contained" color="success" startIcon={<AddIcon />} onClick={() => setOpen(true)}>Agregar Bien</Button>
        <Switch checked={darkMode} onChange={() => setDarkMode(!darkMode)} color="default" />
      </Box>
      <BienesTable bienes={bienes} loading={loading} darkMode={darkMode} setSelectedBien={setSelectedBien} setOpenBaja={setOpenBaja} />
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
  usuarios={usuarios}  // <-- Agregado aquí
/>

      <BienesBajaDialog openBaja={openBaja} handleClose={() => setOpenBaja(false)} handleDarDeBaja={handleDarDeBaja} motivoBaja={motivoBaja} setMotivoBaja={setMotivoBaja} />
    </Box>
  );
};

export default Bienes;
