import React, { useState, useEffect } from 'react';
import { Table, Form, Container, Button } from 'react-bootstrap'; // Import Button
import { Link, useNavigate } from 'react-router-dom'; // Import useNavigate for back navigation
import './Dashboard.css';

function ProductList() {
  const [products, setProducts] = useState([]); // Initialize products as an empty array
  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState(''); // State for category filter
  const [loading, setLoading] = useState(true); // For loading state
  const [error, setError] = useState(''); // For handling errors
  const navigate = useNavigate(); // Hook for programmatic navigation

  // Fetch product data from the API
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('http://127.0.0.1:8000/api/products');
        
        // Check for a successful response (status 200 range)
        if (!response.ok) {
          throw new Error(`Error: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();

        // Log the API response to see its structure
        console.log('API Response:', data); // Log the raw response

        // Check if the response is an array
        if (Array.isArray(data)) {
          setProducts(data); // If it's an array, use it directly
        } 
        // Check if the response is an object and has a 'products' array
        else if (data && typeof data === 'object' && Array.isArray(data.products)) {
          setProducts(data.products); // If it's an object with 'products' array
        } 
        // Check if the response is an object with other possible nested formats
        else if (data && Array.isArray(data.data)) {
          setProducts(data.data); // Some APIs may return data in 'data' property
        } else {
          throw new Error('Unexpected response format: Products data is missing');
        }

      } catch (err) {
        // Handle fetch errors
        setError(err.message || 'Failed to fetch products');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Filter products based on search term and category filter
  const filteredProducts = Array.isArray(products)
    ? products.filter((product) =>
        product.description.toLowerCase().includes(search.toLowerCase()) &&
        (categoryFilter === '' || product.category === categoryFilter)
      )
    : [];

  // Loading and error handling UI
  if (loading) return <p>Loading products...</p>;
  if (error) return <p>{error}</p>;

  return (
    <Container style={{ backgroundColor: '#f0f4f1', padding: '20px', borderRadius: '8px', marginTop: '20px' }}>
      <h2 style={{ color: '#4b4b4b' }}>Product List</h2>

      {/* Back to Dashboard Button */}
      <Button
        onClick={() => navigate('/dashboard')} // Go back to the dashboard
        style={{ marginBottom: '20px', backgroundColor: '#6a8759', border: 'none' }}
      >
        Back to Dashboard
      </Button>

      {/* Search input field to filter products by description */}
      <Form.Control
        type="text"
        placeholder="Search products..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="mb-3"
        style={{ borderColor: '#c5c1b4', borderRadius: '8px' }}
      />

      {/* Category filter dropdown */}
      <Form.Select
        value={categoryFilter}
        onChange={(e) => setCategoryFilter(e.target.value)}
        className="mb-3"
        style={{ borderColor: '#c5c1b4', borderRadius: '8px' }}
      >
        <option value="">All Categories</option>
        <option value="Fruits">Fruits</option>
        <option value="Dairy">Dairy</option>
        <option value="Bakery">Bakery</option>
      </Form.Select>

      {/* Table to display the list of products */}
      <Table striped bordered hover className="table" style={{ backgroundColor: '#fffdf5' }}>
        <thead>
          <tr>
            <th>Barcode</th>
            <th>Description</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Category</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {/* Map over the filtered products to display each one in a table row */}
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <tr key={product.id}>
                <td>{product.barcode}</td>
                <td>{product.description}</td>
                <td>${Number(product.price).toFixed(2)}</td> {/* Convert price to a number */}
                <td>{product.quantity}</td>
                <td>{product.category}</td>
                <td>
                  <Link to={`/product-detail/${product.id}`} style={{ color: '#6a8759' }}>View Details</Link>
                  <span style={{ marginLeft: '15px' }}></span>
                  <Link to={`/edit-product/${product.id}`} style={{ color: '#6a8759' }}>Edit</Link>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6">No products found</td>
            </tr>
          )}
        </tbody>
      </Table>
    </Container>
  );
}

export default ProductList;
