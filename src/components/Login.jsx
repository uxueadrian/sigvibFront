import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import "./Login.css"; // Archivo de estilos externo

const Login = () => {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const username = e.target.username.value;
    const password = e.target.password.value;

    const success = await login(username, password);
    if (success) {
      const role = localStorage.getItem("role");
      if (role === "ROLE_ADMINISTRADOR") {
        navigate("/admin/dashboard");
      } else if (role === "ROLE_RESPONSABLE") {
        navigate("/responsable/bienes");
      } else if (role === "ROLE_BECARIO") {
        navigate("/becario/bienes");
      }
    } else {
      alert("Credenciales incorrectas");
    }
  };

  return (
    <div className="login-container">
      <h2 className="login-title">Iniciar sesión</h2>
      <form className="login-form" onSubmit={handleSubmit}>
        <input type="text" name="username" placeholder="Usuario" className="login-input" />
        <input type="password" name="password" placeholder="Contraseña" className="login-input" />
        <button type="submit" className="login-button">Iniciar sesión</button>
      </form>
    </div>
  );
};

export default Login;
