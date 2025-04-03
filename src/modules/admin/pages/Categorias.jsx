"use client"

import { useState, useEffect, useContext } from "react"
import {
  Box,
  Button,
  Card,
  CardContent,
  CardActions,
  Chip,
  CircularProgress,
  Grid,
  IconButton,
  Modal,
  Paper,
  Tab,
  Tabs,
  TextField,
  Tooltip,
  Typography,
  useMediaQuery,
  useTheme,
  Avatar,
  Switch,
} from "@mui/material"
import {
  Add,
  CloudUpload,
  Close,
  PowerSettingsNew,
  DarkMode as DarkModeIcon,
  LightMode as LightModeIcon,
} from "@mui/icons-material"
import { DataGrid } from "@mui/x-data-grid"
import axios from "axios"
import { AuthContext } from "../../../context/AuthContext"

// Theme colors matching the Usuarios component
const themeColors = {
  primary: "#673AB7", // Main purple
  secondary: "#9575CD", // Lighter purple
  textLight: "#FFFFFF", // White
  textDark: "#000000", // Black
  backgroundLight: "#F3F4F6", // Light background
  backgroundDark: "#1E1E1E", // Dark background
  paperLight: "#FFFFFF",
  paperDark: "#2C2C2C",
}

const UploadImage = ({ setFoto, nombre, handleCreate }) => {
  const [uploading, setUploading] = useState(false)
  const [preview, setPreview] = useState("")

  const handleUpload = async (event) => {
    const file = event.target.files[0]
    if (!file) return

    // Show preview
    setPreview(URL.createObjectURL(file))
    setUploading(true)

    const formData = new FormData()
    formData.append("file", file)
    formData.append("upload_preset", "emyrouge")

    try {
      const response = await axios.post("https://api.cloudinary.com/v1_1/dxow9lddk/image/upload", formData)

      const imageUrl = response.data.secure_url
      console.log("Imagen subida a Cloudinary:", imageUrl)
      setFoto(imageUrl)

      // Si el usuario ya ingresó un nombre, crear automáticamente el modelo
      if (nombre.trim()) {
        handleCreate(imageUrl)
      }
    } catch (error) {
      console.error("Error al subir la imagen", error)
    } finally {
      setUploading(false)
    }
  }

  return (
    <Box sx={{ mt: 2, mb: 2 }}>
      <Button
        variant="outlined"
        component="label"
        startIcon={<CloudUpload />}
        fullWidth
        disabled={uploading}
        sx={{
          borderRadius: "8px",
          p: 1.5,
          borderColor: uploading ? "grey.400" : "primary.main",
        }}
      >
        {uploading ? "Subiendo..." : "Subir imagen"}
        <input type="file" accept="image/*" onChange={handleUpload} hidden />
      </Button>

      {preview && (
        <Box sx={{ mt: 2, textAlign: "center" }}>
          <Box
            sx={{
              position: "relative",
              width: "100%",
              height: 200,
              borderRadius: 1,
              overflow: "hidden",
              mx: "auto",
              border: "1px solid #e0e0e0",
            }}
          >
            <img
              src={preview || "/placeholder.svg"}
              alt="Vista previa"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "contain",
              }}
            />
          </Box>
        </Box>
      )}
    </Box>
  )
}

const CrearEntidadModal = ({ open, handleClose, fetchData, endpoint, entidad, darkMode }) => {
  const { token } = useContext(AuthContext)
  const [nombre, setNombre] = useState("")
  const [foto, setFoto] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"))

  const handleCreate = async (imageUrl = foto) => {
    if (nombre.trim() === "") {
      setError("El nombre es obligatorio.")
      return
    }

    if (entidad === "Modelo" && !imageUrl) {
      setError("Debes subir una imagen antes de crear el modelo.")
      return
    }

    setLoading(true)
    setError(null)

    try {
      const headers = {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      }

      const data =
        entidad === "Modelo" ? { nombreModelo: nombre.trim(), foto: imageUrl } : { nombre: nombre.trim(), status: true }

      console.log("Enviando datos al backend:", data)

      await axios.post(endpoint, data, { headers })

      setNombre("")
      setFoto("")
      handleClose()
      fetchData()
    } catch (err) {
      console.error(`Error al crear ${entidad}: `, err)
      setError(`Hubo un error al crear ${entidad}. Inténtalo de nuevo.`)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Modal open={open} onClose={handleClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: isMobile ? "90%" : 400,
          bgcolor: darkMode ? themeColors.paperDark : themeColors.paperLight,
          color: darkMode ? themeColors.textLight : themeColors.textDark,
          boxShadow: 24,
          p: 3,
          borderRadius: 2,
          maxHeight: "90vh",
          overflow: "auto",
        }}
      >
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
          <Typography variant="h6" component="h2" sx={{ fontWeight: "bold" }}>
            Crear {entidad}
          </Typography>
          <IconButton onClick={handleClose} size="small" sx={{ color: darkMode ? themeColors.textLight : "inherit" }}>
            <Close />
          </IconButton>
        </Box>

        <TextField
          fullWidth
          label="Nombre"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          error={!!error}
          helperText={error}
          margin="normal"
          sx={{
            "& .MuiOutlinedInput-root": {
              "& fieldset": {
                borderColor: darkMode ? "rgba(255, 255, 255, 0.23)" : "rgba(0, 0, 0, 0.23)",
              },
            },
            "& .MuiInputLabel-root": {
              color: darkMode ? "rgba(255, 255, 255, 0.7)" : "rgba(0, 0, 0, 0.6)",
            },
            "& .MuiInputBase-input": {
              color: darkMode ? themeColors.textLight : themeColors.textDark,
            },
          }}
        />

        {entidad === "Modelo" && <UploadImage setFoto={setFoto} nombre={nombre} handleCreate={handleCreate} />}

        <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 3, gap: 1 }}>
          <Button
            variant="outlined"
            onClick={handleClose}
            disabled={loading}
            sx={{
              borderRadius: "8px",
              color: darkMode ? themeColors.textLight : "primary.main",
              borderColor: darkMode ? themeColors.textLight : "primary.main",
            }}
          >
            Cancelar
          </Button>
          <Button
            variant="contained"
            onClick={() => handleCreate()}
            disabled={loading}
            startIcon={loading ? <CircularProgress size={16} color="inherit" /> : null}
            sx={{
              borderRadius: "8px",
              bgcolor: themeColors.primary,
              "&:hover": {
                bgcolor: darkMode ? themeColors.secondary : "#5E35B1",
              },
            }}
          >
            {loading ? "Creando..." : "Crear"}
          </Button>
        </Box>
      </Box>
    </Modal>
  )
}

const Categorias = () => {
  const { token } = useContext(AuthContext)
  const [tabValue, setTabValue] = useState(0)
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down("md"))
  const isTablet = useMediaQuery(theme.breakpoints.between("sm", "md"))
  const [modalOpen, setModalOpen] = useState(null)
  const [darkMode, setDarkMode] = useState(false)

  // Estados para TipoBien
  const [tipoBien, setTipoBien] = useState([])
  const [loadingTipoBien, setLoadingTipoBien] = useState(true)

  // Estados para Marcas
  const [marcas, setMarcas] = useState([])
  const [loadingMarcas, setLoadingMarcas] = useState(true)

  // Estados para Modelos
  const [modelos, setModelos] = useState([])
  const [loadingModelos, setLoadingModelos] = useState(true)

  // Función para obtener tipos de bien
  const fetchTipoBien = async () => {
    try {
      const headers = token ? { Authorization: `Bearer ${token}` } : {}
      const response = await axios.get("http://localhost:8080/tipo-bien", { headers })
      const tipoBienData = response.data.result.map((tipo) => ({
        ...tipo,
        id: tipo.idTipo,
      }))
      setTipoBien(tipoBienData)
    } catch (error) {
      console.error("Error al obtener los tipos de bien:", error)
    } finally {
      setLoadingTipoBien(false)
    }
  }

  // Función para obtener marcas
  const fetchMarcas = async () => {
    try {
      const headers = token ? { Authorization: `Bearer ${token}` } : {}
      const response = await axios.get("http://localhost:8080/marca", { headers })
      const marcasData = response.data.result.map((marca) => ({
        ...marca,
        id: marca.idmarca,
      }))
      setMarcas(marcasData)
    } catch (error) {
      console.error("Error al obtener las marcas:", error)
    } finally {
      setLoadingMarcas(false)
    }
  }

  // Función para obtener modelos
  const fetchModelos = async () => {
    try {
      const headers = token ? { Authorization: `Bearer ${token}` } : {}
      const response = await axios.get("http://localhost:8080/modelo", { headers })
      const modelosData = response.data.result.map((modelo) => ({
        ...modelo,
        id: modelo.idModelo,
      }))
      setModelos(modelosData)
    } catch (error) {
      console.error("Error al obtener los modelos:", error)
    } finally {
      setLoadingModelos(false)
    }
  }

  // Función para cambiar estado de tipo bien
  const cambiarEstadoTipoBien = async (idTipo) => {
    try {
      const headers = token ? { Authorization: `Bearer ${token}` } : {}
      await axios.put(`http://localhost:8080/tipo-bien/cambiar-status/${idTipo}`, {}, { headers })
      fetchTipoBien()
    } catch (error) {
      console.error("Error al cambiar el estado del tipo de bien:", error)
    }
  }

  // Función para cambiar estado de marca
  const cambiarEstadoMarca = async (idMarca) => {
    try {
      const headers = token ? { Authorization: `Bearer ${token}` } : {}
      await axios.patch(`http://localhost:8080/marca/cambiar-status/${idMarca}`, {}, { headers })
      fetchMarcas()
    } catch (error) {
      console.error("Error al cambiar el estado de la marca:", error.response?.data || error.message)
    }
  }

  // Función para cambiar estado de modelo
  const cambiarEstadoModelo = async (idModelo) => {
    try {
      const headers = token ? { Authorization: `Bearer ${token}` } : {}
      await axios.patch(`http://localhost:8080/modelo/cambiar-status/${idModelo}`, {}, { headers })
      fetchModelos()
    } catch (error) {
      console.error("Error al cambiar el estado del modelo:", error)
    }
  }

  // Cargar todos los datos al iniciar
  useEffect(() => {
    fetchTipoBien()
    fetchMarcas()
    fetchModelos()
  }, [token])

  // Columnas para TipoBien
  const columnasTipoBien = [
    { field: "nombre", headerName: "Tipo de bien", flex: 1, minWidth: 120 },
    {
      field: "status",
      headerName: "Estado",
      width: 150,
      renderCell: (params) => (
        <Chip
          label={params.row.status ? "Activo" : "Inactivo"}
          color={params.row.status ? "success" : "error"}
          size="small"
          onClick={() => cambiarEstadoTipoBien(params.row.id)}
          sx={{ cursor: "pointer" }}
        />
      ),
    },
    {
      field: "acciones",
      headerName: "Acciones",
      width: 120,
      renderCell: (params) => (
        <Box sx={{ display: "flex", gap: 1 }}>
          <Tooltip title={params.row.status ? "Desactivar" : "Activar"}>
            <IconButton
              size="small"
              color={params.row.status ? "error" : "success"}
              onClick={() => cambiarEstadoTipoBien(params.row.id)}
            >
              <PowerSettingsNew />
            </IconButton>
          </Tooltip>
        </Box>
      ),
    },
  ]

  // Columnas para Marcas
  const columnasMarcas = [
    { field: "nombre", headerName: "Marca", flex: 1, minWidth: 120 },
    {
      field: "status",
      headerName: "Estado",
      width: 150,
      renderCell: (params) => (
        <Chip
          label={params.row.status ? "Activo" : "Inactivo"}
          color={params.row.status ? "success" : "error"}
          size="small"
          onClick={() => cambiarEstadoMarca(params.row.id)}
          sx={{ cursor: "pointer" }}
        />
      ),
    },
    {
      field: "acciones",
      headerName: "Acciones",
      width: 120,
      renderCell: (params) => (
        <Box sx={{ display: "flex", gap: 1 }}>
          <Tooltip title={params.row.status ? "Desactivar" : "Activar"}>
            <IconButton
              size="small"
              color={params.row.status ? "error" : "success"}
              onClick={() => cambiarEstadoMarca(params.row.id)}
            >
              <PowerSettingsNew />
            </IconButton>
          </Tooltip>
        </Box>
      ),
    },
  ]

  // Columnas para Modelos
  const columnasModelos = [
    { field: "nombreModelo", headerName: "Modelo", flex: 1, minWidth: 120 },
    {
      field: "foto",
      headerName: "Imagen",
      width: 100,
      renderCell: (params) =>
        params.row.foto ? (
          <Avatar src={params.row.foto} alt={params.row.nombreModelo} sx={{ width: 40, height: 40 }} />
        ) : (
          "Sin imagen"
        ),
    },
    {
      field: "status",
      headerName: "Estado",
      width: 150,
      renderCell: (params) => (
        <Chip
          label={params.row.status ? "Activo" : "Inactivo"}
          color={params.row.status ? "success" : "error"}
          size="small"
          onClick={() => cambiarEstadoModelo(params.row.id)}
          sx={{ cursor: "pointer" }}
        />
      ),
    },
    {
      field: "acciones",
      headerName: "Acciones",
      width: 120,
      renderCell: (params) => (
        <Box sx={{ display: "flex", gap: 1 }}>
          <Tooltip title={params.row.status ? "Desactivar" : "Activar"}>
            <IconButton
              size="small"
              color={params.row.status ? "error" : "success"}
              onClick={() => cambiarEstadoModelo(params.row.id)}
            >
              <PowerSettingsNew />
            </IconButton>
          </Tooltip>
        </Box>
      ),
    },
  ]

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue)
  }

  // Función para actualizar todos los datos
  const fetchAllData = () => {
    fetchTipoBien()
    fetchMarcas()
    fetchModelos()
  }

  // Render mobile cards for each category type
  const renderMobileCards = (data, type) => {
    const getTitle = (item) => {
      if (type === "tipoBien") return item.nombre
      if (type === "marcas") return item.nombre
      if (type === "modelos") return item.nombreModelo
      return ""
    }

    const getStatusHandler = (item) => {
      if (type === "tipoBien") return () => cambiarEstadoTipoBien(item.id)
      if (type === "marcas") return () => cambiarEstadoMarca(item.id)
      if (type === "modelos") return () => cambiarEstadoModelo(item.id)
      return () => {}
    }

    return (
      <Grid container spacing={2}>
        {data.map((item) => (
          <Grid item xs={12} key={item.id}>
            <Card
              sx={{
                backgroundColor: darkMode ? themeColors.paperDark : themeColors.paperLight,
                color: darkMode ? themeColors.textLight : themeColors.textDark,
                boxShadow: 3,
                borderLeft: `4px solid ${item.status ? "#4caf50" : "#f44336"}`,
                borderRadius: "10px",
              }}
            >
              <CardContent>
                <Typography variant="h6" component="div" sx={{ fontWeight: "bold" }}>
                  {getTitle(item)}
                </Typography>

                {type === "modelos" && item.foto && (
                  <Box sx={{ mt: 1, mb: 1, display: "flex", justifyContent: "center" }}>
                    <Avatar
                      src={item.foto}
                      alt={item.nombreModelo}
                      sx={{ width: 80, height: 80, border: "1px solid #e0e0e0" }}
                    />
                  </Box>
                )}

                <Chip
                  label={item.status ? "Activo" : "Inactivo"}
                  color={item.status ? "success" : "error"}
                  size="small"
                  sx={{ mt: 1 }}
                />
              </CardContent>
              <CardActions>
                <Button
                  size="small"
                  variant="contained"
                  color={item.status ? "error" : "success"}
                  onClick={getStatusHandler(item)}
                  startIcon={<PowerSettingsNew />}
                  sx={{
                    borderRadius: "8px",
                    flex: 1,
                  }}
                >
                  {item.status ? "Desactivar" : "Activar"}
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
          Gestión de Categorías
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
              minWidth: { xs: "100%", sm: "auto" },
            }}
            startIcon={tabValue === 2 ? <CloudUpload /> : <Add />}
            onClick={() => setModalOpen(tabValue === 0 ? "tipo-bien" : tabValue === 1 ? "marca" : "modelo")}
          >
            Agregar {tabValue === 0 ? "Tipo de Bien" : tabValue === 1 ? "Marca" : "Modelo"}
          </Button>
          <Box sx={{ display: "flex", alignItems: "center", justifyContent: { xs: "center", sm: "flex-end" } }}>
            {darkMode ? (
              <DarkModeIcon sx={{ mr: 1, color: themeColors.textLight }} />
            ) : (
              <LightModeIcon sx={{ mr: 1 }} />
            )}
            <Switch checked={darkMode} onChange={() => setDarkMode(!darkMode)} />
          </Box>
        </Box>

        {/* Tabs for all screen sizes */}
        <Box sx={{ borderBottom: 1, borderColor: "divider", mb: 2 }}>
          <Tabs
            value={tabValue}
            onChange={handleTabChange}
            variant="fullWidth"
            aria-label="categorías tabs"
            sx={{
              "& .MuiTab-root": {
                color: darkMode ? "rgba(255, 255, 255, 0.7)" : "rgba(0, 0, 0, 0.6)",
                "&.Mui-selected": {
                  color: darkMode ? themeColors.secondary : themeColors.primary,
                },
              },
              "& .MuiTabs-indicator": {
                backgroundColor: darkMode ? themeColors.secondary : themeColors.primary,
              },
            }}
          >
            <Tab label="Tipos de Bien" />
            <Tab label="Marcas" />
            <Tab label="Modelos" />
          </Tabs>
        </Box>

        <Box sx={{ mt: 2, mb: 4 }}>
          {tabValue === 0 && (
            <Box>
              <Typography
                variant="h6"
                sx={{
                  mb: 2,
                  color: darkMode ? themeColors.secondary : themeColors.primary,
                  fontWeight: "bold",
                  textAlign: "center",
                }}
              >
                Tipos de Bien
              </Typography>
              {loadingTipoBien ? (
                <Box sx={{ display: "flex", justifyContent: "center", p: 4 }}>
                  <CircularProgress sx={{ color: darkMode ? themeColors.secondary : themeColors.primary }} />
                </Box>
              ) : isMobile ? (
                renderMobileCards(tipoBien, "tipoBien")
              ) : (
                <DataGrid
                  rows={tipoBien}
                  columns={columnasTipoBien}
                  pageSize={10}
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
            </Box>
          )}

          {tabValue === 1 && (
            <Box>
              <Typography
                variant="h6"
                sx={{
                  mb: 2,
                  color: darkMode ? themeColors.secondary : themeColors.primary,
                  fontWeight: "bold",
                  textAlign: "center",
                }}
              >
                Marcas
              </Typography>
              {loadingMarcas ? (
                <Box sx={{ display: "flex", justifyContent: "center", p: 4 }}>
                  <CircularProgress sx={{ color: darkMode ? themeColors.secondary : themeColors.primary }} />
                </Box>
              ) : isMobile ? (
                renderMobileCards(marcas, "marcas")
              ) : (
                <DataGrid
                  rows={marcas}
                  columns={columnasMarcas}
                  pageSize={10}
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
            </Box>
          )}

          {tabValue === 2 && (
            <Box>
              <Typography
                variant="h6"
                sx={{
                  mb: 2,
                  color: darkMode ? themeColors.secondary : themeColors.primary,
                  fontWeight: "bold",
                  textAlign: "center",
                }}
              >
                Modelos
              </Typography>
              {loadingModelos ? (
                <Box sx={{ display: "flex", justifyContent: "center", p: 4 }}>
                  <CircularProgress sx={{ color: darkMode ? themeColors.secondary : themeColors.primary }} />
                </Box>
              ) : isMobile ? (
                renderMobileCards(modelos, "modelos")
              ) : (
                <DataGrid
                  rows={modelos}
                  columns={columnasModelos}
                  pageSize={10}
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
            </Box>
          )}
        </Box>

        {modalOpen === "tipo-bien" && (
          <CrearEntidadModal
            open
            handleClose={() => setModalOpen(null)}
            fetchData={fetchAllData}
            endpoint="http://localhost:8080/tipo-bien"
            entidad="Tipo de Bien"
            darkMode={darkMode}
          />
        )}
        {modalOpen === "marca" && (
          <CrearEntidadModal
            open
            handleClose={() => setModalOpen(null)}
            fetchData={fetchAllData}
            endpoint="http://localhost:8080/marca"
            entidad="Marca"
            darkMode={darkMode}
          />
        )}
        {modalOpen === "modelo" && (
          <CrearEntidadModal
            open
            handleClose={() => setModalOpen(null)}
            fetchData={fetchAllData}
            endpoint="http://localhost:8080/modelo"
            entidad="Modelo"
            darkMode={darkMode}
          />
        )}
      </Paper>
    </Box>
  )
}

export default Categorias

