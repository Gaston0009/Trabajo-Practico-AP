import React, { useState } from 'react'
import '../../styles/_forms.scss';
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom';
import axios from 'axios'
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';



const schema = yup.object().shape({
  name: yup.string().required('El nombre es obligatorio'),
  lastname: yup.string().required('El apellido es obligatorio'),
  email: yup.string().email('Correo no válido').required('El correo es obligatorio'),
  username: yup.string().required('El usuario es obligatorio'),
  password: yup.string().min(4, 'La contraseña debe tener al menos 4 caracteres').required('La contraseña es obligatoria'),
});


const Register = () => {
const [image, setImage] = useState(null);
const navigate = useNavigate();
const { 
    register, 
    handleSubmit, 
    formState: { errors }, 
    } = useForm({
    resolver: yupResolver(schema),
});
const onSubmit = async (data) => {
  const formData = new FormData();

  formData.append('name', data.name);
  formData.append('lastname', data.lastname);
  formData.append('email', data.email);
  formData.append('username', data.username);
  formData.append('password', data.password);

  if (data.image && data.image[0]) {
    formData.append('image', data.image[0]);
  }

  try {
    await axios.post("http://localhost:3000/users/register", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    navigate("/login");
  } catch (error) {
    console.error(error);
    alert(error.response?.data?.message || "Error al registrar");
  }
};

  return (
    <div className='form-container'>
        <h2>Register</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className="form-group">
                <label htmlFor="name">Name</label>
                    <input
                    id="name"
                    type="text"
                    {...register('name')}
                    />
                    {errors.name && <p className="form-error">{errors.name.message}</p>}
            </div>

            <div className="form-group">
                <label htmlFor="lastname">Lastname</label>
                    <input
                    id="lastname"
                    type="text"
                    {...register('lastname')}
                        />
                    {errors.lastname && <p className="form-error">{errors.lastname.message}</p>}
            </div>
            <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                id="email"
                type="email"
                {...register('email')}
                />
                {errors.email && <p className="form-error">{errors.email.message}</p>}   
            </div>
            <div className="form-group">
                <label htmlFor="username">Username</label>
                    <input
                    id="username"
                    type="text"
                    {...register('username')}
                    />
                    {errors.username && <p className="form-error">{errors.username.message}</p>}
            </div>
            <div className="form-group">
                <label htmlFor="password">Password</label>
                    <input
                    id="password"
                    type="password"
                    {...register('password')}
                    />
                    {errors.password && <p className="form-error">{errors.password.message}</p>}
            </div>
            
            <div className="form-group">
                <label htmlFor="image">Foto de perfil (opcional)</label>
                <input id="image" type="file" accept="image/*" {...register('image')} />
            </div>
            <button type="submit">Register</button>
        </form>
    </div>
  )
}

export default Register