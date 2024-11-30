import React from 'react';
import { Modal, Button } from 'react-bootstrap';

const ProductDetailsModal = ({ show, handleClose, product }) => {
  if (!product) return null; // Handle when no product is selected

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
        <Button
          style={{ backgroundColor: '#6a8759', border: 'none' }}
          onClick={handleClose}
        >
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ProductDetailsModal;
