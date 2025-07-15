import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import '../../styles/Brand.scss';

const Brand = () => {

  const [brands, setBrands] = useState([]);
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const [notification, setNotification] = useState('');
  const [confirmingId, setConfirmingId] = useState(null);
  

  const fetchBrands = async () => {
    try {
      const token = Cookies.get('token');
      const res = await axios.get('http://localhost:3000/brands', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setBrands(res.data);
    }catch (err) {
      console.error('Error al obtener las marcas: ', err.message);
    }
  };

  useEffect(() => {
    fetchBrands();
  }, []);



  const handleDeleteClick = (BrandId) => {
    if (confirmingId === BrandId) {
      deleteBrand(BrandId);
      setConfirmingId(null);
    } else {
      setConfirmingId(BrandId);
      setTimeout(() => setConfirmingId(null), 3000);
    }
};

  const deleteBrand = async (id) => {
  try {
    const token = Cookies.get('token');
    await axios.delete(`http://localhost:3000/brands/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    setBrands(prev => prev.filter(b => b._id !== id));
    setNotification('Marca eliminada correctamente');
    setTimeout(() => setNotification(''), 3000);
  }catch (err) {
    console.error('Error al eliminar Marca:', err);
    setNotification('Error al eliminar la marca');
    setTimeout(() => setNotification(''), 3000);
  }
};

  return (

  <div className="brand-page">
      <h1 className="brand-title">Lista de Marcas</h1>

      {notification && (
      <div className="notification">
        {notification}
      </div>
    )}

      {user?.role === 'admin' && (
        <button className="create-button1" onClick={() => navigate('/BrandForm')}>
          Crear nueva marca
        </button>
      )}

      <div className="brand-grid">
        {brands.map((b) => (
          <div className="brand-card" key={b._id}>
            <h2 className="brand-name">{b.name}</h2>
            <img
              className="brand-image"
              src={`http://localhost:3000${b.imageUrl}`}
              alt={b.name}
            />
            <div className="brand-buttons">
              <button onClick={() => navigate(`/brand/${b._id}`)}>Ver Detalles</button>
              {user?.role === 'admin' && (
                <>
                  <button onClick={() => navigate(`/brand/edit/${b._id}`)}>Editar</button>
                  <button onClick={() => handleDeleteClick(b._id)}>
                      {confirmingId === b._id ? '¿Seguro?' : 'Eliminar'}
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

export default Brand