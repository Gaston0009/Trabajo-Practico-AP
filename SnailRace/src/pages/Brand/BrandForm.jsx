import React, { useState, useEffect } from 'react';
import '../../styles/_forms.scss'; 
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';




const schema = yup.object().shape({
    name: yup.string().required('El nombre es obligatorio'),
    country: yup.string().required('La nacionalidad es obligatoria')
});

const BrandForm = () => {
const [image, setImage] = useState(null);
const navigate = useNavigate();
const [notification, setNotification] = useState('');


    const {
        register, 
        handleSubmit, 
        reset, 
        formState : { errors },
    } = useForm({
        resolver: yupResolver(schema),
    });



    const onSubmit = async (data) => {
        const token = Cookies.get('token');
    const formData = new FormData();
    formData.append('name', data.name);
    formData.append('country', data.country);
    if (data.image && data.image.length > 0) {
        formData.append('image', data.image[0]);
    }


        try {
            await axios.post('https://trabajo-practico-ap-3.onrender.com/brands', formData, {
                headers: {
                    Authorization: `Bearer ${token}` ,
                    'Content-Type': 'multipart/form-data',
                },
            });
            reset();
            setNotification('Vehículo creado correctamente');
            setTimeout(() => {
            setNotification('');
            navigate('/brand');
            }, 5000);
        }catch (err) {
            console.error('Error al crear la marca: ', err);
            setNotification('Error al crear el vehículo');
            setTimeout(() => setNotification(''), 3000);
        }
};


return (
    <div className="form-container">
        <h1>Crear Marca</h1>

        {notification && (
    <div className="formnotification">
      {notification}
    </div>
  )}

        <form onSubmit={handleSubmit(onSubmit)}>
            <div className="form-group">
                <label htmlFor="name">Nombre</label>
                <input id="name" type="text" placeholder='Nombre' {...register('name')} />
                {errors.name && <p className="form-error">{errors.name.message}</p>}
            </div>
            
            <div className="form-group">
                <label htmlFor="country">Nacionalidad</label>
                <input id="country" type="text"placeholder='Nacionalidad' {...register('country')} />
                {errors.country && <p className="form-error">{errors.country.message}</p>}
            </div>

            <div className="form-group">
                <label htmlFor="image">Imagen</label>
                <input id="image" type="file" accept="image/*" {...register('image')}  onChange={(e) => setImage(e.target.files[0])} />
                {image && <img src={URL.createObjectURL(image)} alt="Vista previa" width="200" />}
            </div>

            <div className="form-group">
                <button type="submit">Crear marca</button>
            </div>
        </form>
    </div>
)
}

export default BrandForm
