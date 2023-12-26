import { useEffect, useState, useReducer, useContext, createContext } from 'react'
import { BrowserRouter as Router,Routes, Route, Outlet, Link, useParams, Navigate, useLocation } from 'react-router-dom';
import styles from '../css/home.module.css';
import { getProducts } from './ProductComponent';

export function Home() {
    return (
        <>
            <div className='firstContainer'>
                <FirstView />
            </div>
            <div className='carrouselContainer'>
                <Carrousel />
            </div>
            <div className='secondContainer'>
                <SecondView />
            </div>
        </>
    )
}

export function FirstView() {
    console.log("renderizando first view")

    return (
        <div className={styles.firstViewContainer}>
            <h1>Bienvenido a Smarthings!</h1>
            <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Recusandae, blanditiis vero labore numquam similique consequatur?</p>
            <br />
            <br />
            <h2>Disfruta de los siguientes ofertones</h2>
            <br />
            <br />
            <p>Estas ofertas están disponibles hasta agotar Stock</p>
        </div>
    );
}

async function Carrousel() {
    try {
        const products = await getProducts(); // Espera a que la función asíncrona getProducts se resuelva
        const firstProduct = products[0]?.images || ''; // Usa el operador opcional (?) para manejar el caso en que no haya productos
        const secondProduct = products[1]?.images || '';
        const thirdProduct = products[2]?.images || '';

        return (
            <div id="carouselExampleFade" className="carousel slide carousel-fade" data-ride="carousel">
                <div className="carousel-inner">
                    <div className="carousel-item active">
                        <img className="d-block w-100" src={firstProduct} alt="First slide" />
                    </div>
                    <div className="carousel-item">
                        <img className="d-block w-100" src={secondProduct} alt="Second slide" />
                    </div>
                    <div className="carousel-item">
                        <img className="d-block w-100" src={thirdProduct} alt="Third slide" />
                    </div>
                </div>
                <a className="carousel-control-prev" href="#carouselExampleFade" role="button" data-slide="prev">
                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span className="sr-only">Previous</span>
                </a>
                <a className="carousel-control-next" href="#carouselExampleFade" role="button" data-slide="next">
                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                    <span className="sr-only">Next</span>
                </a>
            </div>
        );
    } catch (error) {
        console.error('Error obteniendo productos:', error);
        // Puedes manejar el error de alguna manera, por ejemplo, mostrando un mensaje al usuario
        return <div>Error al obtener productos</div>;
    }
}


const CATEGORY = ['Categoria 1', 'categoria 2', 'categoria 3', 'categoria 4', 'categoria 5']

export function SecondView() {
    console.log("renderizando secondView")

    return (
        <div className={styles.secondViewContainer}>
            <h2>EXPLORA TODAS NUESTRAS CATEGORIAS DE PRODUCTOS</h2>
            <div className={styles.categoryList}>
                {CATEGORY.map((cat, index) => (
                    <div key={index}>
                        <a href="">{cat}</a>
                    </div>
                ))}
            </div>
        </div>
    );
}

