import { useEffect, useState, useReducer, useContext, createContext } from 'react';
import { BrowserRouter as Router,Routes, Route, Outlet, Link, useParams, Navigate, useLocation, useNavigate } from 'react-router-dom';
import {useMutation, QueryClient, QueryClientProvider} from '@tanstack/react-query'





export function NewProduct() {
  const productMutation = async (product) => {
    
    const response = await fetch('https://api.escuelajs.co/api/v1/products/', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify(product),
    });
  
    if (response.ok) {
    // Producto agregado con éxito, redirigir a la página de productos
    navigate('/productos');
    } else {
    // Manejar el caso de error
    console.error('Error al agregar el producto:', response.status);
    }
  };

  const navigate = useNavigate()
  const [product, setProduct] = useState({
      title: '',
      price: 0,
      description: '',
      categoryId: 1,
      images: [''],
  });
  
  const mutation = useMutation({
    mutationFn: productMutation,
    onSuccess: (data) => {
      console.log('Registro exitoso:', data);
      navigate('/productos');
    },
    onError: (data) => {
        console.log('Algo salio mal', data)
    }
    
  })


    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setProduct((prevProduct) => ({
          ...prevProduct,
          [name]: value,
        }));
    };
      
    const handleSubmit = (e) => {
      e.preventDefault();
      mutation.mutate(product);
    };

    return (
        <form onSubmit={handleSubmit}>
          <label>
            Title:
            <input
              type="text"
              name="title"
              value={product.title}
              onChange={handleInputChange}
            />
          </label>
          <br />
    
          <label>
            Price:
            <input
              type="number"
              name="price"
              value={product.price}
              onChange={handleInputChange}
            />
          </label>
          <br />
    
          <label>
            Description:
            <textarea
              name="description"
              value={product.description}
              onChange={handleInputChange}
            />
          </label>
          <br />
    
          <label>
            Category ID:
            <input
              type="number"
              name="categoryId"
              value={product.categoryId}
              onChange={handleInputChange}
              inputMode="numeric"
            />
          </label>
          <br />
    
          <label>
            Images (comma-separated URLs):
            <input
              type="text"
              name="images"
              value={product.images.join(',')}
              onChange={(e) => {
                const images = e.target.value.split(',');
                setProduct((prevProduct) => ({
                  ...prevProduct,
                  images,
                }));
              }}
            />
          </label>
          <br />
    
          <button type="submit" disabled={mutation.isLoading}>
            {mutation.isLoading ? 'Agregando Producto...' : 'Agregar Producto'}
          </button>
        </form>
    );

}