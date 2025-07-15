import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useNavigate, useParams } from 'react-router-dom';


const BrandView = () => {
  const { id } = useParams();
  const [brand, setBrand] = useState(null);
  const navigate = useNavigate();

  

  const fetchBrand = async () => {
    try {
      const token = Cookies.get('token');
      const res = await axios.get(`http://localhost:3000/brands/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setBrand(res.data);
    }catch (err) {
      console.error('Error al obtener las marcas: ', err.message);
    }
  };

  useEffect(() => {
    fetchBrand();
  }, [id]);


  if(!brand) return <p>Cargando datos de la marca</p>

  return (
    <div className="brand-detail-container">
      <h1 className="brand-title">Detalle de la Marcas</h1>
      {brand.imageUrl && (
        <img
          src={`http://localhost:3000${brand.imageUrl}`}
          alt={brand.model}
          className="brand-detail-image"
        />
      )}
    <div className="brand-info">
    <p><strong>Nombre</strong> {brand.name}</p>
    <p><strong>Nacionalidad:</strong> {brand.country}</p>
    </div>
    <button className="back-button" onClick={() => navigate('/brand')}>
        Volver a la lista
    </button>
    </div>
  )
}

export default BrandView