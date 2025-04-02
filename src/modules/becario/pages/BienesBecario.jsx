"use client"

import { useState, useEffect } from "react"
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

const BienCardComponent = ({ bien, onEliminarLugar, onViewDetails }) => {
  return (
    <BienCard onClick={() => onViewDetails(bien)} sx={{ cursor: "pointer" }}>
      <CardMediaResponsiva image={bien.modelo.foto || "/placeholder-image.jpg"} alt={bien.tipoBien.nombre} />
      <CardContentResponsiva>
        <Typography variant="h6" component="div">
          {bien.tipoBien.nombre}
        </Typography>

        <Typography variant="body2" color="text.secondary">
          Marca: {bien.marca.nombre}
        </Typography>

        <Typography variant="body2" color="text.secondary">
          Modelo: {bien.modelo.nombreModelo}
        </Typography>
      </CardContentResponsiva>

      <CustomBox>
        <EliminarBtn
          onClick={(e) => {
            e.stopPropagation() // Prevent card click event
            onEliminarLugar(bien.idBien)
          }}
        >
          Eliminar Lugar
        </EliminarBtn>
      </CustomBox>
    </BienCard>
  )
}

const BienDetailModal = ({ open, onClose, bien }) => {
  if (!bien) return null

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle
        sx={{
          borderBottom: "1px solid #e0e0e0",
          fontWeight: "bold",
          bgcolor: "primary.light",
          color: "white",
        }}
      >
        Detalles del Bien
      </DialogTitle>
      <DialogContent sx={{ p: 3, mt: 2 }}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={4} sx={{ display: "flex", justifyContent: "center" }}>
            <Box
              component="img"
              src={bien.modelo.foto || "/placeholder-image.jpg"}
              alt={bien.tipoBien.nombre}
              sx={{
                maxWidth: "100%",
                maxHeight: 200,
                objectFit: "contain",
                border: "1px solid #e0e0e0",
                borderRadius: 1,
                p: 1,
              }}
            />
          </Grid>
          <Grid item xs={12} md={8}>
            <Typography variant="h5" gutterBottom>
              {bien.tipoBien.nombre}
            </Typography>

            <Grid container spacing={2} sx={{ mt: 1 }}>
              <Grid item xs={12} sm={6}>
                <Typography variant="subtitle2" color="text.secondary">
                  Marca
                </Typography>
                <Typography variant="body1" gutterBottom>
                  {bien.marca.nombre}
                </Typography>
              </Grid>

              <Grid item xs={12} sm={6}>
                <Typography variant="subtitle2" color="text.secondary">
                  Modelo
                </Typography>
                <Typography variant="body1" gutterBottom>
                  {bien.modelo.nombreModelo}
                </Typography>
              </Grid>

              <Grid item xs={12} sm={6}>
                <Typography variant="subtitle2" color="text.secondary">
                  Número de Serie
                </Typography>
                <Typography variant="body1" gutterBottom>
                  {bien.nSerie || "No disponible"}
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="subtitle2" color="text.secondary">
                  Codigo de barras
                </Typography>
                {bien.codigoBarras ? (
                  <Box sx={{ mt: 1 }}>
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
                ) : (
                  <Typography variant="body1" gutterBottom>
                    No disponible
                  </Typography>
                )}
              </Grid>

              <Grid item xs={12} sm={6}>
                <Typography variant="subtitle2" color="text.secondary">
                  Estado
                </Typography>
                <Typography variant="body1" gutterBottom>
                  {bien.estado || "No especificado"}
                </Typography>
              </Grid>

              {bien.descripcion && (
                <Grid item xs={12}>
                  <Typography variant="subtitle2" color="text.secondary">
                    Descripción
                  </Typography>
                  <Typography variant="body1" gutterBottom>
                    {bien.descripcion}
                  </Typography>
                </Grid>
              )}

              {bien.observaciones && (
                <Grid item xs={12}>
                  <Typography variant="subtitle2" color="text.secondary">
                    Observaciones
                  </Typography>
                  <Typography variant="body1" gutterBottom>
                    {bien.observaciones}
                  </Typography>
                </Grid>
              )}
            </Grid>
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions sx={{ p: 2, borderTop: "1px solid #e0e0e0" }}>
        <Button onClick={onClose} variant="contained" color="primary">
          Cerrar
        </Button>
      </DialogActions>
    </Dialog>
  )
}

const BienesBecario = ({ user }) => {
  const [bienes, setBienes] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  })
  const [selectedBien, setSelectedBien] = useState(null)
  const [modalOpen, setModalOpen] = useState(false)

  const idLugar = user?.idLugar || localStorage.getItem("idLugar")

  const fetchBienes = async () => {
    try {
      setLoading(true)
      const response = await axios.get(`http://localhost:8080/lugares/${idLugar}/bienes`)
      if (response.status === 200 && response.data.type === "SUCCESS") {
        setBienes(response.data.result)
        setError(null)
      } else {
        setError("No se encontraron bienes.")
      }
    } catch (error) {
      setError("Error al obtener los bienes. Por favor intenta más tarde.")
    } finally {
      setLoading(false)
    }
  }

  const eliminarLugarDeBien = async (idBien) => {
    try {
      const response = await axios.patch(`http://localhost:8080/bienes/${idBien}/eliminar-lugar`)
      if (response.status === 200 && response.data.type === "SUCCESS") {
        setSnackbar({
          open: true,
          message: "Lugar eliminado exitosamente del bien",
          severity: "success",
        })
        fetchBienes()
      } else {
        setSnackbar({
          open: true,
          message: "No se pudo eliminar el lugar del bien",
          severity: "error",
        })
      }
    } catch (error) {
      setSnackbar({
        open: true,
        message: "Error al eliminar el lugar del bien",
        severity: "error",
      })
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
      setError("No se encontró el ID del lugar. Por favor inicia sesión nuevamente.")
      setLoading(false)
      return
    }
    fetchBienes()
  }, [idLugar])

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false })
  }

  return (
    <ContainerResponsiva maxWidth="xl">
      <Tituloh1> Bienes Becarios </Tituloh1>
      <PaperResponsiva elevation={3}>
        {loading ? (
          <CustomBox>
            <CircularProgress />
          </CustomBox>
        ) : error ? (
          <CustomAlert severity="error">Error al obtener los bienes. Por favor intenta más tarde.</CustomAlert>
        ) : bienes.length > 0 ? (
          <CardsGrid container spacing={3}>
            {bienes.map((bien) => (
              <CardItem item xs={12} sm={6} md={4} lg={3} key={bien.idBien}>
                <BienCardComponent
                  bien={bien}
                  onEliminarLugar={eliminarLugarDeBien}
                  onViewDetails={handleViewDetails}
                />
              </CardItem>
            ))}
          </CardsGrid>
        ) : (
          <CustomAlert severity="info">No hay bienes disponibles para mostrar.</CustomAlert>
        )}
      </PaperResponsiva>

      <BienDetailModal open={modalOpen} onClose={handleCloseModal} bien={selectedBien} />

      <CustomSnackbar open={snackbar.open} autoHideDuration={4000} onClose={handleCloseSnackbar}>
        <CustomAlert onClose={handleCloseSnackbar} severity={snackbar.severity}>
          {snackbar.message}
        </CustomAlert>
      </CustomSnackbar>
    </ContainerResponsiva>
  )
}

export default BienesBecario

