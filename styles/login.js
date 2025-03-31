import { styled } from "@mui/material/styles";
import { Box, Paper, TextField, Button, Typography } from "@mui/material";

export const LoginContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  minHeight: "100vh",
  padding: theme.spacing(2),
  backgroundColor: theme.palette.background.default,
}));

export const LoginCard = styled(Paper)(({ theme }) => ({
  width: "100%",
  maxWidth: 400,
  padding: theme.spacing(4),
  borderRadius: theme.shape.borderRadius * 4,
  boxShadow: theme.shadows[6],
  backgroundColor: "#1c1c1e",
  transition: "transform 0.3s ease-in-out",
  "&:hover": {
    transform: "scale(1.02)",
  },
  [theme.breakpoints.down("sm")]: {
    maxWidth: "90%",
    padding: theme.spacing(3),
  },
}));

export const LoginTitle = styled(Typography)(({ theme }) => ({
  color: theme.palette.common.white,
  marginBottom: theme.spacing(3),
  textAlign: "center",
  fontWeight: "bold",
  [theme.breakpoints.down("sm")]: {
    fontSize: "1.5rem",
  },
}));

export const LoginTextField = styled(TextField)(({ theme }) => ({
  marginBottom: theme.spacing(2),
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: "#6a1b9a",
      borderRadius: "12px", 
    },
    "&:hover fieldset": {
      borderColor: "#ab47bc",
    },
    "&.Mui-focused fieldset": {
      borderColor: "#ab47bc",
      boxShadow: "0 0 8px rgba(171, 71, 188, 0.7)",
      borderRadius: "12px", 
    },
  },
  "& .MuiInputBase-input": {
    backgroundColor: "#303030",
    color: theme.palette.common.white,
    borderRadius: "12px", 
  },
}));

export const LoginButton = styled(Button)(({ theme }) => ({
  width: "100%",
  padding: theme.spacing(1.5),
  marginTop: theme.spacing(1),
  backgroundColor: "#6a1b9a",
  borderRadius: "8px",
  color: theme.palette.common.white,
  "&:hover": {
    backgroundColor: "#ab47bc",
    transform: "scale(1.05)",
  },
}));

