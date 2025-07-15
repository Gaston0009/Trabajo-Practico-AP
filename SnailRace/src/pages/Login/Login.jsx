import React, { useContext, useState} from 'react';
import '../../styles/_forms.scss';
import axios from 'axios'
import Cookies from 'js-cookie'
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import {jwtDecode} from 'jwt-decode'


const schema = yup.object({
    email: yup.string().email("Email inválido").required("El email es obligatorio"),
    password: yup.string().min(4, "Mínimo 4 caracteres").required("La contraseña es obligatoria")
  })


const Login = () => {
  
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema)
  });
  const { setUser } = useContext(AuthContext);
  const [error, setError] = useState("");
  const [notification, setNotification] = useState("");

  const onSubmit = async (data) => {
    try {
      const res = await axios.post("https://trabajo-practico-ap-3.onrender.com/users/login", data);
      Cookies.set('token', res.data.token, { expires: 1 });

      const decoded = jwtDecode(res.data.token);
      setUser({
      id: decoded.id,
      email: decoded.email,
      role: decoded.role,
    });
    setNotification('Inicio de sesión exitoso');

      setTimeout(() => {
      navigate("/");
    }, 2000); 
  }  catch (err) {
      console.log(err);
      setError(err.response?.data?.message || 'Error al iniciar sesión');
    }
  };


  return (
    <div className="form-container">
      {notification && <div className="formnotification">{notification}</div>}
        <h2>Login</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className="form-group">
                <label htmlFor="email"> Email </label>
                <input
                id="email"
                type="email"
                {...register("email")}
                />
                {errors.email && <p className="form-error">{errors.email.message}</p>}
            </div>
            <div className="form-group">
                <label htmlFor="password"> Password </label>
                    <input
                    id="password"
                    type="password"
                    {...register("password")}
                    />
                    {errors.password && <p className="form-error">{errors.password.message}</p>}
            </div>
              <button type="submit">Login</button>
              {error && <p className="form-error">{error}</p>}
        </form>
    </div>
  );
};

export default Login
