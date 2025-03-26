// admin/components/BienesTable.jsx
import React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Button, Box, CircularProgress } from "@mui/material";
import Barcode from "react-barcode";

const BienesTable = ({ bienes, loading, darkMode, setSelectedBien, setOpenBaja }) => {
  const columns = [
    { field: "codigoBarras", headerName: "Código de Barras", width: 180, renderCell: (params) => <Barcode value={params.value} /> },
    { field: "nSerie", headerName: "Número de Serie", width: 180 },
    { field: "tipoBien", headerName: "Tipo de Bien", width: 180 },
    { field: "modelo", headerName: "Modelo", width: 180 },
    { field: "marca", headerName: "Marca", width: 180 },
    { field: "lugar", headerName: "Lugar", width: 180 },
    {
      field: "imagen", headerName: "Imagen", width: 180,
      renderCell: (params) => <img src={params.value} alt="modelo" style={{ width: "100px", height: "auto" }} />
    },
    {
      field: "actions", headerName: "Acciones", width: 150,
      renderCell: (params) => (
        <Button variant="contained" color="secondary" onClick={() => {
          setSelectedBien(params.row);
          setOpenBaja(true);
        }}>
          Dar de Baja
        </Button>
      )
    }
  ];

  return (
    <Box sx={{ height: 400, width: "100%", margin: "20px auto" }}>
      {loading ? <CircularProgress /> : (
        <DataGrid
          rows={bienes}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
          autoHeight
          sx={{
            "& .MuiDataGrid-columnHeaders": { backgroundColor: darkMode ? "#333" : "#6A1B9A", color: "#FFF" },
            "& .MuiDataGrid-row": { backgroundColor: darkMode ? "#1E1E1E" : "#FFF" },
            "& .MuiDataGrid-footerContainer": { backgroundColor: darkMode ? "#333" : "#6A1B9A", color: "#FFF" },
          }}
        />
      )}
    </Box>
  );
};

export default BienesTable;
