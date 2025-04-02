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
              src={bien.modelo?.foto || "/placeholder-item.png"}
              alt={bien.tipoBien?.nombre || "Bien"}
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
              {bien.tipoBien?.nombre || "Sin tipo"}
            </Typography>

            <Grid container spacing={2} sx={{ mt: 1 }}>
              <Grid item xs={12} sm={6}>
                <Typography variant="subtitle2" color="text.secondary">
                  Marca
                </Typography>
                <Typography variant="body1" gutterBottom>
                  {bien.marca?.nombre || "Sin marca"}
                </Typography>
              </Grid>

              <Grid item xs={12} sm={6}>
                <Typography variant="subtitle2" color="text.secondary">
                  Modelo
                </Typography>
                <Typography variant="body1" gutterBottom>
                  {bien.modelo?.nombreModelo || "Sin asignar"}
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

              {bien.codigoBarras && (
                <Grid item xs={12}>
                  <Typography variant="subtitle2" color="text.secondary">
                    Código de Barras
                  </Typography>
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
                </Grid>
              )}

              {bien.estado && (
                <Grid item xs={12} sm={6}>
                  <Typography variant="subtitle2" color="text.secondary">
                    Estado
                  </Typography>
                  <Typography variant="body1" gutterBottom>
                    {bien.estado}
                  </Typography>
                </Grid>
              )}

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

