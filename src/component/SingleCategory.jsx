import { useEffect, useState, useReducer, useContext, createContext } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, Outlet, useParams } from 'react-router-dom';
import { getCategoryById } from '../utils/categoryById';
import { useAppContext } from '../hooks/authHook.jsx';
import styles from '../css/category.module.css'




export function Category() {
    const { state, dispatch } = useAppContext();
    const { id } = useParams()
    console.log("id is", id)
    const [productCategory, setProductCategory] = useState(null)

    useEffect(() => {
        const fetchCategory = async () => {
          try {
            const categoryData = await getCategoryById(id);
            setProductCategory(categoryData);
          } catch (error) {
            console.error('Error fetching category:', error.message);
        }
        };
    
        fetchCategory();
      }, [id]);

      if (!productCategory) {
        return <p>Cargando Categoría</p>;
      }

      return (
        <div className={styles.categoryContainer}>
          {productCategory.map((product, index) => (
            <div key={index} className={styles.productCard}>
              <img src={product.images[0]} alt="" className={styles.productImage} />
              <h3 className={styles.productTitle}><Link to={`/products/${product.id}`}>{product.title}</Link></h3>
              <p>Categoría: {product.category.name}</p>
              {state.online ? (
                <p className={styles.productPrice}>Precio: {product.price}</p>
              ) : (
                <p>Se requiere estar registrado para ver el precio</p>
              )}
              <p>{product.description}</p>
            </div>
          ))}
        </div>
      );
}
    
