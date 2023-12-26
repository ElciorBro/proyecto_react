import { useEffect, useState, useReducer, useContext, createContext } from 'react'
import { BrowserRouter as Router,Routes, Route, Outlet, Link, useParams, Navigate, useLocation, useNavigate } from 'react-router-dom';
import styles from '../css/productComponent.module.css';
import { useAppContext } from '../hooks/authHook.jsx';
import { useFetchData } from '../hooks/productHook';
import {useQuery, QueryClient, QueryClientProvider} from '@tanstack/react-query'

const getProducts = async () => {
  const response = await fetch('https://api.escuelajs.co/api/v1/products')
  const json = await response.json()

  if(json.error) {
    throw new Error(json.error)
  }
  console.log(json)
  console.log('Data from getProducts:', json);

  return json;
}

export function ProductSection() {
    const { state, dispatch } = useAppContext();
    const query = useQuery({
      queryKey: ["products"],
      queryFn: getProducts,
    })
  
    if (query.status === 'pending') {
      return <p>Se están cargando los datos...</p>;
    }

    if (query.isError && query.error) {
      return <p>Hay un error: {query.error.message}</p>;
    }

    console.log(query.data)
  
  return (
    <div className={styles.container}>
      <h1>Sección con todos los productos</h1>
      <div>
        {query.data && query.data.length > 0 ? (
          query.data.map((producto) => (
            <div key={producto.id} className={styles.product}>
              <img src={producto.images[0]} alt="" />
              <h3>{producto.title}</h3>
              <p>Categoría: {producto.category.name}</p>
              {state.online ? (
                <p className={styles.price}>Precio: {producto.price}</p>
              ) : (
                <p>Se requiere estar registrado para ver el precio</p>
              )}
              <p>{producto.description}</p>
            </div>
          ))
        ) : (
          <p>No hay productos disponibles.</p>
        )}
      </div>
    </div>
  );
}
  
