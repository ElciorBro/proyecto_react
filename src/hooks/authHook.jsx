import { useEffect, useState, useReducer, createContext, useContext } from 'react'
import { BrowserRouter as Router,Routes, Route, Outlet, Link, useParams } from 'react-router-dom';
import { saveUserData, getUserData } from '../utils/saveUser';

// function saveUserData(userData) {
//   try {
//     const jsonString = JSON.stringify(userData);

//     // Guardar en el localStorage
//     localStorage.setItem('userData', jsonString);

//     console.log('Datos de usuario guardados en el localStorage.');
//   } catch (error) {
//     console.error('Error al guardar datos en el localStorage:', error);
//   }
// };

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const initialState = {
    name: '',
    email: '',
    password: '',
    telefono: '',
    direccion: '',
    Ofertas: false,
    fechaNacimiento: '',
    gender: '',
    online: false
  };


  const reducer = (state, action) => {
    switch (action.type) {
      case 'LOGIN':
        return {
          ...state,
          user: action.payload,
          online: true,
        };
      case 'LOGOUT':
        return {
          ...state,
          user: null,
          online: false,
        };
      case "REGISTRATION":
        return {
          ...state, user: action.payload, online: false
        }
      // Agrega más casos según tus necesidades
      default:
        return state;
    }
  };

  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
};

// Hook personalizado para acceder al contexto
export const useAppContext = () => {
  return useContext(AppContext);
};
