import React from "react";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography } from "@mui/material";

// Datos simulados de bienes para renovación
const bienesParaRenovar = [
  { id: 1, nombre: "Laptop Lenovo", estado: "Malo", añosUso: 6 },
  { id: 2, nombre: "Impresora Canon", estado: "Regular", añosUso: 7 },
  { id: 3, nombre: "Proyector Epson", estado: "Malo", añosUso: 8 },
];

export default function AlertasRenovacion() {
  return (
    <Paper sx={{ p: 3 }}>
      <Typography variant="h6" gutterBottom>
        Alertas de Renovación o Reposición de Bienes
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Bien</TableCell>
              <TableCell>Estado</TableCell>
              <TableCell>Años de Uso</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {bienesParaRenovar.map((bien) => (
              <TableRow key={bien.id}>
                <TableCell>{bien.nombre}</TableCell>
                <TableCell>{bien.estado}</TableCell>
                <TableCell>{bien.añosUso} años</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
}
