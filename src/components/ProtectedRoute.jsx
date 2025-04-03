"use client"

import { useContext } from "react"
import { Navigate, Outlet } from "react-router-dom"
import { AuthContext } from "../context/AuthContext"
import { CircularProgress, Box } from "@mui/material"

const ProtectedRoute = ({ roleRequired }) => {
  const { user, loading } = useContext(AuthContext)

  // Show loading indicator while checking authentication
  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          background: "linear-gradient(135deg, #121212 0%, #1E1E1E 100%)",
        }}
      >
        <CircularProgress sx={{ color: "#9D4EDD" }} />
      </Box>
    )
  }

  // If no user or wrong role, redirect to login
  if (!user || (roleRequired && user.role !== roleRequired)) {
    return <Navigate to="/login" replace />
  }

  // If user exists and has correct role, render the children
  return <Outlet />
}

export default ProtectedRoute

