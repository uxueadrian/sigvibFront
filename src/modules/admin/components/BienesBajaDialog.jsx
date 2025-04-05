"use client"
import {
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
  Box,
  IconButton,
  Alert,
  useMediaQuery,
  useTheme,
  Stack,
  Divider,
  Paper,
  Avatar,
} from "@mui/material"
import CloseIcon from "@mui/icons-material/Close"
import DeleteForeverIcon from "@mui/icons-material/DeleteForever"
import WarningAmberIcon from "@mui/icons-material/WarningAmber"

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

const BienesBajaDialog = ({
  openBaja,
  handleClose,
  handleDarDeBaja,
  motivoBaja,
  setMotivoBaja,
  selectedBien,
  darkMode,
}) => {
  const theme = useTheme()
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"))

  return (
    <Dialog
      open={openBaja}
      onClose={handleClose}
      maxWidth="sm"
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
          backgroundColor: "#d32f2f",
          color: "white",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "16px 24px",
        }}
      >
        <Stack direction="row" spacing={1} alignItems="center">
          <WarningAmberIcon />
          <Typography variant="h6" component="div" sx={{ fontWeight: "bold" }}>
            Dar de Baja
          </Typography>
        </Stack>
        <IconButton edge="end" color="inherit" onClick={handleClose} aria-label="close" size="small">
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent
        sx={{ padding: "24px", backgroundColor: darkMode ? themeColors.paperDark : themeColors.paperLight }}
      >
        <Stack spacing={3}>
          {selectedBien && (
            <Paper
              elevation={1}
              sx={{
                p: 3,
                borderRadius: "12px",
                backgroundColor: darkMode ? "rgba(211, 47, 47, 0.1)" : "#FFF8F8",
                border: darkMode ? "1px solid rgba(211, 47, 47, 0.3)" : "1px solid rgba(211, 47, 47, 0.2)",
                mb: 2,
                boxShadow: "0 4px 12px rgba(211, 47, 47, 0.05)",
              }}
            >
              <Stack direction="row" spacing={2} alignItems="center">
                <Avatar
                  src={selectedBien.imagen}
                  alt={selectedBien.modelo}
                  variant="rounded"
                  sx={{
                    width: 60,
                    height: 60,
                    borderRadius: "8px",
                    boxShadow: "0px 2px 8px rgba(0,0,0,0.15)",
                    border: "1px solid #e0e0e0",
                  }}
                />
                <Box>
                  <Typography variant="subtitle1" fontWeight="bold" color="#D32F2F">
                    {selectedBien.modelo}
                  </Typography>
                  <Typography variant="body2" color={darkMode ? "rgba(255,255,255,0.7)" : "text.secondary"}>
                    Serie: {selectedBien.nSerie}
                  </Typography>
                  <Typography variant="body2" color={darkMode ? "rgba(255,255,255,0.7)" : "text.secondary"}>
                    Responsable: {selectedBien.usuarioResponsable}
                  </Typography>
                </Box>
              </Stack>
            </Paper>
          )}

          <Alert
            severity="warning"
            variant="filled"
            sx={{
              borderRadius: "8px",
              "& .MuiAlert-icon": {
                fontSize: "1.5rem",
              },
            }}
          >
            <Typography variant="subtitle2" fontWeight="bold">
              Acción irreversible
            </Typography>
            <Typography variant="body2">
              Esta acción dará de baja el bien seleccionado y no podrá ser revertida.
            </Typography>
          </Alert>

          <Box>
            <Typography
              variant="subtitle2"
              gutterBottom
              color={darkMode ? "rgba(255,255,255,0.7)" : "text.secondary"}
              fontWeight="medium"
            >
              Por favor, indique el motivo de la baja:
            </Typography>
            <Divider
              sx={{
                mb: 2,
                borderColor: darkMode ? "rgba(211, 47, 47, 0.3)" : "rgba(211, 47, 47, 0.2)",
              }}
            />

            <TextField
              label="Motivo de Baja"
              fullWidth
              multiline
              rows={4}
              value={motivoBaja}
              onChange={(e) => setMotivoBaja(e.target.value)}
              margin="dense"
              variant="outlined"
              placeholder="Describa el motivo por el cual se da de baja este bien..."
              required
              error={motivoBaja.trim() === ""}
              helperText={motivoBaja.trim() === "" ? "El motivo es obligatorio" : ""}
              InputProps={{
                sx: {
                  borderRadius: "8px",
                  backgroundColor: darkMode ? "rgba(0,0,0,0.2)" : "#FFFFFF",
                  color: darkMode ? "white" : "#333333",
                },
              }}
              InputLabelProps={{
                sx: { color: "#D32F2F" },
              }}
              sx={{
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderColor: "rgba(211, 47, 47, 0.23)",
                  },
                  "&:hover fieldset": {
                    borderColor: "rgba(211, 47, 47, 0.4)",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "#D32F2F",
                    borderWidth: "2px",
                  },
                },
              }}
            />
          </Box>
        </Stack>
      </DialogContent>

      <DialogActions
        sx={{
          padding: "16px 24px",
          backgroundColor: darkMode ? "rgba(211, 47, 47, 0.1)" : "#FEF6F6",
          borderTop: darkMode ? "1px solid rgba(211, 47, 47, 0.2)" : "1px solid rgba(211, 47, 47, 0.1)",
        }}
      >
        <Button
          onClick={handleClose}
          variant="outlined"
          sx={{
            borderRadius: "8px",
            fontWeight: "bold",
            borderColor: "#D32F2F",
            color: "#D32F2F",
            "&:hover": {
              borderColor: "#B71C1C",
              backgroundColor: "rgba(211, 47, 47, 0.04)",
            },
            px: 3,
          }}
        >
          Cancelar
        </Button>
        <Button
          onClick={handleDarDeBaja}
          color="error"
          variant="contained"
          startIcon={<DeleteForeverIcon />}
          disabled={!motivoBaja.trim()}
          sx={{
            borderRadius: "8px",
            fontWeight: "bold",
            bgcolor: "#D32F2F",
            "&:hover": {
              bgcolor: "#B71C1C",
            },
            px: 3,
          }}
        >
          Confirmar Baja
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default BienesBajaDialog

