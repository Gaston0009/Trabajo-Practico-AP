import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext.jsx'
import '../../styles/Vehicle.scss';

const Vehicle = () => {
  const [vehicles, setVehicles] = useState([]);
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const [searchTerm, setSearchTerm] = useState('');
  const [precioMax, setPrecioMax] = useState('');
  const [notification, setNotification] = useState('');
  const [confirmingId, setConfirmingId] = useState(null);


  const fetchVehicles = async () => {
    try {
      const token = Cookies.get('token');
      const res = await axios.get('https://trabajo-practico-ap-3.onrender.com/vehicles', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setVehicles(res.data);
    } catch (err) {
      console.error('Error al obtener vehículos:', err.message);
    }
  };

  useEffect(() => {
    fetchVehicles();
  }, []);



  const handleDeleteClick = (vehicleId) => {
  if (confirmingId === vehicleId) {
    deleteVehicle(vehicleId);
    setConfirmingId(null);
  } else {
    setConfirmingId(vehicleId);
    setTimeout(() => setConfirmingId(null), 3000);
  }
};

const deleteVehicle = async (id) => {
  try {
    const token = Cookies.get('token');
    await axios.delete(`https://trabajo-practico-ap-3.onrender.com/vehicles/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    setVehicles(prev => prev.filter(v => v._id !== id));
    setNotification('Vehículo eliminado correctamente');
    setTimeout(() => setNotification(''), 3000);
  } catch (err) {
    console.error('Error al eliminar vehículo:', err);
    setNotification('Error al eliminar el vehículo');
    setTimeout(() => setNotification(''), 3000);
  }
};


  const filteredVehicles = vehicles.filter((v) => {
    const matchSearch = v.model.toLowerCase().startsWith(searchTerm.toLowerCase());
    const matchPrecio = precioMax ? v.price <= parseFloat(precioMax) : true;
    return matchSearch && matchPrecio;

  });


  const handleLike = async (vehicleId) => {
    try {
      const token = Cookies.get('token');
      await axios.post(`https://trabajo-practico-ap-3.onrender.com/vehicles/${vehicleId}/like`, null, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchVehicles();
    } catch (err) {
      console.error('Error al dar like:', err);
    }
  };

  const handleDislike = async (vehicleId) => {
    try {
      const token = Cookies.get('token');
      await axios.post(`https://trabajo-practico-ap-3.onrender.com/vehicles/${vehicleId}/dislike`, null, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchVehicles();
    } catch (err) {
      console.error('Error al dar dislike:', err);
    }
  };

return (
  <div className="vehicle-page">
    <h1 className="vehicle-title">Lista de Vehículos</h1>

    {notification && (
      <div className="notification">
        {notification}
      </div>
    )}

    {user?.role === 'admin' && (
      <button className="create-button" onClick={() => navigate('/VehicleForm')}>
        Crear nuevo vehículo
      </button>
    )}

    <div className="filters">
      <input
        type="text"
        placeholder="Buscar por modelo"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <input
        type="number"
        placeholder="Precio máximo"
        value={precioMax}
        onChange={(e) => setPrecioMax(e.target.value)}
      />
    </div>

    <div className="vehicle-grid">
      {filteredVehicles.map((v) => (
        <div className="vehicle-card" key={v._id}>
          <h2 className="vehicle-model">{v.model}</h2>
          <img
            className="vehicle-image"
            src={`https://trabajo-practico-ap-3.onrender.com${v.imageUrl}`}
            alt={v.model}
          />
          <div className="vehicle-info">
            <p><strong>Tipo:</strong> {v.type}</p>
            <p><strong>Precio:</strong> ${v.price}</p>
          </div>

          <div className="vehicle-likes">
            <button onClick={() => handleLike(v._id)} style={{ color: user && v.likes?.includes(user.id) ? 'green' : 'black' }}>
              👍 {v.likes?.length || 0}
            </button>
            <button onClick={() => handleDislike(v._id)} style={{ color: user && v.dislikes?.includes(user.id) ? 'red' : 'black' }}>
              👎 {v.dislikes?.length || 0}
            </button>
          </div>

          <div className="vehicle-buttons">
            <button onClick={() => navigate(`/vehicle/${v._id}`)}>Ver Detalles</button>
            {user?.role === 'admin' && (
              <>
                <button onClick={() => navigate(`/vehicle/edit/${v._id}`)}>Editar</button>
                <button onClick={() => handleDeleteClick(v._id)}>
                  {confirmingId === v._id ? '¿Seguro?' : 'Eliminar'}
                </button>
              </>
            )}
          </div>
        </div>
      ))}
    </div>
  </div>
);
};

export default Vehicle
