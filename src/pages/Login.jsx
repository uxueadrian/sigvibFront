import React, { useContext, useState } from "react";
import { useAuth } from "../context/AuthContext";
import PersonIcon from '@mui/icons-material/Person';
import LockIcon from '@mui/icons-material/Lock';
import { useNavigate } from "react-router-dom";

import '../styles/login.css';
import '../styles/stilo.css';

const Login = () => {
    //const {login} = useContext(AuthContext);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const {login} = useAuth();
    const navigate = useNavigate();

    const decodeJwt = (token) => {
        try {
            const base64Url = token.split('.')[1];

            let base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
            switch (base64.length % 4) {
                case 2: base64 += '=='; break;
                case 3: base64 += '='; break;
            }
            const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));
            console.log("Payload JSON:", jsonPayload);
            return JSON.parse(jsonPayload);
            
        } catch (e) {
            console.error("Error decodificando token:", e);
            return null;
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (loading) return;
        
        setLoading(true);
        setError("");

        try{
            const response = await fetch("http://192.168.1.72:8080/auth/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    username: username, 
                    password: password
                }),
                credentials: 'include'
            });
    
            const data = await response.json();
            console.log("Respuesta completa del backend", data);

            if (response.ok) {

                if (!data.token || !data.role || !data.idUsuario) {
                    throw new Error("Datos de autenticación incompletos");
                }

                login({
                    token: data.token,
                    role: data.role,
                    username: username,
                    idUsuario: data.idUsuario
                }, navigate);

                switch(data.role) {
                    case "ROLE_ADMINISTRADOR": 
                        navigate("/dashboardAdmin");
                        break;
                    case "ROLE_BECARIO":
                        navigate("/bienesBecario");
                        break;
                    case "ROLE_RESPONSABLE":
                        navigate("/bienesResponsable");
                        break;
                    default: 
                        setError(`Rol no reconocido: ${role}`);
                }

            } else {
                setError(data.message || "Error en credenciales");
            }

        } catch(err) {
            console.error("Error en login:", err);
            setError("Error de conexion");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="login-container"> {/* Nuevo contenedor */}
            <div className="wrapper">
                <form onSubmit={handleSubmit}>
                    <h1>Bienvenido</h1>
                    
                    <div className="input-box">
                        <input 
                            type="text" 
                            placeholder="Usuario" 
                            value={username} 
                            onChange={(e) => setUsername(e.target.value)}  
                            required
                        />
                        <PersonIcon className="icon" />
                    </div>
    
                    <div className="input-box">
                        <input 
                            type="password" 
                            placeholder="Contraseña" 
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                        <LockIcon className="icon" />
                    </div>
    
                    <div className="remember-forgot">
                        <a href="#">Olvidaste tu contraseña?</a> 
                    </div>
    
                    <button type="submit" disabled={loading}>
                        {loading ? "Cargando..." : "Iniciar Sesión"}
                    </button>
                    
                    {error && <div className="error-message">{error}</div>}
                </form>     
            </div>
        </div>
    );

};

export default Login;

