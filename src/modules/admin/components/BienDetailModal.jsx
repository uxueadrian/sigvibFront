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

const themeColors = {
  primary: "#673AB7", // Morado principal
  secondary: "#673AB7", // Morado más claro
  textLight: "#9575CD", // Blanco
  textDark: "#000000", // Negro
  backgroundLight: "#F3F4F6", // Fondo claro
  backgroundDark: "#1E1E1E", // Fondo oscuro
  paperLight: "#FFFFFF",
  paperDark: "#2C2C2C",
}

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
          backgroundColor: darkMode ? themeColors.paperDark : themeColors.paperLight,
          overflow: "hidden",
          boxShadow: "0 8px 24px rgba(106, 27, 154, 0.15)",
        },
      }}
    >
      <DialogTitle
        sx={{
          backgroundColor: themeColors.primary,
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
              backgroundColor: darkMode ? "#2A2A2A" : "#F5F0F9",
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
                boxShadow: "0px 4px 12px rgba(106, 27, 154, 0.15)",
                border: "1px solid #e0e0e0",
              }}
            />
          </Box>

          {/* Right side - Details */}
          <Box sx={{ width: { xs: "100%", md: "60%" }, p: 4 }}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Typography
                  variant="h5"
                  fontWeight="bold"
                  color={darkMode ? themeColors.textLight : themeColors.primary}
                  gutterBottom
                >
                  {bien.modelo}
                </Typography>
                <Typography
                  variant="subtitle1"
                  color={darkMode ? "rgba(255,255,255,0.7)" : "text.secondary"}
                  gutterBottom
                >
                  {bien.marca}
                </Typography>
                <Divider sx={{ my: 2, borderColor: darkMode ? "rgba(255,255,255,0.1)" : "rgba(106, 27, 154, 0.1)" }} />
              </Grid>

              <Grid item xs={12} sm={6}>
                <Typography variant="body2" color={darkMode ? "rgba(255,255,255,0.7)" : "#7B6F8A"}>
                  Número de Serie
                </Typography>
                <Typography
                  variant="body1"
                  fontWeight="medium"
                  color={darkMode ? "white" : "text.primary"}
                  gutterBottom
                >
                  {bien.nSerie}
                </Typography>
              </Grid>

              <Grid item xs={12} sm={6}>
                <Typography variant="body2" color={darkMode ? "rgba(255,255,255,0.7)" : "#7B6F8A"}>
                  Código de Barras
                </Typography>
                <Typography
                  variant="body1"
                  fontWeight="medium"
                  color={darkMode ? "white" : "text.primary"}
                  gutterBottom
                >
                  {bien.codigoBarras || "No asignado"}
                </Typography>
              </Grid>

              <Grid item xs={12} sm={6}>
                <Typography variant="body2" color={darkMode ? "rgba(255,255,255,0.7)" : "#7B6F8A"}>
                  Tipo de Bien
                </Typography>
                <Chip
                  label={bien.tipoBien}
                  size="small"
                  sx={{
                    mt: 0.5,
                    backgroundColor: darkMode ? "rgba(106, 27, 154, 0.2)" : "#F0E6F8",
                    color: darkMode ? themeColors.textLight : themeColors.primary,
                    fontWeight: "medium",
                  }}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <Typography variant="body2" color={darkMode ? "rgba(255,255,255,0.7)" : "#7B6F8A"}>
                  Ubicación
                </Typography>
                <Chip
                  label={bien.lugar}
                  size="small"
                  sx={{
                    mt: 0.5,
                    backgroundColor: darkMode ? "rgba(63, 81, 181, 0.2)" : "#E8F0FD",
                    color: darkMode ? "#A5B4FC" : "#3F51B5",
                  }}
                />
              </Grid>

              <Grid item xs={12}>
                <Typography variant="body2" color={darkMode ? "rgba(255,255,255,0.7)" : "#7B6F8A"}>
                  Responsable
                </Typography>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1, mt: 0.5 }}>
                  <Avatar
                    sx={{
                      width: 32,
                      height: 32,
                      fontSize: "1rem",
                      bgcolor: themeColors.primary,
                      border: `2px solid ${darkMode ? themeColors.paperDark : "white"}`,
                    }}
                  >
                    {bien.usuarioResponsable.charAt(0).toUpperCase()}
                  </Avatar>
                  <Typography variant="body1" fontWeight="medium" color={darkMode ? "white" : "text.primary"}>
                    {bien.usuarioResponsable}
                  </Typography>
                </Box>
              </Grid>

              {/* Código de Barras Visual */}
              <Grid item xs={12}>
                <Box
                  sx={{
                    mt: 2,
                    p: 3,
                    borderRadius: 2,
                    border: darkMode ? "1px solid rgba(255,255,255,0.1)" : "1px solid rgba(106, 27, 154, 0.2)",
                    backgroundColor: darkMode ? "rgba(255,255,255,0.05)" : "#F8F4FB",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                >
                  <Typography
                    variant="subtitle2"
                    color={darkMode ? themeColors.textLight : themeColors.primary}
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
                        backgroundColor: themeColors.primary,
                      },
                    }}
                  >
                    Código de Barras
                  </Typography>

                  {bien.codigoBarras ? (
                    <Box
                      sx={{
                        bgcolor: darkMode ? "#333" : "white",
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
                      color={darkMode ? "rgba(255,255,255,0.5)" : "text.secondary"}
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
          backgroundColor: darkMode ? "rgba(0,0,0,0.2)" : "#F8F4FB",
          borderTop: darkMode ? "1px solid rgba(255,255,255,0.1)" : "1px solid rgba(106, 27, 154, 0.1)",
        }}
      >
        <Button
          variant="contained"
          color="error"
          startIcon={<DeleteIcon />}
          sx={{
            borderRadius: "8px",
            fontWeight: "bold",
            boxShadow: "0 2px 5px rgba(211, 47, 47, 0.2)",
            bgcolor: "#d32f2f",
            "&:hover": {
              bgcolor: "#b71c1c",
              boxShadow: "0 4px 8px rgba(211, 47, 47, 0.3)",
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
            borderColor: darkMode ? themeColors.textLight : themeColors.primary,
            color: darkMode ? themeColors.textLight : themeColors.primary,
            "&:hover": {
              borderColor: darkMode ? themeColors.textLight : "#5E35B1",
              backgroundColor: darkMode ? "rgba(255,255,255,0.05)" : "rgba(156, 39, 176, 0.04)",
            },
          }}
        >
          Cerrar
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default BienDetailModal

