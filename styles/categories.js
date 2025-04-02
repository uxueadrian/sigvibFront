"use client"

import { useState, useEffect, useContext } from "react"
import Stack from "@mui/material/Stack"
import TipoBien from "./TipoBien"
import Marcas from "./Marcas"
import Modelos from "./Modelos"
import axios from "axios"
import { AuthContext } from "../../../context/AuthContext"
import {
  Button,
  Modal,
  TextField,
  Box,
  Typography,
  CircularProgress,
  useMediaQuery,
  useTheme,
  Grid,
  Paper,
} from "@mui/material"

const UploadImage = ({ setFoto, nombre, handleCreate }) => {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"))

  const handleUpload = async (event) => {
    const file = event.target.files[0]
    if (!file) return

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
    }
  }

  return (
    <Box sx={{ my: 2 }}>
      <Typography variant="body2" gutterBottom>
        Seleccionar imagen:
      </Typography>
      <input
        type="file"
        accept="image/*"
        onChange={handleUpload}
        style={{
          width: "100%",
          padding: isMobile ? "8px 0" : "12px 0",
        }}
      />
    </Box>
  )
}

const CrearEntidadModal = ({ open, handleClose, fetchData, endpoint, entidad }) => {
  const { token } = useContext(AuthContext)
  const [nombre, setNombre] = useState("")
  const [foto, setFoto] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  // Theme and responsive breakpoints
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
      setFoto("") // Limpiar imagen después de enviar
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
    <Modal
      open={open}
      onClose={handleClose}
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Box
        sx={{
          position: "relative",
          width: { xs: "90%", sm: 400 },
          bgcolor: "background.paper",
          boxShadow: 24,
          p: { xs: 2, sm: 4 },
          borderRadius: 2,
          maxHeight: "90vh",
          overflow: "auto",
        }}
      >
        <Typography variant="h6" component="h2" gutterBottom>
          Crear {entidad}
        </Typography>
        <TextField
          fullWidth
          label="Nombre"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          error={!!error}
          helperText={error}
          margin="normal"
          size={isMobile ? "small" : "medium"}
        />
        {entidad === "Modelo" && <UploadImage setFoto={setFoto} nombre={nombre} handleCreate={handleCreate} />}
        <Box sx={{ display: "flex", justifyContent: "space-between", mt: 2 }}>
          <Button variant="outlined" onClick={handleClose} disabled={loading}>
            Cancelar
          </Button>
          <Button variant="contained" onClick={() => handleCreate()} disabled={loading}>
            {loading ? <CircularProgress size={24} /> : "Crear"}
          </Button>
        </Box>
      </Box>
    </Modal>
  )
}

const Categorias = () => {
  const { token } = useContext(AuthContext)
  const [tiposBien, setTiposBien] = useState([])
  const [marcas, setMarcas] = useState([])
  const [modelos, setModelos] = useState([])
  const [loading, setLoading] = useState(true)
  const [modalOpen, setModalOpen] = useState(null)

  // Theme and responsive breakpoints
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"))

  const fetchData = async () => {
    try {
      const headers = { Authorization: `Bearer ${token}` }
      const [tiposRes, marcasRes, modelosRes] = await Promise.all([
        axios.get("http://localhost:8080/tipo-bien", { headers }),
        axios.get("http://localhost:8080/marca", { headers }),
        axios.get("http://localhost:8080/modelo", { headers }),
      ])

      setTiposBien(tiposRes.data.result)
      setMarcas(marcasRes.data.result)
      setModelos(modelosRes.data.result)
    } catch (error) {
      console.error("Error al obtener los datos: ", error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (token) fetchData()
  }, [token])

  const handleChangeStatus = async (id, endpoint) => {
    try {
      const headers = { Authorization: `Bearer ${token}` }
      await axios.patch(`http://localhost:8080/${endpoint}/cambiar-status/${id}`, {}, { headers })
      fetchData()
    } catch (error) {
      console.error(`Error al cambiar estado en ${endpoint}:`, error.response?.data || error.message)
    }
  }

  return (
    <Box
      sx={{
        padding: { xs: "10px", sm: "15px", md: "20px" },
        backgroundColor: "#F3F4F6",
      }}
    >
      <Paper
        elevation={2}
        sx={{
          padding: { xs: "15px", sm: "20px", md: "30px" },
          borderRadius: "10px",
          backgroundColor: "#FFFFFF",
          mb: 3,
        }}
      >
        <Typography
          variant={isMobile ? "h5" : "h4"}
          sx={{
            color: "#673AB7",
            fontWeight: "bold",
            mb: 3,
          }}
        >
          Categorías
        </Typography>

        {/* Stack for desktop, Grid for mobile */}
        {isMobile ? (
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TipoBien
                data={tiposBien}
                loading={loading}
                onChangeStatus={(id) => handleChangeStatus(id, "tipo-bien")}
                isMobile={isMobile}
              />
            </Grid>
            <Grid item xs={12}>
              <Marcas
                data={marcas}
                loading={loading}
                onChangeStatus={(id) => handleChangeStatus(id, "marca")}
                isMobile={isMobile}
              />
            </Grid>
            <Grid item xs={12}>
              <Modelos
                data={modelos}
                loading={loading}
                onChangeStatus={(id) => handleChangeStatus(id, "modelo")}
                isMobile={isMobile}
              />
            </Grid>
          </Grid>
        ) : (
          <Stack direction={{ xs: "column", md: "row" }} spacing={3} sx={{ mb: 3 }}>
            <TipoBien data={tiposBien} loading={loading} onChangeStatus={(id) => handleChangeStatus(id, "tipo-bien")} />
            <Marcas data={marcas} loading={loading} onChangeStatus={(id) => handleChangeStatus(id, "marca")} />
            <Modelos data={modelos} loading={loading} onChangeStatus={(id) => handleChangeStatus(id, "modelo")} />
          </Stack>
        )}

        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", sm: "row" },
            gap: 2,
            mt: 3,
          }}
        >
          <Button variant="contained" onClick={() => setModalOpen("tipo-bien")} fullWidth={isMobile}>
            Agregar Tipo de Bien
          </Button>
          <Button variant="contained" onClick={() => setModalOpen("marca")} fullWidth={isMobile}>
            Agregar Marca
          </Button>
          <Button variant="contained" onClick={() => setModalOpen("modelo")} fullWidth={isMobile}>
            Agregar Modelo
          </Button>
        </Box>

        {modalOpen === "tipo-bien" && (
          <CrearEntidadModal
            open
            handleClose={() => setModalOpen(null)}
            fetchData={fetchData}
            endpoint="http://localhost:8080/tipo-bien"
            entidad="Tipo de Bien"
          />
        )}
        {modalOpen === "marca" && (
          <CrearEntidadModal
            open
            handleClose={() => setModalOpen(null)}
            fetchData={fetchData}
            endpoint="http://localhost:8080/marca"
            entidad="Marca"
          />
        )}
        {modalOpen === "modelo" && (
          <CrearEntidadModal
            open
            handleClose={() => setModalOpen(null)}
            fetchData={fetchData}
            endpoint="http://localhost:8080/modelo"
            entidad="Modelo"
          />
        )}
      </Paper>
    </Box>
  )
}

export default Categorias

