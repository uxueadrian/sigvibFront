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

const BienesBajaDialog = ({ openBaja, handleClose, handleDarDeBaja, motivoBaja, setMotivoBaja, selectedBien, darkMode }) => {
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
          backgroundColor: darkMode ? "#1E1E1E" : "#FFFFFF",
        },
      }}
    >
      <DialogTitle
        sx={{
          bgcolor: "#D32F2F",
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

      <DialogContent sx={{ padding: "24px", backgroundColor: darkMode ? "#1E1E1E" : "#FFFFFF" }}>
        <Stack spacing={3}>
          {selectedBien && (
            <Paper 
              elevation={darkMode ? 3 : 1} 
              sx={{ 
                p: 3, 
                borderRadius: "12px",
                backgroundColor: darkMode ? "#1A202C" : "#FFF8F8",
                border: darkMode ? "none" : "1px solid rgba(211, 47, 47, 0.2)",
                mb: 2
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
                    border: `1px solid ${darkMode ? "#333" : "#e0e0e0"}`
                  }}
                />
                <Box>
                  <Typography 
                    variant="subtitle1" 
                    fontWeight="bold"
                    color={darkMode ? "#E2E8F0" : "#D32F2F"}
                  >
                    {selectedBien.modelo}
                  </Typography>
                  <Typography 
                    variant="body2" 
                    color={darkMode ? "#A0AEC0" : "text.secondary"}
                  >
                    Serie: {selectedBien.nSerie}
                  </Typography>
                  <Typography 
                    variant="body2" 
                    color={darkMode ? "#A0AEC0" : "text.secondary"}
                  >
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
              color={darkMode ? "#E2E8F0" : "text.secondary"} 
              fontWeight="medium"
            >
              Por favor, indique el motivo de la baja:
            </Typography>
            <Divider sx={{ 
              mb: 2,
              borderColor: darkMode ? "rgba(255,255,255,0.1)" : "rgba(211, 47, 47, 0.2)",
            }} />

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
                  backgroundColor: darkMode ? "#2D3748" : "#FFFFFF",
                  color: darkMode ? "#E2E8F0" : "inherit",
                },
              }}
              InputLabelProps={{
                sx: { color: darkMode ? "#A0AEC0" : "#D32F2F" },
              }}
              sx={{
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderColor: darkMode ? "rgba(255,255,255,0.2)" : "rgba(211, 47, 47, 0.23)",
                  },
                  "&:hover fieldset": {
                    borderColor: darkMode ? "rgba(255,255,255,0.3)" : "rgba(211, 47, 47, 0.4)",
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
          backgroundColor: darkMode ? "#1A202C" : "#FEF6F6",
          borderTop: `1px solid ${darkMode ? "rgba(255,255,255,0.1)" : "rgba(211, 47, 47, 0.1)"}`,
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
