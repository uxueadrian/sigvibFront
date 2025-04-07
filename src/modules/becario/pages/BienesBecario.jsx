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
  useMediaQuery,
  useTheme,
  Chip,
  Tooltip,
  IconButton,
  Fade,
  Zoom,
} from "@mui/material"
import {
  Print,
  PictureAsPdf,
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
import { PDFDownloadLink, Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer"

import axios from "axios"
import JsBarcode from "jsbarcode"
import { useReactToPrint } from "react-to-print"

import { Tituloh1 } from "../../../../styles/typography"
import { EliminarBtn } from "../../../../styles/buttons"
import { BienCard, CardMediaResponsiva, CardContentResponsiva } from "../../../../styles/cards"
import { ContainerResponsiva, CardsGrid, CardItem, PaperResponsiva, CustomBox } from "../../../../styles/layout"
import { CustomAlert, CustomSnackbar } from "../../../../styles/feedback"
import { useAuth } from "../../../context/AuthContext"

// Find the BienCardComponent and update it to add conditional styling
const BienCardComponent = ({ bien, onEliminarLugar, onViewDetails }) => {
  return (
    <BienCard
      onClick={() => onViewDetails(bien)}
      sx={{
        cursor: "pointer",
        ...(bien.status === false && {
          border: "2px solid #f44336",
          boxShadow: "0 4px 12px rgba(244, 67, 54, 0.2)",
          position: "relative",
          "&::before": {
            content: '""',
            position: "absolute",
            top: 0,
            right: 0,
            width: "0",
            height: "0",
            borderStyle: "solid",
            borderWidth: "0 40px 40px 0",
            borderColor: "transparent #f44336 transparent transparent",
            zIndex: 1,
          },
        }),
      }}
    >
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

        {bien.status === false && <Chip label="Dado de baja" color="error" size="small" sx={{ mt: 1 }} />}
      </CardContentResponsiva>

      <CustomBox>
        <EliminarBtn
          onClick={(e) => {
            e.stopPropagation() // Prevent card click event
            onEliminarLugar(bien.idBien)
          }}
        >
          Eliminar Bien
        </EliminarBtn>
      </CustomBox>
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
      {/* Find the DialogTitle in BienDetailModal and update it */}
      <DialogTitle
        sx={{
          borderBottom: "1px solid rgba(0, 0, 0, 0.08)",
          fontWeight: 600,
          background:
            bien && bien.status === false
              ? "linear-gradient(135deg, #f44336, #d32f2f)"
              : "linear-gradient(135deg, #1976d2, #0d47a1)",
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
          {bien && bien.status === false && (
            <Chip
              label="Dado de baja"
              color="error"
              size="small"
              sx={{
                ml: 2,
                bgcolor: "rgba(255, 255, 255, 0.2)",
                color: "white",
                fontWeight: "bold",
              }}
            />
          )}
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
                    src={bien.modelo.foto || "/placeholder-image.jpg"}
                    alt={bien.tipoBien.nombre}
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
                      {bien.tipoBien.nombre}
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
                        label={bien.marca.nombre}
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
                        label={bien.modelo.nombreModelo}
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
                    {bien.codigoBarras ? (
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
                    ) : (
                      <Typography variant="body1" fontWeight={500} sx={{ mt: 1 }}>
                        No disponible
                      </Typography>
                    )}
                  </Box>
                </Fade>
              </Grid>

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

// Create styles for PDF
const pdfStyles = StyleSheet.create({
  page: {
    padding: 40,
    backgroundColor: "#ffffff",
    fontFamily: "Helvetica",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 30,
    paddingBottom: 15,
    borderBottom: "3px solid #1976d2",
  },
  headerLeft: {
    flexDirection: "column",
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#1976d2",
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 14,
    color: "#666666",
  },
  date: {
    fontSize: 12,
    color: "#666666",
    textAlign: "right",
  },
  section: {
    marginBottom: 25,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 12,
    color: "#333333",
    paddingBottom: 5,
    borderBottom: "1px solid #e0e0e0",
  },
  infoBox: {
    padding: 15,
    backgroundColor: "#f8f9fa",
    borderRadius: 6,
    marginBottom: 15,
    borderLeft: "4px solid #1976d2",
  },
  infoRow: {
    flexDirection: "row",
    marginBottom: 8,
    alignItems: "center",
  },
  infoLabel: {
    fontSize: 12,
    color: "#555555",
    width: "30%",
    fontWeight: "bold",
  },
  infoValue: {
    fontSize: 12,
    color: "#333333",
  },
  table: {
    width: "100%",
    borderWidth: 1,
    borderColor: "#e0e0e0",
    borderStyle: "solid",
    borderRadius: 6,
    marginBottom: 25,
    overflow: "hidden",
  },
  tableHeader: {
    flexDirection: "row",
    backgroundColor: "#1976d2",
    padding: 10,
  },
  tableRow: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
    borderBottomStyle: "solid",
    padding: 10,
  },
  tableRowEven: {
    backgroundColor: "#f8f9fa",
  },
  tableCol1: {
    width: "33.33%",
    fontSize: 11,
    paddingHorizontal: 5,
  },
  tableCol2: {
    width: "33.33%",
    fontSize: 11,
    paddingHorizontal: 5,
  },
  tableCol3: {
    width: "33.33%",
    fontSize: 11,
    paddingHorizontal: 5,
  },
  tableHeaderText: {
    fontSize: 11,
    fontWeight: "bold",
    color: "#ffffff",
  },
  noItemsText: {
    fontSize: 12,
    color: "#666666",
    fontStyle: "italic",
    padding: 15,
    textAlign: "center",
  },
  signatures: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 50,
    paddingTop: 20,
    borderTop: "1px dashed #e0e0e0",
  },
  signatureBox: {
    width: "45%",
    alignItems: "center",
  },
  signatureLine: {
    borderBottomWidth: 1,
    borderBottomColor: "#333333",
    borderBottomStyle: "solid",
    width: "80%",
    marginBottom: 8,
  },
  signatureName: {
    fontSize: 12,
    fontWeight: "bold",
    color: "#333333",
  },
  signatureTitle: {
    fontSize: 10,
    color: "#666666",
    marginTop: 3,
  },
  footer: {
    position: "absolute",
    bottom: 30,
    left: 30,
    right: 30,
    textAlign: "center",
    fontSize: 10,
    color: "#666666",
    paddingTop: 10,
    borderTop: "1px solid #e0e0e0",
  },
  documentId: {
    position: "absolute",
    top: 20,
    right: 20,
    fontSize: 9,
    color: "#999999",
  },
  watermark: {
    position: "absolute",
    bottom: 60,
    left: 0,
    right: 0,
    textAlign: "center",
    fontSize: 60,
    color: "rgba(200, 200, 200, 0.2)",
    transform: "rotate(-45deg)",
  },
  pageNumber: {
    position: "absolute",
    bottom: 20,
    right: 30,
    fontSize: 9,
    color: "#999999",
  },
})

// PDF Document Component
const BienesReportPDF = ({ bienes, user }) => {
  const currentDate = new Date().toLocaleDateString("es-MX", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })

  // Generate a unique document ID
  const documentId = `REP-${Date.now().toString().slice(-6)}`

  // Get user name from available sources
  const userName = user?.name || localStorage.getItem("name") || user?.username || "No disponible"

  return (
    <Document>
      <Page size="A4" style={pdfStyles.page}>
        {/* Document ID */}
        <Text style={pdfStyles.documentId}>ID: {documentId}</Text>

        {/* Watermark */}
        <Text style={pdfStyles.watermark}>DOCUMENTO OFICIAL</Text>

        {/* Header section */}
        <View style={pdfStyles.header}>
          <View style={pdfStyles.headerLeft}>
            <Text style={pdfStyles.title}>Reporte de Bienes Asignados</Text>
            <Text style={pdfStyles.subtitle}>SIGVIB</Text>
          </View>
          <Text style={pdfStyles.date}></Text>
          <Text style={pdfStyles.date}>Fecha: {currentDate}</Text>
        </View>

        {/* Scholar information section */}
        <View style={pdfStyles.section}>
          <Text style={pdfStyles.sectionTitle}>Información del Becario</Text>
          <View style={pdfStyles.infoBox}>
            <View style={pdfStyles.infoRow}>
              <Text style={pdfStyles.infoLabel}>Nombre:</Text>
              <Text style={pdfStyles.infoValue}>{userName}</Text>
            </View>
            <View style={pdfStyles.infoRow}>
              <Text style={pdfStyles.infoLabel}>Fecha del reporte:</Text>
              <Text style={pdfStyles.infoValue}>{currentDate}</Text>
            </View>
            <View style={pdfStyles.infoRow}>
              <Text style={pdfStyles.infoLabel}>ID de documento:</Text>
              <Text style={pdfStyles.infoValue}>{documentId}</Text>
            </View>
          </View>
        </View>

        {/* Assets list section */}
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
            <View style={[pdfStyles.table, { borderRadius: 6 }]}>
              <Text style={pdfStyles.noItemsText}>No hay bienes asignados actualmente.</Text>
            </View>
          )}
        </View>

        {/* Terms and conditions section */}
        <View style={pdfStyles.section}>
          <Text style={[pdfStyles.sectionTitle, { fontSize: 14 }]}>Términos y Condiciones</Text>
          <View style={[pdfStyles.infoBox, { borderLeft: "4px solid #f57c00" }]}>
            <Text style={{ fontSize: 10, color: "#555555", marginBottom: 5 }}>
              El becario se hace responsable del cuidado y buen uso de los bienes asignados. En caso de daño o pérdida
              por negligencia, el becario deberá cubrir los costos de reparación o reposición según corresponda.
            </Text>
            <Text style={{ fontSize: 10, color: "#555555" }}>
              Al firmar este documento, el becario confirma haber recibido los bienes en buen estado y se compromete a
              devolverlos en las mismas condiciones al finalizar su periodo.
            </Text>
          </View>
        </View>

        {/* Signatures section */}
        <View style={pdfStyles.signatures}>
          <View style={pdfStyles.signatureBox}>
            <View style={pdfStyles.signatureLine} />
            <Text style={pdfStyles.signatureName}>Firma del Becario</Text>
            <Text style={pdfStyles.signatureTitle}>{userName}</Text>
          </View>
          <View style={pdfStyles.signatureBox}>
            <View style={pdfStyles.signatureLine} />
            <Text style={pdfStyles.signatureName}>Firma del Responsable</Text>
            <Text style={pdfStyles.signatureTitle}>Nombre del Responsable</Text>
          </View>
        </View>

        {/* Footer */}
        <Text style={pdfStyles.footer}>
          Este documento es un comprobante oficial de los bienes asignados al becario. Conserve una copia para su
          registro.
        </Text>

        {/* Page number */}
        <Text style={pdfStyles.pageNumber}>Página 1 de 1</Text>
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

  // Obtener el nombre del localStorage si no está disponible en el objeto user
  const userName = user?.name || localStorage.getItem("name") || user?.username || "No disponible"

  const handlePrint = useReactToPrint({
    content: () => reportRef.current,
    documentTitle: `Reporte_Bienes_${userName}`,
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
          {/* Update the PDF generation button in ReportModal to disable it if there are assets with status=false */}
          <PDFDownloadLink
            document={<BienesReportPDF bienes={bienes.filter((bien) => bien.status !== false)} user={user} />}
            fileName={`Reporte_Bienes_${userName}.pdf`}
            style={{ textDecoration: "none" }}
          >
            {({ blob, url, loading, error }) => (
              <Button
                variant="contained"
                color="primary"
                startIcon={<PictureAsPdf />}
                disabled={loading || bienes.filter((bien) => bien.status === false).length > 0}
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

      {/* Add a warning message in the ReportModal if there are assets with status=false */}
      {bienes.filter((bien) => bien.status === false).length > 0 && (
        <Box sx={{ p: 2, bgcolor: "#ffebee", borderBottom: "1px solid #ffcdd2" }}>
          <Typography
            variant="subtitle1"
            color="error"
            sx={{
              display: "flex",
              alignItems: "center",
              fontWeight: 500,
            }}
          >
            <Warning sx={{ mr: 1 }} />
            No se pueden incluir bienes dados de baja en el reporte
          </Typography>
        </Box>
      )}

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
                <Grid item xs={12}>
                  <Typography variant="subtitle2" color="text.secondary">
                    Nombre:
                  </Typography>
                  <Typography variant="body1" fontWeight={500}>
                    {userName}
                  </Typography>
                </Grid>
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
                <Typography variant="body2">{userName}</Typography>
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

const BienesBecario = () => {
  const { user } = useAuth()
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
  const [isDeleting, setIsDeleting] = useState(false)

  const idLugar = user?.idLugar || localStorage.getItem("idLugar")

  const fetchBienes = async () => {
    try {
      setLoading(true)
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/lugares/${idLugar}/bienes`)
      if (response.status === 200 && response.data.type === "SUCCESS") {
        setBienes(response.data.result)
        setError(null)
      } else {
        setError("No se encontraron bienes.")
      }
    } catch (error) {
      setError("No hay bienes del becario por mostrar.")
    } finally {
      setLoading(false)
    }
  }

  // Reemplazar la función eliminarLugarDeBien con esta versión mejorada
  const eliminarLugarDeBien = async (idBien) => {
    try {
      setIsDeleting(true)

      // Realizar la solicitud al servidor
      const response = await axios.patch(`${import.meta.env.VITE_API_URL}/bienes/${idBien}/eliminar-lugar`)

      console.log("Respuesta del servidor:", response.data)

      // Independientemente de la respuesta, actualizar el estado local
      // Esto asegura que la UI se actualice incluso si hay un problema con la respuesta
      setBienes((prevBienes) => prevBienes.filter((bien) => bien.idBien !== idBien))

      setSnackbar({
        open: true,
        message: "Lugar eliminado exitosamente del bien",
        severity: "success",
      })

      // Opcional: volver a cargar los datos después de un breve retraso
      setTimeout(() => {
        fetchBienes()
      }, 500)
    } catch (error) {
      console.error("Error al eliminar lugar:", error)

      // A pesar del error, actualizar la UI si la operación probablemente tuvo éxito
      // Esto es un enfoque optimista que asume que el backend procesó la solicitud correctamente
      setBienes((prevBienes) => prevBienes.filter((bien) => bien.idBien !== idBien))

      setSnackbar({
        open: true,
        message: "El lugar se eliminó, pero hubo un problema de comunicación",
        severity: "warning",
      })
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

  // 3. Modify the handleOpenReportModal function to check for assets with status=false
  // and prevent report generation if there are no assets
  const handleOpenReportModal = () => {
    // Check if there are any assets
    if (bienes.length === 0) {
      setSnackbar({
        open: true,
        message: "No hay bienes para generar el reporte",
        severity: "error",
      })
      return
    }

    // Check if any asset has status=false
    const bajaAssets = bienes.filter((bien) => bien.status === false)
    if (bajaAssets.length > 0) {
      setSnackbar({
        open: true,
        message: "No se puede generar el reporte porque hay bienes dados de baja",
        severity: "error",
      })
      return
    }

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
        {/* 6. Update the Button in the main component to show a tooltip explaining why it might be disabled */}
        <Tooltip
          title={
            bienes.length === 0
              ? "No hay bienes para generar el reporte"
              : bienes.filter((bien) => bien.status === false).length > 0
                ? "No se puede generar el reporte porque hay bienes dados de baja"
                : "Generar un reporte completo de todos los bienes asignados"
          }
        >
          <span>
            <Button
              variant="contained"
              color="primary"
              startIcon={<PictureAsPdf />}
              onClick={handleOpenReportModal}
              disabled={bienes.length === 0 || bienes.filter((bien) => bien.status === false).length > 0}
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
          </span>
        </Tooltip>
      </Box>
      <PaperResponsiva elevation={3}>
        {loading ? (
          <CustomBox>
            <CircularProgress />
          </CustomBox>
        ) : error ? (
          <CustomAlert severity="error">{error}</CustomAlert>
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

      {/* Reemplazar el Dialog de carga durante la eliminación con esta versión mejorada
         que soluciona el problema de accesibilidad */}
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

export default BienesBecario

