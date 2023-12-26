import { useEffect, useState, useReducer, useContext, createContext } from 'react'
import { BrowserRouter as Router,Routes, Route, Outlet, Link, useParams, Navigate, useLocation, useNavigate } from 'react-router-dom';
import styles from '../css/productComponent.module.css';
import { useAppContext } from '../hooks/authHook.jsx';
import { useFetchData } from '../hooks/productHook';
import {useQuery, QueryClient, QueryClientProvider} from '@tanstack/react-query'

function Liquidacion() {
    return (
        <div>
            <h1>Estoss productos estan en liquidacion!!</h1>
        </div>
    )
}