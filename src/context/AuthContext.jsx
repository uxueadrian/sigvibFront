import React, { createContext, useState } from "react";
import { useFetch } from "../services/useFetch";

export const AuthContext = createContext();

export const AuthProvider = ({children}) => {
    const [user, setUser] = useState(() => {
        const token = localStorage.getItem("token");
        const role = localStorage.getItem("role");
        return token && role ? { token, role }: null;
    });

    const login = (userData) => {
        localStorage.setItem("token", userData.token);
        localStorage.setItem("role", userData.role);
        setUser({ token: userData.token, role: userData.role });
    }

    const logout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("role");
        setUser(null);
    }

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );

};

