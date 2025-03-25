import { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    const storedRole = localStorage.getItem("role");
  
    if (storedToken && storedRole) {
      setToken(storedToken);
      setUser({ username: "usuario", role: storedRole });
    }
  }, []);
  
  const login = async (username, password) => {
    try {
      const response = await fetch("http://192.168.0.37:8080/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
        mode: "cors",
      });

      if (!response.ok) {
        return false;
      }

      const data = await response.json();
      const jwtToken = data.token;
      const userRole = data.role; 

      setUser({ username, role: userRole });
      setToken(jwtToken);
      localStorage.setItem("token", jwtToken);
      localStorage.setItem("role", userRole);

      return true;
    } catch (error) {
      console.error(error.message);
      return false;
    }
  };

  return (
    <AuthContext.Provider value={{ user, token, login }}>
      {children}
    </AuthContext.Provider>
  );
};
