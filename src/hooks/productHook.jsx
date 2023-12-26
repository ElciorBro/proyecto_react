import { useEffect, useState, useReducer, useContext, createContext } from 'react'
import { BrowserRouter as Router,Routes, Route, Outlet, Link, useParams, Navigate, useLocation, useNavigate } from 'react-router-dom';
import {useQuery, QueryClient, QueryClientProvider} from '@tanstack/react-query'


export function useFetchData() {
  const [data, setData] = useState([]);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  

  useEffect(() => {
    let isMounted = true;

    fetch('https://api.escuelajs.co/api/v1/products')
      .then((res) => {
        if (!isMounted) {
          return;
        }

        if (!res.ok) {
          throw new Error(`Error HTTP ${res.status}: ${res.statusText}`);
        }

        return res.json();
      })
      .then((data) => {
        console.log('Datos recibidos:', data);
        if (isMounted) {
          setData(data.results);
          setIsLoading(false);
          setError('');
        }
      })
      .catch((err) => {
        if (isMounted) {
          setError(err.message);
          console.error('Error en la solicitud:', err);
          setIsLoading(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, []);

  return { data, error, isLoading };
}




