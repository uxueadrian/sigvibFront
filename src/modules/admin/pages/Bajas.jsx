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
  Grid,
  Card,
  CardContent,
  Breadcrumbs,
  Link,
} from "@mui/material"
import BienesTable from "../components/BienesTable"
import BienesForm from "../components/BienesForm"
import BienesBajaDialog from "../components/BienesBajaDialog"
import AddIcon from "@mui/icons-material/Add"
import DarkModeIcon from "@mui/icons-material/DarkMode"
import LightModeIcon from "@mui/icons-material/LightMode"
import InventoryIcon from "@mui/icons-material/Inventory"
import HomeIcon from "@mui/icons-material/Home"
import NavigateNextIcon from "@mui/icons-material/NavigateNext"

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
    axios
      .get("http://localhost:8080/bienes")
      .then((response) => {
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
      })
      .catch((error) => console.error("Error al obtener bienes:", error))
      .finally(() => setLoading(false))
  }, [])

  useEffect(() => {
    axios
      .get("http://localhost:8080/lugares")
      .then((response) => setLugares(response.data.result))
      .catch((error) => console.error("Error al obtener lugares:", error))

    axios
      .get("http://localhost:8080/usuarios")
      .then((response) => {
        const usuariosTransformados = response.data.result.map((usuario) => ({
          ...usuario,
          idUsuario: usuario.idusuario,
        }))
        setUsuarios(usuariosTransformados)
      })
      .catch((error) => console.error("Error al obtener usuarios:", error))

    axios
      .get("http://localhost:8080/tipo-bien")
      .then((response) => setTiposBien(response.data.result))
      .catch((error) => console.error("Error al obtener tipo bien:", error))

    axios
      .get("http://localhost:8080/modelo")
      .then((response) => setModelos(response.data.result))
      .catch((error) => console.error("Error al obtener modelos:", error))

    axios
      .get("http://localhost:8080/marca")
      .then((response) => setMarcas(response.data.result))
      .catch((error) => console.error("Error al obtener marcas:", error))
  }, [])

  const handleChange = (e) => {
    setNuevoBien({ ...nuevoBien, [e.target.name]: e.target.value })
  }

  const handleSubmit = () => {
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

    axios
      .post("http://localhost:8080/bienes", bienFormateado, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      })
      .then((response) => {
        setBienes([...bienes, { ...response.data.result, id: response.data.result.idBien }])
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
      })
      .catch((error) => console.error("Error al crear bien:", error.response?.data || error.message))
  }

  const handleDarDeBaja = () => {
    if (!selectedBien || !motivoBaja.trim()) return
    const bajaData = { idBien: selectedBien.id, motivo: motivoBaja, fecha: new Date().toISOString() }
    axios
      .post("http://localhost:8080/bajas", bajaData)
      .then(() => {
        setBienes(bienes.filter((bien) => bien.id !== selectedBien.id))
        setOpenBaja(false)
        setSelectedBien(null)
        setMotivoBaja("")
      })
      .catch((error) => console.error("Error al dar de baja:", error.response?.data || error.message))
  }

  // Stats for dashboard cards
  const totalBienes = bienes.length
  const bienesStats = {
    totalBienes,
    tiposBien: [...new Set(bienes.map((bien) => bien.tipoBien))].length,
    lugares: [...new Set(bienes.map((bien) => bien.lugar))].length,
    responsables: [...new Set(bienes.map((bien) => bien.usuarioResponsable))].length,
  }

  return (
    <Box
      sx={{
        padding: { xs: "16px", sm: "24px", md: "32px" },
        minHeight: "100vh",
        backgroundColor: darkMode ? "#121212" : "#F5F7FA",
        transition: "background-color 0.3s ease",
      }}
    >
      <Paper
        elevation={darkMode ? 2 : 1}
        sx={{
          padding: { xs: "16px", sm: "24px", md: "32px" },
          borderRadius: "16px",
          backgroundColor: darkMode ? "#1A202C" : "#FFFFFF",
          transition: "background-color 0.3s ease",
        }}
      >
        {/* Header with breadcrumbs */}
        <Box sx={{ mb: 4 }}>
          <Breadcrumbs
            separator={<NavigateNextIcon fontSize="small" />}
            aria-label="breadcrumb"
            sx={{ mb: 2, color: darkMode ? "#A0AEC0" : "#718096" }}
          >
            <Link
              color="inherit"
              href="#"
              sx={{
                display: "flex",
                alignItems: "center",
                textDecoration: "none",
                color: darkMode ? "#A0AEC0" : "#718096",
              }}
            >
              <HomeIcon sx={{ mr: 0.5 }} fontSize="small" />
              Inicio
            </Link>
            <Typography color={darkMode ? "#E2E8F0" : "text.primary"} sx={{ display: "flex", alignItems: "center" }}>
              <InventoryIcon sx={{ mr: 0.5 }} fontSize="small" />
              Gestión de Bienes
            </Typography>
          </Breadcrumbs>

          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              flexWrap: "wrap",
              gap: 2,
            }}
          >
            <Typography
              variant={isMobile ? "h5" : "h4"}
              component="h1"
              sx={{
                color: darkMode ? "#E2E8F0" : "#2D3748",
                fontWeight: "bold",
              }}
            >
              Inventario de Bienes
            </Typography>

            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1,
              }}
            >
              {darkMode ? <DarkModeIcon sx={{ color: "#9C27B0" }} /> : <LightModeIcon sx={{ color: "#6A1B9A" }} />}
              <Switch checked={darkMode} onChange={() => setDarkMode(!darkMode)} color="secondary" />
            </Box>
          </Box>
        </Box>

        {/* Stats Cards */}
        <Grid container spacing={3} sx={{ mb: 4 }}>
          <Grid item xs={12} sm={6} md={3}>
            <Card
              sx={{
                borderRadius: "12px",
                boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
                backgroundColor: darkMode ? "#2D3748" : "#FFFFFF",
                border: darkMode ? "1px solid #4A5568" : "none",
              }}
            >
              <CardContent>
                <Typography variant="h6" color={darkMode ? "#E2E8F0" : "#4A5568"} gutterBottom>
                  Total Bienes
                </Typography>
                <Typography variant="h3" color={darkMode ? "#9C27B0" : "#6A1B9A"} sx={{ fontWeight: "bold" }}>
                  {bienesStats.totalBienes}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Card
              sx={{
                borderRadius: "12px",
                boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
                backgroundColor: darkMode ? "#2D3748" : "#FFFFFF",
                border: darkMode ? "1px solid #4A5568" : "none",
              }}
            >
              <CardContent>
                <Typography variant="h6" color={darkMode ? "#E2E8F0" : "#4A5568"} gutterBottom>
                  Tipos de Bien
                </Typography>
                <Typography variant="h3" color={darkMode ? "#9C27B0" : "#6A1B9A"} sx={{ fontWeight: "bold" }}>
                  {bienesStats.tiposBien}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Card
              sx={{
                borderRadius: "12px",
                boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
                backgroundColor: darkMode ? "#2D3748" : "#FFFFFF",
                border: darkMode ? "1px solid #4A5568" : "none",
              }}
            >
              <CardContent>
                <Typography variant="h6" color={darkMode ? "#E2E8F0" : "#4A5568"} gutterBottom>
                  Lugares
                </Typography>
                <Typography variant="h3" color={darkMode ? "#9C27B0" : "#6A1B9A"} sx={{ fontWeight: "bold" }}>
                  {bienesStats.lugares}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Card
              sx={{
                borderRadius: "12px",
                boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
                backgroundColor: darkMode ? "#2D3748" : "#FFFFFF",
                border: darkMode ? "1px solid #4A5568" : "none",
              }}
            >
              <CardContent>
                <Typography variant="h6" color={darkMode ? "#E2E8F0" : "#4A5568"} gutterBottom>
                  Responsables
                </Typography>
                <Typography variant="h3" color={darkMode ? "#9C27B0" : "#6A1B9A"} sx={{ fontWeight: "bold" }}>
                  {bienesStats.responsables}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        {/* Action Button */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            mb: 3,
          }}
        >
          <Button
            variant="contained"
            color="secondary"
            startIcon={<AddIcon />}
            onClick={() => setOpen(true)}
            sx={{
              borderRadius: "8px",
              fontWeight: "bold",
              padding: "10px 20px",
              backgroundColor: "#6A1B9A",
              boxShadow: "0 4px 12px rgba(106, 27, 154, 0.2)",
              "&:hover": {
                backgroundColor: "#5C1690",
                boxShadow: "0 6px 16px rgba(106, 27, 154, 0.3)",
              },
            }}
          >
            Agregar Bien
          </Button>
        </Box>

        <BienesTable
          bienes={bienes}
          loading={loading}
          darkMode={darkMode}
          setSelectedBien={setSelectedBien}
          setOpenBaja={setOpenBaja}
          isMobile={isMobile}
          isTablet={isTablet}
        />

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
          isMobile={isMobile}
        />

        <BienesBajaDialog
          openBaja={openBaja}
          handleClose={() => setOpenBaja(false)}
          handleDarDeBaja={handleDarDeBaja}
          motivoBaja={motivoBaja}
          setMotivoBaja={setMotivoBaja}
          fullScreen={isMobile}
        />
      </Paper>
    </Box>
  )
}

export default Bienes

