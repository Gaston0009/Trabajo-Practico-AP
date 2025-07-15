import React, { useState, useEffect } from 'react'
import '../../styles/_forms.scss'; 
import axios from "axios"
import Cookies from 'js-cookie'
import { use } from 'react'
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useNavigate } from 'react-router-dom';

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


const Vehicle = () => {

  const [brands, setBrands] = useState([]);
  const [image, setImage] = useState(null);
  const navigate = useNavigate();
  const [notification, setNotification] = useState('');


  const {
    register,
    handleSubmit,
    reset, 
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  })


const fetchBrands = async () => {
  try {
      const token = Cookies.get('token');
      const res = await axios.get(`http://localhost:3000/brands`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
    });
    setBrands(res.data);
  }catch (err) {
    console.log('Error al traer las marcas :', err.message);
  }
};
useEffect(() => {
  fetchBrands()
}, []);




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

      if (data.image && data.image.length > 0) {
        formData.append('image', data.image[0]);
      }

    

    try {
      await axios.post('http://localhost:3000/vehicles', formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });
      reset();
      setNotification('Vehículo creado correctamente');
      setTimeout(() => {
      setNotification('');
      navigate('/vehicle');
      }, 5000);

      } catch (err) {
        console.error('Error al crear vehículo:', err);
        setNotification('Error al crear el vehículo');
        setTimeout(() => setNotification(''), 3000);
      }
  };


return (

<div className="form-container">
      <h1>Crear vehículo</h1>

    {notification && (
    <div className="formnotification">
      {notification}
    </div>
  )}

        <form onSubmit={handleSubmit(onSubmit)}>

          <div className="form-group">
            <label htmlFor="model">Modelo</label>
            <input id="model" type="text" placeholder="Modelo" {...register('model')} />
            {errors.model && <p className="form-error" >{errors.model.message}</p>}
          </div>

          <div className="form-group">
            <label htmlFor="category">Categoría</label>
            <input id="category" type="text" placeholder="Categoría" {...register('category')} />
            {errors.category && <p className="form-error" >{errors.category.message}</p>}
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
            <label htmlFor="motor">Motor</label>
            <input id="engine" type="text" placeholder="Motor" {...register('engine')} />
            {errors.engine && <p className="form-error">{errors.engine.message}</p>}
          </div>

          <div className="form-group">
            <label htmlFor="price">Precio</label>
            <input id="price" type="text" placeholder="Precio" {...register('price')} />
            {errors.price && <p className="form-error">{errors.price.message}</p>}
          </div>

          <div className="form-group">
            <label htmlFor="tags">Etiquetas (separadas por coma)</label>
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
            <input id="image" type="file" accept="image/*" {...register('image')}  onChange={(e) => setImage(e.target.files[0])} />
          {image && <img src={URL.createObjectURL(image)} alt="Vista previa" width="200" />}
          </div>

          <div className="form-group">
            <button type="submit">Crear vehículo</button>
          </div>
        </form>
    </div>
  )
}

export default Vehicle

