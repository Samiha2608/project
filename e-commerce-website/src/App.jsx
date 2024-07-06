import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import ProductList from './pages/ProductList';
import ProductDetail from './pages/ProductDetail';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import OrderHistory from './pages/OrderHistory';
import Admin from './pages/Admin';


const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
     
        <Route path="/" element={<ProductList api="https://dummyjson.com/products" category="shopping1" />} />
        <Route path="/shopping2" element={<ProductList api="https://fakestoreapi.com/products" category="shopping2" />} />
        <Route path="/shopping3" element={<ProductList api="https://fakestoreapi.com/products/category/jewelery" category="shopping3" />} />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/order-history" element={<OrderHistory />} />
      
        <Route path="/admin" element={<Admin />} />
      </Routes>
    </Router>
  );
};

export default App;
