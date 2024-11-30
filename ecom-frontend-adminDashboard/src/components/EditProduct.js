import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Form, Button, Container, Alert } from 'react-bootstrap';

function EditProduct() {
  const { id } = useParams(); // Get product ID from the URL
  const navigate = useNavigate();

  // State to store the product details
  const [product, setProduct] = useState({
    description: '',
    price: '',
    quantity: '',
    category: ''
  });

  const [error, setError] = useState('');  // For handling any errors
  const [success, setSuccess] = useState('');  // For handling successful updates
  const [loading, setLoading] = useState(true); // For loading state

  // Fetch product details from the API when the component mounts
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`http://127.0.0.1:8000/api/products/${id}`);
        if (!response.ok) throw new Error('Failed to fetch product data');
        
        const productData = await response.json();
        setProduct(productData); // Populate form with fetched product data
      } catch (error) {
        setError('Error fetching product data. Please try again.');
      } finally {
        setLoading(false); // Set loading to false after fetching
      }
    };
    fetchProduct();
  }, [id]);

  // Handle form input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct({
      ...product,
      [name]: value,
    });
  };

  // Handle form submission to update the product
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Ensure price and quantity are numbers
    const updatedProduct = {
      ...product,
      price: parseFloat(product.price) || 0,  // Ensure price is a number
      quantity: parseInt(product.quantity) || 0 // Ensure quantity is a number
    };

    try {
      // Send PUT request to update the product
      const response = await fetch(`http://127.0.0.1:8000/api/products/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedProduct),  // Send updated product data as JSON
      });

      // Handle the response
      if (response.ok) {
        setSuccess('Product updated successfully!');
        setError('');
        setTimeout(() => {
          navigate('/products');  // Redirect to the product list after 1.5 seconds
        }, 1500);
      } else {
        const errorData = await response.json();
        setError(`Failed to update product: ${errorData.message || 'Unknown error'}`);
      }
    } catch (error) {
      setError('Error updating product. Please try again.');
    }
  };

  // If loading, display a spinner or loading message
  if (loading) {
    return <Container><h2>Loading product data...</h2></Container>;
  }

  return (
    <Container>
      <h2>Edit Product</h2>

      {/* Display success message */}
      {success && <Alert variant="success">{success}</Alert>}

      {/* Display error message */}
      {error && <Alert variant="danger">{error}</Alert>}

      <Form onSubmit={handleSubmit}>
        {/* Description */}
        <Form.Group controlId="formProductDescription">
          <Form.Label>Description</Form.Label>
          <Form.Control
            type="text"
            name="description"
            value={product.description}
            onChange={handleChange}
            required
          />
        </Form.Group>

        {/* Price */}
        <Form.Group controlId="formProductPrice">
          <Form.Label>Price</Form.Label>
          <Form.Control
            type="number"
            name="price"
            value={product.price}
            onChange={handleChange}
            step="0.01"
            required
          />
        </Form.Group>

        {/* Quantity */}
        <Form.Group controlId="formProductQuantity">
          <Form.Label>Quantity</Form.Label>
          <Form.Control
            type="number"
            name="quantity"
            value={product.quantity}
            onChange={handleChange}
            required
          />
        </Form.Group>

        {/* Category */}
        <Form.Group controlId="formProductCategory">
          <Form.Label>Category</Form.Label>
          <Form.Control
            type="text"
            name="category"
            value={product.category}
            onChange={handleChange}
            required
          />
        </Form.Group>

        {/* Submit Button */}
        <Button variant="primary" type="submit" className="mt-3">
          Update Product
        </Button>
      </Form>
    </Container>
  );
}

export default EditProduct;
