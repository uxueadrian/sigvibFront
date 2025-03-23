import React, { useState, useEffect } from "react";
import axios from "axios";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { DataGrid } from "@mui/x-data-grid";
import { Button, Switch, CssBaseline, Box, CircularProgress, Modal, TextField, MenuItem } from "@mui/material";

const lightTheme = createTheme({
  palette: {
    mode: "light",
    primary: { main: "#673AB7" },
    secondary: { main: "#7CB342" },
    background: { default: "#F3F4F6", paper: "#FFFFFF" },
    text: { primary: "#333" },
  },
});

const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: { main: "#9575CD" },
    secondary: { main: "#AED581" },
    background: { default: "#1E1E1E", paper: "#333" },
    text: { primary: "#FFF" },
  },
});

const Areas = () => {
  const [areas, setAreas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false); // Nueva variable para saber si estamos editando
  const [selectedAreaId, setSelectedAreaId] = useState(null); // Para almacenar el ID del área seleccionada
  const [nombreArea, setNombreArea] = useState("");
  const [lugares, setLugares] = useState([]);
  const [lugarSeleccionado, setLugarSeleccionado] = useState("");

  const columnas = [
    { field: "nombreArea", headerName: "Área", width: 150 },
    { field: "lugar", headerName: "Lugar", width: 150 },
    { field: "status", headerName: "Estado", width: 120 },
    {
      field: "edit",
      headerName: "Editar",
      width: 120,
      renderCell: (params) => (
        <Button variant="outlined" onClick={() => handleOpenModal(params.row)}>
          Editar
        </Button>
      ),
    },
  ];

  useEffect(() => {
    fetchAreas();
  }, []);

  const fetchAreas = () => {
    setLoading(true);
    axios
      .get("http://localhost:8080/api/areas-comunes/con-lugar")
      .then((response) => {
        const areasData = response.data.result.map((area) => ({
          ...area,
          id: area.idArea,
          lugar: area.lugar.lugar,
        }));
        setAreas(areasData);
      })
      .catch((error) => console.error("Error al obtener las áreas:", error))
      .finally(() => setLoading(false));
  };

  const fetchLugares = () => {
    axios
      .get("http://localhost:8080/usuarios/lugares-sin-usuarios")
      .then((response) => {
        setLugares(response.data.result);
      })
      .catch((error) => console.error("Error al obtener lugares:", error));
  };

  const handleOpenModal = (area = null) => {
    if (area) {
      setIsEditing(true);
      setSelectedAreaId(area.id); // Almacenamos el ID del área que estamos editando
      setNombreArea(area.nombreArea);
      setLugarSeleccionado(area.lugarId); // Asumimos que tienes el ID del lugar
    } else {
      setIsEditing(false);
      setNombreArea("");
      setLugarSeleccionado("");
    }
    setModalOpen(true);
    fetchLugares();
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setNombreArea("");
    setLugarSeleccionado("");
    setIsEditing(false);
  };

  const handleSaveArea = () => {
    if (!nombreArea || !lugarSeleccionado) {
      alert("Por favor, complete todos los campos");
      return;
    }

    const nuevaArea = {
      nombreArea,
      status: true,
      lugar: { idlugar: lugarSeleccionado },
    };

    const request = isEditing
      ? axios.put(`http://localhost:8080/api/areas-comunes/areas-comunes/${selectedAreaId}`, nuevaArea)
      : axios.post("http://localhost:8080/api/areas-comunes", nuevaArea);

    request
      .then(() => {
        fetchAreas();
        handleCloseModal();
      })
      .catch((error) => console.error("Error al guardar el área:", error));
  };

  return (
    <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
      <CssBaseline />
      <div style={{ padding: "20px", minHeight: "100vh", backgroundColor: darkMode ? "#1E1E1E" : "#F3F4F6" }}>
        <h1 style={{ color: darkMode ? "#AED581" : "#7CB342" }}>Áreas Comunes</h1>

        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "10px" }}>
          <Button variant="contained" color="primary" onClick={() => handleOpenModal()}>
            {isEditing ? "Editar Área" : "Agregar Área"}
          </Button>
          <Switch checked={darkMode} onChange={() => setDarkMode(!darkMode)} />
        </div>

        <Box sx={{ height: 400, width: "100%", margin: "20px auto" }}>
          {loading ? (
            <CircularProgress />
          ) : (
            <DataGrid rows={areas} columns={columnas} pageSize={5} rowsPerPageOptions={[5]} autoHeight />
          )}
        </Box>

        {/* Modal para agregar o editar área común */}
        <Modal open={modalOpen} onClose={handleCloseModal}>
          <Box sx={{ width: 400, padding: 3, backgroundColor: "white", margin: "100px auto", borderRadius: 2 }}>
            <h2>{isEditing ? "Editar Área Común" : "Agregar Área Común"}</h2>
            <TextField
              fullWidth
              label="Nombre del Área"
              value={nombreArea}
              onChange={(e) => setNombreArea(e.target.value)}
              margin="normal"
            />
            <TextField
              select
              fullWidth
              label="Seleccionar Lugar"
              value={lugarSeleccionado}
              onChange={(e) => setLugarSeleccionado(e.target.value)}
              margin="normal"
            >
              {lugares.map((lugar) => (
                <MenuItem key={lugar.idlugar} value={lugar.idlugar}>
                  {lugar.lugar}
                </MenuItem>
              ))}
            </TextField>
            <Button variant="contained" color="primary" onClick={handleSaveArea} fullWidth>
              {isEditing ? "Actualizar Área" : "Guardar Área"}
            </Button>
          </Box>
        </Modal>
      </div>
    </ThemeProvider>
  );
};

export default Areas;
