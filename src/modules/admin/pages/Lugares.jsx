import React, { useState, useEffect } from "react";
import axios from "axios";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { DataGrid } from "@mui/x-data-grid";
import { Button, Switch, CssBaseline, Box, CircularProgress, Modal, TextField } from "@mui/material";

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

const Lugares = () => {
  const [lugares, setLugares] = useState([]);
  const [loading, setLoading] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [nuevoLugar, setNuevoLugar] = useState("");

  const columnas = [
    
    { field: "lugar", headerName: "Lugar", width: 120 },
    {
      field: "status", headerName: "Estado", width: 150,
      renderCell: (params) => (
        params.row.status ?
          <Button variant="outlined" color="success">Activo</Button> :
          <Button variant="outlined" color="error">Inactivo</Button>
      )
    },
  ];

  useEffect(() => {
    axios.get("http://localhost:8080/lugares")
      .then((response) => {
        const lugares = response.data.result.map((lugar) => ({
          ...lugar,
          id: lugar.idlugar
        }));
        setLugares(lugares);
      })
      .catch((error) => {
        console.error("Error al obtener los lugares:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const handleAgregarLugar = () => {
    if (!nuevoLugar.trim()) return;

    axios.post("http://localhost:8080/lugares", {
      lugar: nuevoLugar,
      status: true
    })
    .then((response) => {
      setLugares([...lugares, { id: response.data.result.idlugar, lugar: nuevoLugar, status: true }]);
      setModalOpen(false);
      setNuevoLugar("");
    })
    .catch((error) => {
      console.error("Error al agregar el lugar:", error);
    });
  };

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
          {loading ? (
            <CircularProgress />
          ) : (
            <DataGrid
              rows={lugares}
              columns={columnas}
              pageSize={5}
              rowsPerPageOptions={[5]}
              autoHeight
              sx={{
                "& .MuiDataGrid-columnHeaders": {
                  backgroundColor: darkMode ? "#333" : "#6A1B9A",
                  color: "#FFF",
                },
                "& .MuiDataGrid-row": {
                  backgroundColor: darkMode ? "#1E1E1E" : "#FFF",
                },
                "& .MuiDataGrid-footerContainer": {
                  backgroundColor: darkMode ? "#333" : "#6A1B9A",
                  color: "#FFF",
                },
              }}
            />
          )}
        </Box>

        <Modal open={modalOpen} onClose={() => setModalOpen(false)}>
          <Box sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 300,
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
            display: "flex",
            flexDirection: "column",
            gap: 2,
            borderRadius: 2
          }}>
            <h2>Nuevo Lugar</h2>
            <TextField
              label="Nombre del Lugar"
              variant="outlined"
              fullWidth
              value={nuevoLugar}
              onChange={(e) => setNuevoLugar(e.target.value)}
            />
            <Button variant="contained" color="primary" onClick={handleAgregarLugar}>
              Guardar
            </Button>
          </Box>
        </Modal>
      </div>
    </ThemeProvider>
  );
};

export default Lugares;
