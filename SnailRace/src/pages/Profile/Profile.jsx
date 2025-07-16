import React, { useEffect, useState } from 'react';
import '../../styles/Profile.scss';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Cookies from 'js-cookie';

const Profile = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      const token = Cookies.get('token');
      try {
        const res = await axios.get('https://trabajo-practico-ap-3.onrender.com/users/me', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setUser(res.data);
      } catch (err) {
        console.error('Error al obtener el perfil:', err);
      }
    };

    fetchUser();
  }, []);

  if (!user) return <p>Cargando perfil...</p>;

    return (
        <div className="profile-container">
          <h1>Mi perfil</h1>
            <div className="profile-info">
              <p><strong>Nombre:</strong> {user.name} {user.lastname}</p>
              <p><strong>Email:</strong> {user.email}</p>
              <p><strong>Usuario:</strong> {user.username}</p>
                  {user.imageUrl ? (
                  <img
                      src={`https://trabajo-practico-ap-3.onrender.com${user.imageUrl}`}
                      alt="Foto de perfil"
                      className="profile-image"
                  />
                  ) : (
                  <p className="no-image">No tiene foto de perfil</p>
                  )}
              </div>
              <br />
            <button className="edit-button" onClick={() => navigate('/edit-profile')}>
              Editar
            </button>

        </div>
    );
};

export default Profile;
