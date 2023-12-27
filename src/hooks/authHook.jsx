import { useEffect, useState, useReducer, createContext, useContext } from 'react'
import { BrowserRouter as Router,Routes, Route, Outlet, Link, useParams } from 'react-router-dom';
import { saveUserData, getUserData } from '../utils/saveUser';
import { getLocalStorageData } from '../utils/getLocalData';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const initialState = getLocalStorageData();


  const reducer = (state, action) => {
    switch (action.type) {
      case 'LOGIN':
        localStorage.setItem('user', JSON.stringify(action.payload));
        localStorage.setItem('online', true);
        return {
          ...state,
          user: action.payload,
          online: true,
        };
      case 'LOGOUT':
        localStorage.removeItem('user');
        localStorage.removeItem('online');
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
