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
  Numbers,
  Person,
  LocationOn,
  CalendarToday,
} from "@mui/icons-material"
import axios from "axios"
import JsBarcode from "jsbarcode"

import { Tituloh1 } from "../../../../styles/typography"
import { BienCard, CardMediaResponsiva, CardContentResponsiva } from "../../../../styles/cards"
import { ContainerResponsiva, CardsGrid, CardItem, PaperResponsiva, CustomBox } from "../../../../styles/layout"
import { CustomAlert } from "../../../../styles/feedback"

const BienCardComponent = ({ bien, onViewDetails }) => {
  return (
    <BienCard onClick={() => onViewDetails(bien)} sx={{ cursor: "pointer" }}>
      <CardMediaResponsiva image={bien.modelo?.foto || "/placeholder-item.png"} alt={bien.tipoBien?.nombre} />
      <CardContentResponsiva>
        <Typography variant="h6" component="div">
          {bien.tipoBien?.nombre || "Sin tipo"} - {bien.marca?.nombre || "Sin marca"}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          <strong>Modelo:</strong> {bien.modelo?.nombreModelo || "Sin asignar"}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          <strong>Número de serie:</strong> {bien.nSerie || "No disponible"}
        </Typography>
      </CardContentResponsiva>
    </BienCard>
  )
}

const BienDetailModal = ({ open, onClose, bien }) => {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"))
  const isTablet = useMediaQuery(theme.breakpoints.down("md"))

  if (!bien) return null

  // Formatear fecha si existe
  const formatDate = (dateString) => {
    if (!dateString) return "No disponible"
    const date = new Date(dateString)
    return date.toLocaleDateString("es-ES", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    })
  }

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

                    {/* Información adicional */}
                    <Box sx={{ mt: 3 }}>
                      <Grid container spacing={2}>
                        {bien.fechaAlta && (
                          <Grid item xs={12} sm={6}>
                            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                              <CalendarToday fontSize="small" color="action" />
                              <Typography variant="body2" color="text.secondary">
                                Fecha de alta: <strong>{formatDate(bien.fechaAlta)}</strong>
                              </Typography>
                            </Box>
                          </Grid>
                        )}

                        {bien.responsable && (
                          <Grid item xs={12} sm={6}>
                            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                              <Person fontSize="small" color="action" />
                              <Typography variant="body2" color="text.secondary">
                                Responsable: <strong>{bien.responsable.nombre || "No asignado"}</strong>
                              </Typography>
                            </Box>
                          </Grid>
                        )}

                        {bien.lugar && (
                          <Grid item xs={12} sm={6}>
                            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                              <LocationOn fontSize="small" color="action" />
                              <Typography variant="body2" color="text.secondary">
                                Ubicación: <strong>{bien.lugar.nombre || "No asignado"}</strong>
                              </Typography>
                            </Box>
                          </Grid>
                        )}
                      </Grid>
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
                <Info sx={{ mr: 1 }} /> Especificaciones Técnicas
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
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1 }}>
                      <Numbers color="primary" fontSize="small" />
                      <Typography variant="subtitle2" color="text.secondary" gutterBottom sx={{ fontSize: "0.875rem" }}>
                        Número de Serie
                      </Typography>
                    </Box>
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

const CargoResponsable = () => {
  const { user } = useContext(AuthContext)
  const [bienes, setBienes] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [selectedBien, setSelectedBien] = useState(null)
  const [modalOpen, setModalOpen] = useState(false)

  useEffect(() => {
    const fetchBienes = async () => {
      if (!user?.idUsuario) return

      try {
        setLoading(true)
        const response = await axios.get(`http://bienes-env.eba-hv5kxbpm.us-east-1.elasticbeanstalk.com/bienes/responsable/${user.idUsuario}`)

        if (response.data && response.data.result) {
          setBienes(response.data.result)
        } else {
          setBienes([])
        }
      } catch (error) {
        console.error("Error al obtener los bienes:", error)
        setError("Error al cargar los bienes asignados")
      } finally {
        setLoading(false)
      }
    }

    fetchBienes()
  }, [user])

  const handleViewDetails = (bien) => {
    setSelectedBien(bien)
    setModalOpen(true)
  }

  const handleCloseModal = () => {
    setModalOpen(false)
  }

  return (
    <ContainerResponsiva maxWidth="xl">
      <Tituloh1>Bienes a mi cargo</Tituloh1>
      <PaperResponsiva elevation={3}>
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
                <BienCardComponent bien={bien} onViewDetails={handleViewDetails} />
              </CardItem>
            ))}
          </CardsGrid>
        ) : (
          <CustomAlert severity="info">No tienes bienes asignados actualmente.</CustomAlert>
        )}
      </PaperResponsiva>

      <BienDetailModal open={modalOpen} onClose={handleCloseModal} bien={selectedBien} />
    </ContainerResponsiva>
  )
}

export default CargoResponsable

