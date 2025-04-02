"use client"

import { useState, useEffect } from "react"
import axios from "axios"
import {
  Box,
  CircularProgress,
  Paper,
  Typography,
  useMediaQuery,
  useTheme,
  Card,
  CardContent,
  Grid,
  Divider,
  Chip,
} from "@mui/material"
import { DataGrid } from "@mui/x-data-grid"

const BienesDadosDeBaja = () => {
  const [bienes, setBienes] = useState([])
  const [loading, setLoading] = useState(true)

  // Theme and responsive breakpoints
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"))
  const isTablet = useMediaQuery(theme.breakpoints.between("sm", "md"))

  useEffect(() => {
    axios
      .get("http://localhost:8080/bienes")
      .then((response) => {
        const bienesData = response.data.result
          .filter((bien) => !bien.status) // Filtrar bienes con status false
          .map((bien) => ({
            ...bien,
            id: bien.idBien,
            tipoBien: bien.tipoBien ? bien.tipoBien.nombre : "Sin asignar",
            modelo: bien.modelo ? bien.modelo.nombreModelo : "Sin asignar",
            marca: bien.marca ? bien.marca.nombre : "Sin asignar",
            lugar: bien.lugar ? bien.lugar.lugar : "Sin asignar",
            imagen: bien.modelo ? bien.modelo.foto : "",
            fechaBaja: bien.bajas.length > 0 ? bien.bajas.map((baja) => baja.fecha).join(", ") : "Sin bajas",
            motivoBaja: bien.bajas.length > 0 ? bien.bajas.map((baja) => baja.motivo).join(", ") : "Sin bajas",
          }))
        setBienes(bienesData)
      })
      .catch((error) => console.error("Error al obtener bienes:", error))
      .finally(() => setLoading(false))
  }, [])

  const columns = [
    {
      field: "nSerie",
      headerName: "Número de Serie",
      flex: 1,
      minWidth: 150,
    },
    {
      field: "tipoBien",
      headerName: "Tipo de Bien",
      flex: 1,
      minWidth: 150,
      hide: isMobile,
    },
    {
      field: "modelo",
      headerName: "Modelo",
      flex: 1,
      minWidth: 150,
      hide: isMobile && isTablet,
    },
    {
      field: "marca",
      headerName: "Marca",
      flex: 1,
      minWidth: 150,
      hide: isMobile,
    },
    {
      field: "lugar",
      headerName: "Lugar",
      flex: 1,
      minWidth: 150,
      hide: isMobile && isTablet,
    },
    {
      field: "fechaBaja",
      headerName: "Fecha de Baja",
      flex: 1,
      minWidth: 150,
    },
    {
      field: "motivoBaja",
      headerName: "Motivo de Baja",
      flex: 1.5,
      minWidth: 200,
    },
  ]

  // Card view for mobile devices
  const renderMobileCards = () => {
    return (
      <Grid container spacing={2}>
        {bienes.map((bien) => (
          <Grid item xs={12} key={bien.id}>
            <Card sx={{ boxShadow: 2, borderRadius: "10px" }}>
              <CardContent>
                <Typography variant="h6" component="div" sx={{ fontWeight: "bold", mb: 1 }}>
                  {bien.nSerie}
                </Typography>

                <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, mb: 2 }}>
                  <Chip label={bien.tipoBien} size="small" color="primary" variant="outlined" />
                  <Chip label={bien.marca} size="small" color="secondary" variant="outlined" />
                  <Chip label={bien.modelo} size="small" color="info" variant="outlined" />
                </Box>

                <Divider sx={{ my: 1 }} />

                <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                  <strong>Lugar:</strong> {bien.lugar}
                </Typography>

                <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                  <strong>Fecha de Baja:</strong> {bien.fechaBaja}
                </Typography>

                <Typography variant="body2" color="text.secondary">
                  <strong>Motivo de Baja:</strong> {bien.motivoBaja}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    )
  }

  return (
    <Box
      sx={{
        padding: { xs: "10px", sm: "15px", md: "20px" },
        minHeight: "100vh",
        backgroundColor: "#F3F4F6",
      }}
    >
      <Paper
        elevation={2}
        sx={{
          padding: { xs: "15px", sm: "20px", md: "30px" },
          borderRadius: "10px",
          backgroundColor: "#FFFFFF",
        }}
      >
        <Typography
          variant={isMobile ? "h5" : "h4"}
          sx={{
            color: "#7CB342",
            fontWeight: "bold",
            mb: 2,
          }}
        >
          Bienes Dados de Baja
        </Typography>

        <Box sx={{ width: "100%", margin: "20px auto" }}>
          {loading ? (
            <Box sx={{ display: "flex", justifyContent: "center", p: 3 }}>
              <CircularProgress />
            </Box>
          ) : (
            <>
              {/* Mobile view with cards */}
              {isMobile && renderMobileCards()}

              {/* Tablet and desktop view with DataGrid */}
              {!isMobile && (
                <DataGrid
                  rows={bienes}
                  columns={columns}
                  pageSize={5}
                  rowsPerPageOptions={[5, 10, 20]}
                  autoHeight
                  disableColumnMenu={isMobile}
                  sx={{
                    "& .MuiDataGrid-cell": {
                      fontSize: { xs: "0.875rem", md: "1rem" },
                    },
                    "& .MuiDataGrid-columnHeaders": {
                      backgroundColor: "#f5f5f5",
                      borderRadius: "8px 8px 0 0",
                    },
                  }}
                />
              )}
            </>
          )}
        </Box>
      </Paper>
    </Box>
  )
}

export default BienesDadosDeBaja

