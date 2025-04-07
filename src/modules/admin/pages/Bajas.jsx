"use client"

import { useState, useEffect } from "react"
import axios from "axios"
import {
  Button,
  Switch,
  Box,
  Typography,
  useMediaQuery,
  useTheme,
  Paper,
  Grid,
  Card,
  CardContent,
  Breadcrumbs,
  Link,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Chip,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  CircularProgress,
  Avatar,
  IconButton,
  Tooltip,
} from "@mui/material"
import DarkModeIcon from "@mui/icons-material/DarkMode"
import LightModeIcon from "@mui/icons-material/LightMode"
import InventoryIcon from "@mui/icons-material/Inventory"
import HomeIcon from "@mui/icons-material/Home"
import NavigateNextIcon from "@mui/icons-material/NavigateNext"
import InfoIcon from "@mui/icons-material/Info"
import DeleteIcon from "@mui/icons-material/Delete"
import CalendarTodayIcon from "@mui/icons-material/CalendarToday"
import PersonIcon from "@mui/icons-material/Person"
import LocationOnIcon from "@mui/icons-material/LocationOn"

const BienesBaja = () => {
  const [bienes, setBienes] = useState([])
  const [loading, setLoading] = useState(true)
  const [darkMode, setDarkMode] = useState(false)
  const [openDetailModal, setOpenDetailModal] = useState(false)
  const [selectedBien, setSelectedBien] = useState(null)

  // Theme and responsive breakpoints
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"))
  const isTablet = useMediaQuery(theme.breakpoints.between("sm", "md"))

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/bienes`)
      .then((response) => {
        // Filtrar solo los bienes que tienen bajas (array no vacío)
        const bienesConBaja = response.data.result
          .filter((bien) => bien.bajas && bien.bajas.length > 0)
          .map((bien) => ({
            ...bien,
            id: bien.idBien,
            tipoBien: bien.tipoBien ? bien.tipoBien.nombre : "Sin asignar",
            modelo: bien.modelo ? bien.modelo.nombreModelo : "Sin asignar",
            marca: bien.marca ? bien.marca.nombre : "Sin asignar",
            lugar: bien.lugar ? bien.lugar.lugar : "Sin asignar",
            imagen: bien.modelo ? bien.modelo.foto : "/placeholder.jpg",
            codigoBarras: bien.codigoBarras,
            nSerie: bien.nSerie || "No disponible",
            usuarioResponsable: bien.usuario ? bien.usuario.nombre : "Sin asignar",
            motivoBaja: bien.bajas[0].motivo,
            fechaBaja: new Date(bien.bajas[0].fecha).toLocaleDateString(),
          }))
        setBienes(bienesConBaja)
      })
      .catch((error) => console.error("Error al obtener bienes:", error))
      .finally(() => setLoading(false))
  }, [])

  const handleOpenDetailModal = (bien) => {
    setSelectedBien(bien)
    setOpenDetailModal(true)
  }

  const handleCloseDetailModal = () => {
    setOpenDetailModal(false)
  }

  const formatDate = (dateString) => {
    if (!dateString) return "Fecha no disponible"
    return new Date(dateString).toLocaleDateString("es-ES", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  return (
    <Box
      sx={{
        padding: { xs: "16px", sm: "24px", md: "32px" },
        minHeight: "100vh",
        backgroundColor: darkMode ? "#121212" : "#F5F7FA",
        transition: "background-color 0.3s ease",
      }}
    >
      <Paper
        elevation={darkMode ? 2 : 1}
        sx={{
          padding: { xs: "16px", sm: "24px", md: "32px" },
          borderRadius: "16px",
          backgroundColor: darkMode ? "#1A202C" : "#FFFFFF",
          transition: "background-color 0.3s ease",
        }}
      >
        {/* Header with breadcrumbs */}
        <Box sx={{ mb: 4 }}>
          <Breadcrumbs
            separator={<NavigateNextIcon fontSize="small" />}
            aria-label="breadcrumb"
            sx={{ mb: 2, color: darkMode ? "#A0AEC0" : "#718096" }}
          >
            <Link
              color="inherit"
              href="#"
              sx={{
                display: "flex",
                alignItems: "center",
                textDecoration: "none",
                color: darkMode ? "#A0AEC0" : "#718096",
              }}
            >
              <HomeIcon sx={{ mr: 0.5 }} fontSize="small" />
              Inicio
            </Link>
            <Typography color={darkMode ? "#E2E8F0" : "text.primary"} sx={{ display: "flex", alignItems: "center" }}>
              <InventoryIcon sx={{ mr: 0.5 }} fontSize="small" />
              Bienes de Baja
            </Typography>
          </Breadcrumbs>

          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              flexWrap: "wrap",
              gap: 2,
            }}
          >
            <Typography
              variant={isMobile ? "h5" : "h4"}
              component="h1"
              sx={{
                color: darkMode ? "#E2E8F0" : "#2D3748",
                fontWeight: "bold",
              }}
            >
              Bienes con Baja
            </Typography>

            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1,
              }}
            >
              {darkMode ? <DarkModeIcon sx={{ color: "#9C27B0" }} /> : <LightModeIcon sx={{ color: "#6A1B9A" }} />}
              <Switch checked={darkMode} onChange={() => setDarkMode(!darkMode)} color="secondary" />
            </Box>
          </Box>
        </Box>

        {/* Tabla de Bienes con Baja */}
        <TableContainer
          component={Paper}
          sx={{
            borderRadius: "12px",
            boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
            backgroundColor: darkMode ? "#2D3748" : "#FFFFFF",
            border: darkMode ? "1px solid #4A5568" : "none",
            mb: 4,
          }}
        >
          <Table>
            <TableHead>
              <TableRow sx={{ backgroundColor: darkMode ? "#4A5568" : "#F7FAFC" }}>
               
                <TableCell sx={{ color: darkMode ? "#E2E8F0" : "#4A5568", fontWeight: "bold" }}>
                  Número de Serie
                </TableCell>
                <TableCell sx={{ color: darkMode ? "#E2E8F0" : "#4A5568", fontWeight: "bold" }}>Marca/Modelo</TableCell>
                <TableCell sx={{ color: darkMode ? "#E2E8F0" : "#4A5568", fontWeight: "bold" }}>
                  Motivo de Baja
                </TableCell>
                {!isMobile && (
                  <TableCell sx={{ color: darkMode ? "#E2E8F0" : "#4A5568", fontWeight: "bold" }}>
                    Fecha de Baja
                  </TableCell>
                )}
                <TableCell sx={{ color: darkMode ? "#E2E8F0" : "#4A5568", fontWeight: "bold" }}>Acciones</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell colSpan={isMobile ? 5 : 6} align="center">
                    <CircularProgress color="secondary" />
                  </TableCell>
                </TableRow>
              ) : bienes.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={isMobile ? 5 : 6} align="center">
                    <Typography color={darkMode ? "#E2E8F0" : "#4A5568"}>No hay bienes con baja registrados</Typography>
                  </TableCell>
                </TableRow>
              ) : (
                bienes.map((bien) => (
                  <TableRow
                    key={bien.id}
                    sx={{
                      "&:hover": { backgroundColor: darkMode ? "#2C3E50" : "#F7FAFC" },
                      color: darkMode ? "#E2E8F0" : "inherit",
                    }}
                  >
                    <TableCell sx={{ color: darkMode ? "#E2E8F0" : "inherit" }}>{bien.codigoBarras || "N/A"}</TableCell>
                    <TableCell sx={{ color: darkMode ? "#E2E8F0" : "inherit" }}>{bien.nSerie}</TableCell>
                    <TableCell sx={{ color: darkMode ? "#E2E8F0" : "inherit" }}>
                      <Typography variant="body2" component="div">
                        {bien.marca}
                      </Typography>
                      <Typography variant="caption" color={darkMode ? "#A0AEC0" : "text.secondary"}>
                        {bien.modelo}
                      </Typography>
                    </TableCell>
                    <TableCell sx={{ color: darkMode ? "#E2E8F0" : "inherit" }}>
                      <Chip
                        label={bien.motivoBaja || "Sin especificar"}
                        color="error"
                        variant="outlined"
                        size="small"
                      />
                    </TableCell>
                    {!isMobile && (
                      <TableCell sx={{ color: darkMode ? "#E2E8F0" : "inherit" }}>{bien.fechaBaja}</TableCell>
                    )}
                    <TableCell>
                      <Tooltip title="Ver detalles">
                        <IconButton onClick={() => handleOpenDetailModal(bien)} color="secondary" size="small">
                          <InfoIcon />
                        </IconButton>
                      </Tooltip>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </TableContainer>

        {/* Modal de Detalles del Bien */}
        <Dialog
          open={openDetailModal}
          onClose={handleCloseDetailModal}
          fullWidth
          maxWidth="md"
          fullScreen={isMobile}
          PaperProps={{
            sx: {
              backgroundColor: darkMode ? "#1A202C" : "#FFFFFF",
              color: darkMode ? "#E2E8F0" : "inherit",
              borderRadius: "12px",
            },
          }}
        >
          {selectedBien && (
            <>
              <DialogTitle
                sx={{
                  borderBottom: 1,
                  borderColor: darkMode ? "#4A5568" : "divider",
                  color: darkMode ? "#E2E8F0" : "#2D3748",
                  fontWeight: "bold",
                }}
              >
                Detalles del Bien
              </DialogTitle>
              <DialogContent sx={{ pt: 3 }}>
                <Grid container spacing={3}>
                  <Grid
                    item
                    xs={12}
                    md={4}
                    sx={{ display: "flex", justifyContent: "center", alignItems: "flex-start" }}
                  >
                    <Card
                      sx={{
                        width: "100%",
                        backgroundColor: darkMode ? "#2D3748" : "#FFFFFF",
                        border: darkMode ? "1px solid #4A5568" : "none",
                      }}
                    >
                      <CardContent sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                        <Avatar
                          src={selectedBien.imagen}
                          alt={selectedBien.modelo}
                          variant="rounded"
                          sx={{ width: 150, height: 150, mb: 2 }}
                        />
                        <Typography variant="h6" sx={{ color: darkMode ? "#E2E8F0" : "#2D3748", fontWeight: "bold" }}>
                          {selectedBien.marca} {selectedBien.modelo}
                        </Typography>
                        <Chip icon={<DeleteIcon />} label="Dado de Baja" color="error" sx={{ mt: 1 }} />
                      </CardContent>
                    </Card>
                  </Grid>
                  <Grid item xs={12} md={8}>
                    <Card
                      sx={{
                        backgroundColor: darkMode ? "#2D3748" : "#FFFFFF",
                        border: darkMode ? "1px solid #4A5568" : "none",
                        mb: 2,
                      }}
                    >
                      <CardContent>
                        <Typography
                          variant="h6"
                          sx={{
                            color: darkMode ? "#E2E8F0" : "#2D3748",
                            fontWeight: "bold",
                            mb: 2,
                            display: "flex",
                            alignItems: "center",
                          }}
                        >
                          <InfoIcon sx={{ mr: 1 }} /> Información General
                        </Typography>

                        <Grid container spacing={2}>
                          
                          <Grid item xs={12} sm={6}>
                            <Typography variant="body2" color={darkMode ? "#A0AEC0" : "text.secondary"}>
                              Número de Serie
                            </Typography>
                            <Typography variant="body1" sx={{ color: darkMode ? "#E2E8F0" : "inherit", mb: 1 }}>
                              {selectedBien.nSerie || "No disponible"}
                            </Typography>
                          </Grid>
                          <Grid item xs={12} sm={6}>
                            <Typography variant="body2" color={darkMode ? "#A0AEC0" : "text.secondary"}>
                              Tipo de Bien
                            </Typography>
                            <Typography variant="body1" sx={{ color: darkMode ? "#E2E8F0" : "inherit", mb: 1 }}>
                              {selectedBien.tipoBien}
                            </Typography>
                          </Grid>
                          <Grid item xs={12} sm={6}>
                            <Typography variant="body2" color={darkMode ? "#A0AEC0" : "text.secondary"}>
                              Fecha de Registro
                            </Typography>
                            <Typography variant="body1" sx={{ color: darkMode ? "#E2E8F0" : "inherit", mb: 1 }}>
                              {formatDate(selectedBien.fecha)}
                            </Typography>
                          </Grid>
                        </Grid>
                      </CardContent>
                    </Card>

                    <Card
                      sx={{
                        backgroundColor: darkMode ? "#2D3748" : "#FFFFFF",
                        border: darkMode ? "1px solid #4A5568" : "none",
                      }}
                    >
                      <CardContent>
                        <Typography
                          variant="h6"
                          sx={{
                            color: darkMode ? "#E2E8F0" : "#2D3748",
                            fontWeight: "bold",
                            mb: 2,
                            display: "flex",
                            alignItems: "center",
                          }}
                        >
                          <DeleteIcon sx={{ mr: 1 }} /> Información de Baja
                        </Typography>

                        <Grid container spacing={2}>
                          <Grid item xs={12}>
                            <Typography variant="body2" color={darkMode ? "#A0AEC0" : "text.secondary"}>
                              Motivo de Baja
                            </Typography>
                            <Typography
                              variant="body1"
                              sx={{
                                color: darkMode ? "#E2E8F0" : "inherit",
                                mb: 1,
                                p: 1,
                                backgroundColor: darkMode ? "#1A202C" : "#F7FAFC",
                                borderRadius: "4px",
                                border: "1px solid",
                                borderColor: darkMode ? "#4A5568" : "#E2E8F0",
                              }}
                            >
                              {selectedBien.motivoBaja || "Sin especificar"}
                            </Typography>
                          </Grid>
                          <Grid item xs={12} sm={6}>
                            <Typography variant="body2" color={darkMode ? "#A0AEC0" : "text.secondary"}>
                              Fecha de Baja
                            </Typography>
                            <Typography
                              variant="body1"
                              sx={{
                                color: darkMode ? "#E2E8F0" : "inherit",
                                mb: 1,
                                display: "flex",
                                alignItems: "center",
                              }}
                            >
                              <CalendarTodayIcon sx={{ mr: 1, fontSize: "small" }} />
                              {selectedBien.fechaBaja}
                            </Typography>
                          </Grid>
                          <Grid item xs={12} sm={6}>
                            <Typography variant="body2" color={darkMode ? "#A0AEC0" : "text.secondary"}>
                              Responsable
                            </Typography>
                            <Typography
                              variant="body1"
                              sx={{
                                color: darkMode ? "#E2E8F0" : "inherit",
                                mb: 1,
                                display: "flex",
                                alignItems: "center",
                              }}
                            >
                              <PersonIcon sx={{ mr: 1, fontSize: "small" }} />
                              {selectedBien.usuarioResponsable}
                            </Typography>
                          </Grid>
                          {selectedBien.lugar && selectedBien.lugar !== "Sin asignar" && (
                            <Grid item xs={12} sm={6}>
                              <Typography variant="body2" color={darkMode ? "#A0AEC0" : "text.secondary"}>
                                Ubicación
                              </Typography>
                              <Typography
                                variant="body1"
                                sx={{
                                  color: darkMode ? "#E2E8F0" : "inherit",
                                  mb: 1,
                                  display: "flex",
                                  alignItems: "center",
                                }}
                              >
                                <LocationOnIcon sx={{ mr: 1, fontSize: "small" }} />
                                {selectedBien.lugar}
                              </Typography>
                            </Grid>
                          )}
                        </Grid>
                      </CardContent>
                    </Card>
                  </Grid>
                </Grid>
              </DialogContent>
              <DialogActions sx={{ borderTop: 1, borderColor: darkMode ? "#4A5568" : "divider", p: 2 }}>
                <Button
                  onClick={handleCloseDetailModal}
                  variant="contained"
                  color="secondary"
                  sx={{
                    borderRadius: "8px",
                    fontWeight: "bold",
                    backgroundColor: "#6A1B9A",
                    boxShadow: "0 4px 12px rgba(106, 27, 154, 0.2)",
                    "&:hover": {
                      backgroundColor: "#5C1690",
                      boxShadow: "0 6px 16px rgba(106, 27, 154, 0.3)",
                    },
                  }}
                >
                  Cerrar
                </Button>
              </DialogActions>
            </>
          )}
        </Dialog>
      </Paper>
    </Box>
  )
}

export default BienesBaja

