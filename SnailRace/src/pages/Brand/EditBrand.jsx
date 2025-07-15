import React, { useEffect, useState } from 'react'
import '../../styles/_forms.scss'; 
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import Cookies from 'js-cookie';
import axios from 'axios';



const schema = yup.object().shape({
    name: yup.string().required('El nombre es obligatorio'),
    country: yup.string().required('La nacionalidad es obligatoria')
});


const EditBrand = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [image, setImage] = useState(null);
    const [notification, setNotification] = useState('');

    const {
        register, 
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schema),
    });

    const  fetchBrand = async () => {
        try {
            const token = Cookies.get('token');
            const res = await axios.get( `http://localhost:3000/brands/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            const brandData = {
                ...res.data,
            };
            reset(brandData);
        }catch (err) {
            console.error('Error al obtener la marca: ', err);
        }
    };

    useEffect(() => {
        fetchBrand();
    }, [id]);

    const onSubmit = async (data) => {
        const token = Cookies.get('token');
        const formData = new FormData();
        
        formData.append('name', data.name);
        formData.append('country', data.country);
        
        if (image) {
            formData.append('image', image);
        }

        try {
            await axios.put(`http://localhost:3000/brands/${id}`, formData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data',
                },
            });
            setNotification('Marca actualizada correctamente');
            setTimeout(() => {
            setNotification('');
            navigate('/brand');
            } , 5000);
        }catch (err) {
            console.error('Error al actualizar la marca: ', err);
            setNotification('Error al actualizar Marca');
            setTimeout(() => setNotification(''), 3000);
        }
    };

    return (
    <div className="form-container">
        <h1>Editar la Marca</h1>

        {notification && (
      <div className="editnotification">
        {notification}
      </div>
    )}

        <form onSubmit={handleSubmit(onSubmit)}>

            <div className="form-group">
                <label htmlFor="name">Nombre</label>
                <input id="name" type="text" placeholder="Nombre" {...register('name')} />
                {errors.name && <p className="form-error">{errors.name.message}</p>}
            </div>

            <div className="form-group">
                <label htmlFor="country">Nombre</label>
                <input id="country" type="text" placeholder='Nacionalidad' {...register('country')} />
                {errors.country && <p className="form-error">{errors.country.message}</p>}
            </div>

            <div className="form-group">
                <label htmlFor="image">Imagen</label>
                <input id="image" type="file" accept="image/*" onChange={(e) => setImage(e.target.files[0])} />
            </div>

            <div className="form-group">
                <button type="submit">Actualizar marca</button>
            </div>
        </form>
    </div>
)
};

export default EditBrand