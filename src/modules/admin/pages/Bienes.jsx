"use client"

import { useState, useEffect } from "react"
import axios from "axios"
import {
  Button,
  Switch,
  Box,
  Typography,
  useMediaQuery,
  useTheme,
  Paper,
  Container,
  Stack,
  Fade,
  Divider,
} from "@mui/material"
import BienesTable from "./../components/BienesTable"
import BienesForm from "./../components/BienesForm"
import BienesBajaDialog from "./../components/BienesBajaDialog"
import BienDetailModal from "./../components/BienDetailModal" // We'll create this new component
import AddIcon from "@mui/icons-material/Add"
import DarkModeIcon from "@mui/icons-material/DarkMode"
import LightModeIcon from "@mui/icons-material/LightMode"

const Bienes = () => {
  const [bienes, setBienes] = useState([])
  const [loading, setLoading] = useState(true)
  const [open, setOpen] = useState(false)
  const [openBaja, setOpenBaja] = useState(false)
  const [selectedBien, setSelectedBien] = useState(null)
  const [motivoBaja, setMotivoBaja] = useState("")
  const [lugares, setLugares] = useState([])
  const [modelos, setModelos] = useState([])
  const [marcas, setMarcas] = useState([])
  const [tiposBien, setTiposBien] = useState([])
  const [darkMode, setDarkMode] = useState(false)
  const [usuarios, setUsuarios] = useState([])
  const [detailModalOpen, setDetailModalOpen] = useState(false) // New state for detail modal
  const [nuevoBien, setNuevoBien] = useState({
    codigoBarras: "",
    nSerie: "",
    idTipo: "",
    idLugar: "",
    idModelo: "",
    idMarca: "",
    idUsuario: "",
  })

  // Theme and responsive breakpoints
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"))
  const isTablet = useMediaQuery(theme.breakpoints.between("sm", "md"))

  useEffect(() => {
    fetchBienes()
  }, [])

  useEffect(() => {
    fetchCatalogData()
  }, [])

  const fetchBienes = async () => {
    try {
      const response = await axios.get("http://localhost:8080/bienes")
      const bienesData = response.data.result
        .filter((bien) => bien.status)
        .map((bien) => ({
          ...bien,
          id: bien.idBien,
          tipoBien: bien.tipoBien ? bien.tipoBien.nombre : "Sin asignar",
          modelo: bien.modelo ? bien.modelo.nombreModelo : "Sin asignar",
          marca: bien.marca.nombre,
          lugar: bien.lugar ? bien.lugar.lugar : "Sin asignar",
          imagen: bien.modelo.foto,
          codigoBarras: bien.codigoBarras,
          usuarioResponsable: bien.usuario ? bien.usuario.nombre : "Sin asignar",
        }))
      setBienes(bienesData)
    } catch (error) {
      console.error("Error al obtener bienes:", error)
    } finally {
      setLoading(false)
    }
  }

  const fetchCatalogData = async () => {
    try {
      const [lugaresRes, usuariosRes, tiposBienRes, modelosRes, marcasRes] = await Promise.all([
        axios.get("http://localhost:8080/lugares"),
        axios.get("http://localhost:8080/usuarios"),
        axios.get("http://localhost:8080/tipo-bien"),
        axios.get("http://localhost:8080/modelo"),
        axios.get("http://localhost:8080/marca"),
      ])

      setLugares(lugaresRes.data.result)

      const usuariosTransformados = usuariosRes.data.result.map((usuario) => ({
        ...usuario,
        idUsuario: usuario.idusuario,
      }))
      setUsuarios(usuariosTransformados)

      setTiposBien(tiposBienRes.data.result)
      setModelos(modelosRes.data.result)
      setMarcas(marcasRes.data.result)
    } catch (error) {
      console.error("Error al obtener datos de catálogo:", error)
    }
  }

  const handleChange = (e) => {
    setNuevoBien({ ...nuevoBien, [e.target.name]: e.target.value })
  }

  const handleSubmit = async () => {
    try {
      const bienFormateado = {
        nSerie: nuevoBien.nSerie,
        idTipoBien: Number.parseInt(nuevoBien.idTipo),
        idUsuario: Number.parseInt(nuevoBien.idUsuario),
        status: true,
        idModelo: Number.parseInt(nuevoBien.idModelo),
        idMarca: Number.parseInt(nuevoBien.idMarca),
        idLugar: Number.parseInt(nuevoBien.idLugar),
        fecha: new Date().toISOString().split("T")[0] + "T00:00:00Z",
      }

      const response = await axios.post("http://localhost:8080/bienes", bienFormateado, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      })

      // Find the related data for the new item
      const tipoBien = tiposBien.find((t) => t.idTipoBien === Number.parseInt(nuevoBien.idTipo))
      const modelo = modelos.find((m) => m.idModelo === Number.parseInt(nuevoBien.idModelo))
      const marca = marcas.find((m) => m.idMarca === Number.parseInt(nuevoBien.idMarca))
      const lugar = lugares.find((l) => l.idLugar === Number.parseInt(nuevoBien.idLugar))
      const usuario = usuarios.find((u) => u.idUsuario === Number.parseInt(nuevoBien.idUsuario))

      // Create a properly formatted new item with all required fields
      const newBien = {
        ...response.data.result,
        id: response.data.result.idBien,
        tipoBien: tipoBien ? tipoBien.nombre : "Sin asignar",
        modelo: modelo ? modelo.nombreModelo : "Sin asignar",
        marca: marca ? marca.nombre : "Sin asignar",
        lugar: lugar ? lugar.lugar : "Sin asignar",
        imagen: modelo ? modelo.foto : "",
        codigoBarras: response.data.result.codigoBarras || "",
        usuarioResponsable: usuario ? usuario.nombre : "Sin asignar",
      }

      setBienes([...bienes, newBien])
      setOpen(false)
      // Reset form
      setNuevoBien({
        codigoBarras: "",
        nSerie: "",
        idTipo: "",
        idLugar: "",
        idModelo: "",
        idMarca: "",
        idUsuario: "",
      })
    } catch (error) {
      console.error("Error al crear bien:", error.response?.data || error.message)
    }
  }

  const handleDarDeBaja = async () => {
    if (!selectedBien || !motivoBaja.trim()) return

    try {
      const bajaData = {
        idBien: selectedBien.id,
        motivo: motivoBaja,
        fecha: new Date().toISOString(),
      }

      await axios.post("http://localhost:8080/bajas", bajaData)
      setBienes(bienes.filter((bien) => bien.id !== selectedBien.id))
      setOpenBaja(false)
      setSelectedBien(null)
      setMotivoBaja("")
    } catch (error) {
      console.error("Error al dar de baja:", error.response?.data || error.message)
    }
  }

  // New handlers for detail modal
  const handleOpenDetailModal = (bien) => {
    setSelectedBien(bien)
    setDetailModalOpen(true)
  }

  const handleCloseDetailModal = () => {
    setDetailModalOpen(false)
  }

  return (
    <Fade in={true} timeout={500}>
      <Box
        sx={{
          padding: { xs: 2, sm: 3, md: 4 },
          minHeight: "100vh",
          backgroundColor: darkMode ? "#121212" : "#F5F7FA",
          transition: "background-color 0.3s ease",
        }}
      >
        <Container maxWidth="xl">
          <Paper
            elevation={darkMode ? 2 : 1}
            sx={{
              padding: { xs: 2, sm: 3, md: 4 },
              borderRadius: "16px",
              backgroundColor: darkMode ? "#1E1E1E" : "#FFFFFF",
              transition: "background-color 0.3s ease",
              overflow: "hidden",
              border: darkMode ? "none" : "1px solid #EDF2F7", // Added border for better definition
            }}
          >
            <Stack spacing={4}>
              {/* Header Section */}
              <Box>
                <Typography
                  variant={isMobile ? "h5" : "h4"}
                  sx={{
                    color: darkMode ? "#B478FF" : "#6A1B9A", // Changed to match navbar purple
                    fontWeight: "bold",
                    mb: 1,
                    letterSpacing: "0.3px",
                  }}
                >
                  Gestión de Bienes
                </Typography>
                <Typography variant="body1" color={darkMode ? "text.secondary" : "text.secondary"} sx={{ mb: 2 }}>
                  Administre el inventario de bienes de la organización
                </Typography>
                <Divider
                  sx={{
                    borderColor: darkMode ? "rgba(255,255,255,0.1)" : "rgba(106, 27, 154, 0.2)",
                    my: 2,
                  }}
                />
              </Box>

              {/* Action Bar */}
              <Stack
                direction={{ xs: "column", sm: "row" }}
                justifyContent="space-between"
                alignItems={{ xs: "stretch", sm: "center" }}
                spacing={2}
              >
                <Button
                  variant="contained"
                  color="primary" // Changed from success to primary
                  startIcon={<AddIcon />}
                  onClick={() => setOpen(true)}
                  fullWidth={isMobile}
                  sx={{
                    borderRadius: "8px",
                    padding: "10px 20px",
                    boxShadow: "0 2px 8px rgba(106, 27, 154, 0.2)", // Changed to purple
                    fontWeight: "bold",
                    bgcolor: "#6A1B9A", // Changed to match navbar purple
                    "&:hover": {
                      bgcolor: "#5C1690", // Darker purple on hover
                    },
                  }}
                >
                  Agregar Bien
                </Button>

                <Stack
                  direction="row"
                  alignItems="center"
                  justifyContent={{ xs: "flex-end", sm: "flex-end" }}
                  spacing={1}
                >
                  {
                    darkMode ? (
                      <DarkModeIcon sx={{ color: "#B478FF" }} />
                    ) : (
                      // Changed to light purple
                      <LightModeIcon sx={{ color: "#6A1B9A" }} />
                    ) // Changed to match navbar purple
                  }
                  <Switch
                    checked={darkMode}
                    onChange={() => setDarkMode(!darkMode)}
                    color="secondary" // Changed to secondary which is purple in MUI
                  />
                  <Typography variant="body2" color="text.secondary">
                    {darkMode ? "Modo Oscuro" : "Modo Claro"}
                  </Typography>
                </Stack>
              </Stack>

              {/* Table Section */}
              <BienesTable
                bienes={bienes}
                loading={loading}
                darkMode={darkMode}
                setSelectedBien={setSelectedBien}
                setOpenBaja={setOpenBaja}
                isMobile={isMobile}
                isTablet={isTablet}
                onViewDetails={handleOpenDetailModal} // Pass the handler to open detail modal
              />
            </Stack>
          </Paper>
        </Container>

        {/* Dialogs */}
        <BienesForm
          open={open}
          handleClose={() => setOpen(false)}
          handleSubmit={handleSubmit}
          handleChange={handleChange}
          nuevoBien={nuevoBien}
          tiposBien={tiposBien}
          modelos={modelos}
          marcas={marcas}
          lugares={lugares}
          usuarios={usuarios}
          darkMode={darkMode}
        />

        <BienesBajaDialog
          openBaja={openBaja}
          handleClose={() => setOpenBaja(false)}
          handleDarDeBaja={handleDarDeBaja}
          motivoBaja={motivoBaja}
          setMotivoBaja={setMotivoBaja}
          selectedBien={selectedBien}
          darkMode={darkMode}
        />

        {/* New Detail Modal with Barcode */}
        <BienDetailModal
          open={detailModalOpen}
          onClose={handleCloseDetailModal}
          bien={selectedBien}
          darkMode={darkMode}
          setSelectedBien={setSelectedBien}
          setOpenBaja={setOpenBaja}
        />
      </Box>
    </Fade>
  )
}

export default Bienes

