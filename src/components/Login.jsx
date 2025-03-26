import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

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
    <form onSubmit={handleSubmit}>
      <input type="text" name="username" placeholder="Usuario" />
      <input type="password" name="password" placeholder="Contraseña" />
      <button type="submit">Iniciar sesión</button>
    </form>
  );
};

// ✅ Asegúrate de exportarlo correctamente
export default Login;
