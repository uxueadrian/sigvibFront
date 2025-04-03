"use client"

import { createContext, useState, useEffect } from "react"

export const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [token, setToken] = useState(null)
  const [loading, setLoading] = useState(true) // Add loading state

  useEffect(() => {
    const storedToken = localStorage.getItem("token")
    const storedRole = localStorage.getItem("role")
    const storedIdLugar = localStorage.getItem("idLugar")
    const storedIdUsuario = localStorage.getItem("idUsuario")
    const storedUsername = localStorage.getItem("username") // Add username to storage

    if (storedToken && storedRole) {
      setToken(storedToken)
      setUser({
        username: storedUsername || "usuario",
        role: storedRole,
        idLugar: storedIdLugar,
        idUsuario: storedIdUsuario,
      })
    }

    // Set loading to false after checking authentication
    setLoading(false)
  }, [])

  const login = async (username, password) => {
    try {
      const response = await fetch("http://localhost:8080/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
        mode: "cors",
      })

      if (!response.ok) {
        return false
      }

      const data = await response.json()
      const jwtToken = data.token
      const userRole = data.role
      const idLugar = data.id_lugar
      const idUsuario = data.idUsuario

      setUser({ username, role: userRole, idLugar, idUsuario })
      setToken(jwtToken)

      // Store all user data in localStorage
      localStorage.setItem("token", jwtToken)
      localStorage.setItem("role", userRole)
      localStorage.setItem("idLugar", idLugar)
      localStorage.setItem("idUsuario", idUsuario)
      localStorage.setItem("username", username) // Store username too

      return true
    } catch (error) {
      console.error(error.message)
      return false
    }
  }

  const logout = () => {
    setUser(null)
    setToken(null)

    // Clear all stored data
    localStorage.removeItem("token")
    localStorage.removeItem("role")
    localStorage.removeItem("idLugar")
    localStorage.removeItem("idUsuario")
    localStorage.removeItem("username")
  }

  return <AuthContext.Provider value={{ user, token, login, logout, loading }}>{children}</AuthContext.Provider>
}

