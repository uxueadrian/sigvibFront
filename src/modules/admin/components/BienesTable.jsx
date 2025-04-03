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
} from "@mui/material"
import { DataGrid, GridToolbar } from "@mui/x-data-grid"
import { esES } from "@mui/x-data-grid/locales"
import DeleteIcon from "@mui/icons-material/Delete"
import VisibilityIcon from "@mui/icons-material/Visibility"

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
            <CircularProgress sx={{ color: darkMode ? "#AED581" : "#2E7D32" }} />
          </Box>
        ) : (
          <Grid container spacing={2}>
            {bienes.length === 0 ? (
              <Grid item xs={12}>
                <Paper
                  sx={{
                    p: 3,
                    textAlign: "center",
                    backgroundColor: darkMode ? "#2D3748" : "#F8F9FA",
                    color: darkMode ? "#E2E8F0" : "#495057",
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
                      backgroundColor: darkMode ? "#1E293B" : "#FFFFFF",
                      boxShadow: darkMode ? "0 4px 12px rgba(0,0,0,0.3)" : "0 4px 12px rgba(0,0,0,0.1)",
                      overflow: "hidden",
                      transition: "transform 0.2s ease, box-shadow 0.2s ease",
                      "&:hover": {
                        transform: "translateY(-4px)",
                        boxShadow: darkMode ? "0 8px 16px rgba(0,0,0,0.4)" : "0 8px 16px rgba(0,0,0,0.15)",
                      },
                      border: darkMode ? "none" : "1px solid #EDF2F7",
                    }}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        p: 2,
                        backgroundColor: darkMode ? "#2D3748" : "#F8F9FA",
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
                          boxShadow: "0px 2px 8px rgba(0,0,0,0.15)",
                          border: `1px solid ${darkMode ? "#333" : "#e0e0e0"}`,
                        }}
                      />
                    </Box>

                    <CardContent sx={{ p: 2.5 }}>
                      <Box>
                        <Typography variant="subtitle1" fontWeight="bold" color={darkMode ? "#E2E8F0" : "text.primary"}>
                          {bien.modelo}
                        </Typography>
                        <Typography variant="body2" color={darkMode ? "#A0AEC0" : "text.secondary"}>
                          Serie: {bien.nSerie}
                        </Typography>
                      </Box>

                      <Box sx={{ display: "flex", alignItems: "center", gap: 1, mt: 2 }}>
                        <Avatar
                          sx={{
                            width: 24,
                            height: 24,
                            fontSize: "0.75rem",
                            bgcolor: darkMode ? "#6A1B9A" : "#9C27B0",
                            border: "2px solid #FFFFFF",
                          }}
                        >
                          {(bien.usuarioResponsable && bien.usuarioResponsable.charAt(0).toUpperCase()) || "?"}
                        </Avatar>
                        <Typography variant="body2" color={darkMode ? "#E2E8F0" : "text.primary"}>
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
                        }}
                        onClick={() => onViewDetails(bien)}
                      >
                        Detalles
                      </Button>
                      <Button
                        variant="contained"
                        color="primary"
                        startIcon={<DeleteIcon />}
                        size="small"
                        sx={{
                          borderRadius: "8px",
                          fontWeight: "bold",
                          boxShadow: "0 2px 5px rgba(106, 27, 154, 0.2)",
                          bgcolor: "#6A1B9A",
                          "&:hover": {
                            bgcolor: "#5C1690",
                            boxShadow: "0 4px 8px rgba(106, 27, 154, 0.3)",
                          },
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

  // Desktop Table View - Simplified columns
  const columns = [
    {
      field: "nSerie",
      headerName: "Número de Serie",
      flex: 1,
      minWidth: 150,
      renderCell: (params) => (
        <Typography variant="body2" fontWeight="medium" color={darkMode ? "#E2E8F0" : "inherit"}>
          {params.value}
        </Typography>
      ),
    },
    {
      field: "modelo",
      headerName: "Modelo",
      flex: 1,
      minWidth: 150,
      renderCell: (params) => (
        <Typography variant="body2" color={darkMode ? "#E2E8F0" : "inherit"}>
          {params.value}
        </Typography>
      ),
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
              bgcolor: darkMode ? "#6A1B9A" : "#9C27B0",
              border: "2px solid #FFFFFF",
            }}
          >
            {(params.value && params.value.charAt(0).toUpperCase()) || "?"}
          </Avatar>
          <Typography variant="body2" color={darkMode ? "#E2E8F0" : "inherit"}>
            {params.value || "Sin asignar"}
          </Typography>
        </Box>
      ),
    },
    {
      field: "actions",
      headerName: "Acciones",
      flex: 1,
      minWidth: 200,
      renderCell: (params) => (
        <Box sx={{ display: "flex", gap: 1 }}>
          <Tooltip title="Ver Detalles">
            <Button
              variant="outlined"
              color="primary"
              startIcon={<VisibilityIcon />}
              size="small"
              sx={{
                borderRadius: "8px",
                fontWeight: "bold",
              }}
              onClick={() => onViewDetails(params.row)}
            >
              Detalles
            </Button>
          </Tooltip>
          <Tooltip title="Dar de Baja">
            <Button
              variant="contained"
              color="primary"
              startIcon={<DeleteIcon />}
              size="small"
              sx={{
                borderRadius: "8px",
                fontWeight: "bold",
                boxShadow: "0 2px 5px rgba(106, 27, 154, 0.2)",
                bgcolor: "#6A1B9A",
                "&:hover": {
                  bgcolor: "#5C1690",
                  boxShadow: "0 4px 8px rgba(106, 27, 154, 0.3)",
                },
              }}
              onClick={() => {
                setSelectedBien(params.row)
                setOpenBaja(true)
              }}
            >
              Baja
            </Button>
          </Tooltip>
        </Box>
      ),
    },
  ]

  return (
    <Paper
      elevation={darkMode ? 2 : 0}
      sx={{
        height: 600,
        width: "100%",
        maxWidth: "100%",
        backgroundColor: darkMode ? "#1A202C" : "#FFF",
        borderRadius: "12px",
        overflow: "hidden",
        border: darkMode ? "none" : "1px solid #EDF2F7",
      }}
    >
      {loading ? (
        <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100%" }}>
          <CircularProgress sx={{ color: darkMode ? "#AED581" : "#2E7D32" }} />
        </Box>
      ) : (
        <DataGrid
          rows={bienes}
          columns={columns}
          pageSize={8}
          rowsPerPageOptions={[8, 16, 24]}
          disableSelectionOnClick
          components={{
            Toolbar: GridToolbar,
          }}
          componentsProps={{
            toolbar: {
              showQuickFilter: true,
              quickFilterProps: { debounceMs: 500 },
            },
          }}
          localeText={esES.components.MuiDataGrid.defaultProps.localeText}
          sx={{
            border: "none",
            "& .MuiDataGrid-columnHeaders": {
              backgroundColor: darkMode ? "#2D3748" : "#6A1B9A",
              color: "#FFF",
              fontSize: "0.9rem",
              fontWeight: "bold",
              padding: "8px 0",
            },
            "& .MuiDataGrid-row": {
              backgroundColor: darkMode ? "#1E293B" : "#FFF",
              borderBottom: `1px solid ${darkMode ? "#2D3748" : "#EDF2F7"}`,
              "&:hover": {
                backgroundColor: darkMode ? "#2D3748" : "#F5F0F9",
                transition: "background-color 0.2s ease",
              },
              "&:nth-of-type(even)": {
                backgroundColor: darkMode ? "#1A202C" : "#FAFAFA",
              },
            },
            "& .MuiDataGrid-cell": {
              padding: "16px 8px",
              color: darkMode ? "#E2E8F0" : "inherit",
            },
            "& .MuiDataGrid-footerContainer": {
              backgroundColor: darkMode ? "#2D3748" : "#6A1B9A",
              color: "#FFF",
            },
            "& .MuiTablePagination-root": {
              color: "#FFF",
            },
            "& .MuiTablePagination-selectIcon": {
              color: "#FFF",
            },
            "& .MuiTablePagination-actions button": {
              color: "#FFF",
            },
            "& .MuiDataGrid-toolbarContainer": {
              backgroundColor: darkMode ? "#1E293B" : "#F5F0F9",
              padding: "8px 16px",
              borderBottom: `1px solid ${darkMode ? "#2D3748" : "#EDF2F7"}`,
            },
            "& .MuiButton-root": {
              color: darkMode ? "#E2E8F0" : "#6A1B9A",
            },
            "& .MuiInputBase-root": {
              color: darkMode ? "#E2E8F0" : "inherit",
              backgroundColor: darkMode ? "#2D3748" : "#FFF",
              borderRadius: "8px",
              padding: "4px 8px",
              "& .MuiInputBase-input": {
                padding: "4px 8px",
              },
            },
          }}
        />
      )}
    </Paper>
  )
}

export default BienesTable

