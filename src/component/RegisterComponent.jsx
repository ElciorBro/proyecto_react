import { useEffect, useState, useReducer, useContext, createContext } from 'react'
import { BrowserRouter as Router,Routes, Route, Outlet, Link, useParams, Navigate, useLocation, useNavigate } from 'react-router-dom';
import styles from '../css/registrationForm.module.css';
// import { saveUser } from '../utils/saveUser.js'
import { useAppContext } from '../hooks/authHook.jsx';
import {useMutation, QueryClient, QueryClientProvider} from '@tanstack/react-query'




export function Registration() {

    return (
        <>
            <h1>Registracion a Smarthings!</h1>
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Tempore odio deleniti repellendus ipsa debitis, magni placeat dolore maiores molestias blanditiis.</p>
            <h2>A continuacion puedes rellenar el siguiente formulario de registracion</h2>
            <br />
            <div>
                <p><b>Deseamos que seas parte</b></p>
                <RegistrationForm />
                <p>Es importante que puedas rellenar todos los campos</p>
            </div>

        </>
    )
}


const registerUser = async ({name, email, password, avatar}) => {
  const response = await fetch('https://api.escuelajs.co/api/v1/users/', {
      method: 'POST', //Puede ir POST, PUT o DELETE
      headers: { //Aca va todo lo que tiene que ver con la info de la request
          'Content-Type': 'application/json',
      },
      body: JSON.stringify({name, email, password, avatar})
  });


  if(!response.ok) {
      const error = await response.json();
      throw new Error(error.message);
  }

  return response.json() 
}


const RegistrationForm = () => {
  const { state, dispatch } = useAppContext();
  const navigate = useNavigate()
  const [user, setUser] = useState({
    name: '',
    email: '',
    password: '',
    avatar: ''
  });
  const mutation = useMutation({
    mutationFn: registerUser,
    onSuccess: (data)=> {
      console.log('Registro exitoso', data)
      navigate('/login');

    },
  // Funcion si sale mal
    onError: (data) => {
      console.log('Algosalio mal', data)
    }
  });

  console.log("mutation status de registrationForm", mutation.status)
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch({type:'REGISTRATION', payload:user})
    mutation.mutate(user);
    console.log('Usuario registrado:', user);
  };
    
  return (
    <form className={styles.formContainer} onSubmit={handleSubmit}>
      <label className={styles.label}>
        Nombre:
        <input className={styles.input} type="text" name="name" value={user.name} onChange={handleInputChange} />
      </label>
      <br />

      <label className={styles.label}>
        Correo Electrónico:
        <input
          className={styles.input}
          type="email"
          name="email"
          value={user.email}
          onChange={handleInputChange}
        />
      </label>
      <br />

      <label className={styles.label}>
        Contraseña:
        <input
          className={styles.input}
          type="password"
          name="password"
          value={user.password}
          onChange={handleInputChange}
        />
      </label>
      <br />

      <label>
        Enlace del Avatar:
        <input type="text" name="avatar" value={user.avatar} onChange={handleInputChange} />
      </label>
    <br />


    <button type="submit" disabled={mutation.isLoading}>
      {mutation.isLoading ? 'Registrando...' : 'Registrarse'}
    </button>
      {mutation.isError && <p>Error: {mutation.error.message}</p>}
      {mutation.isSuccess && <p>Registro exitoso!</p>}

    </form>
  );
};
