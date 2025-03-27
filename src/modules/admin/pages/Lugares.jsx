import React, { useState, useEffect } from "react";
import axios from "axios";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { DataGrid } from "@mui/x-data-grid";
import { Button, Switch, CssBaseline, Box, CircularProgress, Modal, TextField } from "@mui/material";
import { lightTheme, darkTheme } from "./../themes";
import AgregarLugarModal from "./../components/AgregarLugarModal";
import EditarLugarModal from "./../components/EditarLugarModal";

const Lugares = () => {
  const [lugares, setLugares] = useState([]);
  const [loading, setLoading] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalEditarOpen, setModalEditarOpen] = useState(false);
  const [nuevoLugar, setNuevoLugar] = useState("");
  const [lugarEditar, setLugarEditar] = useState({ id: null, lugar: "", status: true });

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
    { field: "lugar", headerName: "Lugar", width: 120 },
    {
      field: "status", headerName: "Estado", width: 150,
      renderCell: (params) => (
        <Button variant="outlined" color={params.row.status ? "success" : "error"} onClick={() => handleCambiarStatus(params.row.id)}>
          {params.row.status ? "Activo" : "Inactivo"}
        </Button>
      ),
    },
    {
      field: "acciones", headerName: "Acciones", width: 150,
      renderCell: (params) => (
        <Button variant="contained" color="primary" onClick={() => handleAbrirEditarLugar(params.row)}>
          Editar
        </Button>
      ),
    },
  ];

  return (
    <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
      <CssBaseline />
      <div style={{ padding: "20px", minHeight: "100vh", backgroundColor: darkMode ? "#1E1E1E" : "#F3F4F6" }}>
        <h1 style={{ color: darkMode ? "#AED581" : "#7CB342" }}>Lugares</h1>
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "10px" }}>
          <Button variant="contained" color="primary" onClick={() => setModalOpen(true)}>Agregar Lugar</Button>
          <Switch checked={darkMode} onChange={() => setDarkMode(!darkMode)} />
        </div>
        <Box sx={{ height: 400, width: "100%", margin: "20px auto" }}>
          {loading ? <CircularProgress /> : <DataGrid rows={lugares} columns={columnas} pageSize={5} autoHeight />}
        </Box>
        <AgregarLugarModal open={modalOpen} onClose={() => setModalOpen(false)} nuevoLugar={nuevoLugar} setNuevoLugar={setNuevoLugar} handleAgregarLugar={handleAgregarLugar} />
        <EditarLugarModal open={modalEditarOpen} onClose={() => setModalEditarOpen(false)} lugarEditar={lugarEditar} setLugarEditar={setLugarEditar} handleActualizarLugar={handleActualizarLugar} />
      </div>
    </ThemeProvider>
  );
};

export default Lugares;
