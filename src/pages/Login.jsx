import React, { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import '../styles/index.css';
import '../styles/stilo.css';
import PersonIcon from '@mui/icons-material/Person';
import LockIcon from '@mui/icons-material/Lock';

const Login = () => {
    const {login} = useContext(AuthContext);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
    
        if (username === "admin" && password === "admin123") {
          login({ role: "admin", name: "Administrador" }); 
        } else if (username === "becario" && password === "becario123") {
          login({ role: "becario", name: "Becario" }); 
        } else if (username === "responsable" && password === "responsable123") {
          login({ role: "responsable", name: "Responsable" }); 
        } else {
          alert("Credenciales incorrectas");
        }
    };

    return(
        <div className="wrapper">
            <form action={{}}>
                <h1>Bienvenido</h1>
                    
                    <div className="input-box">
                        <input type="text" placeholder="Usuario" required/>
                        <PersonIcon className="icon" />
                    </div>

                    <div className="input-box">
                        <input type="password" placeholder="Contraseña" required/>
                        <LockIcon className="icon"/>
                    </div>

                    <div className="remember-forgot">
                        <label> </label>
                        <a href="">Olvidaste tu contraseña</a> 
                    </div>

                    <button type="submit">Login</button>
                        
            </form>     
        </div>    
    );
}

export default Login;

