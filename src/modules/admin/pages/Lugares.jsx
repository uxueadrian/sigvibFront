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

const Lugares = () => {
  const [lugares, setLugares] = useState([])
  const [loading, setLoading] = useState(true)
  const [darkMode, setDarkMode] = useState(false)
  const [modalOpen, setModalOpen] = useState(false)
  const [modalEditarOpen, setModalEditarOpen] = useState(false)
  const [nuevoLugar, setNuevoLugar] = useState("")
  const [lugarEditar, setLugarEditar] = useState({ id: null, lugar: "", status: true })

  // Theme and responsive breakpoints
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"))
  const isTablet = useMediaQuery(theme.breakpoints.between("sm", "md"))

  useEffect(() => {
    axios
      .get("http://bienes-env.eba-hv5kxbpm.us-east-1.elasticbeanstalk.com/lugares")
      .then((response) => {
        const lugares = response.data.result.map((lugar) => ({ ...lugar, id: lugar.idlugar }))
        setLugares(lugares)
      })
      .catch((error) => console.error("Error al obtener los lugares:", error))
      .finally(() => setLoading(false))
  }, [])

  const handleCambiarStatus = (idLugar) => {
    axios
      .patch(`http://bienes-env.eba-hv5kxbpm.us-east-1.elasticbeanstalk.com/lugares/${idLugar}/status`)
      .then(() => {
        setLugares(lugares.map((lugar) => (lugar.id === idLugar ? { ...lugar, status: !lugar.status } : lugar)))
      })
      .catch((error) => console.error("Error al cambiar el estado del lugar:", error))
  }

  const handleAgregarLugar = () => {
    if (!nuevoLugar.trim()) return
    axios
      .post(`http://bienes-env.eba-hv5kxbpm.us-east-1.elasticbeanstalk.com/lugares`, { lugar: nuevoLugar, status: true })
      .then((response) => {
        setLugares([...lugares, { id: response.data.result.idlugar, lugar: nuevoLugar, status: true }])
        setModalOpen(false)
        setNuevoLugar("")
      })
      .catch((error) => console.error("Error al agregar el lugar:", error))
  }

  const handleAbrirEditarLugar = (lugar) => {
    setLugarEditar(lugar)
    setModalEditarOpen(true)
  }

  const handleActualizarLugar = () => {
    const { id, lugar, status } = lugarEditar
    axios
      .put(`http://bienes-env.eba-hv5kxbpm.us-east-1.elasticbeanstalk.com/lugares/${id}`, { lugar, status })
      .then(() => {
        setLugares(lugares.map((l) => (l.id === id ? { id, lugar, status } : l)))
        setModalEditarOpen(false)
      })
      .catch((error) => console.error("Error al actualizar el lugar:", error))
  }

  const columnas = [
    {
      field: "lugar",
      headerName: "Lugar",
      flex: 1,
      minWidth: 150,
    },
    {
      field: "status",
      headerName: "Estado",
      width: 100,
      renderCell: (params) => (
        <Chip
          label={params.row.status ? "Activo" : "Inactivo"}
          color={params.row.status ? "success" : "error"}
          size="small"
        />
      ),
    },
    {
      field: "acciones",
      headerName: "Acciones",
      flex: 0.8,
      minWidth: 120,
      renderCell: (params) => (
        <Box sx={{ display: "flex", gap: 1 }}>
          <Tooltip title={params.row.status ? "Desactivar" : "Activar"}>
            <IconButton
              size="small"
              color={params.row.status ? "error" : "success"}
              onClick={() => handleCambiarStatus(params.row.id)}
            >
              <PowerSettingsNewIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Editar">
            <IconButton size="small" color="primary" onClick={() => handleAbrirEditarLugar(params.row)}>
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
        {lugares.map((lugar) => (
          <Grid item xs={12} key={lugar.id}>
            <Card
              sx={{
                backgroundColor: darkMode ? themeColors.paperDark : themeColors.paperLight,
                color: darkMode ? themeColors.textLight : themeColors.textDark,
                boxShadow: 3,
                borderLeft: `4px solid ${lugar.status ? "#4caf50" : "#f44336"}`,
              }}
            >
              <CardContent>
                <Typography variant="h6" component="div" sx={{ fontWeight: "bold" }}>
                  {lugar.lugar}
                </Typography>
                <Chip
                  label={lugar.status ? "Activo" : "Inactivo"}
                  color={lugar.status ? "success" : "error"}
                  size="small"
                  sx={{ mt: 1 }}
                />
              </CardContent>
              <CardActions>
                <Button
                  size="small"
                  variant="contained"
                  color={lugar.status ? "error" : "success"}
                  onClick={() => handleCambiarStatus(lugar.id)}
                  startIcon={<PowerSettingsNewIcon />}
                  sx={{ borderRadius: "8px" }}
                >
                  {lugar.status ? "Desactivar" : "Activar"}
                </Button>
                <Button
                  size="small"
                  variant="outlined"
                  color="primary"
                  onClick={() => handleAbrirEditarLugar(lugar)}
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

  // Modal para agregar lugar
  const renderAgregarLugarModal = () => (
    <Modal
      open={modalOpen}
      onClose={() => setModalOpen(false)}
      aria-labelledby="modal-agregar-lugar"
      aria-describedby="modal-agregar-lugar-descripcion"
    >
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: { xs: "90%", sm: 400 },
          bgcolor: darkMode ? themeColors.paperDark : themeColors.paperLight,
          boxShadow: 24,
          p: 4,
          borderRadius: "10px",
        }}
      >
        <Typography
          id="modal-agregar-lugar"
          variant="h6"
          component="h2"
          sx={{
            color: darkMode ? themeColors.textLight : themeColors.primary,
            fontWeight: "bold",
            mb: 2,
          }}
        >
          Agregar Nuevo Lugar
        </Typography>
        <TextField
          autoFocus
          margin="dense"
          id="lugar"
          label="Nombre del Lugar"
          type="text"
          fullWidth
          variant="outlined"
          value={nuevoLugar}
          onChange={(e) => setNuevoLugar(e.target.value)}
          sx={{ mb: 3 }}
        />
        <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 2 }}>
          <Button onClick={() => setModalOpen(false)} variant="outlined" sx={{ borderRadius: "8px" }}>
            Cancelar
          </Button>
          <Button
            onClick={handleAgregarLugar}
            variant="contained"
            sx={{
              borderRadius: "8px",
              backgroundColor: themeColors.primary,
              "&:hover": { backgroundColor: darkMode ? themeColors.secondary : "#5E35B1" },
            }}
          >
            Guardar
          </Button>
        </Box>
      </Box>
    </Modal>
  )

  // Modal para editar lugar
  const renderEditarLugarModal = () => (
    <Modal
      open={modalEditarOpen}
      onClose={() => setModalEditarOpen(false)}
      aria-labelledby="modal-editar-lugar"
      aria-describedby="modal-editar-lugar-descripcion"
    >
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: { xs: "90%", sm: 400 },
          bgcolor: darkMode ? themeColors.paperDark : themeColors.paperLight,
          boxShadow: 24,
          p: 4,
          borderRadius: "10px",
        }}
      >
        <Typography
          id="modal-editar-lugar"
          variant="h6"
          component="h2"
          sx={{
            color: darkMode ? themeColors.textLight : themeColors.primary,
            fontWeight: "bold",
            mb: 2,
          }}
        >
          Editar Lugar
        </Typography>
        <TextField
          autoFocus
          margin="dense"
          id="lugar-editar"
          label="Nombre del Lugar"
          type="text"
          fullWidth
          variant="outlined"
          value={lugarEditar.lugar}
          onChange={(e) => setLugarEditar({ ...lugarEditar, lugar: e.target.value })}
          sx={{ mb: 3 }}
        />
        <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 2 }}>
          <Button onClick={() => setModalEditarOpen(false)} variant="outlined" sx={{ borderRadius: "8px" }}>
            Cancelar
          </Button>
          <Button
            onClick={handleActualizarLugar}
            variant="contained"
            sx={{
              borderRadius: "8px",
              backgroundColor: themeColors.primary,
              "&:hover": { backgroundColor: darkMode ? themeColors.secondary : "#5E35B1" },
            }}
          >
            Actualizar
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
          Gestión de Lugares
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
            onClick={() => setModalOpen(true)}
            fullWidth={isMobile}
          >
            Agregar Lugar
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
                rows={lugares}
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

      {/* Modals */}
      {renderAgregarLugarModal()}
      {renderEditarLugarModal()}
    </Box>
  )
}

export default Lugares

