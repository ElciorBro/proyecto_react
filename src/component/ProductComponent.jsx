import { useEffect, useState, useReducer, useContext, createContext } from 'react'
import { BrowserRouter as Router,Routes, Route, Outlet, Link, useParams, Navigate, useLocation, useNavigate } from 'react-router-dom';
import styles from '../css/productComponent.module.css';
import { useAppContext } from '../hooks/authHook.jsx';
import { useFetchData } from '../hooks/productHook';
import {useQuery, QueryClient, QueryClientProvider} from '@tanstack/react-query'
import { getCategories } from '../utils/getCategory';
import { deleteProductById } from '../utils/deteteProduct';

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

const getProductById = async (productId) => {
  const response = await fetch(`https://api.escuelajs.co/api/v1/products/${productId}`);
  const json = await response.json();

  if (json.error) {
    throw new Error(json.error);
  }

  return json;
};

function ProductCarousel({ url1, url2, url3}) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const urls = [url1, url2, url3]

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + urls.length) % urls.length);
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % urls.length);
  };


  return (
    <div className={styles.carouselContainer}>
      <button onClick={handlePrev} className={styles.carouselButton}>Anterior</button>
      <img src={urls[currentIndex]} alt={`Imagen ${currentIndex + 1}`} className={styles.carouselImage} />
      <button onClick={handleNext} className={styles.carouselButton}>Siguiente</button>
    </div>
  );
}


export function Product() {
  const { id } = useParams();
  const navigate = useNavigate()
  console.log("id es",id)
  const [product, setProduct] = useState(null);

  const handleDeleteProduct = async () => {
    try {
      // Aquí deberías agregar la lógica para verificar si el usuario tiene el rol de administrador.
      // Puedes usar el contexto de autenticación o cualquier otro método que estés utilizando para manejar los roles de usuario.

      // Lógica de eliminación del producto
      await deleteProductById(id);
      // Redirigir a la página de productos después de eliminar exitosamente
      navigate('/productos');
    } catch (error) {
      console.error('Error deleting product:', error.message);
    }
  };

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const productData = await getProductById(id);
        setProduct(productData);
      } catch (error) {
        console.error('Error fetching product:', error.message);
      }
    };

    fetchProduct();
  }, [id]);

  if (!product) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h1>ID: {id}</h1>
        {product.images.length >= 3 ? (
          <ProductCarousel url1={product.images[0]} url2={product.images[1]} url3={product.images[2]} />
        ) : (
          <img src={product.images[0]} alt="" />
        )}
      <h2>{product.title}</h2>
      <p><b>CATEGORIA:</b>{product.category.name}</p>
      <p><b>DECRIPCION:</b>{product.description}</p>
      <br />
      <button onClick={handleDeleteProduct}>Eliminar Producto</button>
    </div>
  );

}


export function ProductSection() {
    const { state, dispatch } = useAppContext();
    const query = useQuery({
      queryKey: ["products"],
      queryFn: getProducts,
    })

    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('');
    const [minPrice, setMinPrice] = useState('');
    const [maxPrice, setMaxPrice] = useState('');

    const filteredProducts = query.data
    ? query.data.filter(product =>
        product.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
        (selectedCategory === '' || product.category.name === selectedCategory) &&
        (minPrice === '' || parseFloat(product.price) >= parseFloat(minPrice)) &&
        (maxPrice === '' || parseFloat(product.price) <= parseFloat(maxPrice))
      )
    : [];

    const uniqueCategories = [...new Set(query.data?.map(product => product.category.name))];
    // const uniqueCategories = getCategories()
  
    if (query.status === 'pending') {
      return <p>Se están cargando los datos...</p>;
    }

    if (query.isError && query.error) {
      return <p>Hay un error: {query.error.message}</p>;
    }

    console.log(query.data)
  
    return (
      <div className={styles.container}>
        <h1>Sección con todos los productos</h1>
    
        {/* Filtros */}
        <div className={styles.filterContainer}>
          <input
            type="text"
            placeholder="Buscar por título"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className={styles.filterInput}
          />
    
          <label>Filtrar por categoría:</label>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className={styles.filterSelect}
          >
            <option value="">Todas las categorías</option>
            {uniqueCategories.map((category, index) => (
              <option key={index} value={category}>
                {category}
              </option>
            ))}
          </select>
    
          {/* Siempre mostramos los campos de rango de precios */}
          <label>Precio mínimo:</label>
          <input
            type="number"
            placeholder="Precio mínimo"
            value={minPrice}
            onChange={(e) => setMinPrice(e.target.value)}
            className={styles.filterInput}
          />
    
          <label>Precio máximo:</label>
          <input
            type="number"
            placeholder="Precio máximo"
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
            className={styles.filterInput}
          />
    
          <button className={styles.filterButton} onClick={() => console.log('Aplicar filtro')}>
            Filtrar
          </button>
        </div>
    
        {/* Productos */}
        <div className={styles.productContainer}>
          {filteredProducts.length > 0 ? (
            filteredProducts.map((producto) => (
              <div key={producto.id} className={styles.product}>
                <img src={producto.images[0]} alt="" className={styles.carouselImage} />
                <h3><Link to={`/products/${producto.id}`}>{producto.title}</Link></h3>
                <p>Categoría: {producto.category.name}</p>
                {state.online ? (
                  <p className={styles.price}>Precio: {producto.price}</p>
                ) : (
                  <p>Se requiere estar registrado para ver el precio</p>
                )}
                <p>{producto.description}</p>
              </div>
            ))
          ) : (
            <p>No hay productos disponibles.</p>
          )}
        </div>
      </div>
    );
}
  
