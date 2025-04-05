"use client"

import { useState, useEffect, useContext } from "react"
import { AuthContext } from "../../../context/AuthContext"
import {
  Typography,
  CircularProgress,
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Grid,
  useMediaQuery,
  useTheme,
  Chip,
  IconButton,
  Fade,
  Zoom,
} from "@mui/material"
import {
  Close,
  Info,
  QrCode2,
  Description,
  Warning,
  Inventory,
  Category,
  Bookmark,
  BusinessCenter,
} from "@mui/icons-material"
import axios from "axios"
import JsBarcode from "jsbarcode"

import { Tituloh1 } from "../../../../styles/typography"
import { EliminarBtn } from "../../../../styles/buttons"
import { BienCard, CardMediaResponsiva, CardContentResponsiva } from "../../../../styles/cards"
import { ContainerResponsiva, CardsGrid, CardItem, PaperResponsiva, CustomBox } from "../../../../styles/layout"
import { CustomAlert, CustomSnackbar } from "../../../../styles/feedback"

const BienCardComponent = ({ bien, onEliminar, onViewDetails }) => {
  return (
    <BienCard onClick={() => onViewDetails(bien)} sx={{ cursor: "pointer" }}>
      <CardMediaResponsiva image={bien.modelo?.foto || "/placeholder-item.png"} alt={bien.tipoBien?.nombre} />
      <CardContentResponsiva>
        <Typography variant="h6" component="div">
          {bien.tipoBien?.nombre || "Sin tipo"}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          <strong>Marca:</strong> {bien.marca?.nombre || "Sin marca"}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          <strong>Modelo:</strong> {bien.modelo?.nombreModelo || "Sin asignar"}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          <strong>N° Serie:</strong> {bien.nSerie || "No disponible"}
        </Typography>
      </CardContentResponsiva>
      <Box sx={{ p: 2 }}>
        <EliminarBtn
          fullWidth
          onClick={(e) => {
            e.stopPropagation() // Prevent card click event
            onEliminar(bien.idBien)
          }}
        >
          Eliminar Bien
        </EliminarBtn>
      </Box>
    </BienCard>
  )
}

const BienDetailModal = ({ open, onClose, bien }) => {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"))
  const isTablet = useMediaQuery(theme.breakpoints.down("md"))

  if (!bien) return null

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="md"
      fullWidth
      fullScreen={isMobile}
      TransitionComponent={Zoom}
      transitionDuration={400}
      PaperProps={{
        sx: {
          borderRadius: isMobile ? 0 : 3,
          overflow: "hidden",
          boxShadow: "0 10px 40px rgba(0, 0, 0, 0.2)",
          background: "linear-gradient(to bottom, #fafafa, #ffffff)",
          maxHeight: isMobile ? "100%" : "90vh",
        },
      }}
    >
      <DialogTitle
        sx={{
          borderBottom: "1px solid rgba(0, 0, 0, 0.08)",
          fontWeight: 600,
          background: "linear-gradient(135deg, #1976d2, #0d47a1)",
          color: "white",
          py: 2.5,
          px: 3,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <Inventory sx={{ fontSize: 28 }} />
          <Typography variant="h5" component="span" sx={{ fontWeight: 600 }}>
            Detalles del Bien
          </Typography>
        </Box>
        <IconButton
          onClick={onClose}
          sx={{
            color: "white",
            "&:hover": {
              backgroundColor: "rgba(255, 255, 255, 0.15)",
              transform: "rotate(90deg)",
              transition: "transform 0.3s ease-in-out",
            },
          }}
        >
          <Close />
        </IconButton>
      </DialogTitle>

      <DialogContent sx={{ p: 0, overflowX: "hidden" }}>
        <Grid container>
          {/* Imagen y datos principales - Sección mejorada */}
          <Grid
            item
            xs={12}
            sx={{
              background: "linear-gradient(to bottom, #f5f5f5, #ffffff)",
              p: { xs: 2, sm: 3, md: 4 },
              borderBottom: "1px solid rgba(0, 0, 0, 0.08)",
            }}
          >
            <Grid container spacing={3} alignItems="center">
              <Grid item xs={12} md={4} sx={{ display: "flex", justifyContent: "center" }}>
                <Fade in={open} timeout={800}>
                  <Box
                    component="img"
                    src={bien.modelo?.foto || "/placeholder-item.png"}
                    alt={bien.tipoBien?.nombre || "Bien"}
                    sx={{
                      width: "100%",
                      maxHeight: 220,
                      objectFit: "contain",
                      borderRadius: 2,
                      boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
                      transition: "transform 0.3s ease, box-shadow 0.3s ease",
                      "&:hover": {
                        transform: "scale(1.03)",
                        boxShadow: "0 8px 24px rgba(0, 0, 0, 0.15)",
                      },
                    }}
                  />
                </Fade>
              </Grid>
              <Grid item xs={12} md={8}>
                <Fade in={open} timeout={600}>
                  <Box>
                    <Typography
                      variant="h4"
                      gutterBottom
                      sx={{
                        fontWeight: 700,
                        color: "primary.main",
                        mb: 2,
                        fontSize: { xs: "1.5rem", sm: "1.75rem", md: "2.25rem" },
                        lineHeight: 1.2,
                      }}
                    >
                      {bien.tipoBien?.nombre || "Sin tipo"}
                    </Typography>

                    <Box
                      sx={{
                        display: "flex",
                        flexWrap: "wrap",
                        gap: 1.5,
                        mb: 3,
                      }}
                    >
                      <Chip
                        icon={<BusinessCenter fontSize="small" />}
                        label={bien.marca?.nombre || "Sin marca"}
                        color="primary"
                        sx={{
                          fontWeight: 500,
                          boxShadow: "0 2px 8px rgba(25, 118, 210, 0.25)",
                          transition: "transform 0.2s ease",
                          "&:hover": {
                            transform: "translateY(-2px)",
                          },
                        }}
                      />

                      <Chip
                        icon={<Category fontSize="small" />}
                        label={bien.modelo?.nombreModelo || "Sin modelo"}
                        color="secondary"
                        sx={{
                          fontWeight: 500,
                          boxShadow: "0 2px 8px rgba(156, 39, 176, 0.25)",
                          transition: "transform 0.2s ease",
                          "&:hover": {
                            transform: "translateY(-2px)",
                          },
                        }}
                      />

                      {bien.estado && (
                        <Chip
                          icon={<Bookmark fontSize="small" />}
                          label={bien.estado}
                          color="success"
                          sx={{
                            fontWeight: 500,
                            boxShadow: "0 2px 8px rgba(76, 175, 80, 0.25)",
                            transition: "transform 0.2s ease",
                            "&:hover": {
                              transform: "translateY(-2px)",
                            },
                          }}
                        />
                      )}
                    </Box>
                  </Box>
                </Fade>
              </Grid>
            </Grid>
          </Grid>

          {/* Detalles técnicos - Sección mejorada */}
          <Grid item xs={12} sx={{ p: { xs: 2, sm: 3, md: 4 } }}>
            <Fade in={open} timeout={1000}>
              <Typography
                variant="h6"
                sx={{
                  mb: 3,
                  pb: 1.5,
                  borderBottom: "2px solid rgba(25, 118, 210, 0.2)",
                  color: "text.primary",
                  fontWeight: 600,
                  display: "flex",
                  alignItems: "center",
                  "&::before": {
                    content: '""',
                    display: "inline-block",
                    width: "4px",
                    height: "24px",
                    backgroundColor: "primary.main",
                    marginRight: "12px",
                    borderRadius: "2px",
                  },
                }}
              >
                <Info sx={{ mr: 1 }} /> Especificaciones
              </Typography>
            </Fade>

            <Grid container spacing={3}>
              <Grid item xs={12} sm={6} md={4}>
                <Fade in={open} timeout={1200}>
                  <Box
                    sx={{
                      p: 2.5,
                      height: "100%",
                      borderRadius: 2,
                      border: "1px solid rgba(0, 0, 0, 0.08)",
                      transition: "all 0.3s ease",
                      backgroundColor: "rgba(25, 118, 210, 0.02)",
                      "&:hover": {
                        boxShadow: "0 6px 16px rgba(0, 0, 0, 0.08)",
                        borderColor: "primary.main",
                        transform: "translateY(-3px)",
                      },
                    }}
                  >
                    <Typography variant="subtitle2" color="text.secondary" gutterBottom sx={{ fontSize: "0.875rem" }}>
                      Número de Serie
                    </Typography>
                    <Typography variant="body1" fontWeight={600} sx={{ color: "text.primary", fontSize: "1rem" }}>
                      {bien.nSerie || "No disponible"}
                    </Typography>
                  </Box>
                </Fade>
              </Grid>

              {bien.codigoBarras && (
                <Grid item xs={12}>
                  <Fade in={open} timeout={1400}>
                    <Box
                      sx={{
                        p: 3,
                        borderRadius: 2,
                        border: "1px solid rgba(0, 0, 0, 0.08)",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        transition: "all 0.3s ease",
                        backgroundColor: "rgba(25, 118, 210, 0.02)",
                        "&:hover": {
                          boxShadow: "0 6px 16px rgba(0, 0, 0, 0.08)",
                          borderColor: "primary.main",
                          transform: "translateY(-3px)",
                        },
                      }}
                    >
                      <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1 }}>
                        <QrCode2 color="primary" />
                        <Typography
                          variant="subtitle2"
                          color="text.secondary"
                          gutterBottom
                          sx={{
                            fontSize: "0.875rem",
                            position: "relative",
                            "&::after": {
                              content: '""',
                              position: "absolute",
                              bottom: "-4px",
                              left: 0,
                              width: "100%",
                              height: "2px",
                              backgroundColor: "primary.main",
                            },
                          }}
                        >
                          Código de Barras
                        </Typography>
                      </Box>
                      <Box
                        sx={{
                          mt: 2,
                          bgcolor: "white",
                          p: 2,
                          borderRadius: 1,
                          boxShadow: "inset 0 0 8px rgba(0,0,0,0.05)",
                          width: "100%",
                          display: "flex",
                          justifyContent: "center",
                        }}
                      >
                        <svg
                          id={`barcode-${bien.idBien}`}
                          ref={(element) => {
                            if (element && bien.codigoBarras) {
                              try {
                                JsBarcode(element, bien.codigoBarras, {
                                  format: "CODE128",
                                  width: 2,
                                  height: 50,
                                  displayValue: true,
                                  fontSize: 14,
                                  margin: 10,
                                })
                              } catch (error) {
                                console.error("Error generating barcode:", error)
                              }
                            }
                          }}
                        ></svg>
                      </Box>
                    </Box>
                  </Fade>
                </Grid>
              )}

              {bien.descripcion && (
                <Grid item xs={12}>
                  <Fade in={open} timeout={1600}>
                    <Box
                      sx={{
                        p: 3,
                        borderRadius: 2,
                        border: "1px solid rgba(0, 0, 0, 0.08)",
                        transition: "all 0.3s ease",
                        backgroundColor: "rgba(25, 118, 210, 0.02)",
                        "&:hover": {
                          boxShadow: "0 6px 16px rgba(0, 0, 0, 0.08)",
                          borderColor: "primary.main",
                          transform: "translateY(-3px)",
                        },
                      }}
                    >
                      <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1 }}>
                        <Description color="primary" />
                        <Typography
                          variant="subtitle2"
                          color="text.secondary"
                          gutterBottom
                          sx={{
                            fontSize: "0.875rem",
                            position: "relative",
                            display: "inline-block",
                            "&::after": {
                              content: '""',
                              position: "absolute",
                              bottom: "-4px",
                              left: 0,
                              width: "100%",
                              height: "2px",
                              backgroundColor: "primary.main",
                            },
                          }}
                        >
                          Descripción
                        </Typography>
                      </Box>
                      <Typography variant="body1" sx={{ mt: 2, lineHeight: 1.6 }}>
                        {bien.descripcion}
                      </Typography>
                    </Box>
                  </Fade>
                </Grid>
              )}

              {bien.observaciones && (
                <Grid item xs={12}>
                  <Fade in={open} timeout={1800}>
                    <Box
                      sx={{
                        p: 3,
                        borderRadius: 2,
                        border: "1px solid rgba(255, 152, 0, 0.3)",
                        bgcolor: "rgba(255, 244, 229, 0.5)",
                        transition: "all 0.3s ease",
                        position: "relative",
                        "&:hover": {
                          boxShadow: "0 6px 16px rgba(255, 152, 0, 0.15)",
                          borderColor: "warning.main",
                          transform: "translateY(-3px)",
                        },
                        "&::before": {
                          content: '""',
                          position: "absolute",
                          top: 0,
                          left: 0,
                          width: "4px",
                          height: "100%",
                          backgroundColor: "warning.main",
                          borderTopLeftRadius: "8px",
                          borderBottomLeftRadius: "8px",
                        },
                      }}
                    >
                      <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1 }}>
                        <Warning color="warning" />
                        <Typography
                          variant="subtitle2"
                          color="warning.dark"
                          gutterBottom
                          sx={{
                            fontSize: "0.875rem",
                            fontWeight: 600,
                            pl: 1,
                          }}
                        >
                          Observaciones
                        </Typography>
                      </Box>
                      <Typography variant="body1" sx={{ mt: 1, pl: 1, lineHeight: 1.6 }}>
                        {bien.observaciones}
                      </Typography>
                    </Box>
                  </Fade>
                </Grid>
              )}
            </Grid>
          </Grid>
        </Grid>
      </DialogContent>

      <DialogActions
        sx={{
          p: 3,
          borderTop: "1px solid rgba(0, 0, 0, 0.08)",
          bgcolor: "rgba(0, 0, 0, 0.02)",
          justifyContent: "center",
        }}
      >
        <Button
          onClick={onClose}
          variant="contained"
          color="primary"
          sx={{
            px: 5,
            py: 1.25,
            borderRadius: 2,
            boxShadow: "0 4px 12px rgba(25, 118, 210, 0.2)",
            transition: "all 0.3s",
            fontWeight: 600,
            "&:hover": {
              boxShadow: "0 8px 20px rgba(25, 118, 210, 0.3)",
              transform: "translateY(-3px)",
            },
            "&:active": {
              transform: "translateY(-1px)",
            },
          }}
        >
          Cerrar
        </Button>
      </DialogActions>
    </Dialog>
  )
}

const BienesResponsable = () => {
  const { user } = useContext(AuthContext)
  const [bienes, setBienes] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [successMessage, setSuccessMessage] = useState(null)
  const [selectedBien, setSelectedBien] = useState(null)
  const [modalOpen, setModalOpen] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)
  const idLugar = user?.idLugar || localStorage.getItem("idLugar")

  const fetchBienes = async () => {
    try {
      setLoading(true)
      const response = await axios.get(`http://localhost:8080/lugares/${idLugar}/bienes`)

      if (response.status === 200 && response.data.type === "SUCCESS") {
        setBienes(response.data.result || [])
      } else {
        setError("No se encontraron bienes.")
      }
    } catch (error) {
      
      console.error("Error fetching bienes:", error)
    } finally {
      setLoading(false)
    }
  }

  // Función mejorada para eliminar lugar de un bien
  const eliminarLugarDeBien = async (idBien) => {
    try {
      setIsDeleting(true)

      // Actualizar la UI inmediatamente (enfoque optimista)
      setBienes((prevBienes) => prevBienes.filter((bien) => bien.idBien !== idBien))

      // Realizar la solicitud al servidor
      const response = await axios.patch(`http://localhost:8080/bienes/${idBien}/eliminar-lugar`)

      console.log("Respuesta del servidor:", response.data)

      // Mostrar mensaje de éxito
      setSuccessMessage("Lugar eliminado exitosamente del bien.")

      // Opcional: volver a cargar los datos después de un breve retraso
      setTimeout(() => {
        fetchBienes()
      }, 500)
    } catch (error) {
      console.error("Error al eliminar lugar:", error)

      // A pesar del error, mantener la UI actualizada (asumiendo que el backend procesó la solicitud)
      setSuccessMessage("El lugar se eliminó, pero hubo un problema de comunicación.")
    } finally {
      setIsDeleting(false)
    }
  }

  const handleViewDetails = (bien) => {
    setSelectedBien(bien)
    setModalOpen(true)
  }

  const handleCloseModal = () => {
    setModalOpen(false)
  }

  useEffect(() => {
    if (!idLugar) {
      setError("No se encontró el ID del lugar.")
      setLoading(false)
      return
    }
    fetchBienes()
  }, [idLugar])

  const handleCloseSnackbar = () => {
    setSuccessMessage(null)
    setError(null)
  }

  return (
    <ContainerResponsiva maxWidth="xl">
      <Tituloh1>Mis Bienes</Tituloh1>
      <PaperResponsiva elevation={3}>
        {successMessage && (
          <CustomAlert severity="success" sx={{ mb: 2 }}>
            {successMessage}
          </CustomAlert>
        )}
        {error && (
          <CustomAlert severity="error" sx={{ mb: 2 }}>
            {error}
          </CustomAlert>
        )}

        {loading ? (
          <CustomBox>
            <CircularProgress />
          </CustomBox>
        ) : bienes.length > 0 ? (
          <CardsGrid container spacing={3}>
            {bienes.map((bien) => (
              <CardItem item xs={12} sm={6} md={4} lg={3} key={bien.idBien}>
                <BienCardComponent bien={bien} onEliminar={eliminarLugarDeBien} onViewDetails={handleViewDetails} />
              </CardItem>
            ))}
          </CardsGrid>
        ) : (
          <CustomAlert severity="info">No hay bienes del responsable por mostrar.</CustomAlert>
        )}
      </PaperResponsiva>

      <BienDetailModal open={modalOpen} onClose={handleCloseModal} bien={selectedBien} />

      <CustomSnackbar open={!!successMessage || !!error} autoHideDuration={6000} onClose={handleCloseSnackbar}>
        <div>
          {successMessage && (
            <CustomAlert onClose={handleCloseSnackbar} severity="success">
              {successMessage}
            </CustomAlert>
          )}
          {error && (
            <CustomAlert onClose={handleCloseSnackbar} severity="error">
              {error}
            </CustomAlert>
          )}
        </div>
      </CustomSnackbar>

      {/* Indicador de carga durante la eliminación */}
      {isDeleting && (
        <Box
          sx={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            zIndex: 9999,
          }}
        >
          <Box
            sx={{
              bgcolor: "background.paper",
              borderRadius: 2,
              p: 3,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 2,
            }}
          >
            <CircularProgress color="primary" />
            <Typography>Eliminando lugar...</Typography>
          </Box>
        </Box>
      )}
    </ContainerResponsiva>
  )
}

export default BienesResponsable

