import React, { useState } from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { DataGrid } from "@mui/x-data-grid";
import { Button, Switch, CssBaseline, Box, CircularProgress, Typography, Paper } from "@mui/material";

// Define dos temas: claro y oscuro
const lightTheme = createTheme({
  palette: {
    mode: "light",
    primary: { main: "#673AB7" }, // Morado
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

const CustomTable = ({ columns, rows, loading, pagina }) => {
  const [darkMode, setDarkMode] = useState(false);

  return (
    <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
      <CssBaseline />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "100vh",
          backgroundColor: (theme) => theme.palette.background.default,
          padding: "20px",
        }}
      >
        <Paper
          elevation={5}
          sx={{
            width: "90%",
            maxWidth: "1200px",
            padding: "30px",
            borderRadius: "15px",
            backgroundColor: (theme) => theme.palette.background.paper,
          }}
        >
          <Typography
            variant="h4"
            align="center"
            sx={{
              color: (theme) => theme.palette.secondary.main,
              marginBottom: "20px",
              fontWeight: "bold",
            }}
          >
            Gestión de {pagina}
          </Typography>

          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              marginBottom: "20px",
            }}
          >
            <Button
              variant="contained"
              color="primary"
              sx={{ borderRadius: "10px", fontWeight: "bold", boxShadow: 3 }}
            >
              Agregar {pagina}
            </Button>
            <Switch checked={darkMode} onChange={() => setDarkMode(!darkMode)} />
          </Box>

          <Box sx={{ height: 450, width: "100%" }}>
            {loading ? (
              <Box sx={{ display: "flex", justifyContent: "center", padding: "50px" }}>
                <CircularProgress />
              </Box>
            ) : (
              <DataGrid
                rows={rows}
                columns={columns}
                pageSize={5}
                rowsPerPageOptions={[5]}
                autoHeight
                sx={{
                  backgroundColor: (theme) => theme.palette.background.paper,
                  borderRadius: "10px",
                  boxShadow: 3,
                  "& .MuiDataGrid-columnHeaders": {
                    backgroundColor: darkMode ? "#333" : "#6A1B9A",
                    color: "#FFF",
                    fontWeight: "bold",
                    fontSize: "16px",
                    borderTopLeftRadius: "10px",
                    borderTopRightRadius: "10px",
                  },
                  "& .MuiDataGrid-cell": {
                    color: (theme) => theme.palette.text.primary,
                    fontSize: "14px",
                  },
                  "& .MuiDataGrid-footerContainer": {
                    backgroundColor: darkMode ? "#333" : "#6A1B9A",
                    color: "#FFF",
                    fontWeight: "bold",
                    borderBottomLeftRadius: "10px",
                    borderBottomRightRadius: "10px",
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
