import { styled } from "@mui/material/styles"
import { Alert, Snackbar } from "@mui/material"

export const CustomAlert = styled(Alert)(({ theme }) => ({
  borderRadius: "12px",
  fontWeight: 500,
  backgroundColor: theme.palette.mode === "light" ? theme.palette.background.paper : "#2d2d2d",
  color: theme.palette.mode === "light" ? theme.palette.text.primary : "#fff",
  borderLeft: `5px solid ${theme.palette.secondary.main}`,
  padding: theme.spacing(1.5, 2),
  boxShadow: theme.palette.mode === "light" ? "0 4px 12px rgba(0, 0, 0, 0.1)" : "0 4px 12px rgba(0, 0, 0, 0.3)",
  "& .MuiAlert-icon": {
    color: theme.palette.secondary.main,
  },
}))

export const CustomSnackbar = styled(Snackbar)(({ theme }) => ({
  "& .MuiAlert-root": {
    boxShadow: "0 8px 20px rgba(0, 0, 0, 0.3)",
    borderRadius: "12px",
    backgroundColor: theme.palette.mode === "light" ? "#6a1b9a" : "#8e24aa",
    color: "#fff",
    fontWeight: 500,
    padding: theme.spacing(1.5, 2),
    "& .MuiAlert-icon": {
      color: "#fff",
    },
    "& .MuiAlert-action": {
      color: "rgba(255, 255, 255, 0.8)",
      "&:hover": {
        color: "#fff",
      },
    },
  },
}))

