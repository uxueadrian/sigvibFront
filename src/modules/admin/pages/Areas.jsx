"use client"

import { useState, useEffect } from "react"
import axios from "axios"
import { createTheme, ThemeProvider } from "@mui/material/styles"
import { DataGrid } from "@mui/x-data-grid"
import {
  Button,
  Switch,
  CssBaseline,
  Box,
  CircularProgress,
  Modal,
  TextField,
  MenuItem,
  Paper,
  Typography,
  useMediaQuery,
  useTheme,
  IconButton,
  Card,
  CardContent,
  CardActions,
  Chip,
  Grid,
} from "@mui/material"
import AddIcon from "@mui/icons-material/Add"
import EditIcon from "@mui/icons-material/Edit"
import DarkModeIcon from "@mui/icons-material/DarkMode"
import LightModeIcon from "@mui/icons-material/LightMode"

const lightTheme = createTheme({
  palette: {
    mode: "light",
    primary: { main: "#673AB7" },
    secondary: { main: "#7CB342" },
    background: { default: "#F3F4F6", paper: "#FFFFFF" },
    text: { primary: "#333" },
  },
})

const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: { main: "#9575CD" },
    secondary: { main: "#AED581" },
    background: { default: "#1E1E1E", paper: "#333" },
    text: { primary: "#FFF" },
  },
})

const Areas = () => {
  const [areas, setAreas] = useState([])
  const [loading, setLoading] = useState(true)
  const [darkMode, setDarkMode] = useState(false)
  const [modalOpen, setModalOpen] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  const [selectedAreaId, setSelectedAreaId] = useState(null)
  const [nombreArea, setNombreArea] = useState("")
  const [lugares, setLugares] = useState([])
  const [lugarSeleccionado, setLugarSeleccionado] = useState("")

  // Theme and responsive breakpoints
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"))
  const isTablet = useMediaQuery(theme.breakpoints.between("sm", "md"))

  const columnas = [
    {
      field: "nombreArea",
      headerName: "Área",
      flex: 1,
      minWidth: 150,
    },
    {
      field: "lugar",
      headerName: "Lugar",
      flex: 1,
      minWidth: 150,
      hide: isMobile,
    },
    {
      field: "status",
      headerName: "Estado",
      flex: 0.7,
      minWidth: 120,
    },
    {
      field: "edit",
      headerName: "Editar",
      flex: 0.7,
      minWidth: 100,
      renderCell: (params) =>
        isMobile ? (
          <IconButton color="primary" onClick={() => handleOpenModal(params.row)} size="small">
            <EditIcon />
          </IconButton>
        ) : (
          <Button variant="outlined" onClick={() => handleOpenModal(params.row)} size={isTablet ? "small" : "medium"}>
            Editar
          </Button>
        ),
    },
  ]

  useEffect(() => {
    fetchAreas()
  }, [])

  const fetchAreas = () => {
    setLoading(true)
    axios
      .get("http://localhost:8080/api/areas-comunes/con-lugar")
      .then((response) => {
        const areasData = response.data.result.map((area) => ({
          ...area,
          id: area.idArea,
          lugar: area.lugar.lugar,
        }))
        setAreas(areasData)
      })
      .catch((error) => console.error("Error al obtener las áreas:", error))
      .finally(() => setLoading(false))
  }

  const fetchLugares = () => {
    axios
      .get("http://localhost:8080/usuarios/lugares-sin-usuarios")
      .then((response) => {
        setLugares(response.data.result)
      })
      .catch((error) => console.error("Error al obtener lugares:", error))
  }

  const handleOpenModal = (area = null) => {
    if (area) {
      setIsEditing(true)
      setSelectedAreaId(area.id)
      setNombreArea(area.nombreArea)
      setLugarSeleccionado(area.lugarId)
    } else {
      setIsEditing(false)
      setNombreArea("")
      setLugarSeleccionado("")
    }
    setModalOpen(true)
    fetchLugares()
  }

  const handleCloseModal = () => {
    setModalOpen(false)
    setNombreArea("")
    setLugarSeleccionado("")
    setIsEditing(false)
  }

  const handleSaveArea = () => {
    if (!nombreArea || !lugarSeleccionado) {
      alert("Por favor, complete todos los campos")
      return
    }

    const nuevaArea = {
      nombreArea,
      status: true,
      lugar: { idlugar: lugarSeleccionado },
    }

    const request = isEditing
      ? axios.put(`http://localhost:8080/api/areas-comunes/areas-comunes/${selectedAreaId}`, nuevaArea)
      : axios.post("http://localhost:8080/api/areas-comunes", nuevaArea)

    request
      .then(() => {
        fetchAreas()
        handleCloseModal()
      })
      .catch((error) => console.error("Error al guardar el área:", error))
  }

  // Card view for mobile devices
  const renderMobileCards = () => {
    return (
      <Grid container spacing={2}>
        {areas.map((area) => (
          <Grid item xs={12} key={area.id}>
            <Card
              sx={{
                backgroundColor: darkMode ? "#333" : "#fff",
                boxShadow: 2,
                borderRadius: "8px",
              }}
            >
              <CardContent>
                <Typography variant="h6" component="div" sx={{ fontWeight: "bold", color: darkMode ? "#fff" : "#333" }}>
                  {area.nombreArea}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ color: darkMode ? "#ccc" : "inherit", mt: 1 }}>
                  Lugar: {area.lugar}
                </Typography>
                <Chip
                  label={area.status ? "Activo" : "Inactivo"}
                  color={area.status ? "success" : "error"}
                  size="small"
                  sx={{ mt: 1 }}
                />
              </CardContent>
              <CardActions>
                <Button
                  size="small"
                  variant="contained"
                  color="primary"
                  onClick={() => handleOpenModal(area)}
                  startIcon={<EditIcon />}
                >
                  Editar
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    )
  }

  return (
    <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
      <CssBaseline />
      <Box
        sx={{
          padding: { xs: "10px", sm: "15px", md: "20px" },
          minHeight: "100vh",
          backgroundColor: darkMode ? "#1E1E1E" : "#F3F4F6",
        }}
      >
        <Paper
          elevation={2}
          sx={{
            padding: { xs: "15px", sm: "20px", md: "30px" },
            borderRadius: "10px",
            backgroundColor: darkMode ? "#333" : "#FFFFFF",
          }}
        >
          <Typography
            variant={isMobile ? "h5" : "h4"}
            sx={{
              color: darkMode ? "#AED581" : "#7CB342",
              fontWeight: "bold",
              mb: 2,
            }}
          >
            Áreas Comunes
          </Typography>

          <Box
            sx={{
              display: "flex",
              flexDirection: { xs: "column", sm: "row" },
              justifyContent: "space-between",
              alignItems: { xs: "flex-start", sm: "center" },
              gap: { xs: 2, sm: 0 },
              mb: 2,
            }}
          >
            <Button
              variant="contained"
              color="primary"
              startIcon={<AddIcon />}
              onClick={() => handleOpenModal()}
              fullWidth={isMobile}
              sx={{ borderRadius: "8px" }}
            >
              Agregar Área
            </Button>

            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                alignSelf: { xs: "flex-end", sm: "auto" },
              }}
            >
              {darkMode ? (
                <DarkModeIcon sx={{ mr: 1, color: "#AED581" }} />
              ) : (
                <LightModeIcon sx={{ mr: 1, color: "#7CB342" }} />
              )}
              <Switch checked={darkMode} onChange={() => setDarkMode(!darkMode)} />
            </Box>
          </Box>

          <Box sx={{ width: "100%", margin: "20px auto" }}>
            {loading ? (
              <Box sx={{ display: "flex", justifyContent: "center", p: 3 }}>
                <CircularProgress />
              </Box>
            ) : (
              <>
                {/* Mobile view with cards */}
                {isMobile && renderMobileCards()}

                {/* Tablet and desktop view with DataGrid */}
                {!isMobile && (
                  <DataGrid
                    rows={areas}
                    columns={columnas}
                    pageSize={5}
                    rowsPerPageOptions={[5, 10]}
                    autoHeight
                    disableColumnMenu={isMobile}
                    sx={{
                      "& .MuiDataGrid-cell": {
                        fontSize: { xs: "0.875rem", md: "1rem" },
                      },
                      "& .MuiDataGrid-columnHeaders": {
                        backgroundColor: darkMode ? "#444" : "#f5f5f5",
                        borderRadius: "8px 8px 0 0",
                      },
                    }}
                  />
                )}
              </>
            )}
          </Box>
        </Paper>

        {/* Modal para agregar o editar área común */}
        <Modal
          open={modalOpen}
          onClose={handleCloseModal}
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Box
            sx={{
              width: { xs: "90%", sm: 400 },
              padding: 3,
              backgroundColor: "background.paper",
              borderRadius: 2,
              boxShadow: 24,
              maxHeight: "90vh",
              overflow: "auto",
            }}
          >
            <Typography variant="h6" component="h2" gutterBottom>
              {isEditing ? "Editar Área Común" : "Agregar Área Común"}
            </Typography>
            <TextField
              fullWidth
              label="Nombre del Área"
              value={nombreArea}
              onChange={(e) => setNombreArea(e.target.value)}
              margin="normal"
              size={isMobile ? "small" : "medium"}
            />
            <TextField
              select
              fullWidth
              label="Seleccionar Lugar"
              value={lugarSeleccionado}
              onChange={(e) => setLugarSeleccionado(e.target.value)}
              margin="normal"
              size={isMobile ? "small" : "medium"}
            >
              {lugares.map((lugar) => (
                <MenuItem key={lugar.idlugar} value={lugar.idlugar}>
                  {lugar.lugar}
                </MenuItem>
              ))}
            </TextField>
            <Box sx={{ mt: 2, display: "flex", justifyContent: "space-between" }}>
              <Button variant="outlined" onClick={handleCloseModal} sx={{ mr: 1 }}>
                Cancelar
              </Button>
              <Button variant="contained" color="primary" onClick={handleSaveArea}>
                {isEditing ? "Actualizar" : "Guardar"}
              </Button>
            </Box>
          </Box>
        </Modal>
      </Box>
    </ThemeProvider>
  )
}

export default Areas

