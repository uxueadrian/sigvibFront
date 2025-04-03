"use client"

import { Outlet } from "react-router-dom"
import { Box, styled } from "@mui/material"
import Navbar from "./Navbar"
import Sidebar from "./Sidebar"
import { APP_BAR_HEIGHT, APP_BAR_HEIGHT_MOBILE } from "../constants/layout"
import { DRAWER_WIDTH } from "../constants/layout"
import { useTheme } from "@mui/material/styles"
import useMediaQuery from "@mui/material/useMediaQuery"

const MainContent = styled(Box)(({ theme }) => ({
  flexGrow: 1,
  padding: theme.spacing(3),
  marginTop: APP_BAR_HEIGHT,
  width: `calc(100% - ${DRAWER_WIDTH}px)`, // Adjust width instead of using margin
  minHeight: `calc(100vh - ${APP_BAR_HEIGHT}px)`,
  backgroundColor: "#f5f5f5",
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  [theme.breakpoints.down("md")]: {
    marginTop: APP_BAR_HEIGHT_MOBILE,
    minHeight: `calc(100vh - ${APP_BAR_HEIGHT_MOBILE}px)`,
    padding: theme.spacing(2),
    width: "100%", // Full width on mobile
  },
  overflow: "auto", // Allow scrolling if content is too large
}))

const Layout = () => {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down("md"))

  return (
    <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <Navbar />
      <Box sx={{ display: "flex", flex: 1 }}>
        <Sidebar />
        <MainContent>
          <Outlet />
        </MainContent>
      </Box>
    </Box>
  )
}

export default Layout

