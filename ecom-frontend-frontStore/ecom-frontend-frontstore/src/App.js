import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import ProductList from './components/ProductList';
import Cart from './components/Cart';
import Checkout from './components/Checkout';
import ProductDetailsModal from './components/ProductDetailsModal';
import './App.css';

const App = () => {
  const initialProducts = [
    { id: 1, name: 'Product 1', description: 'Description for Product 1', price: 100, availability: true },
    { id: 2, name: 'Product 2', description: 'Description for Product 2', price: 200, availability: true },
    { id: 3, name: 'Product 3', description: 'Description for Product 3', price: 300, availability: false },
  ];

  const [products] = useState(initialProducts);
  const [cart, setCart] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const addToCart = (product) => {
    const existingProduct = cart.find(item => item.id === product.id);
    if (existingProduct) {
      setCart(cart.map(item =>
        item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
      ));
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  };

  const updateCart = (productId, quantity) => {
    setCart(cart.map(item =>
      item.id === productId ? { ...item, quantity } : item
    ));
  };

  const removeItem = (productId) => {
    setCart(cart.filter(item => item.id !== productId));
  };

  const clearCart = () => {
    setCart([]);
  };

  const handleShowDetails = (product) => {
    setSelectedProduct(product);
    setShowModal(true);
  };

  const handleCloseDetails = () => {
    setSelectedProduct(null);
    setShowModal(false);
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
                  products={products}
                  addToCart={addToCart}
                  showDetails={handleShowDetails}
                />
              }
            />
            <Route
              path="/cart"
              element={
                <Cart
                  cartItems={cart}
                  updateCart={updateCart}
                  removeItem={removeItem}
                />
              }
            />
            <Route
              path="/checkout"
              element={<Checkout clearCart={clearCart} />}
            />
          </Routes>
        </div>

        <ProductDetailsModal
          show={showModal}
          handleClose={handleCloseDetails}
          product={selectedProduct}
        />

        <Footer />
      </div>
    </Router>
  );
};

export default App;
