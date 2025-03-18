import React, { useState, useEffect } from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { DataGrid } from "@mui/x-data-grid";
import { Button, Switch, CssBaseline, FormControlLabel, Box, CircularProgress } from "@mui/material";

// Define dos temas: claro y oscuro
const lightTheme = createTheme({
  palette: {
    mode: "light",
    primary: { main: "#673AB7" }, // Color principal (morado)
    secondary: { main: "#7CB342" }, // Verde
    background: { default: "#F3F4F6", paper: "#FFFFFF" },
    text: { primary: "#333" },
  },
});

const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: { main: "#9575CD" }, // Morado más claro
    secondary: { main: "#AED581" }, // Verde más claro
    background: { default: "#1E1E1E", paper: "#333" },
    text: { primary: "#FFF" },
  },
});



const CustomTable = ({columns, rows, loading, pagina}) => {
  const [darkMode, setDarkMode] = useState(false);

  return (
    <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
      <CssBaseline /> {/* Asegura que el fondo cambie con el tema */}
      <div style={{ padding: "20px", minHeight: "100vh", backgroundColor: darkMode ? "#1E1E1E" : "#F3F4F6" }}>
        <h1 style={{ color: darkMode ? "#AED581" : "#7CB342" }}>{pagina}</h1>

        {/* Botón para agregar usuario y switch para cambiar tema */}
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "10px" }}>
          <Button variant="contained" color="primary">Agregar {pagina}</Button>
          <Switch checked={darkMode} onChange={() => setDarkMode(!darkMode)} />
        </div>

        {/* Tabla de usuarios */}
        <Box sx={{ height: 400, width: "100%", margin: "20px auto" }}>
        {loading ? (
        <CircularProgress /> // Muestra un loader mientras se cargan los datos
      ) : (
          <DataGrid
            rows={rows}
            columns={columns}
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
      </div>
    </ThemeProvider>
  );
};

export default CustomTable;
