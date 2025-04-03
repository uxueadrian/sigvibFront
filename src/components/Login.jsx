"use client"

import { useState, useContext, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { AuthContext } from "../context/AuthContext"
import {
  Box,
  Card,
  Typography,
  TextField,
  Button,
  InputAdornment,
  IconButton,
  Alert,
  Slide,
  styled,
  keyframes,
  CircularProgress,
} from "@mui/material"
import { Visibility, VisibilityOff, Person, Lock, LockOpen } from "@mui/icons-material"

// Animations
const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: scale(0.9) translateY(50px);
  }
  to {
    opacity: 1;
    transform: scale(1) translateY(0);
  }
`

const pulse = keyframes`
  0% {
    transform: scale(1);
    opacity: 0.8;
  }
  50% {
    transform: scale(1.05);
    opacity: 1;
  }
  100% {
    transform: scale(1);
    opacity: 0.8;
  }
`

// Styled components
const LoginContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  minHeight: "100vh",
  padding: theme.spacing(3),
  background: "linear-gradient(135deg, #121212 0%, #1E1E1E 100%)",
  backgroundSize: "cover",
  position: "relative",
  overflow: "hidden",
  "&::before": {
    content: '""',
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background:
      "radial-gradient(circle at 30% 40%, rgba(157, 78, 221, 0.15) 0%, rgba(157, 78, 221, 0) 70%), radial-gradient(circle at 70% 60%, rgba(157, 78, 221, 0.15) 0%, rgba(157, 78, 221, 0) 70%)",
    zIndex: 0,
  },
}))

const LoginCard = styled(Card)(({ theme }) => ({
  width: "100%",
  maxWidth: 450,
  padding: theme.spacing(6),
  borderRadius: 24,
  boxShadow: "0 10px 40px rgba(0, 0, 0, 0.3)",
  background: "#1E1E1E",
  position: "relative",
  zIndex: 1,
  overflow: "visible",
  animation: `${fadeIn} 0.8s ease-out forwards`,
  border: "1px solid #2D2D2D",
  transition: "transform 0.3s ease, box-shadow 0.3s ease",
  "&:hover": {
    transform: "translateY(-5px)",
    boxShadow: "0 15px 50px rgba(157, 78, 221, 0.3)",
  },
  "&::before": {
    content: '""',
    position: "absolute",
    top: -10,
    left: -10,
    right: -10,
    bottom: -10,
    background: "linear-gradient(135deg, #9D4EDD 0%, #B478FF 100%)",
    borderRadius: 32,
    zIndex: -1,
    opacity: 0.25,
    filter: "blur(20px)",
    transform: "translateY(10px) scale(0.95)",
    transition: "transform 0.3s ease, opacity 0.3s ease",
  },
  "&:hover::before": {
    opacity: 0.3,
    transform: "translateY(12px) scale(0.96)",
  },
}))

const IconContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  margin: "0 auto 24px auto",
  width: 80,
  height: 80,
  borderRadius: "50%",
  backgroundColor: "rgba(157, 78, 221, 0.15)",
  border: "2px solid rgba(157, 78, 221, 0.3)",
  position: "relative",
  animation: `${pulse} 2s infinite ease-in-out`,
  "&::before": {
    content: '""',
    position: "absolute",
    top: -8,
    left: -8,
    right: -8,
    bottom: -8,
    borderRadius: "50%",
    border: "1px solid rgba(157, 78, 221, 0.2)",
    animation: `${pulse} 2s infinite ease-in-out 1s`,
  },
}))

const LoginTitle = styled(Typography)(({ theme }) => ({
  fontSize: "2rem",
  fontWeight: 700,
  marginBottom: theme.spacing(1),
  color: "#FFFFFF",
  textAlign: "center",
  position: "relative",
  textShadow: "0 1px 10px rgba(157, 78, 221, 0.5)",
}))

const StyledTextField = styled(TextField)(({ theme }) => ({
  marginBottom: theme.spacing(3),
  "& .MuiOutlinedInput-root": {
    borderRadius: 12,
    transition: "all 0.3s ease",
    backgroundColor: "rgba(30, 30, 30, 0.8)",
    "&:hover .MuiOutlinedInput-notchedOutline": {
      borderColor: "rgba(157, 78, 221, 0.4)",
    },
    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
      borderColor: "#9D4EDD",
      borderWidth: 2,
    },
    "& .MuiOutlinedInput-notchedOutline": {
      borderColor: "rgba(157, 78, 221, 0.4)",
      borderWidth: 1.5,
    },
    "& .MuiInputBase-input": {
      color: "#FFFFFF",
    },
  },
  "& .MuiInputLabel-root": {
    color: "#B478FF",
    "&.Mui-focused": {
      color: "#B478FF",
    },
  },
  "& .MuiInputAdornment-root": {
    color: "#B478FF",
  },
}))

const LoginButton = styled(Button)(({ theme }) => ({
  marginTop: theme.spacing(2),
  padding: theme.spacing(1.5),
  borderRadius: 12,
  fontSize: "1rem",
  fontWeight: 600,
  textTransform: "none",
  background: "linear-gradient(90deg, #9D4EDD, #B478FF)",
  boxShadow: "0 4px 15px rgba(157, 78, 221, 0.3)",
  position: "relative",
  overflow: "hidden",
  transition: "all 0.3s ease",
  "&::before": {
    content: '""',
    position: "absolute",
    top: -20,
    left: -20,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "rgba(255, 255, 255, 0.4)",
    zIndex: 0,
  },
  "&:hover": {
    background: "linear-gradient(90deg, #8033DD, #A468FF)",
    boxShadow: "0 6px 20px rgba(157, 78, 221, 0.4)",
    transform: "translateY(-2px)",
  },
  "&:active": {
    transform: "translateY(0)",
    boxShadow: "0 4px 12px rgba(157, 78, 221, 0.3)",
  },
  "&.Mui-disabled": {
    background: "#444444",
    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
  },
}))

const ForgotPasswordLink = styled(Typography)(({ theme }) => ({
  marginTop: theme.spacing(2),
  textAlign: "center",
  color: "#B478FF",
  fontSize: "0.875rem",
  fontWeight: 500,
  cursor: "pointer",
  transition: "color 0.2s ease",
  "&:hover": {
    color: "#9D4EDD",
    textDecoration: "underline",
  },
}))

const FooterText = styled(Typography)(({ theme }) => ({
  marginTop: theme.spacing(4),
  fontSize: "1.75rem",
  fontWeight: "bold",
  color: "#9D4EDD",
  letterSpacing: 1,
  textAlign: "center",
  textShadow: "0 1px 10px rgba(157, 78, 221, 0.5)",
}))

const VersionText = styled(Typography)(({ theme }) => ({
  fontSize: "0.75rem",
  color: "#BBBBBB",
  marginTop: theme.spacing(0.5),
  textAlign: "center",
}))

const Login = () => {
  const { login, user } = useContext(AuthContext)
  const navigate = useNavigate()
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [isFormValid, setIsFormValid] = useState(false)

  // Redirect if already logged in
  useEffect(() => {
    if (user) {
      if (user.role === "ROLE_ADMINISTRADOR") {
        navigate("/admin/dashboard")
      } else if (user.role === "ROLE_RESPONSABLE") {
        navigate("/responsable/bienes")
      } else if (user.role === "ROLE_BECARIO") {
        navigate("/becario/bienes")
      }
    }
  }, [user, navigate])

  useEffect(() => {
    // Validate form whenever username or password changes
    setIsFormValid(username.length > 0 && password.length > 0)
  }, [username, password])

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!isFormValid) return

    setError("")
    setIsLoading(true)

    try {
      const success = await login(username, password)

      if (success) {
        const role = localStorage.getItem("role")
        if (role === "ROLE_ADMINISTRADOR") {
          navigate("/admin/dashboard")
        } else if (role === "ROLE_RESPONSABLE") {
          navigate("/responsable/bienes")
        } else if (role === "ROLE_BECARIO") {
          navigate("/becario/bienes")
        }
      } else {
        setError("Credenciales incorrectas. Por favor, inténtelo de nuevo.")
      }
    } catch (err) {
      setError("Error al iniciar sesión. Por favor, inténtelo más tarde.")
    } finally {
      setIsLoading(false)
    }
  }

  const handleTogglePassword = () => {
    setShowPassword(!showPassword)
  }

  return (
    <LoginContainer>
      <LoginCard elevation={0}>
        {/* Replaced image with animated icon */}
        <IconContainer>
          <LockOpen sx={{ fontSize: 40, color: "#B478FF" }} />
        </IconContainer>

        <LoginTitle variant="h4">SIGVIB</LoginTitle>

        <Typography
          variant="subtitle1"
          sx={{
            textAlign: "center",
            mb: 4,
            color: "#BBBBBB",
            fontWeight: 500,
          }}
        >
          Iniciar sesión en el sistema
        </Typography>

        {error && (
          <Slide direction="down" in={!!error} mountOnEnter unmountOnExit>
            <Alert
              severity="error"
              sx={{
                mb: 3,
                borderRadius: 12,
                backgroundColor: "rgba(255, 82, 82, 0.1)",
                color: "#FF5252",
                border: "1px solid rgba(255, 82, 82, 0.3)",
                "& .MuiAlert-icon": {
                  color: "#FF5252",
                },
              }}
              onClose={() => setError("")}
            >
              {error}
            </Alert>
          </Slide>
        )}

        <Box component="form" onSubmit={handleSubmit}>
          <StyledTextField
            name="username"
            label="Usuario"
            variant="outlined"
            fullWidth
            required
            value={username}
            onChange={(e) => {
              setUsername(e.target.value.trim().toLowerCase())
              setError("")
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Person />
                </InputAdornment>
              ),
            }}
          />

          <StyledTextField
            name="password"
            label="Contraseña"
            type={showPassword ? "text" : "password"}
            variant="outlined"
            fullWidth
            required
            value={password}
            onChange={(e) => {
              setPassword(e.target.value)
              setError("")
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Lock />
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleTogglePassword}
                    edge="end"
                    sx={{ color: "#B478FF" }}
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />

          <LoginButton type="submit" variant="contained" fullWidth disabled={!isFormValid || isLoading}>
            {isLoading ? <CircularProgress size={24} sx={{ color: "#FFFFFF" }} /> : "Iniciar sesión"}
          </LoginButton>

          <ForgotPasswordLink>¿Olvidaste tu contraseña?</ForgotPasswordLink>
        </Box>

        <FooterText>SIGVIB</FooterText>
        <VersionText>v1.0.2</VersionText>
      </LoginCard>
    </LoginContainer>
  )
}

export default Login

