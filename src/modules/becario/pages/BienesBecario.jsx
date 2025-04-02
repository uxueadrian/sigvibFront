"use client"

import { useState, useEffect, useRef } from "react"
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
  // Remove these imports from @mui/material
  // Print,
  // PictureAsPdf,
} from "@mui/material"
// Add these imports from @mui/icons-material
import { Print, PictureAsPdf } from "@mui/icons-material"
import { PDFDownloadLink, Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer"

import axios from "axios"
import JsBarcode from "jsbarcode"
import { useReactToPrint } from "react-to-print"

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
                  src={bien.modelo.foto || "/placeholder-image.jpg"}
                  alt={bien.tipoBien.nombre}
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
                  {bien.tipoBien.nombre}
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
                    <Typography variant="body2">{bien.marca.nombre}</Typography>
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
                    <Typography variant="body2">{bien.modelo.nombreModelo}</Typography>
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
                      <Typography variant="body2">{bien.estado || "No especificado"}</Typography>
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
                  {bien.codigoBarras ? (
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
                  ) : (
                    <Typography variant="body1" fontWeight={500}>
                      No disponible
                    </Typography>
                  )}
                </Box>
              </Grid>

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

// Create styles for PDF
const pdfStyles = StyleSheet.create({
  page: {
    padding: 30,
    backgroundColor: "#ffffff",
    fontFamily: "Helvetica",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
    paddingBottom: 10,
    borderBottom: "2px solid #1976d2",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#1976d2",
  },
  date: {
    fontSize: 12,
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#333",
  },
  infoBox: {
    padding: 10,
    backgroundColor: "#f5f5f5",
    borderRadius: 5,
    marginBottom: 10,
  },
  infoRow: {
    flexDirection: "row",
    marginBottom: 5,
  },
  infoLabel: {
    fontSize: 12,
    color: "#666",
    width: "30%",
  },
  infoValue: {
    fontSize: 12,
    fontWeight: "bold",
  },
  table: {
    display: "flex",
    width: "100%",
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    marginBottom: 20,
  },
  tableHeader: {
    flexDirection: "row",
    backgroundColor: "#1976d2",
    color: "#ffffff",
    padding: 8,
  },
  tableRow: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    borderBottomStyle: "solid",
    padding: 8,
  },
  tableRowEven: {
    backgroundColor: "#f9f9f9",
  },
  tableCol1: {
    width: "33.33%",
    fontSize: 10,
  },
  tableCol2: {
    width: "33.33%",
    fontSize: 10,
  },
  tableCol3: {
    width: "33.33%",
    fontSize: 10,
  },
  tableHeaderText: {
    fontSize: 10,
    fontWeight: "bold",
  },
  signatures: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 40,
  },
  signatureBox: {
    width: "45%",
    alignItems: "center",
  },
  signatureLine: {
    borderBottomWidth: 1,
    borderBottomColor: "#000",
    borderBottomStyle: "solid",
    width: "80%",
    marginBottom: 5,
  },
  signatureName: {
    fontSize: 12,
    fontWeight: "bold",
  },
  signatureTitle: {
    fontSize: 10,
  },
  footer: {
    position: "absolute",
    bottom: 30,
    left: 0,
    right: 0,
    textAlign: "center",
    fontSize: 10,
    color: "#666",
  },
})

// PDF Document Component
const BienesReportPDF = ({ bienes, user }) => {
  const currentDate = new Date().toLocaleDateString("es-MX", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })

  return (
    <Document>
      <Page size="A4" style={pdfStyles.page}>
        {/* Encabezado del reporte */}
        <View style={pdfStyles.header}>
          <Text style={pdfStyles.title}>Reporte de Bienes Asignados</Text>
          <Text style={pdfStyles.date}>Fecha: {currentDate}</Text>
        </View>

        {/* Información del becario */}
        <View style={pdfStyles.section}>
          <Text style={pdfStyles.sectionTitle}>Información del Becario</Text>
          <View style={pdfStyles.infoBox}>
            <View style={pdfStyles.infoRow}>
              <Text style={pdfStyles.infoLabel}>Nombre:</Text>
              <Text style={pdfStyles.infoValue}>{user?.nombre || "No disponible"}</Text>
            </View>
            <View style={pdfStyles.infoRow}>
              <Text style={pdfStyles.infoLabel}>ID Lugar:</Text>
              <Text style={pdfStyles.infoValue}>{user?.idLugar || "No disponible"}</Text>
            </View>
          </View>
        </View>

        {/* Lista de bienes */}
        <View style={pdfStyles.section}>
          <Text style={pdfStyles.sectionTitle}>Bienes Asignados</Text>
          {bienes.length > 0 ? (
            <View style={pdfStyles.table}>
              <View style={pdfStyles.tableHeader}>
                <Text style={[pdfStyles.tableCol1, pdfStyles.tableHeaderText]}>Tipo de Bien</Text>
                <Text style={[pdfStyles.tableCol2, pdfStyles.tableHeaderText]}>Marca/Modelo</Text>
                <Text style={[pdfStyles.tableCol3, pdfStyles.tableHeaderText]}>Número de Serie</Text>
              </View>
              {bienes.map((bien, index) => (
                <View key={bien.idBien} style={[pdfStyles.tableRow, index % 2 === 0 ? pdfStyles.tableRowEven : {}]}>
                  <Text style={pdfStyles.tableCol1}>{bien.tipoBien.nombre}</Text>
                  <Text style={pdfStyles.tableCol2}>
                    {bien.marca.nombre} / {bien.modelo.nombreModelo}
                  </Text>
                  <Text style={pdfStyles.tableCol3}>{bien.nSerie || "No disponible"}</Text>
                </View>
              ))}
            </View>
          ) : (
            <Text>No hay bienes asignados.</Text>
          )}
        </View>

        {/* Sección de firmas */}
        <View style={pdfStyles.signatures}>
          <View style={pdfStyles.signatureBox}>
            <View style={pdfStyles.signatureLine} />
            <Text style={pdfStyles.signatureName}>Firma del Becario</Text>
            <Text style={pdfStyles.signatureTitle}>{user?.nombre || "Nombre del Becario"}</Text>
          </View>
          <View style={pdfStyles.signatureBox}>
            <View style={pdfStyles.signatureLine} />
            <Text style={pdfStyles.signatureName}>Firma del Responsable</Text>
            <Text style={pdfStyles.signatureTitle}>Nombre del Responsable</Text>
          </View>
        </View>

        {/* Pie de página */}
        <Text style={pdfStyles.footer}>
          Este documento es un comprobante oficial de los bienes asignados al becario.
        </Text>
      </Page>
    </Document>
  )
}

const ReportModal = ({ open, onClose, bienes, user }) => {
  const reportRef = useRef(null)
  const currentDate = new Date().toLocaleDateString("es-MX", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })

  const handlePrint = useReactToPrint({
    content: () => reportRef.current,
    documentTitle: `Reporte_Bienes_${user?.nombre || "Becario"}`,
  })

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
            Reporte de Bienes
          </Typography>
        </Box>
        <Box sx={{ display: "flex", gap: 2 }}>
          <Button
            variant="contained"
            color="secondary"
            startIcon={<Print />}
            onClick={handlePrint}
            sx={{
              boxShadow: "0 4px 12px rgba(156, 39, 176, 0.2)",
              "&:hover": {
                boxShadow: "0 6px 16px rgba(156, 39, 176, 0.3)",
              },
            }}
          >
            Imprimir
          </Button>
          <PDFDownloadLink
            document={<BienesReportPDF bienes={bienes} user={user} />}
            fileName={`Reporte_Bienes_${user?.nombre || "Becario"}.pdf`}
            style={{ textDecoration: "none" }}
          >
            {({ blob, url, loading, error }) => (
              <Button
                variant="contained"
                color="primary"
                startIcon={<PictureAsPdf />}
                disabled={loading}
                sx={{
                  boxShadow: "0 4px 12px rgba(25, 118, 210, 0.2)",
                  "&:hover": {
                    boxShadow: "0 6px 16px rgba(25, 118, 210, 0.3)",
                  },
                }}
              >
                {loading ? "Generando PDF..." : "Descargar PDF"}
              </Button>
            )}
          </PDFDownloadLink>
        </Box>
      </DialogTitle>

      <DialogContent sx={{ p: 3 }}>
        <Box ref={reportRef} sx={{ p: 2 }}>
          {/* Encabezado del reporte */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              mb: 4,
              pb: 2,
              borderBottom: "2px solid #1976d2",
            }}
          >
            <Typography variant="h4" sx={{ fontWeight: 600, color: "primary.main" }}>
              Reporte de Bienes Asignados
            </Typography>
            <Typography variant="body1">Fecha: {currentDate}</Typography>
          </Box>

          {/* Información del becario */}
          <Box sx={{ mb: 4 }}>
            <Typography variant="h5" sx={{ mb: 2, color: "text.primary", fontWeight: 500 }}>
              Información del Becario
            </Typography>
            <Box
              sx={{
                p: 2,
                border: "1px solid rgba(0, 0, 0, 0.12)",
                borderRadius: 2,
                bgcolor: "rgba(0, 0, 0, 0.02)",
              }}
            >
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <Typography variant="subtitle2" color="text.secondary">
                    Nombre:
                  </Typography>
                  <Typography variant="body1" fontWeight={500}>
                    {user?.nombre || "No disponible"}
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography variant="subtitle2" color="text.secondary">
                    ID Lugar:
                  </Typography>
                  <Typography variant="body1" fontWeight={500}>
                    {user?.idLugar || "No disponible"}
                  </Typography>
                </Grid>
                {/* Aquí se pueden agregar más campos de información del becario si están disponibles */}
              </Grid>
            </Box>
          </Box>

          {/* Lista de bienes */}
          <Box sx={{ mb: 4 }}>
            <Typography variant="h5" sx={{ mb: 2, color: "text.primary", fontWeight: 500 }}>
              Bienes Asignados
            </Typography>
            {bienes.length > 0 ? (
              <Box
                sx={{
                  border: "1px solid rgba(0, 0, 0, 0.12)",
                  borderRadius: 2,
                  overflow: "hidden",
                }}
              >
                <Box
                  sx={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr 1fr",
                    bgcolor: "primary.main",
                    color: "white",
                    p: 1.5,
                  }}
                >
                  <Typography variant="subtitle2" fontWeight={600}>
                    Tipo de Bien
                  </Typography>
                  <Typography variant="subtitle2" fontWeight={600}>
                    Marca/Modelo
                  </Typography>
                  <Typography variant="subtitle2" fontWeight={600}>
                    Número de Serie
                  </Typography>
                </Box>
                {bienes.map((bien, index) => (
                  <Box
                    key={bien.idBien}
                    sx={{
                      display: "grid",
                      gridTemplateColumns: "1fr 1fr 1fr",
                      p: 1.5,
                      borderBottom: index < bienes.length - 1 ? "1px solid rgba(0, 0, 0, 0.12)" : "none",
                      bgcolor: index % 2 === 0 ? "white" : "rgba(0, 0, 0, 0.02)",
                    }}
                  >
                    <Typography variant="body2">{bien.tipoBien.nombre}</Typography>
                    <Typography variant="body2">
                      {bien.marca.nombre} / {bien.modelo.nombreModelo}
                    </Typography>
                    <Typography variant="body2">{bien.nSerie || "No disponible"}</Typography>
                  </Box>
                ))}
              </Box>
            ) : (
              <Typography variant="body1">No hay bienes asignados.</Typography>
            )}
          </Box>

          {/* Sección de firmas */}
          <Box sx={{ mt: 6, pt: 4 }}>
            <Grid container spacing={6}>
              <Grid item xs={12} sm={6} sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                <Box
                  sx={{
                    width: "80%",
                    borderBottom: "2px solid black",
                    mb: 1,
                    mt: 4,
                  }}
                ></Box>
                <Typography variant="subtitle1" fontWeight={500}>
                  Firma del Becario
                </Typography>
                <Typography variant="body2">{user?.nombre || "Nombre del Becario"}</Typography>
              </Grid>
              <Grid item xs={12} sm={6} sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                <Box
                  sx={{
                    width: "80%",
                    borderBottom: "2px solid black",
                    mb: 1,
                    mt: 4,
                  }}
                ></Box>
                <Typography variant="subtitle1" fontWeight={500}>
                  Firma del Responsable
                </Typography>
                <Typography variant="body2">Nombre del Responsable</Typography>
              </Grid>
            </Grid>
          </Box>

          {/* Pie de página */}
          <Box sx={{ mt: 6, pt: 2, borderTop: "1px solid rgba(0, 0, 0, 0.12)", textAlign: "center" }}>
            <Typography variant="body2" color="text.secondary">
              Este documento es un comprobante oficial de los bienes asignados al becario.
            </Typography>
          </Box>
        </Box>
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
          variant="outlined"
          sx={{
            px: 4,
            py: 1,
            borderRadius: 2,
          }}
        >
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
  const [reportModalOpen, setReportModalOpen] = useState(false)

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

  const handleOpenReportModal = () => {
    setReportModalOpen(true)
  }

  const handleCloseReportModal = () => {
    setReportModalOpen(false)
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
      <Box sx={{ display: "flex", justifyContent: "flex-end", mb: 2 }}>
        <Button
          variant="contained"
          color="primary"
          startIcon={<PictureAsPdf />}
          onClick={handleOpenReportModal}
          sx={{
            borderRadius: 2,
            boxShadow: "0 4px 12px rgba(25, 118, 210, 0.2)",
            transition: "all 0.2s",
            "&:hover": {
              boxShadow: "0 6px 16px rgba(25, 118, 210, 0.3)",
              transform: "translateY(-2px)",
            },
          }}
        >
          Generar Reporte
        </Button>
      </Box>
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
      <ReportModal open={reportModalOpen} onClose={handleCloseReportModal} bienes={bienes} user={user} />
    </ContainerResponsiva>
  )
}

export default BienesBecario

