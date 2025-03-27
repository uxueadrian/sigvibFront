import * as React from 'react';
import Button from '@mui/material/Button';

export default function ColorButtons({ isActive }) {
    const [isActive, setIsActive] = React.useState(false); // Estado inicial del usuario

  return (
    <>
      {isActive ? (
        <Button variant="contained" color="success">
          Success
        </Button>
      ) : (
        <Button variant="outlined" color="error">
          Inactivo
        </Button>
      )}
      
      {/* Botón para cambiar el estado */}
      <Button 
        variant="contained" 
        color="primary" 
        onClick={() => setIsActive(!isActive)}
      >
        Toggle Estado
      </Button>
    </>
  );
}
