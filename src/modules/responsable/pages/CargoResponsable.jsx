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
        const response = await axios.get(`http://localhost:8080/bienes/responsable/${user.idUsuario}`)

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

