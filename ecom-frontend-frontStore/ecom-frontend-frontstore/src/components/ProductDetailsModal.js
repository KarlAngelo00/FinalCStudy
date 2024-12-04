import React, { useState, useEffect } from 'react';
import { Modal, Button } from 'react-bootstrap';

const ProductDetailsModal = ({ show, handleClose, productId }) => {
  const [product, setProduct] = useState(null); // State to store the product details
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state

  // Fetch product details when the modal is opened
  useEffect(() => {
    if (productId) {
      const fetchProductDetails = async () => {
        setLoading(true);
        setError(null);
        try {
          const response = await fetch(`http://127.0.0.1:8000/api/products/${productId}`); // Replace with your API endpoint
          if (!response.ok) {
            throw new Error('Failed to fetch product details');
          }
          const data = await response.json();
          setProduct(data); // Store fetched product details
        } catch (err) {
          setError(err.message); // Handle fetch error
        } finally {
          setLoading(false); // Set loading to false after fetch
        }
      };

      fetchProductDetails();
    }
  }, [productId, show]); // Refetch when the productId or modal visibility changes

  if (loading) {
    return <Modal show={show} onHide={handleClose}><Modal.Body>Loading...</Modal.Body></Modal>;
  }

  if (error) {
    return (
      <Modal show={show} onHide={handleClose}>
        <Modal.Body>Error: {error}</Modal.Body>
        <Modal.Footer>
          <Button style={{ backgroundColor: '#6a8759', border: 'none' }} onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }

  if (!product) {
    return null; // If no product is selected, return null
  }

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{product.name}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p><strong>Description:</strong> {product.description}</p>
        <p><strong>Price:</strong> ₱{product.price}</p>
        <p><strong>Availability:</strong> {product.availability ? 'In Stock' : 'Out of Stock'}</p>
      </Modal.Body>
      <Modal.Footer>
        <Button style={{ backgroundColor: '#6a8759', border: 'none' }} onClick={handleClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ProductDetailsModal;
