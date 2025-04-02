import { styled } from "@mui/material/styles"
import { Button } from "@mui/material"

export const SolicitarBtn = styled(Button)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "light" ? "#bb86fc" : "#6a1b9a",
  color: "#fff",
  fontWeight: 600,
  padding: theme.spacing(1.2, 2),
  borderRadius: "25px",
  textTransform: "none",
  letterSpacing: "0.5px",
  transition: "all 0.3s ease",
  boxShadow: theme.palette.mode === "light" ? "0 4px 10px rgba(187, 134, 252, 0.3)" : "0 4px 10px rgba(0, 0, 0, 0.3)",
  "&:hover": {
    backgroundColor: theme.palette.mode === "light" ? "#8e24aa" : "#9c27b0",
    transform: "translateY(-2px) scale(1.03)",
    boxShadow: theme.palette.mode === "light" ? "0 6px 14px rgba(142, 36, 170, 0.4)" : "0 6px 14px rgba(0, 0, 0, 0.4)",
  },
  "&:active": {
    transform: "translateY(0) scale(0.98)",
    boxShadow: theme.palette.mode === "light" ? "0 2px 6px rgba(142, 36, 170, 0.4)" : "0 2px 6px rgba(0, 0, 0, 0.4)",
  },
}))

export const EliminarBtn = styled(Button)(({ theme }) => ({
  backgroundColor: theme.palette.error.main,
  color: "#fff",
  fontWeight: 600,
  padding: theme.spacing(1.2, 2),
  borderRadius: "25px",
  textTransform: "none",
  letterSpacing: "0.5px",
  transition: "all 0.3s ease",
  boxShadow: "0 4px 10px rgba(244, 67, 54, 0.3)",
  "&:hover": {
    backgroundColor: theme.palette.error.dark,
    transform: "translateY(-2px) scale(1.03)",
    boxShadow: "0 6px 14px rgba(244, 67, 54, 0.4)",
  },
  "&:active": {
    transform: "translateY(0) scale(0.98)",
    boxShadow: "0 2px 6px rgba(244, 67, 54, 0.4)",
  },
}))

