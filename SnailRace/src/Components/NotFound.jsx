import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/NotFound.scss';

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="notfound-container">
      <h1>404 - Página no encontrada</h1>
      <p>Lo sentimos, la ruta que estás buscando no existe.</p>
      <button onClick={() => navigate('/')}>Volver al inicio</button>
    </div>
  );
};

export default NotFound;
