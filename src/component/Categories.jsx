import { useEffect, useState, useReducer, useContext, createContext } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, Outlet } from 'react-router-dom';
import { getCategories } from '../utils/getCategory';

export function Categories() {
    const [categories, setCategories] = useState([]);

    useEffect(() => {
      const fetchCategories = async () => {
        try {
          const categoryData = await getCategories();
          setCategories(categoryData);
        } catch (error) {
          console.error('Error fetching categories:', error.message);
        }
      };
  
      fetchCategories();
    }, []);

    return (
        <div>
            <h1>Aqui van las CATEGORIAS</h1>
                <div>
                {categories.map((cat, index) => (
                    <div key={index}>
                        <img src={cat.image} alt="Imagen de la categoria" />
                        <h3>{cat.name}</h3>
                        <p>{cat.id}</p>
                    </div>
                ))}
                </div>
        </div>
    )
}