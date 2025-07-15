import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import '../styles/UsersAdmin.scss';

const AdminUsers = () => {
  const [users, setUsers] = useState([]);
  const [notification, setNotification] = useState('');
  const [confirmingId, setConfirmingId] = useState(null);

  useEffect(() => {
    const token = Cookies.get('token');
    axios.get('http://localhost:3000/users', {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then(res => setUsers(res.data))
    .catch(err => console.error('Error al obtener usuarios:', err));
  }, []);


  const handleDeleteClick = (user) => {
  if (user.role === 'admin') {
    setNotification('No se puede eliminar un administrador.');
    setTimeout(() => setNotification(''), 3000);
    return;
  }

  if (confirmingId === user._id) {
    deleteUser(user._id);
    setConfirmingId(null);
  } else {
    setConfirmingId(user._id);
    setTimeout(() => setConfirmingId(null), 3000); 
  }
};

const deleteUser = async (id) => {
  const token = Cookies.get('token');
  try {
    await axios.delete(`http://localhost:3000/users/${id}`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    setUsers(prev => prev.filter(u => u._id !== id));
    setNotification('Usuario eliminado');
    setTimeout(() => setNotification(''), 3000);
  } catch (err) {
    console.error('Error al eliminar usuario:', err);
    setNotification('Error al eliminar');
  }
};


return (
  <div className="admin-users-page">
    <h3 className='user-title'>Lista de Usuarios</h3>

    {notification && (
      <div className="notification">
        {notification}
      </div>
    )}
    <table className="user-table">
      <thead>
        <tr>
          <th>Imagen</th>
          <th>Nombre</th>
          <th>Apellido</th>
          <th>Email</th>
          <th>Username</th>
          <th>Rol</th>
          <th>Registrado</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        {users.map(u => (
          <tr key={u._id}>
            <td>
              {u.imageUrl ? (
                <img
                  src={`http://localhost:3000${u.imageUrl}`}
                  alt={u.username}
                  width="50"
                  height="50"
                />
              ) : (
                'Sin foto'
              )}
            </td>
            <td>{u.name}</td>
            <td>{u.lastname}</td>
            <td>{u.email}</td>
            <td>{u.username}</td>
            <td>{u.role}</td>
            <td>{new Date(u.createdAt).toLocaleString()}</td>
            <td>
                <button onClick={() => handleDeleteClick(u)}>
                  {confirmingId === u._id ? '¿Seguro?' : 'Eliminar'}
                </button>
              </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

};

export default AdminUsers;
