import { styled } from "@mui/material/styles"
import { Box, Paper, TextField, Button, Typography } from "@mui/material"

export const LoginContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  minHeight: "100vh",
  padding: theme.spacing(2),
  backgroundColor: theme.palette.mode === "light" ? "#f8f9fa" : "#121212",
  backgroundImage:
    theme.palette.mode === "light"
      ? "linear-gradient(135deg, rgba(187, 134, 252, 0.1) 0%, rgba(106, 27, 154, 0.1) 100%)"
      : "linear-gradient(135deg, rgba(30, 30, 30, 1) 0%, rgba(18, 18, 18, 1) 100%)",
}))

export const LoginCard = styled(Paper)(({ theme }) => ({
  width: "100%",
  maxWidth: 400,
  padding: theme.spacing(4),
  borderRadius: "20px",
  boxShadow: theme.palette.mode === "light" ? "0 10px 30px rgba(106, 27, 154, 0.2)" : "0 10px 30px rgba(0, 0, 0, 0.5)",
  backgroundColor: theme.palette.mode === "light" ? "#fff" : "#1c1c1e",
  transition: "transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out",
  border: theme.palette.mode === "light" ? "none" : "1px solid rgba(255, 255, 255, 0.05)",
  "&:hover": {
    transform: "scale(1.02) translateY(-5px)",
    boxShadow:
      theme.palette.mode === "light" ? "0 15px 35px rgba(106, 27, 154, 0.25)" : "0 15px 35px rgba(0, 0, 0, 0.6)",
  },
  [theme.breakpoints.down("sm")]: {
    maxWidth: "95%",
    padding: theme.spacing(3),
  },
}))

export const LoginTitle = styled(Typography)(({ theme }) => ({
  color: theme.palette.mode === "light" ? theme.palette.primary.main : "#fff",
  marginBottom: theme.spacing(3.5),
  textAlign: "center",
  fontWeight: "bold",
  fontSize: "2rem",
  letterSpacing: "-0.5px",
  position: "relative",
  paddingBottom: theme.spacing(2),
  "&::after": {
    content: '""',
    position: "absolute",
    bottom: "0",
    left: "50%",
    transform: "translateX(-50%)",
    width: "50px",
    height: "3px",
    backgroundColor: theme.palette.secondary.main,
    borderRadius: "2px",
  },
  [theme.breakpoints.down("sm")]: {
    fontSize: "1.75rem",
  },
}))

export const LoginTextField = styled(TextField)(({ theme }) => ({
  marginBottom: theme.spacing(2.5),
  "& .MuiOutlinedInput-root": {
    borderRadius: "12px",
    transition: "all 0.3s ease",
    backgroundColor: theme.palette.mode === "light" ? "rgba(0, 0, 0, 0.02)" : "#303030",
    "& fieldset": {
      borderColor: theme.palette.mode === "light" ? "rgba(106, 27, 154, 0.2)" : "rgba(255, 255, 255, 0.1)",
      borderWidth: "1px",
      transition: "all 0.3s ease",
    },
    "&:hover fieldset": {
      borderColor: theme.palette.mode === "light" ? "#ab47bc" : "#bb86fc",
    },
    "&.Mui-focused fieldset": {
      borderColor: "#bb86fc",
      boxShadow:
        theme.palette.mode === "light" ? "0 0 0 3px rgba(187, 134, 252, 0.2)" : "0 0 0 3px rgba(187, 134, 252, 0.15)",
    },
  },
  "& .MuiInputBase-input": {
    padding: "16px",
    color: theme.palette.mode === "light" ? theme.palette.text.primary : "#fff",
  },
  "& .MuiInputLabel-root": {
    color: theme.palette.mode === "light" ? theme.palette.text.secondary : "#9e9e9e",
    "&.Mui-focused": {
      color: "#bb86fc",
    },
  },
}))

export const LoginButton = styled(Button)(({ theme }) => ({
  width: "100%",
  padding: theme.spacing(1.5),
  marginTop: theme.spacing(2),
  backgroundColor: "#6a1b9a",
  borderRadius: "12px",
  color: "#fff",
  fontWeight: 600,
  fontSize: "1rem",
  letterSpacing: "0.5px",
  textTransform: "none",
  boxShadow: "0 4px 12px rgba(106, 27, 154, 0.3)",
  transition: "all 0.3s ease",
  "&:hover": {
    backgroundColor: "#9c27b0",
    transform: "translateY(-2px)",
    boxShadow: "0 6px 16px rgba(106, 27, 154, 0.4)",
  },
  "&:active": {
    transform: "translateY(0)",
    boxShadow: "0 2px 8px rgba(106, 27, 154, 0.4)",
  },
}))

