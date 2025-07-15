import React , { useEffect, useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom'

const EditProfile = () => {
  const [image, setImage] = useState(null);
  const navigate = useNavigate();
  const { register, handleSubmit, reset } = useForm();
    const [notification, setNotification] = useState('');

  useEffect(() => {
    const fetchUser = async () => {
      const token = Cookies.get('token');
      const res = await axios.get('http://localhost:3000/users/me', {
        headers: { Authorization: `Bearer ${token}` },
      });
      reset(res.data);
    };

    fetchUser();
  }, []);

  const onSubmit = async (data) => {
    const token = Cookies.get('token');
    const formData = new FormData();

    formData.append('name', data.name);
    formData.append('lastname', data.lastname);
    formData.append('email', data.email);
    formData.append('username', data.username);
    

    if (data.password) {
      formData.append('password', data.password);
    }

    if (image) {
      formData.append('image', image);
    }

    try {
      await axios.put('http://localhost:3000/users/me', formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });
      setNotification('Vehículo actualizado correctamente');
        setTimeout(() => {
          setNotification('');
      navigate('/me');
      }, 5000);
    } catch (err) {
      console.error('Error al actualizar perfil:', err);
      setNotification('Error al actualizar vehículo');
        setTimeout(() => setNotification(''), 3000);
    }
  };


  return (
    <div className="form-container">
      <h1>Editar Perfil</h1>

      {notification && (
      <div className="editnotification1">
        {notification}
      </div>
      )}
      
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="form-group">
          <label htmlFor="name">Nombre</label>
          <input id="name" type="text" placeholder="Nombre" {...register('name')} />
        </div>
        <div className="form-group">
          <label htmlFor="lastname">Apellido</label>
          <input id="lastname" type="text" placeholder="Apellido" {...register('lastname')} />
        </div>
        <div className="form-group">
          <label htmlFor="email">Correo electrónico</label>
          <input id="email" type="text" placeholder="Email" {...register('email')} />
        </div>
        <div className="form-group">
          <label htmlFor="username">Usuario</label>
          <input id="username" type="text" placeholder="Nombre de usuario" {...register('username')} />
        </div>
        <div className="form-group">
          <label htmlFor="password">Nueva contraseña (opcional)</label>
          <input id="password" type="password" placeholder="Nueva contraseña (opcional)" {...register('password')} />
        </div>
        <div className="form-group">
          <label htmlFor="image">Imagen</label>
          <input id="image" type="file" accept="image/*" onChange={(e) => setImage(e.target.files[0])} />
        </div>

        <button type="submit">Guardar cambios</button>
      </form>
    </div>
  )
};

export default EditProfile;