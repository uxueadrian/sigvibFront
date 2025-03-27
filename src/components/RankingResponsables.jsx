import React from "react";
import { BarChart } from "@mui/x-charts/BarChart";
import { Box, Typography, Paper } from "@mui/material";

// Datos simulados de bienes asignados a responsables
const responsables = [
  { nombre: "Juan Pérez", bienesAsignados: 15 },
  { nombre: "María López", bienesAsignados: 12 },
  { nombre: "Carlos Ramírez", bienesAsignados: 10 },
  { nombre: "Ana Torres", bienesAsignados: 8 },
  { nombre: "Luis Fernández", bienesAsignados: 5 },
];

export default function RankingResponsables() {
  // Extraer nombres y bienes asignados
  const labels = responsables.map((r) => r.nombre);
  const valores = responsables.map((r) => r.bienesAsignados);

  return (
    <Paper sx={{ p: 3, textAlign: "center" }}>
      <Typography variant="h6" gutterBottom>
        Ranking de Responsables con Más Bienes
      </Typography>
      <Box display="flex" justifyContent="center">
        <BarChart
          xAxis={[{ scaleType: "band", data: labels }]}
          series={[{ data: valores, label: "Bienes Asignados", color: "#1976D2" }]}
          width={500}
          height={300}
        />
      </Box>
    </Paper>
  );
}
