"use client"

import { useState, useEffect } from "react"
import axios from "axios"
import {
  Button,
  Switch,
  Box,
  CircularProgress,
  Typography,
  Paper,
  useMediaQuery,
  useTheme,
  Card,
  CardContent,
  CardActions,
  Grid,
  Chip,
  IconButton,
  Tooltip,
} from "@mui/material"
import { DataGrid } from "@mui/x-data-grid"
import PowerSettingsNewIcon from "@mui/icons-material/PowerSettingsNew"
import AddIcon from "@mui/icons-material/Add"
import DarkModeIcon from "@mui/icons-material/DarkMode"
import LightModeIcon from "@mui/icons-material/LightMode"
import VisibilityIcon from "@mui/icons-material/Visibility"
import BienesForm from "./../components/BienesForm"
import BienesBajaDialog from "./../components/BienesBajaDialog"
import BienDetailModal from "./../components/BienDetailModal"

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
  const [detailModalOpen, setDetailModalOpen] = useState(false)
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
      const response = await axios.get("http://bienes-env.eba-hv5kxbpm.us-east-1.elasticbeanstalk.com/bienes")
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
        axios.get("http://bienes-env.eba-hv5kxbpm.us-east-1.elasticbeanstalk.com/lugares"),
        axios.get("http://bienes-env.eba-hv5kxbpm.us-east-1.elasticbeanstalk.com/usuarios"),
        axios.get("http://bienes-env.eba-hv5kxbpm.us-east-1.elasticbeanstalk.com/tipo-bien"),
        axios.get("http://bienes-env.eba-hv5kxbpm.us-east-1.elasticbeanstalk.com/modelo"),
        axios.get("http://bienes-env.eba-hv5kxbpm.us-east-1.elasticbeanstalk.com/marca"),
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

      const response = await axios.post("http://bienes-env.eba-hv5kxbpm.us-east-1.elasticbeanstalk.com/bienes", bienFormateado, {
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

      await axios.post("http://bienes-env.eba-hv5kxbpm.us-east-1.elasticbeanstalk.com/bajas", bajaData)
      setBienes(bienes.filter((bien) => bien.id !== selectedBien.id))
      setOpenBaja(false)
      setSelectedBien(null)
      setMotivoBaja("")
    } catch (error) {
      console.error("Error al dar de baja:", error.response?.data || error.message)
    }
  }

  // Handlers for detail modal
  const handleOpenDetailModal = (bien) => {
    setSelectedBien(bien)
    setDetailModalOpen(true)
  }

  const handleCloseDetailModal = () => {
    setDetailModalOpen(false)
  }

  // Columns for DataGrid
  const columnas = [
    {
      field: "nSerie",
      headerName: "Número de Serie",
      flex: 1,
      minWidth: 150,
    },
    {
      field: "modelo",
      headerName: "Modelo",
      flex: 1,
      minWidth: 150,
    },
  
    {
      field: "tipoBien",
      headerName: "Tipo",
      flex: 1,
      minWidth: 120,
      hide: isMobile,
    },
    {
      field: "usuarioResponsable",
      headerName: "Responsable",
      flex: 1,
      minWidth: 150,
      hide: isMobile,
    },
    {
      field: "acciones",
      headerName: "Acciones",
      flex: 1,
      minWidth: 200,
      renderCell: (params) => (
        <Box sx={{ display: "flex", gap: 1 }}>
          <Tooltip title="Ver Detalles">
            <IconButton color="primary" onClick={() => handleOpenDetailModal(params.row)} size="small">
              <VisibilityIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Dar de Baja">
            <IconButton
              color="error"
              onClick={() => {
                setSelectedBien(params.row)
                setOpenBaja(true)
              }}
              size="small"
            >
              <PowerSettingsNewIcon />
            </IconButton>
          </Tooltip>
        </Box>
      ),
    },
  ]

  // Card view for mobile devices
  const renderMobileCards = () => {
    return (
      <Grid container spacing={2}>
        {bienes.map((bien) => (
          <Grid item xs={12} key={bien.id}>
            <Card
              sx={{
                backgroundColor: darkMode ? themeColors.paperDark : themeColors.paperLight,
                color: darkMode ? themeColors.textLight : themeColors.textDark,
                boxShadow: 3,
                borderLeft: `4px solid ${themeColors.primary}`,
              }}
            >
              <CardContent>
                <Typography variant="h6" component="div" sx={{ fontWeight: "bold" }}>
                  {bien.modelo}
                </Typography>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ color: darkMode ? themeColors.secondary : "inherit" }}
                >
                  Serie: {bien.nSerie}
                </Typography>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ color: darkMode ? themeColors.secondary : "inherit" }}
                >
                  Marca: {bien.marca}
                </Typography>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ color: darkMode ? themeColors.secondary : "inherit" }}
                >
                  Responsable: {bien.usuarioResponsable}
                </Typography>
                <Chip label={bien.tipoBien} size="small" color="primary" sx={{ mt: 1 }} />
              </CardContent>
              <CardActions>
                <Button
                  size="small"
                  variant="outlined"
                  color="primary"
                  onClick={() => handleOpenDetailModal(bien)}
                  startIcon={<VisibilityIcon />}
                  sx={{ borderRadius: "8px" }}
                >
                  Detalles
                </Button>
                <Button
                  size="small"
                  variant="contained"
                  color="error"
                  onClick={() => {
                    setSelectedBien(bien)
                    setOpenBaja(true)
                  }}
                  startIcon={<PowerSettingsNewIcon />}
                  sx={{ borderRadius: "8px" }}
                >
                  Dar de Baja
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    )
  }

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        backgroundColor: darkMode ? themeColors.backgroundDark : themeColors.backgroundLight,
        padding: { xs: "16px", sm: "24px", md: "40px" },
      }}
    >
      <Paper
        elevation={5}
        sx={{
          width: "100%",
          maxWidth: "1200px",
          padding: { xs: "16px", sm: "20px", md: "30px" },
          borderRadius: "15px",
          backgroundColor: darkMode ? themeColors.paperDark : themeColors.paperLight,
        }}
      >
        <Typography
          variant={isMobile ? "h5" : "h4"}
          align="center"
          sx={{
            color: darkMode ? themeColors.secondary : themeColors.primary,
            marginBottom: { xs: "16px", md: "20px" },
            fontWeight: "bold",
          }}
        >
          Gestión de Bienes
        </Typography>

        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", sm: "row" },
            gap: { xs: 2, sm: 0 },
            justifyContent: "space-between",
            alignItems: { xs: "stretch", sm: "center" },
            marginBottom: "20px",
          }}
        >
          <Button
            variant="contained"
            sx={{
              borderRadius: "10px",
              fontWeight: "bold",
              backgroundColor: themeColors.primary,
              "&:hover": { backgroundColor: darkMode ? themeColors.secondary : "#5E35B1" },
            }}
            startIcon={<AddIcon />}
            onClick={() => setOpen(true)}
            fullWidth={isMobile}
          >
            Agregar Bien
          </Button>
          <Box sx={{ display: "flex", alignItems: "center", justifyContent: { xs: "center", sm: "flex-end" } }}>
            {darkMode ? <DarkModeIcon sx={{ mr: 1 }} /> : <LightModeIcon sx={{ mr: 1 }} />}
            <Switch checked={darkMode} onChange={() => setDarkMode(!darkMode)} />
          </Box>
        </Box>

        {loading ? (
          <Box sx={{ display: "flex", justifyContent: "center", padding: "50px" }}>
            <CircularProgress />
          </Box>
        ) : (
          <>
            {/* Mobile view with cards */}
            {isMobile && renderMobileCards()}

            {/* Tablet and desktop view with DataGrid */}
            {!isMobile && (
              <DataGrid
                rows={bienes}
                columns={columnas}
                pageSize={5}
                rowsPerPageOptions={[5, 10, 20]}
                autoHeight
                disableColumnMenu={isMobile}
                sx={{
                  backgroundColor: darkMode ? themeColors.backgroundDark : themeColors.paperLight,
                  borderRadius: "10px",
                  boxShadow: 3,
                  "& .MuiDataGrid-columnHeaders": {
                    backgroundColor: darkMode ? themeColors.primary : themeColors.primary,
                    color: themeColors.textLight,
                    fontWeight: "bold",
                    fontSize: { xs: "14px", md: "16px" },
                    borderTopLeftRadius: "10px",
                    borderTopRightRadius: "10px",
                  },
                  "& .MuiDataGrid-cell": {
                    color: darkMode ? themeColors.textLight : themeColors.textDark,
                    fontSize: { xs: "13px", md: "14px" },
                  },
                  "& .MuiDataGrid-footerContainer": {
                    backgroundColor: darkMode ? themeColors.primary : themeColors.primary,
                    color: themeColors.textLight,
                    fontWeight: "bold",
                    borderBottomLeftRadius: "10px",
                    borderBottomRightRadius: "10px",
                  },
                }}
              />
            )}
          </>
        )}
      </Paper>

      {/* Modals and Dialogs */}
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

      <BienDetailModal
        open={detailModalOpen}
        onClose={handleCloseDetailModal}
        bien={selectedBien}
        darkMode={darkMode}
        setSelectedBien={setSelectedBien}
        setOpenBaja={setOpenBaja}
      />
    </Box>
  )
}

export default Bienes

