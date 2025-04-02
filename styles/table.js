// ../../../styles/table.js
import { styled } from "@mui/material/styles";
import { Paper, Box, Button, CircularProgress, Typography } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";

export const TableContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  minHeight: "100vh",
  backgroundColor: theme.palette.background.default,
  padding: theme.spacing(4),
  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(2),
    minHeight: "auto",
  },
}));

export const TablePaper = styled(Paper)(({ theme }) => ({
  width: "90%",
  maxWidth: "1200px",
  padding: theme.spacing(4),
  borderRadius: "12px",
  backgroundColor: theme.palette.background.paper,
  boxShadow: theme.shadows[4],
  [theme.breakpoints.down('md')]: {
    width: "95%",
    padding: theme.spacing(3),
  },
  [theme.breakpoints.down('sm')]: {
    width: "100%",
    padding: theme.spacing(2),
    borderRadius: "8px",
  },
}));

export const TableTitle = styled(Typography)(({ theme }) => ({
  color: theme.palette.text.primary,
  marginBottom: theme.spacing(3),
  fontWeight: 600,
  fontSize: "1.8rem",
  textAlign: "center",
  [theme.breakpoints.down('sm')]: {
    fontSize: "1.5rem",
    marginBottom: theme.spacing(2),
  },
}));

export const TableActions = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "space-between", // Cambiado de flex-end a space-between
  marginBottom: theme.spacing(3),
  [theme.breakpoints.down('sm')]: {
    flexDirection: "column",
    gap: theme.spacing(2),
    alignItems: "center",
  },
}));

export const TableMainButton = styled(Button)(({ theme }) => ({
  backgroundColor: '#00B4DC',
  color: '#FFFFFF',
  fontWeight: 500,
  padding: theme.spacing(1.5, 3),
  borderRadius: '8px',
  textTransform: 'none',
  fontSize: '1rem',
  '&:hover': {
    backgroundColor: '#0095B6',
    boxShadow: theme.shadows[3],
  },
  [theme.breakpoints.down('sm')]: {
    width: "100%",
    padding: theme.spacing(1.2, 2),
  },
}));

export const ResponsiveDataGrid = styled(DataGrid)(({ theme, darkmode }) => ({
  backgroundColor: theme.palette.background.paper,
  borderRadius: "8px",
  border: "none",
  "& .MuiDataGrid-columnHeaders": {
    backgroundColor: "#B0E338", // Cambiado a negro (lo cambie pensando que era el header real, pero asi como lo deje esta bien)
    color: theme.palette.common.black,
    fontWeight: 600,
    fontSize: "0.95rem",
    borderTopLeftRadius: "8px",
    borderTopRightRadius: "8px",
  },
  "& .MuiDataGrid-columnHeaderTitle": {
    fontWeight: 700,
  },
"& .MuiDataGrid-cell": {
    color: theme.palette.text.primary,
    fontSize: "0.9rem",
    borderBottom: `1px solid ${theme.palette.divider}`,
},

  "& .MuiDataGrid-footerContainer": {
    backgroundColor: "#B0E338",
    color: theme.palette.common.white,
    borderBottomLeftRadius: "8px",
    borderBottomRightRadius: "8px",
  },
  "& .MuiDataGrid-row:hover": {
    backgroundColor: theme.palette.action.hover,
  },
  "& .mobile-hidden": {
    [theme.breakpoints.down('sm')]: {
      display: "none",
    },
  },
}));

export const TableLoadingContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  height: "300px",
  [theme.breakpoints.down('sm')]: {
    height: "200px",
  },
}));