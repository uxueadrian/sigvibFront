import React from "react";
import { BarChart } from "@mui/x-charts/BarChart";
import { Box, Typography, Paper } from "@mui/material";

// Datos simulados de reportes de fallas
const bienesConFallas = [
  { nombre: "Impresora HP", reportes: 5 },
  { nombre: "Laptop Dell", reportes: 3 },
  { nombre: "Monitor Samsung", reportes: 2 },
  { nombre: "Teclado Logitech", reportes: 1 },
];

export default function BienesConFallas() {
  const labels = bienesConFallas.map((b) => b.nombre);
  const valores = bienesConFallas.map((b) => b.reportes);

  return (
    <Paper sx={{ p: 3, textAlign: "center" }}>
      <Typography variant="h6" gutterBottom>
        Bienes con Más Reportes de Falla
      </Typography>
      <Box display="flex" justifyContent="center">
        <BarChart
          xAxis={[{ scaleType: "band", data: labels }]}
          series={[{ data: valores, label: "Reportes de Falla", color: "red" }]}
          width={500}
          height={300}
        />
      </Box>
    </Paper>
  );
}
