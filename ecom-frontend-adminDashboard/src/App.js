import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import AddProduct from './components/AddProduct';
import EditProduct from './components/EditProduct';
import ProductList from './components/ProductList';
import ProductDetail from './components/ProductDetail';

function App() {
  // State to manage the product list
  const [refresh, setRefresh] = useState(false);

  // Function to toggle the refresh state
  const toggleRefresh = () => {
    setRefresh(prev => !prev);
  };

  return (
    <Router>
      <Routes>
        {/* Route for the login page */}
        <Route path="/" element={<Login />} />
        
        {/* Protected routes */}
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/add-product" element={<AddProduct />} />
        <Route path="/edit-product/:id" element={<EditProduct />} />
        
        {/* Product List and Detail routes */}
        <Route path="/products" element={<ProductList refresh={refresh} />} />
        <Route path="/product-detail/:id" element={<ProductDetail onDelete={toggleRefresh} />} />
      </Routes>
    </Router>
  );
}

export default App;
