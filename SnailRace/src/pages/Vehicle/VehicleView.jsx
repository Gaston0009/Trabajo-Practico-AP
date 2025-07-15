import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useParams, useNavigate } from 'react-router-dom';

const VehicleView= () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [vehicle, setVehicle] = useState(null);

  const fetchVehicle = async () => {
    try {
      const token = Cookies.get('token');
      const res = await axios.get(`http://localhost:3000/vehicles/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setVehicle(res.data);
    } catch (err) {
      console.error('Error al obtener vehículo:', err.message);
    }
  };

  useEffect(() => {
    fetchVehicle();
  }, [id]);

  if (!vehicle) return <p>Cargando datos del vehículo...</p>;

  return (
    <div className="vehicle-detail-container">
      <h1 className="vehicle-detail-title">Detalle del Vehículo</h1>

    {vehicle.imageUrl && (
        <img
          src={`http://localhost:3000${vehicle.imageUrl}`}
          alt={vehicle.model}
          className="vehicle-detail-image"
        />
      )}
      <div className="vehicle-detail-info">
        <p><strong>Modelo:</strong> {vehicle.model}</p>
        <p><strong>Categoría:</strong> {vehicle.category}</p>
        <p><strong>Tipo:</strong> {vehicle.type}</p>
        <p><strong>Año:</strong> {vehicle.year}</p>
        <p><strong>Combustible:</strong> {vehicle.fuel}</p>
        <p><strong>Motor:</strong> {vehicle.engine}</p>
        <p><strong>Precio:</strong> ${vehicle.price}</p>
        <p><strong>Etiquetas:</strong> {vehicle.tags?.join(', ')}</p>
        <p><strong>Marca:</strong> {vehicle.brand?.name || vehicle.brand}</p>
      </div>
      <button className="back-button" onClick={() => navigate('/vehicle')}>
        Volver a la lista
      </button>
    </div>
  );
};



export default VehicleView;
