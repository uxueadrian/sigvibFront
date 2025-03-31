import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { LoginContainer, LoginCard, LoginTitle, LoginTextField, LoginButton, } from "../../styles/login";

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
    <LoginContainer>
      <LoginCard component="form" onSubmit={handleSubmit}>
        <LoginTitle variant="h4">Iniciar sesión</LoginTitle>
        <LoginTextField
          name="username"
          label="Usuario"
          variant="outlined"
          fullWidth
          required
        />
        <LoginTextField
          name="password"
          label="Contraseña"
          type="password"
          variant="outlined"
          fullWidth
          required
        />
        <LoginButton type="submit" variant="contained">
          Iniciar sesión
        </LoginButton>
      </LoginCard>
    </LoginContainer>
  );
};

export default Login;