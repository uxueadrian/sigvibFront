import React from "react";
import '../styles/index.css'
import '../styles/stilo.css'
import { FaUser, FaLock } from "react-icons/fa";

const Login = () => {
    return(
        <>
            <div className="wrapper">
                <form action={{}}>
                    <h1>Bienvenido</h1>
                    
                        <div className="input-box">
                            <input type="text" placeholder="Usuario" required/>
                            <FaUser className="icon" />
                        </div>

                        <div className="input-box">
                            <input type="password" placeholder="Contraseña" required/>
                            <FaLock className="icon"/>
                        </div>

                        <div className="remember-forgot">
                            <label> </label>
                            <a href="">Olvidaste tu contraseña</a> 
                        </div>

                        <button type="submit">Login</button>
                        
                </form>     
            </div>    
        </>
    );
}

export default Login;