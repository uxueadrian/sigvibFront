"use client"

import { createContext, useState, useEffect, useContext } from "react"


// Export the context directly so it can be imported by name
export const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [token, setToken] = useState(null)
  const [loading, setLoading] = useState(true)

  // Update the useEffect to include the name from localStorage
  useEffect(() => {
    const storedToken = localStorage.getItem("token")
    const storedRole = localStorage.getItem("role")
    const storedIdLugar = localStorage.getItem("idLugar")
    const storedIdUsuario = localStorage.getItem("idUsuario")
    const storedUsername = localStorage.getItem("username")
    const storedName = localStorage.getItem("name") // Add name from storage

    if (storedToken && storedRole) {
      setToken(storedToken)
      setUser({
        username: storedUsername || "usuario",
        role: storedRole,
        idLugar: storedIdLugar,
        idUsuario: storedIdUsuario,
        name: storedName, // Include name in user object
      })
    }

    // Set loading to false after checking authentication
    setLoading(false)
  }, [])

  // Update the login function to store the name
  const login = async (username, password) => {
    try {
      const response = await fetch("https://bienes-env.eba-hv5kxbpm.us-east-1.elasticbeanstalk.com/auth/login", {
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
      const name = data.name // Get name from response

      setUser({
        username,
        role: userRole,
        idLugar,
        idUsuario,
        name, // Include name in user state
      })
      setToken(jwtToken)

      // Store all user data in localStorage
      localStorage.setItem("token", jwtToken)
      localStorage.setItem("role", userRole)
      localStorage.setItem("idLugar", idLugar)
      localStorage.setItem("idUsuario", idUsuario)
      localStorage.setItem("username", username)
      localStorage.setItem("name", name) // Store name in localStorage

      return true
    } catch (error) {
      console.error(error.message)
      return false
    }
  }

  // Update the logout function to clear the name
  const logout = () => {
    setUser(null)
    setToken(null)

    // Clear all stored data
    localStorage.removeItem("token")
    localStorage.removeItem("role")
    localStorage.removeItem("idLugar")
    localStorage.removeItem("idUsuario")
    localStorage.removeItem("username")
    localStorage.removeItem("name") // Remove name from localStorage
  }

  const value = {
    user,
    token,
    loading,
    login,
    logout,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export const useAuth = () => {
  return useContext(AuthContext)
}

