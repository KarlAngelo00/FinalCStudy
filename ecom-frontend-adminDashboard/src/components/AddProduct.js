import React, { useState } from 'react';
import { Form, Button, Container, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

function AddProduct() {
  const [product, setProduct] = useState({
    barcode: '',
    description: '',
    price: '',
    quantity: '',
    category: '',
  });

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!product.barcode || !product.description || !product.price || !product.quantity || !product.category) {
      setError('All fields are required!');
      return;
    }

    try {
      const response = await fetch('http://127.0.0.1:8000/api/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(product),
      });

      if (response.ok) {
        setSuccess('Product added successfully!');
        setError('');
        setTimeout(() => {
          navigate('/products');
        }, 1500);
      } else {
        const errorData = await response.json();
        setError(`Error: ${errorData.message || 'Failed to add product'}`);
      }
    } catch (error) {
      setError('Error adding product. Please try again.');
    }
  };

  // Function to handle navigation back to the dashboard
  const handleBack = () => {
    navigate('/dashboard'); // Adjust the path based on your routing
  };

  return (
    <Container>
      <h2>Add Product</h2>

      {success && <Alert variant="success">{success}</Alert>}
      {error && <Alert variant="danger">{error}</Alert>}

      {/* Back Button */}
      <Button variant="secondary" onClick={handleBack} className="mb-3">
        Back to Dashboard
      </Button>

      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Barcode</Form.Label>
          <Form.Control
            type="text"
            value={product.barcode}
            onChange={(e) => setProduct({ ...product, barcode: e.target.value })}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Description</Form.Label>
          <Form.Control
            type="text"
            value={product.description}
            onChange={(e) => setProduct({ ...product, description: e.target.value })}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Price</Form.Label>
          <Form.Control
            type="number"
            step="0.01"
            value={product.price}
            onChange={(e) => setProduct({ ...product, price: e.target.value })}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Quantity</Form.Label>
          <Form.Control
            type="number"
            value={product.quantity}
            onChange={(e) => setProduct({ ...product, quantity: e.target.value })}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Category</Form.Label>
          <Form.Control
            type="text"
            value={product.category}
            onChange={(e) => setProduct({ ...product, category: e.target.value })}
            required
          />
        </Form.Group>

        <Button variant="primary" className="mt-3" type="submit">Add Product</Button>
      </Form>
    </Container>
  );
}

export default AddProduct;
