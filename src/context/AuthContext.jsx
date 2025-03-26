import React, { createContext, useState, useContext } from "react";
import { Navigate, useNavigate } from "react-router-dom";

export const AuthContext = createContext();

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
      throw new Error("useAuth debe usarse dentro de un AuthProvider");
    }
    return context;
};

export const AuthProvider = ({children}) => {
    const [user, setUser] = useState(() => {
        const token = localStorage.getItem("token");
        const role = localStorage.getItem("role");

        const username = localStorage.getItem("username");
        const idUsuario = localStorage.getItem("idUsuario");

        return token && role ? { token, role, username, idUsuario }: null;
    });

    const login = (userData, navigate) => {
        localStorage.setItem("token", userData.token);
        localStorage.setItem("role", userData.role);
        localStorage.setItem("username", userData.username);
        localStorage.setItem("idUsuario", userData.idUsuario);

        setUser({ 
            token: userData.token, 
            role: userData.role,
            username: userData.username,
            idUsuario: userData.idUsuario
        });
        if (navigate) navigate('/'); 
    }

    const logout = (navigate) => {
        localStorage.removeItem("token");
        localStorage.removeItem("role");
        localStorage.removeItem("username");
        localStorage.removeItem("idUsuario");
        setUser(null);
        if (navigate) navigate('/login');
    }

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );

};

