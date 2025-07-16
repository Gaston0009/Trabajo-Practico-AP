import React, { useEffect, useState } from 'react';
import '../../styles/_forms.scss'; 
import axios from 'axios';
import Cookies from 'js-cookie';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useParams, useNavigate } from 'react-router-dom';

const schema = yup.object().shape({
  model: yup.string().required('El modelo es obligatorio'),
  category: yup.string().required('La categoría es obligatoria'),
  type: yup.string().required('El tipo es obligatorio'),
  year: yup
    .number()
    .typeError('El año debe ser un número')
    .integer('Debe ser un número entero')
    .required('El año es obligatorio'),
  fuel: yup.string().required('El combustible es obligatorio'),
  engine: yup.string().required('El motor es obligatorio'),
  price: yup
    .number()
    .typeError('El precio debe ser un número')
    .required('El precio es obligatorio'),
  tags: yup.string().required('Al menos una etiqueta es obligatoria'),
  brand: yup.string().required('La marca es obligatoria'),
});

const EditVehicle = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [brands, setBrands] = useState([]);
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


  const fetchBrands = async () => {
    try {
      const token = Cookies.get('token');
      const res = await axios.get('https://trabajo-practico-ap-3.onrender.com/brands', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setBrands(res.data);
    } catch (err) {
      console.log('Error al obtener marcas:', err.message);
    }
  };


  const fetchVehicle = async () => {
    try {
      const token = Cookies.get('token');
      const res = await axios.get(`https://trabajo-practico-ap-3.onrender.com/vehicles/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });


      const vehicleData = {
        ...res.data,
        tags: res.data.tags?.join(', ') || '',
        brand: res.data.brand?._id || res.data.brand
      };

      reset(vehicleData);
    } catch (err) {
      console.error('Error al obtener el vehículo:', err);
    }
  };

  useEffect(() => {
    fetchBrands();
    fetchVehicle();
  }, [id]);


  const onSubmit = async (data) => {
    const token = Cookies.get('token');
    const formData = new FormData();

    formData.append('model', data.model);
    formData.append('category', data.category);
    formData.append('type', data.type);
    formData.append('year', parseInt(data.year));
    formData.append('fuel', data.fuel);
    formData.append('engine', data.engine);
    formData.append('price', parseFloat(data.price));
    formData.append('tags', data.tags.split(',').map((tag) => tag.trim()).join(','));
    formData.append('brand', data.brand);

    if (image) {
      formData.append('image', image);
    }

    try {
      await axios.put(`https://trabajo-practico-ap-3.onrender.com/vehicles/${id}`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });
      
        setNotification('Vehículo actualizado correctamente');
        setTimeout(() => {
          setNotification('');
          navigate('/vehicle');
        }, 5000);

      } catch (err) {
        console.error('Error al actualizar vehículo:', err);
        setNotification('Error al actualizar vehículo');
        setTimeout(() => setNotification(''), 3000);
      }
};

  return (
    <div className="form-container">
      <h1>Editar vehículo</h1>

      {notification && (
      <div className="editnotification">
        {notification}
      </div>
    )}
        <form onSubmit={handleSubmit(onSubmit)}>

          <div className="form-group">
            <label htmlFor="model">Modelo</label>
            <input id="model" type="text" placeholder="Modelo" {...register('model')} />
            {errors.model && <p className="form-error">{errors.model.message}</p>}
          </div>

          <div className="form-group">
              <label htmlFor="category">Categoría</label>
              <input id="category" type="text" placeholder="Categoría" {...register('category')} />
              {errors.category && <p className="form-error">{errors.category.message}</p>}
          </div>

          <div className="form-group">
            <label htmlFor="type">Tipo</label>
            <input id="type" type="text" placeholder="Tipo" {...register('type')} />
            {errors.type && <p className="form-error">{errors.type.message}</p>}
          </div>

          <div className="form-group">
            <label htmlFor="year">Año</label>
            <input id="year" type="text" placeholder="Año" {...register('year')} />
            {errors.year && <p className="form-error">{errors.year.message}</p>}
          </div>

          <div className="form-group">
            <label htmlFor="fuel">Combustible</label>
            <input id="fuel" type="text" placeholder="Combustible" {...register('fuel')} />
            {errors.fuel && <p className="form-error">{errors.fuel.message}</p>}
          </div>

          <div className="form-group">
            <label htmlFor="engine">Motor</label>
            <input id="engine" type="text" placeholder="Motor" {...register('engine')} />
            {errors.engine && <p className="form-error">{errors.engine.message}</p>}
          </div>

          <div className="form-group">
            <label htmlFor="price">Precio</label>
            <input id="price" type="text" placeholder="Precio" {...register('price')} />
            {errors.price && <p className="form-error">{errors.price.message}</p>}
          </div>

          <div className="form-group">
            <label htmlFor="tags">Etiquetas</label>
            <input
              id="tags"
              type="text"
              placeholder="Etiquetas (separadas por coma)"
              {...register('tags')}
            />
            {errors.tags && <p className="form-error">{errors.tags.message}</p>}
          </div>

          <div className="form-group">
            <label htmlFor="brand">Marca</label>
            <select id="brand" {...register('brand')}>
              <option value="">Selecciona una marca</option>
              {brands.map((brand) => (
                <option key={brand._id} value={brand._id}>
                  {brand.name}
                </option>
              ))}
            </select>
            {errors.brand && <p className="form-error">{errors.brand.message}</p>}
          </div>
          
          <div className="form-group">
            <label htmlFor="image">Imagen</label>
            <input id="image" type="file" accept="image/*" onChange={(e) => setImage(e.target.files[0])} />
          </div>

          <div className="form-group">
            <button type="submit">Actualizar vehículo</button>
          </div>
        </form>
    </div>
  );
};

export default EditVehicle;
