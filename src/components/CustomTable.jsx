import React, { useState } from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { DataGrid } from "@mui/x-data-grid";
import {
  Button,
  Switch,
  CssBaseline,
  Box,
  CircularProgress,
  Typography,
  Paper,
} from "@mui/material";

// Definición de los temas claro y oscuro
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

const CustomTable = ({ columns = [], rows = [], loading, pagina }) => {
  const [darkMode, setDarkMode] = useState(false);
  const theme = darkMode ? darkTheme : lightTheme;

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "100vh",
          backgroundColor: theme.palette.background.default,
          p: 3,
        }}
      >
        <Paper
          elevation={5}
          sx={{
            width: "90%",
            maxWidth: 1200,
            p: 3,
            borderRadius: 3,
            backgroundColor: theme.palette.background.paper,
          }}
        >
          <Typography
            variant="h4"
            align="center"
            sx={{
              color: theme.palette.secondary.main,
              mb: 2,
              fontWeight: "bold",
            }}
          >
            Gestión de {pagina}
          </Typography>

          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              mb: 2,
            }}
          >
            <Button
              variant="contained"
              color="primary"
              sx={{ borderRadius: 2, fontWeight: "bold", boxShadow: 3 }}
            >
              Agregar {pagina}
            </Button>
            <Switch
              checked={darkMode}
              onChange={() => setDarkMode(!darkMode)}
              inputProps={{ "aria-label": "Modo oscuro" }}
            />
          </Box>

          <Box sx={{ height: 450, width: "100%" }}>
            {loading ? (
              <Box sx={{ display: "flex", justifyContent: "center", p: 5 }}>
                <CircularProgress />
              </Box>
            ) : (
              <DataGrid
                rows={rows}
                columns={columns}
                pageSizeOptions={[5, 10, 20]}
                autoHeight
                sx={{
                  backgroundColor: theme.palette.background.paper,
                  borderRadius: 2,
                  boxShadow: 3,
                  "& .MuiDataGrid-columnHeaders": {
                    backgroundColor: darkMode ? "#333" : "#6A1B9A",
                    color: "#FFF",
                    fontWeight: "bold",
                    fontSize: "16px",
                    borderTopLeftRadius: 2,
                    borderTopRightRadius: 2,
                  },
                  "& .MuiDataGrid-cell": {
                    color: theme.palette.text.primary,
                    fontSize: "14px",
                  },
                  "& .MuiDataGrid-footerContainer": {
                    backgroundColor: darkMode ? "#333" : "#6A1B9A",
                    color: "#FFF",
                    fontWeight: "bold",
                    borderBottomLeftRadius: 2,
                    borderBottomRightRadius: 2,
                  },
                }}
              />
            )}
          </Box>
        </Paper>
      </Box>
    </ThemeProvider>
  );
};

export default CustomTable;
