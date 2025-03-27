import React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Button, Box, CircularProgress, Tooltip } from "@mui/material";
import Barcode from "react-barcode";
import DeleteIcon from "@mui/icons-material/Delete";

const BienesTable = ({ bienes, loading, darkMode, setSelectedBien, setOpenBaja }) => {
  const columns = [
    { field: "nSerie", headerName: "Número de Serie", flex: 1, minWidth: 150 },
    { field: "tipoBien", headerName: "Tipo de Bien", flex: 1, minWidth: 150 },
    { field: "modelo", headerName: "Modelo", flex: 1, minWidth: 150 },
    { field: "marca", headerName: "Marca", flex: 1, minWidth: 150 },
    { field: "lugar", headerName: "Lugar", flex: 1, minWidth: 150 },
    { field: "usuarioResponsable", headerName: "Usuario Responsable", flex: 1, minWidth: 150 }, // Nueva columna
    {
      field: "imagen",
      headerName: "Imagen",
      flex: 1,
      minWidth: 130,
      renderCell: (params) => (
        <img
          src={params.value}
          alt="modelo"
          style={{ width: "70px", height: "auto", borderRadius: "8px", boxShadow: "0px 2px 4px rgba(0,0,0,0.2)" }}
        />
      )
    },
    {
      field: "actions",
      headerName: "Acciones",
      flex: 1,
      minWidth: 130,
      renderCell: (params) => (
        <Tooltip title="Dar de Baja">
          <Button
            variant="contained"
            color="error"
            startIcon={<DeleteIcon />}
            sx={{ borderRadius: "8px", fontWeight: "bold" }}
            onClick={() => {
              setSelectedBien(params.row);
              setOpenBaja(true);
            }}
          >
            Baja
          </Button>
        </Tooltip>
      )
    }
  ];
  

  return (
    <Box sx={{
      height: 450,
      width: "100%",
      maxWidth: "1200px", // Limita el ancho máximo
      margin: "20px auto",
      backgroundColor: darkMode ? "#252525" : "#FFF",
      borderRadius: "12px",
      padding: "10px",
      boxShadow: "0px 3px 6px rgba(0,0,0,0.15)",
      overflowX: "auto" // Permite scroll si es necesario
    }}>
      {loading ? (
        <CircularProgress sx={{ display: "block", margin: "auto" }} />
      ) : (
        <DataGrid
          rows={bienes}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
          autoHeight
          sx={{
            "& .MuiDataGrid-columnHeaders": {
              backgroundColor: darkMode ? "#444" : "#6A1B9A",
              color: "#FFF",
              fontSize: "16px",
              fontWeight: "bold"
            },
            "& .MuiDataGrid-row": {
              backgroundColor: darkMode ? "#1E1E1E" : "#FFF",
              '&:hover': { backgroundColor: darkMode ? "#333" : "#F1E1FF" }
            },
            "& .MuiDataGrid-footerContainer": {
              backgroundColor: darkMode ? "#444" : "#6A1B9A",
              color: "#FFF"
            },
          }}
        />
      )}
    </Box>
  );
};

export default BienesTable;
