import React from "react";
import { BarChart } from "@mui/x-charts/BarChart";
import { Box, Typography, Paper, CircularProgress } from "@mui/material";


export default function BienesChart() {
  // Datos de bienes
  const bienes = [
    { tipo: "Escritorios", total: 40, ocupados: 15 },
    { tipo: "Laptops", total: 20, ocupados: 10 },
    { tipo: "Sillas", total: 10, ocupados: 5 },
    { tipo: "Impresoras", total: 10, ocupados: 3 },
    { tipo: "Monitores", total: 20, ocupados: 8 },
  ];

  // Calcular bienes disponibles
  const labels = bienes.map((b) => b.tipo);
  const ocupados = bienes.map((b) => b.ocupados);
  const disponibles = bienes.map((b) => b.total - b.ocupados);

  // Calcular bienes totales y ocupados
    const totalBienes = bienes.reduce((sum, b) => sum + b.total, 0);
    const totalOcupados = bienes.reduce((sum, b) => sum + b.ocupados, 0);
    const porcentajeOcupado = Math.round((totalOcupados / totalBienes) * 100);


  return (
    <Paper sx={{ p: 3, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
      {/* Sección del Gráfico */}
      <Box>
        <Typography variant="h6" gutterBottom>
          Bienes Totales y Ocupados
        </Typography>
        <BarChart
          xAxis={[{ scaleType: "band", data: labels }]}
          series={[
            { data: ocupados, label: "Ocupados", stack: "total", color: "gray" },
            { data: disponibles, label: "Disponibles", stack: "total", color: "#1976D2" },
          ]}
          width={400}
          height={300}
        />
      </Box>
  
      {/* Sección del Indicador Circular */}
      <Box display="flex" flexDirection="column" alignItems="center">
        <Typography variant="h6">Estado de Bienes</Typography>
        <Box position="relative" display="inline-flex">
          <CircularProgress
            variant="determinate"
            value={100}
            size={100}
            thickness={5}
            sx={{ color: "lightgray", position: "absolute" }}
          />
          <CircularProgress
            variant="determinate"
            value={porcentajeOcupado}
            size={100}
            thickness={5}
            sx={{ color: "#1976D2" }}
          />
          <Box
            position="absolute"
            top="50%"
            left="50%"
            sx={{ transform: "translate(-50%, -50%)" }}
          >
            <Typography variant="h6">{porcentajeOcupado}%</Typography>
            <Typography variant="body2">Ocupado</Typography>
          </Box>
        </Box>
        <Typography variant="body2" sx={{ mt: 1 }}>
          {totalOcupados} de {totalBienes} bienes ocupados
        </Typography>
      </Box>
    </Paper>
  );
  
}
