import React from "react";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography } from "@mui/material";

// Datos simulados de bienes en mal estado
const bienesMalEstado = [
  { id: 1, nombre: "Laptop HP", estado: "Malo", mantenimiento: "2023-10-01" },
  { id: 2, nombre: "Impresora Epson", estado: "Regular", mantenimiento: "2024-01-15" },
  { id: 3, nombre: "Silla Ergonomica", estado: "Malo", mantenimiento: "2023-12-05" },
];

export default function BienesMalEstado() {
  return (
    <Paper sx={{ p: 3 }}>
      <Typography variant="h6" gutterBottom>
        Bienes en Mal Estado o con Necesidad de Mantenimiento
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Bien</TableCell>
              <TableCell>Estado</TableCell>
              <TableCell>Último Mantenimiento</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {bienesMalEstado.map((bien) => (
              <TableRow key={bien.id}>
                <TableCell>{bien.nombre}</TableCell>
                <TableCell>{bien.estado}</TableCell>
                <TableCell>{bien.mantenimiento}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
}
