import { styled } from "@mui/material/styles";
import { Alert, Snackbar } from "@mui/material";

export const CustomAlert = styled(Alert)(({ theme }) => ({
  borderRadius: "12px",
  fontWeight: 500,
  backgroundColor: "#2d2d2d",
  color: "#fff",
  borderLeft: `5px solid ${theme.palette.secondary.main}`,
  padding: theme.spacing(1.5, 2),
  boxShadow: "0 4px 12px rgba(0, 0, 0, 0.3)",
  "& .MuiAlert-icon": {
    color: theme.palette.secondary.main,
  },
}));

export const CustomSnackbar = styled(Snackbar)(({ theme }) => ({
  "& .MuiAlert-root": {
    boxShadow: "0 8px 20px rgba(0, 0, 0, 0.3)",
    borderRadius: "12px",
    backgroundColor: "rgba(0, 0, 0, 0.4)",
    color: "#fff",
    fontWeight: 500,
    padding: theme.spacing(1.5, 2),
    "& .MuiAlert-icon": {
      color: "#fff",
    },
    "& .MuiAlert-action": {
      color: "rgba(0, 0, 0, 0.4)",
      "&:hover": {
        color: "#fff",
      },
    },
  },
}));
