"use client"

import { useContext, useState, useEffect } from "react"
import { Link, useNavigate, useLocation } from "react-router-dom"
import { AuthContext } from "../context/AuthContext"
import {
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Typography,
  Box,
  Button,
  IconButton,
  styled,
  useMediaQuery,
  useTheme,
  alpha,
  keyframes,
} from "@mui/material"
import ExitToAppIcon from "@mui/icons-material/ExitToApp"
import MenuIcon from "@mui/icons-material/Menu"
import CloseIcon from "@mui/icons-material/Close"
import { APP_BAR_HEIGHT, APP_BAR_HEIGHT_MOBILE, DRAWER_WIDTH } from "../constants/layout"

// Animations
const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateX(-20px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
`

const pulse = keyframes`
  0% {
    box-shadow: 0 0 0 0 rgba(157, 78, 221, 0.4);
  }
  70% {
    box-shadow: 0 0 0 10px rgba(157, 78, 221, 0);
  }
  100% {
    box-shadow: 0 0 0 0 rgba(157, 78, 221, 0);
  }
`

const MenuButton = styled(IconButton)(({ theme, open }) => {
  const isMobile = useMediaQuery(theme.breakpoints.down("md"))

  return {
    position: "fixed",
    top: isMobile ? theme.spacing(1.5) : theme.spacing(2),
    left: open ? (isMobile ? "auto" : `${DRAWER_WIDTH - 40}px`) : theme.spacing(2),
    right: open && isMobile ? theme.spacing(2) : "auto",
    color: "white",
    zIndex: theme.zIndex.modal + 1,
    backgroundColor: "#9D4EDD",
    transition: theme.transitions.create(["left", "right", "background-color", "transform", "box-shadow"], {
      easing: theme.transitions.easing.easeInOut,
      duration: theme.transitions.duration.standard,
    }),
    "&:hover": {
      backgroundColor: "#B478FF",
      transform: "scale(1.05)",
    },
    width: 40,
    height: 40,
    borderRadius: 12,
    boxShadow: "0 4px 10px rgba(157, 78, 221, 0.3)",
    animation: open ? "none" : `${pulse} 2s infinite`,
  }
})

const CustomDrawer = styled(Drawer)(({ theme, open }) => ({
  width: open ? DRAWER_WIDTH : 0,
  flexShrink: 0,
  "& .MuiDrawer-paper": {
    width: DRAWER_WIDTH,
    backgroundColor: "#1E1E1E",
    backgroundImage: "linear-gradient(135deg, #1E1E1E 0%, #2D2D2D 100%)",
    color: "white",
    borderRight: "none",
    borderRadius: 0,
    boxSizing: "border-box",
    position: "fixed",
    height: `calc(100vh - ${APP_BAR_HEIGHT}px)`,
    top: APP_BAR_HEIGHT,
    transition: theme.transitions.create(["width", "box-shadow"], {
      easing: theme.transitions.easing.easeInOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    [theme.breakpoints.down("md")]: {
      height: `calc(100vh - ${APP_BAR_HEIGHT_MOBILE}px)`,
      top: APP_BAR_HEIGHT_MOBILE,
      zIndex: theme.zIndex.drawer,
    },
    overflowX: "hidden",
    boxShadow: open ? "4px 0 20px rgba(0, 0, 0, 0.5)" : "none",
    "&:before": {
      content: '""',
      position: "absolute",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundImage:
        "radial-gradient(circle at 30% 40%, rgba(157, 78, 221, 0.08) 0%, rgba(157, 78, 221, 0) 70%), radial-gradient(circle at 70% 60%, rgba(157, 78, 221, 0.08) 0%, rgba(157, 78, 221, 0) 70%)",
      pointerEvents: "none",
    },
  },
}))

const StyledListItemButton = styled(ListItemButton)(({ theme }) => ({
  padding: theme.spacing(1.5, 3),
  borderRadius: "0 24px 24px 0",
  marginRight: theme.spacing(2),
  marginLeft: theme.spacing(0.5),
  marginBottom: theme.spacing(0.5),
  transition: "all 0.3s ease",
  position: "relative",
  overflow: "hidden",
  "&:hover": {
    backgroundColor: alpha("#9D4EDD", 0.15),
    transform: "translateX(4px)",
  },
  "&.Mui-selected": {
    backgroundColor: alpha("#9D4EDD", 0.2),
    "&:before": {
      content: '""',
      position: "absolute",
      left: 0,
      top: "50%",
      transform: "translateY(-50%)",
      height: "60%",
      width: 4,
      backgroundColor: "#B478FF",
      borderRadius: "0 4px 4px 0",
      boxShadow: "0 0 10px rgba(157, 78, 221, 0.5)",
    },
    "&:after": {
      content: '""',
      position: "absolute",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: "linear-gradient(90deg, rgba(157, 78, 221, 0.1) 0%, rgba(157, 78, 221, 0) 100%)",
      pointerEvents: "none",
    },
  },
  "&.Mui-selected:hover": {
    backgroundColor: alpha("#9D4EDD", 0.25),
  },
  "& .MuiListItemText-primary": {
    transition: "transform 0.2s ease",
  },
  "&:hover .MuiListItemText-primary": {
    transform: "translateX(4px)",
  },
  animation: `${fadeIn} 0.5s ease forwards`,
  animationDelay: (props) => `${props.index * 0.05}s`,
  opacity: 0,
}))

const LogoutButton = styled(Button)(({ theme }) => ({
  color: "white",
  justifyContent: "flex-start",
  padding: theme.spacing(1.5, 3),
  borderRadius: theme.spacing(1.5),
  transition: "all 0.3s ease",
  backgroundColor: alpha("#9D4EDD", 0.15),
  position: "relative",
  overflow: "hidden",
  "&:hover": {
    backgroundColor: alpha("#9D4EDD", 0.25),
    transform: "translateY(-2px)",
    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.2)",
  },
  "&:before": {
    content: '""',
    position: "absolute",
    top: -20,
    left: -20,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    zIndex: 0,
  },
  "&:active": {
    transform: "translateY(0)",
    boxShadow: "0 2px 8px rgba(0, 0, 0, 0.2)",
  },
}))

const MenuHeader = styled(Box)(({ theme }) => ({
  textAlign: "center",
  padding: theme.spacing(3),
  background: "rgba(0, 0, 0, 0.2)",
  backdropFilter: "blur(5px)",
  borderBottom: "1px solid rgba(157, 78, 221, 0.2)",
  position: "relative",
  overflow: "hidden",
  "&:before": {
    content: '""',
    position: "absolute",
    bottom: 0,
    left: "50%",
    transform: "translateX(-50%)",
    width: 60,
    height: 3,
    background: "linear-gradient(90deg, rgba(157, 78, 221, 0) 0%, #9D4EDD 50%, rgba(157, 78, 221, 0) 100%)",
    borderRadius: 2,
  },
}))

const FooterBox = styled(Box)(({ theme }) => ({
  padding: theme.spacing(3),
  marginTop: "auto",
  background: "rgba(0, 0, 0, 0.2)",
  borderTop: "1px solid rgba(157, 78, 221, 0.2)",
  position: "relative",
  "&:before": {
    content: '""',
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: 1,
    background:
      "linear-gradient(90deg, rgba(157, 78, 221, 0) 0%, rgba(157, 78, 221, 0.3) 50%, rgba(157, 78, 221, 0) 100%)",
  },
}))

const Sidebar = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const { user, logout } = useContext(AuthContext)
  const [open, setOpen] = useState(true)
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down("md"))

  // Close sidebar on mobile when route changes
  useEffect(() => {
    if (isMobile) {
      setOpen(false)
    }
  }, [location.pathname, isMobile])

  const handleLogout = () => {
    logout()
    navigate("/login")
  }

  const menuItems = {
    ROLE_ADMINISTRADOR: [
      { text: "Dashboard", path: "/admin/dashboard" },
      { text: "Usuarios", path: "/admin/usuarios" },
      { text: "Lugares", path: "/admin/lugares" },
      { text: "Áreas", path: "/admin/areas" },
      { text: "Categorías", path: "/admin/categorias" },
      { text: "Bienes", path: "/admin/bienes" },
      { text: "Bajas", path: "/admin/bajas" },
    ],
    ROLE_RESPONSABLE: [
      { text: "Mis Bienes", path: "/responsable/bienes" },
      { text: "Solicitar", path: "/responsable/asignar" },
      { text: "Bienes a Cargo", path: "/responsable/cargo" },
    ],
    ROLE_BECARIO: [
      { text: "Bienes Becario", path: "/becario/bienes" },
      { text: "Solicitar", path: "/becario/asignar" },
    ],
  }

  const userRole = user?.role || "ROLE_ADMINISTRADOR" // Fallback for development

  return (
    <>
      <MenuButton open={open} onClick={() => setOpen(!open)} aria-label="toggle sidebar">
        {open ? <CloseIcon /> : <MenuIcon />}
      </MenuButton>

      <CustomDrawer
        variant={isMobile ? "temporary" : "persistent"}
        open={open}
        onClose={() => setOpen(false)}
        ModalProps={{
          keepMounted: true,
        }}
      >
        <Box
          sx={{
            overflow: "hidden",
            display: "flex",
            flexDirection: "column",
            height: "100%",
            animation: `${fadeIn} 0.5s ease forwards`,
          }}
        >
          <MenuHeader>
            <Typography
              variant="h5"
              fontWeight="bold"
              letterSpacing={1.2}
              sx={{
                color: "#B478FF",
                textShadow: "0 2px 10px rgba(157, 78, 221, 0.3)",
              }}
            >
              SIGVIB
            </Typography>
            <Typography
              variant="subtitle2"
              sx={{
                color: "#A0A0A0",
                mt: 0.5,
              }}
            >
              Sistema de Gestión
            </Typography>
          </MenuHeader>

          <List
            sx={{
              flexGrow: 1,
              overflowY: "auto",
              mt: 1,
              px: 1,
              "&::-webkit-scrollbar": {
                width: "6px",
              },
              "&::-webkit-scrollbar-thumb": {
                backgroundColor: "rgba(157, 78, 221, 0.3)",
                borderRadius: "10px",
              },
              "&::-webkit-scrollbar-track": {
                backgroundColor: "transparent",
              },
            }}
          >
            {(menuItems[userRole] || []).map(({ text, path }, index) => (
              <ListItem key={text} disablePadding>
                <StyledListItemButton component={Link} to={path} selected={location.pathname === path} index={index}>
                  <ListItemText
                    primary={text}
                    primaryTypographyProps={{
                      fontWeight: 500,
                      letterSpacing: 0.5,
                    }}
                  />
                </StyledListItemButton>
              </ListItem>
            ))}
          </List>

          <FooterBox>
            <LogoutButton fullWidth onClick={handleLogout} startIcon={<ExitToAppIcon />}>
              Cerrar sesión
            </LogoutButton>
            <Typography
              variant="caption"
              sx={{
                display: "block",
                textAlign: "center",
                mt: 2,
                color: "rgba(255,255,255,0.5)",
              }}
            >
              v1.0.2
            </Typography>
          </FooterBox>
        </Box>
      </CustomDrawer>
    </>
  )
}

export default Sidebar

