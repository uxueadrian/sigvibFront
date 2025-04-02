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
} from "@mui/material"
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
          Eliminar Lugar
        </EliminarBtn>
      </Box>
    </BienCard>
  )
}

const BienDetailModal = ({ open, onClose, bien }) => {
  if (!bien) return null

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="md"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: 2,
          overflow: "hidden",
          boxShadow: "0 8px 32px rgba(0, 0, 0, 0.12)",
        },
      }}
    >
      <DialogTitle
        sx={{
          borderBottom: "1px solid rgba(0, 0, 0, 0.08)",
          fontWeight: 600,
          background: "linear-gradient(135deg, #1976d2, #0d47a1)",
          color: "white",
          py: 2,
          px: 3,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <Typography variant="h5" component="span">
            Detalles del Bien
          </Typography>
        </Box>
      </DialogTitle>

      <DialogContent sx={{ p: 0 }}>
        <Grid container>
          {/* Imagen y datos principales */}
          <Grid
            item
            xs={12}
            sx={{
              background: "linear-gradient(to bottom, #f5f5f5, #ffffff)",
              p: 3,
              borderBottom: "1px solid rgba(0, 0, 0, 0.08)",
            }}
          >
            <Grid container spacing={3} alignItems="center">
              <Grid item xs={12} md={4} sx={{ display: "flex", justifyContent: "center" }}>
                <Box
                  component="img"
                  src={bien.modelo?.foto || "/placeholder-item.png"}
                  alt={bien.tipoBien?.nombre || "Bien"}
                  sx={{
                    width: "100%",
                    maxHeight: 220,
                    objectFit: "contain",
                    borderRadius: 2,
                    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.08)",
                    transition: "transform 0.3s ease",
                    "&:hover": {
                      transform: "scale(1.02)",
                    },
                  }}
                />
              </Grid>
              <Grid item xs={12} md={8}>
                <Typography
                  variant="h4"
                  gutterBottom
                  sx={{
                    fontWeight: 600,
                    color: "primary.main",
                    mb: 2,
                  }}
                >
                  {bien.tipoBien?.nombre || "Sin tipo"}
                </Typography>

                <Box
                  sx={{
                    display: "flex",
                    flexWrap: "wrap",
                    gap: 2,
                    mb: 2,
                  }}
                >
                  <Box
                    sx={{
                      bgcolor: "primary.light",
                      color: "white",
                      px: 2,
                      py: 0.5,
                      borderRadius: 2,
                      display: "inline-flex",
                      alignItems: "center",
                    }}
                  >
                    <Typography variant="body2">{bien.marca?.nombre || "Sin marca"}</Typography>
                  </Box>

                  <Box
                    sx={{
                      bgcolor: "secondary.light",
                      color: "white",
                      px: 2,
                      py: 0.5,
                      borderRadius: 2,
                      display: "inline-flex",
                      alignItems: "center",
                    }}
                  >
                    <Typography variant="body2">{bien.modelo?.nombreModelo || "Sin modelo"}</Typography>
                  </Box>

                  {bien.estado && (
                    <Box
                      sx={{
                        bgcolor: "success.light",
                        color: "white",
                        px: 2,
                        py: 0.5,
                        borderRadius: 2,
                        display: "inline-flex",
                        alignItems: "center",
                      }}
                    >
                      <Typography variant="body2">{bien.estado}</Typography>
                    </Box>
                  )}
                </Box>
              </Grid>
            </Grid>
          </Grid>

          {/* Detalles técnicos */}
          <Grid item xs={12} sx={{ p: 3 }}>
            <Typography
              variant="h6"
              sx={{
                mb: 2,
                pb: 1,
                borderBottom: "1px solid rgba(0, 0, 0, 0.08)",
                color: "text.primary",
              }}
            >
              Especificaciones
            </Typography>

            <Grid container spacing={3}>
              <Grid item xs={12} sm={6} md={4}>
                <Box
                  sx={{
                    p: 2,
                    height: "100%",
                    borderRadius: 2,
                    border: "1px solid rgba(0, 0, 0, 0.08)",
                    transition: "all 0.2s ease",
                    "&:hover": {
                      boxShadow: "0 4px 12px rgba(0, 0, 0, 0.05)",
                      borderColor: "primary.main",
                    },
                  }}
                >
                  <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                    Número de Serie
                  </Typography>
                  <Typography variant="body1" fontWeight={500}>
                    {bien.nSerie || "No disponible"}
                  </Typography>
                </Box>
              </Grid>

              {bien.codigoBarras && (
                <Grid item xs={12}>
                  <Box
                    sx={{
                      p: 2,
                      borderRadius: 2,
                      border: "1px solid rgba(0, 0, 0, 0.08)",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      transition: "all 0.2s ease",
                      "&:hover": {
                        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.05)",
                        borderColor: "primary.main",
                      },
                    }}
                  >
                    <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                      Código de Barras
                    </Typography>
                    <Box sx={{ mt: 1, bgcolor: "white", p: 1, borderRadius: 1 }}>
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
                </Grid>
              )}

              {bien.descripcion && (
                <Grid item xs={12}>
                  <Box
                    sx={{
                      p: 2,
                      borderRadius: 2,
                      border: "1px solid rgba(0, 0, 0, 0.08)",
                      transition: "all 0.2s ease",
                      "&:hover": {
                        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.05)",
                        borderColor: "primary.main",
                      },
                    }}
                  >
                    <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                      Descripción
                    </Typography>
                    <Typography variant="body1">{bien.descripcion}</Typography>
                  </Box>
                </Grid>
              )}

              {bien.observaciones && (
                <Grid item xs={12}>
                  <Box
                    sx={{
                      p: 2,
                      borderRadius: 2,
                      border: "1px solid rgba(0, 0, 0, 0.08)",
                      bgcolor: "rgba(255, 244, 229, 0.5)",
                      transition: "all 0.2s ease",
                      "&:hover": {
                        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.05)",
                        borderColor: "warning.main",
                      },
                    }}
                  >
                    <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                      Observaciones
                    </Typography>
                    <Typography variant="body1">{bien.observaciones}</Typography>
                  </Box>
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
        }}
      >
        <Button
          onClick={onClose}
          variant="contained"
          color="primary"
          sx={{
            px: 4,
            py: 1,
            borderRadius: 2,
            boxShadow: "0 4px 12px rgba(25, 118, 210, 0.2)",
            transition: "all 0.2s",
            "&:hover": {
              boxShadow: "0 6px 16px rgba(25, 118, 210, 0.3)",
              transform: "translateY(-2px)",
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
      setError("Error al obtener los bienes.")
      console.error("Error fetching bienes:", error)
    } finally {
      setLoading(false)
    }
  }

  const eliminarLugarDeBien = async (idBien) => {
    try {
      const response = await axios.patch(`http://localhost:8080/bienes/${idBien}/eliminar-lugar`)

      if (response.status === 200 && response.data.type === "SUCCESS") {
        setSuccessMessage("Lugar eliminado exitosamente del bien.")
        fetchBienes() // Refrescar lista de bienes
      } else {
        setError("No se pudo eliminar el lugar del bien.")
      }
    } catch (error) {
      setError("Error al eliminar el lugar del bien.")
      console.error("Error eliminando lugar:", error)
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
          <CustomAlert severity="info">No se encontraron bienes asignados a este lugar.</CustomAlert>
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
    </ContainerResponsiva>
  )
}

export default BienesResponsable

