"use client"
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  MenuItem,
  TextField,
  Grid,
  Typography,
  Box,
  IconButton,
  Divider,
  Stack,
  useMediaQuery,
  useTheme,
  Paper,
} from "@mui/material"
import CloseIcon from "@mui/icons-material/Close"
import SaveIcon from "@mui/icons-material/Save"
import DevicesIcon from "@mui/icons-material/Devices"
import LocationOnIcon from "@mui/icons-material/LocationOn"

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

const BienesForm = ({
  open,
  handleClose,
  handleChange,
  handleSubmit,
  nuevoBien,
  tiposBien,
  modelos,
  marcas,
  lugares,
  usuarios,
  darkMode,
}) => {
  const theme = useTheme()
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"))

  const isFormValid = () => {
    return (
      nuevoBien.nSerie &&
      nuevoBien.idTipo &&
      nuevoBien.idModelo &&
      nuevoBien.idMarca &&
      // Removed idLugar from validation requirements
      nuevoBien.idUsuario
    )
  }

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      maxWidth="lg"
      fullWidth
      fullScreen={fullScreen}
      PaperProps={{
        sx: {
          borderRadius: fullScreen ? 0 : "16px",
          overflow: "hidden",
          backgroundColor: darkMode ? themeColors.paperDark : themeColors.paperLight,
        },
      }}
    >
      <DialogTitle
        sx={{
          backgroundColor: themeColors.primary,
          color: "white",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "16px 24px",
        }}
      >
        <Typography variant="h6" component="div" sx={{ fontWeight: "bold", letterSpacing: "0.3px" }}>
          Agregar Nuevo Bien
        </Typography>
        <IconButton edge="end" color="inherit" onClick={handleClose} aria-label="close" size="small">
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent
        sx={{
          padding: "28px",
          backgroundColor: darkMode ? themeColors.paperDark : themeColors.paperLight,
        }}
      >
        <Grid container spacing={4}>
          {/* Left Column - Basic Information */}
          <Grid item xs={12} md={6}>
            <Paper
              elevation={1}
              sx={{
                p: 3,
                height: "100%",
                borderRadius: "12px",
                backgroundColor: darkMode ? "rgba(255,255,255,0.05)" : "#FFFFFF",
                border: darkMode ? "1px solid rgba(255,255,255,0.1)" : "1px solid #F0E6F8",
                boxShadow: "0 4px 12px rgba(106, 27, 154, 0.05)",
              }}
            >
              <Stack spacing={3}>
                <Box>
                  <Typography
                    variant="h6"
                    color={darkMode ? themeColors.textLight : themeColors.primary}
                    gutterBottom
                    sx={{
                      fontWeight: "600",
                      display: "flex",
                      alignItems: "center",
                      gap: 1,
                    }}
                  >
                    <DevicesIcon /> Información Básica
                  </Typography>
                  <Divider
                    sx={{
                      borderColor: darkMode ? "rgba(255,255,255,0.1)" : "rgba(106, 27, 154, 0.2)",
                      mt: 1,
                      mb: 2,
                    }}
                  />
                </Box>

                <TextField
                  label="Número de Serie"
                  name="nSerie"
                  fullWidth
                  onChange={handleChange}
                  value={nuevoBien.nSerie || ""}
                  margin="normal"
                  variant="outlined"
                  required
                  InputProps={{
                    sx: {
                      borderRadius: "8px",
                      backgroundColor: darkMode ? "rgba(0,0,0,0.2)" : "#FFFFFF",
                      color: darkMode ? "white" : "#333333",
                    },
                  }}
                  InputLabelProps={{
                    sx: {
                      color: darkMode ? themeColors.textLight : themeColors.primary,
                      fontWeight: "500",
                    },
                  }}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      "& fieldset": {
                        borderColor: darkMode ? "rgba(255,255,255,0.2)" : "rgba(106, 27, 154, 0.23)",
                      },
                      "&:hover fieldset": {
                        borderColor: darkMode ? "rgba(255,255,255,0.3)" : "rgba(106, 27, 154, 0.4)",
                      },
                      "&.Mui-focused fieldset": {
                        borderColor: darkMode ? themeColors.textLight : themeColors.primary,
                        borderWidth: "2px",
                      },
                    },
                  }}
                />

                <TextField
                  select
                  label="Tipo de Bien"
                  name="idTipo"
                  value={nuevoBien.idTipo}
                  fullWidth
                  onChange={handleChange}
                  margin="normal"
                  variant="outlined"
                  required
                  InputProps={{
                    sx: {
                      borderRadius: "8px",
                      backgroundColor: darkMode ? "rgba(0,0,0,0.2)" : "transparent",
                      color: darkMode ? "white" : "#333333",
                    },
                  }}
                  InputLabelProps={{
                    sx: { color: darkMode ? themeColors.textLight : themeColors.primary },
                  }}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      "& fieldset": {
                        borderColor: darkMode ? "rgba(255,255,255,0.2)" : "rgba(106, 27, 154, 0.23)",
                      },
                      "&:hover fieldset": {
                        borderColor: darkMode ? "rgba(255,255,255,0.3)" : "rgba(106, 27, 154, 0.4)",
                      },
                      "&.Mui-focused fieldset": {
                        borderColor: darkMode ? themeColors.textLight : themeColors.primary,
                        borderWidth: "2px",
                      },
                    },
                  }}
                >
                  <MenuItem value="" disabled>
                    <em>Seleccione un tipo</em>
                  </MenuItem>
                  {tiposBien.map((tipo) => (
                    <MenuItem key={tipo.idTipo} value={tipo.idTipo}>
                      {tipo.nombre}
                    </MenuItem>
                  ))}
                </TextField>

                <TextField
                  select
                  label="Modelo"
                  name="idModelo"
                  value={nuevoBien.idModelo}
                  fullWidth
                  onChange={handleChange}
                  margin="normal"
                  variant="outlined"
                  required
                  InputProps={{
                    sx: {
                      borderRadius: "8px",
                      backgroundColor: darkMode ? "rgba(0,0,0,0.2)" : "transparent",
                      color: darkMode ? "white" : "#333333",
                    },
                  }}
                  InputLabelProps={{
                    sx: { color: darkMode ? themeColors.textLight : themeColors.primary },
                  }}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      "& fieldset": {
                        borderColor: darkMode ? "rgba(255,255,255,0.2)" : "rgba(106, 27, 154, 0.23)",
                      },
                      "&:hover fieldset": {
                        borderColor: darkMode ? "rgba(255,255,255,0.3)" : "rgba(106, 27, 154, 0.4)",
                      },
                      "&.Mui-focused fieldset": {
                        borderColor: darkMode ? themeColors.textLight : themeColors.primary,
                        borderWidth: "2px",
                      },
                    },
                  }}
                >
                  <MenuItem value="" disabled>
                    <em>Seleccione un modelo</em>
                  </MenuItem>
                  {modelos.map((modelo) => (
                    <MenuItem key={modelo.idModelo} value={modelo.idModelo}>
                      {modelo.nombreModelo}
                    </MenuItem>
                  ))}
                </TextField>

                <TextField
                  select
                  label="Marca"
                  name="idMarca"
                  value={nuevoBien.idMarca}
                  fullWidth
                  onChange={handleChange}
                  margin="normal"
                  variant="outlined"
                  required
                  InputProps={{
                    sx: {
                      borderRadius: "8px",
                      backgroundColor: darkMode ? "rgba(0,0,0,0.2)" : "transparent",
                      color: darkMode ? "white" : "#333333",
                    },
                  }}
                  InputLabelProps={{
                    sx: { color: darkMode ? themeColors.textLight : themeColors.primary },
                  }}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      "& fieldset": {
                        borderColor: darkMode ? "rgba(255,255,255,0.2)" : "rgba(106, 27, 154, 0.23)",
                      },
                      "&:hover fieldset": {
                        borderColor: darkMode ? "rgba(255,255,255,0.3)" : "rgba(106, 27, 154, 0.4)",
                      },
                      "&.Mui-focused fieldset": {
                        borderColor: darkMode ? themeColors.textLight : themeColors.primary,
                        borderWidth: "2px",
                      },
                    },
                  }}
                >
                  <MenuItem value="" disabled>
                    <em>Seleccione una marca</em>
                  </MenuItem>
                  {marcas.map((marca) => (
                    <MenuItem key={marca.idmarca} value={marca.idmarca}>
                      {marca.nombre}
                    </MenuItem>
                  ))}
                </TextField>
              </Stack>
            </Paper>
          </Grid>

          {/* Right Column - Location and Responsibility */}
          <Grid item xs={12} md={6}>
            <Paper
              elevation={1}
              sx={{
                p: 3,
                height: "100%",
                borderRadius: "12px",
                backgroundColor: darkMode ? "rgba(255,255,255,0.05)" : "#FFFFFF",
                border: darkMode ? "1px solid rgba(255,255,255,0.1)" : "1px solid #F0E6F8",
                boxShadow: "0 4px 12px rgba(106, 27, 154, 0.05)",
              }}
            >
              <Stack spacing={3}>
                <Box>
                  <Typography
                    variant="h6"
                    color={darkMode ? themeColors.textLight : themeColors.primary}
                    gutterBottom
                    sx={{
                      fontWeight: "600",
                      display: "flex",
                      alignItems: "center",
                      gap: 1,
                    }}
                  >
                    <LocationOnIcon /> Ubicación y Responsable
                  </Typography>
                  <Divider
                    sx={{
                      borderColor: darkMode ? "rgba(255,255,255,0.1)" : "rgba(106, 27, 154, 0.2)",
                      mt: 1,
                      mb: 2,
                    }}
                  />
                </Box>

                <TextField
                  select
                  label="Lugar Asignado (Opcional)"
                  name="idLugar"
                  value={nuevoBien.idLugar || ""}
                  fullWidth
                  onChange={handleChange}
                  margin="normal"
                  variant="outlined"
                  // Removed required prop
                  InputProps={{
                    sx: {
                      borderRadius: "8px",
                      backgroundColor: darkMode ? "rgba(0,0,0,0.2)" : "transparent",
                      color: darkMode ? "white" : "#333333",
                    },
                  }}
                  InputLabelProps={{
                    sx: { color: darkMode ? themeColors.textLight : themeColors.primary },
                  }}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      "& fieldset": {
                        borderColor: darkMode ? "rgba(255,255,255,0.2)" : "rgba(106, 27, 154, 0.23)",
                      },
                      "&:hover fieldset": {
                        borderColor: darkMode ? "rgba(255,255,255,0.3)" : "rgba(106, 27, 154, 0.4)",
                      },
                      "&.Mui-focused fieldset": {
                        borderColor: darkMode ? themeColors.textLight : themeColors.primary,
                        borderWidth: "2px",
                      },
                    },
                  }}
                >
                  <MenuItem value="">
                    <em>Sin lugar asignado</em>
                  </MenuItem>
                  {lugares.length === 0 ? (
                    <MenuItem disabled>Cargando Lugares...</MenuItem>
                  ) : (
                    lugares.map((lugar) => (
                      <MenuItem key={lugar.idlugar} value={lugar.idlugar}>
                        {lugar.lugar}
                      </MenuItem>
                    ))
                  )}
                </TextField>

                <TextField
                  select
                  label="Responsable"
                  name="idUsuario"
                  value={nuevoBien.idUsuario}
                  fullWidth
                  onChange={handleChange}
                  margin="normal"
                  variant="outlined"
                  required
                  InputProps={{
                    sx: {
                      borderRadius: "8px",
                      backgroundColor: darkMode ? "rgba(0,0,0,0.2)" : "transparent",
                      color: darkMode ? "white" : "#333333",
                    },
                  }}
                  InputLabelProps={{
                    sx: { color: darkMode ? themeColors.textLight : themeColors.primary },
                  }}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      "& fieldset": {
                        borderColor: darkMode ? "rgba(255,255,255,0.2)" : "rgba(106, 27, 154, 0.23)",
                      },
                      "&:hover fieldset": {
                        borderColor: darkMode ? "rgba(255,255,255,0.3)" : "rgba(106, 27, 154, 0.4)",
                      },
                      "&.Mui-focused fieldset": {
                        borderColor: darkMode ? themeColors.textLight : themeColors.primary,
                        borderWidth: "2px",
                      },
                    },
                  }}
                >
                  <MenuItem value="" disabled>
                    <em>Seleccione un responsable</em>
                  </MenuItem>
                  {usuarios
                    ?.filter((usuario) => usuario.rol.nombre === "ROLE_RESPONSABLE")
                    .map((usuario) => (
                      <MenuItem key={usuario.idusuario} value={usuario.idusuario}>
                        {usuario.nombre}
                      </MenuItem>
                    ))}
                </TextField>

                <Box sx={{ mt: 2 }}>
                  <Typography
                    variant="body2"
                    color={darkMode ? "rgba(255,255,255,0.6)" : "#7B6F8A"}
                    sx={{ fontStyle: "italic", mt: 4 }}
                  >
                    Todos los campos son obligatorios para registrar un nuevo bien en el inventario, excepto el lugar
                    asignado que es opcional.
                  </Typography>
                </Box>
              </Stack>
            </Paper>
          </Grid>
        </Grid>
      </DialogContent>

      <DialogActions
        sx={{
          padding: "16px 24px",
          backgroundColor: darkMode ? "rgba(0,0,0,0.2)" : "#F8F4FB",
          borderTop: darkMode ? "1px solid rgba(255,255,255,0.1)" : "1px solid rgba(106, 27, 154, 0.1)",
        }}
      >
        <Button
          onClick={handleClose}
          color="error"
          variant="outlined"
          sx={{
            borderRadius: "8px",
            fontWeight: "bold",
            px: 3,
          }}
        >
          Cancelar
        </Button>
        <Button
          onClick={handleSubmit}
          color="primary"
          variant="contained"
          startIcon={<SaveIcon />}
          disabled={!isFormValid()}
          sx={{
            borderRadius: "8px",
            fontWeight: "bold",
            bgcolor: themeColors.primary,
            "&:hover": {
              bgcolor: "#5E35B1",
            },
            px: 3,
          }}
        >
          Guardar
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default BienesForm

