import React, { useContext } from 'react';
import { styled, useTheme } from '@mui/material/styles';
import { AuthContext } from '../context/AuthContext';

const LogoutButton = () => {
  const { logout } = useContext(AuthContext);
  return (
    <Button onClick={logout} >Cerrar Sesion</Button>
  );
};

export default LogoutButton;