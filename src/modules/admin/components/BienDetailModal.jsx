"use client"

import { useEffect } from "react"
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Grid,
  Box,
  Typography,
  Avatar,
  Chip,
  IconButton,
  Divider,
} from "@mui/material"
import { Close as CloseIcon, Delete as DeleteIcon } from "@mui/icons-material"
import JsBarcode from "jsbarcode"

const BienDetailModal = ({ open, onClose, bien, darkMode, setSelectedBien, setOpenBaja }) => {
  // Render barcode after modal opens
  useEffect(() => {
    if (open && bien && bien.codigoBarras) {
      // Add a small delay to ensure the DOM element is fully rendered
      const timer = setTimeout(() => {
        try {
          const barcodeElement = document.getElementById(`barcode-${bien.id}`)
          if (barcodeElement) {
            JsBarcode(barcodeElement, bien.codigoBarras, {
              format: "CODE128",
              width: 2,
              height: 50,
              displayValue: true,
              fontSize: 14,
              margin: 10,
            })
          } else {
            console.error("Barcode element not found:", `barcode-${bien.id}`)
          }
        } catch (error) {
          console.error("Error generating barcode:", error)
        }
      }, 300) // 300ms delay

      return () => clearTimeout(timer)
    }
  }, [open, bien])

  if (!bien) return null

  const handleDarDeBaja = () => {
    setSelectedBien(bien)
    setOpenBaja(true)
    onClose()
  }

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="md"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: "16px",
          backgroundColor: darkMode ? "#1E1E1E" : "#FFFFFF",
          backgroundImage: "none",
          overflow: "hidden",
        },
      }}
    >
      <DialogTitle
        sx={{
          bgcolor: "#6A1B9A",
          color: "white",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "16px 24px",
        }}
      >
        <Typography variant="h6" component="div" sx={{ fontWeight: "bold", letterSpacing: "0.3px" }}>
          Detalles del Bien
        </Typography>
        <IconButton edge="end" color="inherit" onClick={onClose} aria-label="close" size="small">
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent sx={{ p: 0 }}>
        <Box sx={{ display: "flex", flexDirection: { xs: "column", md: "row" }, width: "100%" }}>
          {/* Left side - Image */}
          <Box
            sx={{
              width: { xs: "100%", md: "40%" },
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              p: 4,
              backgroundColor: darkMode ? "#2D3748" : "#F8F9FA",
            }}
          >
            <Avatar
              src={bien.imagen}
              alt={bien.modelo}
              variant="rounded"
              sx={{
                width: "200px",
                height: "200px",
                borderRadius: "12px",
                boxShadow: "0px 4px 12px rgba(0,0,0,0.15)",
                border: `1px solid ${darkMode ? "#333" : "#e0e0e0"}`,
              }}
            />
          </Box>

          {/* Right side - Details */}
          <Box sx={{ width: { xs: "100%", md: "60%" }, p: 4 }}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Typography variant="h5" fontWeight="bold" color={darkMode ? "#E2E8F0" : "#6A1B9A"} gutterBottom>
                  {bien.modelo}
                </Typography>
                <Typography variant="subtitle1" color={darkMode ? "#A0AEC0" : "text.secondary"} gutterBottom>
                  {bien.marca}
                </Typography>
                <Divider sx={{ my: 2 }} />
              </Grid>

              <Grid item xs={12} sm={6}>
                <Typography variant="body2" color={darkMode ? "#A0AEC0" : "text.secondary"}>
                  Número de Serie
                </Typography>
                <Typography
                  variant="body1"
                  fontWeight="medium"
                  color={darkMode ? "#E2E8F0" : "text.primary"}
                  gutterBottom
                >
                  {bien.nSerie}
                </Typography>
              </Grid>

              <Grid item xs={12} sm={6}>
                <Typography variant="body2" color={darkMode ? "#A0AEC0" : "text.secondary"}>
                  Código de Barras
                </Typography>
                <Typography
                  variant="body1"
                  fontWeight="medium"
                  color={darkMode ? "#E2E8F0" : "text.primary"}
                  gutterBottom
                >
                  {bien.codigoBarras || "No asignado"}
                </Typography>
              </Grid>

              <Grid item xs={12} sm={6}>
                <Typography variant="body2" color={darkMode ? "#A0AEC0" : "text.secondary"}>
                  Tipo de Bien
                </Typography>
                <Chip
                  label={bien.tipoBien}
                  size="small"
                  sx={{
                    mt: 0.5,
                    backgroundColor: darkMode ? "#2D3748" : "#F0E6F8",
                    color: darkMode ? "#E2E8F0" : "#6A1B9A",
                    fontWeight: "medium",
                  }}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <Typography variant="body2" color={darkMode ? "#A0AEC0" : "text.secondary"}>
                  Ubicación
                </Typography>
                <Chip
                  label={bien.lugar}
                  size="small"
                  sx={{
                    mt: 0.5,
                    backgroundColor: darkMode ? "#2A3746" : "#E8F0FD",
                    color: darkMode ? "#EDF2F7" : "#3F51B5",
                  }}
                />
              </Grid>

              <Grid item xs={12}>
                <Typography variant="body2" color={darkMode ? "#A0AEC0" : "text.secondary"}>
                  Responsable
                </Typography>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1, mt: 0.5 }}>
                  <Avatar
                    sx={{
                      width: 32,
                      height: 32,
                      fontSize: "1rem",
                      bgcolor: darkMode ? "#6A1B9A" : "#9C27B0",
                      border: "2px solid #FFFFFF",
                    }}
                  >
                    {bien.usuarioResponsable.charAt(0).toUpperCase()}
                  </Avatar>
                  <Typography variant="body1" fontWeight="medium" color={darkMode ? "#E2E8F0" : "text.primary"}>
                    {bien.usuarioResponsable}
                  </Typography>
                </Box>
              </Grid>

              {/* Código de Barras Visual - Implementación mejorada */}
              <Grid item xs={12}>
                <Box
                  sx={{
                    mt: 2,
                    p: 3,
                    borderRadius: 2,
                    border: `1px solid ${darkMode ? "rgba(255,255,255,0.1)" : "rgba(106, 27, 154, 0.2)"}`,
                    backgroundColor: darkMode ? "#1A202C" : "#F5F0F9",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                >
                  <Typography
                    variant="subtitle2"
                    color={darkMode ? "#A0AEC0" : "#6A1B9A"}
                    gutterBottom
                    sx={{
                      fontWeight: "600",
                      mb: 2,
                      position: "relative",
                      "&::after": {
                        content: '""',
                        position: "absolute",
                        bottom: "-4px",
                        left: "50%",
                        transform: "translateX(-50%)",
                        width: "40px",
                        height: "2px",
                        backgroundColor: darkMode ? "#B478FF" : "#6A1B9A",
                      },
                    }}
                  >
                    Código de Barras
                  </Typography>

                  {bien.codigoBarras ? (
                    <Box
                      sx={{
                        bgcolor: "white",
                        p: 2,
                        borderRadius: 1,
                        boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                        width: "100%",
                        display: "flex",
                        justifyContent: "center",
                      }}
                    >
                      <svg id={`barcode-${bien.id}`} width="100%" height="100%"></svg>
                    </Box>
                  ) : (
                    <Typography
                      variant="body1"
                      color={darkMode ? "#A0AEC0" : "text.secondary"}
                      sx={{ fontStyle: "italic" }}
                    >
                      No hay código de barras asignado
                    </Typography>
                  )}
                </Box>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </DialogContent>

      <DialogActions
        sx={{
          padding: "16px 24px",
          backgroundColor: darkMode ? "#1A202C" : "#F5F0F9",
          borderTop: `1px solid ${darkMode ? "rgba(255,255,255,0.1)" : "rgba(106, 27, 154, 0.1)"}`,
        }}
      >
        <Button
          variant="contained"
          color="primary"
          startIcon={<DeleteIcon />}
          sx={{
            borderRadius: "8px",
            fontWeight: "bold",
            boxShadow: "0 2px 5px rgba(106, 27, 154, 0.2)",
            bgcolor: "#6A1B9A",
            "&:hover": {
              bgcolor: "#5C1690",
              boxShadow: "0 4px 8px rgba(106, 27, 154, 0.3)",
            },
          }}
          onClick={handleDarDeBaja}
        >
          Dar de Baja
        </Button>
        <Button
          variant="outlined"
          onClick={onClose}
          sx={{
            borderRadius: "8px",
            fontWeight: "bold",
            ml: 2,
          }}
        >
          Cerrar
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default BienDetailModal

