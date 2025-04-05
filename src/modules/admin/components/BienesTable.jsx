"use client"
import {
  Button,
  Box,
  CircularProgress,
  Tooltip,
  Typography,
  Avatar,
  Paper,
  Card,
  CardContent,
  CardActions,
  Grid,
  IconButton,
} from "@mui/material"
import { DataGrid } from "@mui/x-data-grid"
import VisibilityIcon from "@mui/icons-material/Visibility"
import PowerSettingsNewIcon from "@mui/icons-material/PowerSettingsNew"

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

const BienesTable = ({
  bienes,
  loading,
  darkMode,
  setSelectedBien,
  setOpenBaja,
  isMobile,
  isTablet,
  onViewDetails,
}) => {
  // Mobile/Tablet Card View
  if (isMobile || isTablet) {
    return (
      <Box sx={{ width: "100%" }}>
        {loading ? (
          <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "300px" }}>
            <CircularProgress sx={{ color: themeColors.primary }} />
          </Box>
        ) : (
          <Grid container spacing={2}>
            {bienes.length === 0 ? (
              <Grid item xs={12}>
                <Paper
                  sx={{
                    p: 3,
                    textAlign: "center",
                    backgroundColor: darkMode ? "rgba(255,255,255,0.05)" : "#F8F9FA",
                    color: darkMode ? "rgba(255,255,255,0.7)" : "#495057",
                    borderRadius: "12px",
                  }}
                >
                  <Typography variant="h6">No hay bienes registrados</Typography>
                </Paper>
              </Grid>
            ) : (
              bienes.map((bien) => (
                <Grid item xs={12} sm={6} key={bien.id}>
                  <Card
                    sx={{
                      borderRadius: "12px",
                      backgroundColor: darkMode ? themeColors.paperDark : themeColors.paperLight,
                      boxShadow: "0 4px 12px rgba(106, 27, 154, 0.08)",
                      overflow: "hidden",
                      transition: "transform 0.2s ease, box-shadow 0.2s ease",
                      "&:hover": {
                        transform: "translateY(-4px)",
                        boxShadow: "0 8px 16px rgba(106, 27, 154, 0.15)",
                      },
                      border: darkMode ? "1px solid rgba(255,255,255,0.1)" : "1px solid #F0E6F8",
                    }}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        p: 2,
                        backgroundColor: darkMode ? "rgba(255,255,255,0.05)" : "#F5F0F9",
                      }}
                    >
                      <Avatar
                        src={bien.imagen}
                        alt={bien.modelo}
                        variant="rounded"
                        sx={{
                          width: "100px",
                          height: "100px",
                          borderRadius: "8px",
                          boxShadow: "0px 2px 8px rgba(106, 27, 154, 0.15)",
                          border: "1px solid #e0e0e0",
                        }}
                      />
                    </Box>

                    <CardContent sx={{ p: 2.5 }}>
                      <Box>
                        <Typography
                          variant="subtitle1"
                          fontWeight="bold"
                          color={darkMode ? themeColors.textLight : themeColors.primary}
                        >
                          {bien.modelo}
                        </Typography>
                        <Typography variant="body2" color={darkMode ? "rgba(255,255,255,0.7)" : "#7B6F8A"}>
                          Serie: {bien.nSerie}
                        </Typography>
                      </Box>

                      <Box sx={{ display: "flex", alignItems: "center", gap: 1, mt: 2 }}>
                        <Avatar
                          sx={{
                            width: 24,
                            height: 24,
                            fontSize: "0.75rem",
                            bgcolor: themeColors.primary,
                            border: `2px solid ${darkMode ? themeColors.paperDark : "#FFFFFF"}`,
                          }}
                        >
                          {(bien.usuarioResponsable && bien.usuarioResponsable.charAt(0).toUpperCase()) || "?"}
                        </Avatar>
                        <Typography variant="body2" color={darkMode ? "white" : "#333333"}>
                          {bien.usuarioResponsable || "Sin asignar"}
                        </Typography>
                      </Box>
                    </CardContent>

                    <CardActions sx={{ p: 2, pt: 0, justifyContent: "space-between" }}>
                      <Button
                        variant="outlined"
                        color="primary"
                        startIcon={<VisibilityIcon />}
                        size="small"
                        sx={{
                          borderRadius: "8px",
                          fontWeight: "bold",
                          borderColor: themeColors.primary,
                          color: themeColors.primary,
                          "&:hover": {
                            borderColor: "#5E35B1",
                            backgroundColor: "rgba(156, 39, 176, 0.04)",
                          },
                        }}
                        onClick={() => onViewDetails(bien)}
                      >
                        Detalles
                      </Button>
                      <Button
                        variant="contained"
                        color="error"
                        startIcon={<PowerSettingsNewIcon />}
                        size="small"
                        sx={{
                          borderRadius: "8px",
                          fontWeight: "bold",
                        }}
                        onClick={() => {
                          setSelectedBien(bien)
                          setOpenBaja(true)
                        }}
                      >
                        Baja
                      </Button>
                    </CardActions>
                  </Card>
                </Grid>
              ))
            )}
          </Grid>
        )}
      </Box>
    )
  }

  // Desktop Table View
  const columns = [
    {
      field: "nSerie",
      headerName: "Número de Serie",
      flex: 1,
      minWidth: 150,
    },
    {
      field: "modelo",
      headerName: "Modelo",
      flex: 1,
      minWidth: 150,
    },
   
    {
      field: "tipoBien",
      headerName: "Tipo",
      flex: 1,
      minWidth: 120,
      hide: isMobile,
    },
    {
      field: "usuarioResponsable",
      headerName: "Responsable",
      flex: 1,
      minWidth: 150,
      renderCell: (params) => (
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <Avatar
            sx={{
              width: 28,
              height: 28,
              fontSize: "0.875rem",
              bgcolor: themeColors.primary,
              border: `2px solid ${darkMode ? themeColors.paperDark : "#FFFFFF"}`,
            }}
          >
            {(params.value && params.value.charAt(0).toUpperCase()) || "?"}
          </Avatar>
          <Typography variant="body2" color={darkMode ? "white" : "#333333"}>
            {params.value || "Sin asignar"}
          </Typography>
        </Box>
      ),
    },
    {
      field: "acciones",
      headerName: "Acciones",
      flex: 1,
      minWidth: 150,
      renderCell: (params) => (
        <Box sx={{ display: "flex", gap: 1 }}>
          <Tooltip title="Ver Detalles">
            <IconButton color="primary" size="small" onClick={() => onViewDetails(params.row)}>
              <VisibilityIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Dar de Baja">
            <IconButton
              color="error"
              size="small"
              onClick={() => {
                setSelectedBien(params.row)
                setOpenBaja(true)
              }}
            >
              <PowerSettingsNewIcon />
            </IconButton>
          </Tooltip>
        </Box>
      ),
    },
  ]

  return (
    <Paper
      elevation={1}
      sx={{
        height: 600,
        width: "100%",
        maxWidth: "100%",
        backgroundColor: darkMode ? themeColors.paperDark : "#FFF",
        borderRadius: "12px",
        overflow: "hidden",
        border: darkMode ? "1px solid rgba(255,255,255,0.1)" : "1px solid #F0E6F8",
      }}
    >
      {loading ? (
        <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100%" }}>
          <CircularProgress sx={{ color: themeColors.primary }} />
        </Box>
      ) : (
        <DataGrid
          rows={bienes}
          columns={columns}
          pageSize={8}
          rowsPerPageOptions={[8, 16, 24]}
          disableSelectionOnClick
          sx={{
            border: "none",
            "& .MuiDataGrid-columnHeaders": {
              backgroundColor: darkMode ? themeColors.primary : "#F5F0F9",
              color: darkMode ? "white" : themeColors.primary,
              fontSize: "0.9rem",
              fontWeight: "bold",
              padding: "8px 0",
            },
            "& .MuiDataGrid-row": {
              backgroundColor: darkMode ? themeColors.paperDark : "#FFF",
              borderBottom: darkMode ? "1px solid rgba(255,255,255,0.1)" : "1px solid #F0E6F8",
              "&:hover": {
                backgroundColor: darkMode ? "rgba(255,255,255,0.05)" : "#F8F4FB",
                transition: "background-color 0.2s ease",
              },
              "&:nth-of-type(even)": {
                backgroundColor: darkMode ? "rgba(255,255,255,0.02)" : "#FAFAFA",
              },
            },
            "& .MuiDataGrid-cell": {
              padding: "16px 8px",
              color: darkMode ? "white" : "inherit",
            },
            "& .MuiDataGrid-footerContainer": {
              backgroundColor: darkMode ? themeColors.primary : "#F5F0F9",
              color: darkMode ? "white" : themeColors.primary,
            },
            "& .MuiTablePagination-root": {
              color: darkMode ? "white" : themeColors.primary,
            },
            "& .MuiTablePagination-selectIcon": {
              color: darkMode ? "white" : themeColors.primary,
            },
            "& .MuiTablePagination-actions button": {
              color: darkMode ? "white" : themeColors.primary,
            },
          }}
        />
      )}
    </Paper>
  )
}

export default BienesTable

