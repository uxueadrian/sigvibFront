"use client"

import { useState, useContext } from "react"
import { useLocation } from "react-router-dom"
import { AuthContext } from "../context/AuthContext"
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  styled,
  useMediaQuery,
  useTheme,
  IconButton,
  Menu,
  MenuItem,
  Avatar,
  alpha,
  keyframes,
} from "@mui/material"
import { APP_BAR_HEIGHT, APP_BAR_HEIGHT_MOBILE } from "../constants/layout"
import AccountCircleIcon from "@mui/icons-material/AccountCircle"
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown"
// Import the logo
import logo1 from "./logo1.png"

// Animations
const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`

const shimmer = keyframes`
  0% {
    background-position: -200% 0;
  }
  100% {
    background-position: 200% 0;
  }
`

const CustomAppBar = styled(AppBar)(({ theme }) => ({
  zIndex: theme.zIndex.drawer + 1,
  backgroundColor: "#1E1E1E",
  backgroundImage: "linear-gradient(90deg, #1E1E1E 0%, #2D2D2D 100%)",
  width: "100%",
  boxShadow: "0 4px 20px rgba(0, 0, 0, 0.5)",
  borderBottom: "1px solid rgba(157, 78, 221, 0.2)",
  position: "fixed",
  top: 0,
  left: 0,
  right: 0,
  height: APP_BAR_HEIGHT,
  [theme.breakpoints.down("sm")]: {
    height: APP_BAR_HEIGHT_MOBILE,
  },
  "&:before": {
    content: '""',
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: 3,
    background: "linear-gradient(90deg, #7033FF 0%, #9D4EDD 50%, #B478FF 100%)",
  },
  animation: `${fadeIn} 0.5s ease forwards`,
}))

const CustomToolbar = styled(Toolbar)(({ theme }) => ({
  minHeight: APP_BAR_HEIGHT,
  padding: theme.spacing(0, 3),
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  [theme.breakpoints.down("sm")]: {
    minHeight: APP_BAR_HEIGHT_MOBILE,
    padding: theme.spacing(0, 2),
  },
}))

const NavbarTitle = styled(Typography)(({ theme }) => ({
  fontWeight: 700,
  letterSpacing: "1.5px",
  color: "#B478FF",
  textAlign: "center",
  fontSize: "1.5rem",
  textShadow: "0 2px 10px rgba(157, 78, 221, 0.3)",
  position: "relative",
  "&:after": {
    content: '""',
    position: "absolute",
    bottom: -5,
    left: "50%",
    transform: "translateX(-50%)",
    width: "30%",
    height: 2,
    background: "linear-gradient(90deg, rgba(157, 78, 221, 0) 0%, #9D4EDD 50%, rgba(157, 78, 221, 0) 100%)",
    borderRadius: 2,
  },
  [theme.breakpoints.up("md")]: {
    fontSize: "1.75rem",
  },
}))

// Updated logo container with more elegant styling for navbar
const TitleContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  gap: theme.spacing(2),
  [theme.breakpoints.down("sm")]: {
    flexDirection: "column",
    gap: theme.spacing(0.5),
  },
}))

const LogoContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  width: 36,
  height: 36,
  borderRadius: "50%",
  backgroundColor: "rgba(157, 78, 221, 0.08)",
  border: "1px solid rgba(157, 78, 221, 0.2)",
  boxShadow: "0 2px 8px rgba(157, 78, 221, 0.15)",
  [theme.breakpoints.down("sm")]: {
    width: 30,
    height: 30,
    marginBottom: theme.spacing(0.5),
  },
}))

// Updated logo styling
const Logo = styled("img")({
  width: "75%",
  height: "75%",
  objectFit: "contain",
  filter: "drop-shadow(0 1px 2px rgba(0, 0, 0, 0.2))",
})

const TextContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
}))

const UserInfo = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  gap: theme.spacing(1),
  padding: theme.spacing(0.5, 1.5),
  borderRadius: theme.spacing(3),
  cursor: "pointer",
  transition: "all 0.3s ease",
  backgroundColor: alpha("#9D4EDD", 0.1),
  "&:hover": {
    backgroundColor: alpha("#9D4EDD", 0.15),
    transform: "translateY(-2px)",
  },
  [theme.breakpoints.down("sm")]: {
    padding: theme.spacing(0.5, 1),
  },
}))

const UserAvatar = styled(Avatar)(({ theme }) => ({
  backgroundColor: "#9D4EDD",
  width: 36,
  height: 36,
  boxShadow: "0 2px 8px rgba(157, 78, 221, 0.3)",
  border: "2px solid rgba(255, 255, 255, 0.2)",
  [theme.breakpoints.down("sm")]: {
    width: 32,
    height: 32,
  },
}))

const NotificationButton = styled(IconButton)(({ theme }) => ({
  color: "white",
  backgroundColor: alpha("#9D4EDD", 0.1),
  marginRight: theme.spacing(2),
  transition: "all 0.3s ease",
  "&:hover": {
    backgroundColor: alpha("#9D4EDD", 0.2),
    transform: "translateY(-2px)",
  },
  "&:active": {
    transform: "translateY(0)",
  },
}))

const GlowingDot = styled(Box)(({ theme }) => ({
  position: "absolute",
  top: 8,
  right: 8,
  width: 8,
  height: 8,
  borderRadius: "50%",
  backgroundColor: "#B478FF",
  boxShadow: "0 0 5px #B478FF, 0 0 10px #B478FF",
  zIndex: 1,
}))

const ShimmerText = styled(Typography)(({ theme }) => ({
  background: "linear-gradient(90deg, #7033FF 0%, #B478FF 50%, #7033FF 100%)",
  backgroundSize: "200% 100%",
  color: "transparent",
  WebkitBackgroundClip: "text",
  backgroundClip: "text",
  animation: `${shimmer} 3s linear infinite`,
  fontWeight: 600,
  [theme.breakpoints.down("sm")]: {
    display: "none",
  },
}))

const Navbar = () => {
  const { user } = useContext(AuthContext)
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down("md"))
  const location = useLocation()
  const [anchorEl, setAnchorEl] = useState(null)

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleMenuClose = () => {
    setAnchorEl(null)
  }

  // Get current page title based on route
  const getPageTitle = () => {
    const path = location.pathname

    if (path.includes("/admin/dashboard")) return "Resumen"
    if (path.includes("/admin/usuarios")) return "Gestión de Usuarios"
    if (path.includes("/admin/lugares")) return "Gestión de Lugares"
    if (path.includes("/admin/areas")) return "Gestión de Áreas"
    if (path.includes("/admin/categorias")) return "Gestión de Categorías"
    if (path.includes("/admin/bienes")) return "Gestión de Bienes"
    if (path.includes("/admin/bajas")) return "Gestión de Bajas"

    if (path.includes("/responsable/bienes")) return "Mis Bienes"
    if (path.includes("/responsable/asignar")) return "Solicitar Bienes"
    if (path.includes("/responsable/cargo")) return "Bienes a Cargo"

    if (path.includes("/becario/bienes")) return "Bienes Becario"
    if (path.includes("/becario/asignar")) return "Solicitar Bienes"

    return "SIGVIB"
  }

  return (
    <CustomAppBar>
      <CustomToolbar>
        {/* Space for sidebar toggle button */}
        <Box sx={{ width: { xs: "48px", md: "48px" } }} />

        {/* Title with logo - redesigned layout */}
        <TitleContainer>
          <LogoContainer>
            <Logo src={logo1} alt="SIGVIB Logo" />
          </LogoContainer>

          <TextContainer>
            <NavbarTitle variant="h6">SIGVIB</NavbarTitle>
            {!isMobile && <ShimmerText variant="caption">Sistema de Gestión y Visualización de Bienes</ShimmerText>}
          </TextContainer>
        </TitleContainer>

        {/* Right side controls */}
        <Box sx={{ display: "flex", alignItems: "center" }}>
        

          <UserInfo onClick={handleMenuOpen}>
            <UserAvatar>
              <AccountCircleIcon />
            </UserAvatar>
            {!isMobile && (
              <>
                <Box sx={{ textAlign: "left" }}>
                  <Typography variant="body2" sx={{ color: "white", fontWeight: 500 }}>
                    {user?.username || "Usuario"}
                  </Typography>
                  <Typography variant="caption" sx={{ color: "rgba(255,255,255,0.7)" }}>
                    {user?.role === "ROLE_ADMINISTRADOR"
                      ? "Administrador"
                      : user?.role === "ROLE_RESPONSABLE"
                        ? "Responsable"
                        : "Becario"}
                  </Typography>
                </Box>
                <KeyboardArrowDownIcon sx={{ color: "rgba(255,255,255,0.7)" }} />
              </>
            )}
          </UserInfo>

          {/* User menu */}
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
            PaperProps={{
              sx: {
                mt: 1.5,
                backgroundColor: "#2D2D2D",
                color: "white",
                boxShadow: "0 4px 20px rgba(0, 0, 0, 0.5)",
                border: "1px solid rgba(157, 78, 221, 0.2)",
                minWidth: 180,
              },
            }}
            transformOrigin={{ horizontal: "right", vertical: "top" }}
            anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
          >
            <MenuItem
              onClick={() => {
                handleMenuClose()
                localStorage.removeItem("token")
                localStorage.removeItem("role")
                window.location.href = "/login"
              }}
              sx={{ "&:hover": { backgroundColor: alpha("#9D4EDD", 0.1) } }}
            >
              Cerrar Sesión
            </MenuItem>
          </Menu>
        </Box>
      </CustomToolbar>
    </CustomAppBar>
  )
}

export default Navbar

