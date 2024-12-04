import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import ProductList from './components/ProductList';
import Cart from './components/Cart';
import Checkout from './components/Checkout';
import './App.css';

const App = () => {
  const [cart, setCart] = useState([]);

  // Add product to cart
  const addToCart = (product) => {
    setCart((prevCart) => {
      const existingProduct = prevCart.find(item => item.id === product.id);
      if (existingProduct) {
        // If the product is already in the cart, increase its quantity
        return prevCart.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        // Otherwise, add a new product to the cart
        return [...prevCart, { ...product, quantity: 1 }];
      }
    });
  };

  return (
    <Router>
      <div>
        <Header cartCount={cart.reduce((total, item) => total + item.quantity, 0)} />

        <div className="container mt-4">
          <Routes>
            <Route
              path="/"
              element={
                <ProductList
                  onAddToCart={addToCart} // Ensure onAddToCart is passed correctly
                />
              }
            />
            <Route
              path="/cart"
              element={<Cart cartItems={cart} />}
            />
            <Route
              path="/checkout"
              element={<Checkout cart={cart} />} // Pass cart to Checkout
            />
          </Routes>
        </div>

        <Footer />
      </div>
    </Router>
  );
};

export default App;
