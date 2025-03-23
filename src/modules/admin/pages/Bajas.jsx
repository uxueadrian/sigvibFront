import React, { useState, useEffect } from "react";
import axios from "axios";
import { Button, Box, CircularProgress } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import Barcode from 'react-barcode';

const BienesDadosDeBaja = () => {
  const [bienes, setBienes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get("http://localhost:8080/bienes")
      .then(response => {
        const bienesData = response.data.result
          .filter(bien => !bien.status) // Filtrar bienes con status false
          .map(bien => ({
            ...bien,
            id: bien.idBien,
            tipoBien: bien.tipoBien ? bien.tipoBien.nombre : "Sin asignar",
            modelo: bien.modelo ? bien.modelo.nombreModelo : "Sin asignar",
            marca: bien.marca ? bien.marca.nombre : "Sin asignar",
            lugar: bien.lugar ? bien.lugar.lugar : "Sin asignar",
            imagen: bien.modelo ? bien.modelo.foto : "",
            fechaBaja: bien.bajas.length > 0 ? bien.bajas.map(baja => baja.fecha).join(", ") : "Sin bajas",
            motivoBaja: bien.bajas.length > 0 ? bien.bajas.map(baja => baja.motivo).join(", ") : "Sin bajas"
          }));
        setBienes(bienesData);
      })
      .catch(error => console.error("Error al obtener bienes:", error))
      .finally(() => setLoading(false));
  }, []);

  const columns = [
    
    { field: "nSerie", headerName: "Número de Serie", width: 180 },
    { field: "tipoBien", headerName: "Tipo de Bien", width: 180 },
    { field: "modelo", headerName: "Modelo", width: 180 },
    { field: "marca", headerName: "Marca", width: 180 },
    { field: "lugar", headerName: "Lugar", width: 180 },
   
    { field: "fechaBaja", headerName: "Fecha de Baja", width: 180 },
    { field: "motivoBaja", headerName: "Motivo de Baja", width: 300 },
  ];

  return (
    <div style={{ padding: "20px", minHeight: "100vh", backgroundColor: "#F3F4F6" }}>
      <h1 style={{ color: "#7CB342" }}>Bienes Dados de Baja</h1>
      <Box sx={{ height: 400, width: "100%", margin: "20px auto" }}>
        {loading ? (
          <CircularProgress />
        ) : (
          <DataGrid
            rows={bienes}
            columns={columns}
            pageSize={5}
            rowsPerPageOptions={[5]}
            autoHeight
          />
        )}
      </Box>
    </div>
  );
};

export default BienesDadosDeBaja;