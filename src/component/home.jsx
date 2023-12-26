import { useEffect, useState, useReducer, useContext, createContext } from 'react'
import { BrowserRouter as Router,Routes, Route, Outlet, Link, useParams, Navigate, useLocation } from 'react-router-dom';
import styles from '../css/home.module.css';

export function Home() {
    return (
        <>
            <div className='firstContainer'>
                <FirstView />
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
            <br />
            <div className={styles.carrouselContainer}>
                <FirstCards />
            </div>
        </div>
    );
}

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

function FirstCards() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getProducts();
                setProducts(data);

            } catch (error) {
                console.error('Error obteniendo productos:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();

    }, []);

    if (loading) {
        return <div>Cargando...</div>;
    }

    const firstProduct = products[0];
    // const secondProduct = products[1];
    // const thirdProduct = products[2]

    console.log(products[0].images[0])
    // console.log(products[1].images[0])
    // console.log(products[2].images[0])

    return (
        <>
            <div className={styles.cardsContainer}>
                <div className={styles.firstCard}>
                    <div className={styles.cardContainer}>
                        <img className={styles.cardImage} src={products[0].images[0]} alt="" />
                        <div className={styles.cardContent}>
                            <h5><Link to='/'>{products[0].title}</Link></h5>
                            <p>{products[0].description}</p>
                            <button className={styles.cardButton}>Mostrar más detalles</button>
                        </div>
                    </div>
                </div>
                <div className={styles.firstCard}>
                    <div className={styles.cardContainer}>
                        <img className={styles.cardImage} src={products[1].images[0]} alt="" />
                        <div className={styles.cardContent}>
                            <h5><Link to='/'>{products[1].title}</Link></h5>
                            <p>{products[1].description}</p>
                            <button className={styles.cardButton}>Mostrar más detalles</button>
                        </div>
                    </div>
                </div>
                <div className={styles.firstCard}>
                    <div className={styles.cardContainer}>
                        <img className={styles.cardImage} src={products[2].images[0]} alt="" />
                        <div className={styles.cardContent}>
                            <h5><Link to='/'>{products[2].title}</Link></h5>
                            <p>{products[2].description}</p>
                            <button className={styles.cardButton}>Mostrar más detalles</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );

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

