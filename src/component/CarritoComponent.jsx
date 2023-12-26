import { useEffect, useState, useReducer, useContext, createContext } from 'react'
import { BrowserRouter as Router,Routes, Route, Outlet, Link, useParams, Navigate, useLocation } from 'react-router-dom';
import styles from '../css/principalComponent.module.css';
import { useAppContext } from '../hooks/authHook.jsx';


export function Carrito() {
  const { state, dispatch } = useAppContext();

    return (
        <>
            {state.online? (
                <Loged />
            ):(
                <NoLoged />
            )}
        </>
    )
}

function NoLoged() {
    return (
        <>
            <h1>Debes estar Logueado para acceder al carrito</h1>
        </>
    )
}

function Loged() {
    return (
        <>
            <h1>Aqui se Muestra tu carrito</h1>
        </>
    )
}