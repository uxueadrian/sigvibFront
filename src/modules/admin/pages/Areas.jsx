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
  Modal,
  TextField,
  MenuItem,
} from "@mui/material"
import { DataGrid } from "@mui/x-data-grid"
import EditIcon from "@mui/icons-material/Edit"
import PowerSettingsNewIcon from "@mui/icons-material/PowerSettingsNew"
import AddIcon from "@mui/icons-material/Add"
import DarkModeIcon from "@mui/icons-material/DarkMode"
import LightModeIcon from "@mui/icons-material/LightMode"

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

  useEffect(() => {
    fetchAreas()
  }, [])

  const fetchAreas = () => {
    setLoading(true)
    axios
      .get("http://bienes-env.eba-hv5kxbpm.us-east-1.elasticbeanstalk.com/api/areas-comunes/con-lugar")
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
      .get("http://bienes-env.eba-hv5kxbpm.us-east-1.elasticbeanstalk.com/usuarios/lugares-sin-usuarios")
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
      ? axios.put(`http://bienes-env.eba-hv5kxbpm.us-east-1.elasticbeanstalk.com/api/areas-comunes/areas-comunes/${selectedAreaId}`, nuevaArea)
      : axios.post("http://bienes-env.eba-hv5kxbpm.us-east-1.elasticbeanstalk.com/api/areas-comunes", nuevaArea)

    request
      .then(() => {
        fetchAreas()
        handleCloseModal()
      })
      .catch((error) => console.error("Error al guardar el área:", error))
  }

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
      field: "acciones",
      headerName: "Acciones",
      flex: 0.8,
      minWidth: 120,
      renderCell: (params) => (
        <Box sx={{ display: "flex", gap: 1 }}>
          <Tooltip title="Editar">
            <IconButton 
              color="primary" 
              onClick={() => handleOpenModal(params.row)}
              size="small"
            >
              <EditIcon />
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
        {areas.map((area) => (
          <Grid item xs={12} key={area.id}>
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
                  {area.nombreArea}
                </Typography>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ color: darkMode ? themeColors.secondary : "inherit", mt: 1 }}
                >
                  Lugar: {area.lugar}
                </Typography>
              </CardContent>
              <CardActions>
                <Button
                  size="small"
                  variant="contained"
                  color="primary"
                  onClick={() => handleOpenModal(area)}
                  startIcon={<EditIcon />}
                  sx={{ borderRadius: "8px" }}
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

  // Modal para agregar o editar área
  const renderAreaModal = () => (
    <Modal
      open={modalOpen}
      onClose={handleCloseModal}
      aria-labelledby="modal-area"
      aria-describedby="modal-area-descripcion"
    >
      <Box sx={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: { xs: '90%', sm: 400 },
        bgcolor: darkMode ? themeColors.paperDark : themeColors.paperLight,
        boxShadow: 24,
        p: 4,
        borderRadius: '10px',
      }}>
        <Typography id="modal-area" variant="h6" component="h2" sx={{ 
          color: darkMode ? themeColors.textLight : themeColors.primary,
          fontWeight: 'bold',
          mb: 2
        }}>
          {isEditing ? "Editar Área Común" : "Agregar Área Común"}
        </Typography>
        <TextField
          autoFocus
          margin="dense"
          id="nombreArea"
          label="Nombre del Área"
          type="text"
          fullWidth
          variant="outlined"
          value={nombreArea}
          onChange={(e) => setNombreArea(e.target.value)}
          sx={{ mb: 2 }}
        />
        <TextField
          select
          margin="dense"
          id="lugarSeleccionado"
          label="Seleccionar Lugar"
          fullWidth
          variant="outlined"
          value={lugarSeleccionado}
          onChange={(e) => setLugarSeleccionado(e.target.value)}
          sx={{ mb: 3 }}
        >
          {lugares.map((lugar) => (
            <MenuItem key={lugar.idlugar} value={lugar.idlugar}>
              {lugar.lugar}
            </MenuItem>
          ))}
        </TextField>
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
          <Button 
            onClick={handleCloseModal} 
            variant="outlined"
            sx={{ borderRadius: '8px' }}
          >
            Cancelar
          </Button>
          <Button 
            onClick={handleSaveArea} 
            variant="contained"
            sx={{ 
              borderRadius: '8px',
              backgroundColor: themeColors.primary,
              '&:hover': { backgroundColor: darkMode ? themeColors.secondary : '#5E35B1' },
            }}
          >
            {isEditing ? "Actualizar" : "Guardar"}
          </Button>
        </Box>
      </Box>
    </Modal>
  )

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
          Gestión de Áreas Comunes
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
            onClick={() => handleOpenModal()}
            fullWidth={isMobile}
          >
            Agregar Área
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
                rows={areas}
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

      {/* Modal */}
      {renderAreaModal()}
    </Box>
  )
}

export default Areas
