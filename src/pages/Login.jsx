import React, { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import '../styles/index.css';
import '../styles/stilo.css';
import PersonIcon from '@mui/icons-material/Person';
import LockIcon from '@mui/icons-material/Lock';

const Login = () => {
    const {login} = useContext(AuthContext);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        try{
            const response = await fetch("http://192.168.1.72:8081/auth/login", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({username, password}),
            });
    
            const data = await response.json();

            if (data.token) {
                const {token, role} = data;
                login({username, role, token});

                if (role === "admin" ){
                    navigate("/dashboardAdmin");
                } else if (role === "becario") {
                    navigate("/bienesBecario");
                } else if (role === "responsable") {
                    navigate("/bienesResponsable");
                }
            } else {
              setError("Credenciales incorrectas");
            }
        } catch(err) {
            setError("Error al iniciar sesión");
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

