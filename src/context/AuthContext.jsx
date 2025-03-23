import React, { createContext, useState } from "react";
import { useFetch } from "../services/useFetch";

export const AuthContext = createContext();

export const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null);

    const login = (userData) => {
        setUser(userData);
        localStorage.setItem("token", userData.token);
        localStorage.setItem("role", userData.role);
    }

    const logout = () => {
        setUser(null);
        localStorage.setItem("token", userData.token);
        localStorage.setItem("role", userData.role);
    }

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );

};

