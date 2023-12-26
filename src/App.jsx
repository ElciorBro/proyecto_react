import { useEffect, useState, useReducer, useContext, createContext } from 'react';
import { BrowserRouter as Router,Routes, Route, Outlet, Link, useParams, Navigate, useLocation } from 'react-router-dom';
import {NavBar, Footer, Layout, NoMatch } from './component/PrincipalComponents.jsx';
import {  Home } from './component/Home.jsx';
import { AppProvider } from './hooks/authHook.jsx';
import './App.css'
import { Categories } from './component/Categories.jsx';
import { Login } from './component/LoginComponent.jsx';
import { Registration } from './component/RegisterComponent.jsx';
import { Carrito } from './component/CarritoComponent.jsx';
import { ProductSection, Product } from './component/ProductComponent.jsx';
import { NewProduct } from './component/VentaSection.jsx';
import { Category } from './component/SingleCategory.jsx';
import {useQuery, QueryClient, QueryClientProvider} from '@tanstack/react-query'


const queryClient = new QueryClient();


function App() {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <AppProvider>
          <Router>
            <Routes>
              <Route path="/" element={<Layout />}>
                <Route index element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Registration />} />
                <Route path="/carrito" element={<Carrito />} />
                <Route path="/products" element={<ProductSection />} />
                <Route path="/products/:id" element={<Product />} />
                <Route path="/products/create" element={<NewProduct />} />
                <Route path='categories' element={<Categories />}/>
                <Route path='categories/:id' element={<Category />}/>
                <Route path='*' element={<NoMatch/>}></Route>
              </Route>
            </Routes>
          </Router>
        </AppProvider>
      </QueryClientProvider>
    </>
  );
}


export default App;




