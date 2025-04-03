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
      nuevoBien.idLugar &&
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
          backgroundColor: darkMode ? "#1E1E1E" : "#FFFFFF",
          backgroundImage: "none",
        },
      }}
    >
      <DialogTitle
        sx={{
          bgcolor: "#6A1B9A",
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
          backgroundColor: darkMode ? "#1E1E1E" : "#FFFFFF",
        }}
      >
        <Grid container spacing={4}>
          {/* Left Column - Basic Information */}
          <Grid item xs={12} md={6}>
            <Paper
              elevation={darkMode ? 3 : 1}
              sx={{
                p: 3,
                height: "100%",
                borderRadius: "12px",
                backgroundColor: darkMode ? "#1A202C" : "#FFFFFF",
                border: darkMode ? "none" : "1px solid #EDF2F7",
              }}
            >
              <Stack spacing={3}>
                <Box>
                  <Typography
                    variant="h6"
                    color={darkMode ? "#E2E8F0" : "#6A1B9A"}
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
                      backgroundColor: darkMode ? "#2D3748" : "#FFFFFF",
                      color: darkMode ? "#E2E8F0" : "inherit",
                    },
                  }}
                  InputLabelProps={{
                    sx: {
                      color: darkMode ? "#A0AEC0" : "#6A1B9A",
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
                        borderColor: "#6A1B9A",
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
                      backgroundColor: darkMode ? "#2D3748" : "transparent",
                      color: darkMode ? "#E2E8F0" : "inherit",
                    },
                  }}
                  InputLabelProps={{
                    sx: { color: darkMode ? "#A0AEC0" : "inherit" },
                  }}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      "& fieldset": {
                        borderColor: darkMode ? "rgba(255,255,255,0.2)" : "rgba(0,0,0,0.23)",
                      },
                      "&:hover fieldset": {
                        borderColor: darkMode ? "rgba(255,255,255,0.3)" : "rgba(0,0,0,0.23)",
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
                      backgroundColor: darkMode ? "#2D3748" : "transparent",
                      color: darkMode ? "#E2E8F0" : "inherit",
                    },
                  }}
                  InputLabelProps={{
                    sx: { color: darkMode ? "#A0AEC0" : "inherit" },
                  }}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      "& fieldset": {
                        borderColor: darkMode ? "rgba(255,255,255,0.2)" : "rgba(0,0,0,0.23)",
                      },
                      "&:hover fieldset": {
                        borderColor: darkMode ? "rgba(255,255,255,0.3)" : "rgba(0,0,0,0.23)",
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
                      backgroundColor: darkMode ? "#2D3748" : "transparent",
                      color: darkMode ? "#E2E8F0" : "inherit",
                    },
                  }}
                  InputLabelProps={{
                    sx: { color: darkMode ? "#A0AEC0" : "inherit" },
                  }}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      "& fieldset": {
                        borderColor: darkMode ? "rgba(255,255,255,0.2)" : "rgba(0,0,0,0.23)",
                      },
                      "&:hover fieldset": {
                        borderColor: darkMode ? "rgba(255,255,255,0.3)" : "rgba(0,0,0,0.23)",
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
              elevation={darkMode ? 3 : 1}
              sx={{
                p: 3,
                height: "100%",
                borderRadius: "12px",
                backgroundColor: darkMode ? "#1A202C" : "#FFFFFF",
                border: darkMode ? "none" : "1px solid #EDF2F7",
              }}
            >
              <Stack spacing={3}>
                <Box>
                  <Typography
                    variant="h6"
                    color={darkMode ? "#E2E8F0" : "#6A1B9A"}
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
                  label="Lugar Asignado"
                  name="idLugar"
                  value={nuevoBien.idLugar}
                  fullWidth
                  onChange={handleChange}
                  margin="normal"
                  variant="outlined"
                  required
                  InputProps={{
                    sx: {
                      borderRadius: "8px",
                      backgroundColor: darkMode ? "#2D3748" : "transparent",
                      color: darkMode ? "#E2E8F0" : "inherit",
                    },
                  }}
                  InputLabelProps={{
                    sx: { color: darkMode ? "#A0AEC0" : "inherit" },
                  }}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      "& fieldset": {
                        borderColor: darkMode ? "rgba(255,255,255,0.2)" : "rgba(0,0,0,0.23)",
                      },
                      "&:hover fieldset": {
                        borderColor: darkMode ? "rgba(255,255,255,0.3)" : "rgba(0,0,0,0.23)",
                      },
                    },
                  }}
                >
                  <MenuItem value="" disabled>
                    <em>Seleccione un lugar</em>
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
                      backgroundColor: darkMode ? "#2D3748" : "transparent",
                      color: darkMode ? "#E2E8F0" : "inherit",
                    },
                  }}
                  InputLabelProps={{
                    sx: { color: darkMode ? "#A0AEC0" : "inherit" },
                  }}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      "& fieldset": {
                        borderColor: darkMode ? "rgba(255,255,255,0.2)" : "rgba(0,0,0,0.23)",
                      },
                      "&:hover fieldset": {
                        borderColor: darkMode ? "rgba(255,255,255,0.3)" : "rgba(0,0,0,0.23)",
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
                    color={darkMode ? "#A0AEC0" : "text.secondary"}
                    sx={{ fontStyle: "italic", mt: 4 }}
                  >
                    Todos los campos son obligatorios para registrar un nuevo bien en el inventario.
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
          backgroundColor: darkMode ? "#1A202C" : "#F5F0F9",
          borderTop: `1px solid ${darkMode ? "rgba(255,255,255,0.1)" : "rgba(106, 27, 154, 0.1)"}`,
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
            bgcolor: "#6A1B9A",
            "&:hover": {
              bgcolor: "#5C1690",
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

