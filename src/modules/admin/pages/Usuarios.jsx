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
import EditIcon from "@mui/icons-material/Edit"
import PowerSettingsNewIcon from "@mui/icons-material/PowerSettingsNew"
import AddIcon from "@mui/icons-material/Add"
import DarkModeIcon from "@mui/icons-material/DarkMode"
import LightModeIcon from "@mui/icons-material/LightMode"
import UsuarioDialog from "../components/UsuarioDialog"
import UsuarioEditDialog from "../components/UsuarioEditDialog"

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

const Usuarios = () => {
  const [usuarios, setUsuarios] = useState([])
  const [loading, setLoading] = useState(true)
  const [open, setOpen] = useState(false)
  const [editOpen, setEditOpen] = useState(false)
  const [lugares, setLugares] = useState([])
  const [roles] = useState([
    { id: 1, nombre: "ROLE_ADMINISTRADOR" },
    { id: 2, nombre: "ROLE_RESPONSABLE" },
    { id: 3, nombre: "ROLE_BECARIO" },
  ])
  const [nuevoUsuario, setNuevoUsuario] = useState({
    nombre: "",
    usuario: "",
    contrasena: "",
    idLugar: "",
    rol: "",
  })
  const [usuarioEditar, setUsuarioEditar] = useState(null)
  const [darkMode, setDarkMode] = useState(false)

  // Theme and responsive breakpoints
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"))
  const isTablet = useMediaQuery(theme.breakpoints.between("sm", "md"))

  useEffect(() => {
    axios
      .get("http://localhost:8080/usuarios")
      .then((response) => {
        // Aseguramos que cada usuario tenga un ID único
        const usuarios = response.data.result.map((usuario) => ({
          ...usuario,
          id: usuario.idusuario, // Usamos idusuario como id
          lugar: usuario.lugar ? usuario.lugar.lugar : "Sin asignar",
          rolNombre: usuario.rol ? usuario.rol.nombre : "Sin rol",
        }))
        setUsuarios(usuarios)
      })
      .catch((error) => console.error("Error al obtener usuarios:", error))
      .finally(() => setLoading(false))
  }, [])

  useEffect(() => {
    axios
      .get("http://localhost:8080/usuarios/lugares-sin-usuarios")
      .then((response) => setLugares(response.data.result))
      .catch((error) => console.error("Error al obtener lugares:", error))
  }, [])

  const cambiarStatusUsuario = (idUsuario) => {
    axios
      .patch(
        `http://localhost:8080/usuarios/${idUsuario}/status`,
        {},
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        },
      )
      .then(() => {
        setUsuarios(
          usuarios.map((usuario) => (usuario.id === idUsuario ? { ...usuario, status: !usuario.status } : usuario)),
        )
      })
      .catch((error) => console.error("Error al cambiar el estado del usuario:", error))
  }

  // Función para preparar el usuario para editar
  const prepararUsuarioParaEditar = (usuario) => {
    setUsuarioEditar({
      ...usuario,
      rol: usuario.rol?.idRol || "",
      idLugar: usuario.lugar?.idlugar || usuario.idLugar || "",
    })
    setEditOpen(true)
  }

  const columns = [
    {
      field: "nombre",
      headerName: "Nombre",
      flex: 1,
      minWidth: 150,
    },
    {
      field: "usuario",
      headerName: "Usuario",
      flex: 0.7,
      minWidth: 120,
      hide: isMobile,
    },
    {
      field: "status",
      headerName: "Estado",
      width: 100,
      type: "boolean",
      renderCell: (params) => (
        <Chip label={params.value ? "Activo" : "Inactivo"} color={params.value ? "success" : "error"} size="small" />
      ),
    },
    {
      field: "rolNombre",
      headerName: "Rol",
      flex: 0.8,
      minWidth: 130,
      hide: isMobile,
    },
    {
      field: "lugar",
      headerName: "Lugar",
      flex: 1,
      minWidth: 150,
      hide: isTablet || isMobile,
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
              onClick={() => cambiarStatusUsuario(params.row.id)}
            >
              <PowerSettingsNewIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Editar">
            <IconButton size="small" color="primary" onClick={() => prepararUsuarioParaEditar(params.row)}>
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
        {usuarios.map((usuario) => (
          <Grid item xs={12} key={usuario.id}>
            <Card
              sx={{
                backgroundColor: darkMode ? themeColors.paperDark : themeColors.paperLight,
                color: darkMode ? themeColors.textLight : themeColors.textDark,
                boxShadow: 3,
                borderLeft: `4px solid ${usuario.status ? "#4caf50" : "#f44336"}`,
              }}
            >
              <CardContent>
                <Typography variant="h6" component="div" sx={{ fontWeight: "bold" }}>
                  {usuario.nombre}
                </Typography>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ color: darkMode ? themeColors.secondary : "inherit" }}
                >
                  Usuario: {usuario.usuario}
                </Typography>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ color: darkMode ? themeColors.secondary : "inherit" }}
                >
                  Rol: {usuario.rolNombre}
                </Typography>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ color: darkMode ? themeColors.secondary : "inherit" }}
                >
                  Lugar: {usuario.lugar}
                </Typography>
                <Chip
                  label={usuario.status ? "Activo" : "Inactivo"}
                  color={usuario.status ? "success" : "error"}
                  size="small"
                  sx={{ mt: 1 }}
                />
              </CardContent>
              <CardActions>
                <Button
                  size="small"
                  variant="contained"
                  color={usuario.status ? "error" : "success"}
                  onClick={() => cambiarStatusUsuario(usuario.id)}
                  startIcon={<PowerSettingsNewIcon />}
                  sx={{ borderRadius: "8px" }}
                >
                  {usuario.status ? "Desactivar" : "Activar"}
                </Button>
                <Button
                  size="small"
                  variant="outlined"
                  color="primary"
                  onClick={() => prepararUsuarioParaEditar(usuario)}
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
          Gestión de Usuarios
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
            Agregar Usuario
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
                rows={usuarios}
                columns={columns}
                pageSize={5}
                rowsPerPageOptions={[5, 10, 20]}
                autoHeight
                disableColumnMenu={isMobile}
                getRowId={(row) => row.id} // Aseguramos que DataGrid use el campo id
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

      <UsuarioDialog
        open={open}
        setOpen={setOpen}
        nuevoUsuario={nuevoUsuario}
        setNuevoUsuario={setNuevoUsuario}
        roles={roles}
        lugares={lugares}
        setUsuarios={setUsuarios}
        usuarios={usuarios}
      />

      <UsuarioEditDialog
        open={editOpen}
        setOpen={setEditOpen}
        usuarioEditar={usuarioEditar}
        setUsuarioEditar={setUsuarioEditar}
        roles={roles}
        lugares={lugares}
        setUsuarios={setUsuarios}
        usuarios={usuarios}
      />
    </Box>
  )
}

export default Usuarios

