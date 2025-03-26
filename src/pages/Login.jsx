import React, { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import '../styles/login.css';
import '../styles/stilo.css';
import PersonIcon from '@mui/icons-material/Person';
import LockIcon from '@mui/icons-material/Lock';
import { jwtDecode } from "jwt-decode";

const Login = () => {
    const {login} = useContext(AuthContext);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
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
                if (data.token) {
                    const decoded = decodeJwt(data.token);
                    const role = decoded?.role || decoded?.roles?.[0];

                    if (role) {
                        login({
                            token: data.token,
                            role: role
                        });

                        console.log("Rol obtenido:", role); 

                        switch(role) {
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
                        setError("El token no contiene información de rol");
                    }
                } else {
                    setError("La respuesta no incluye token");
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

    return(
        <div className="wrapper">
            <form onSubmit={handleSubmit}>
                <h1>Bienvenido</h1>
                    
                    <div className="input-box">
                        <input 
                          type="text" 
                          placeholder="Usuario" 
                          value={username} 
                          onChange={(e)=> setUsername(e.target.value)}  
                          required/>
                        <PersonIcon className="icon" />
                    </div>

                    <div className="input-box">
                        <input 
                          type="password" 
                          placeholder="Contraseña" 
                          value={password}
                          onChange={(e)=> setPassword(e.target.value)}
                          required/>
                        <LockIcon className="icon"/>
                    </div>

                    <div className="remember-forgot">
                        <label> </label>
                        <a href="">Olvidaste tu contraseña</a> 
                    </div>

                    <button type="submit" disabled={loading}>
                      {loading ? "Cargando..." : "Login"}
                    </button>
                    {error && <p style={{color: "red"}}> {error} </p>}
            
            </form>     
        </div>    
    );

};

export default Login;

