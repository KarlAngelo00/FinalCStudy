import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button, Container } from 'react-bootstrap';

function ProductDetail({ onDelete }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`http://127.0.0.1:8000/api/products/${id}`);
        if (!response.ok) {
          throw new Error(`Error fetching product: ${response.status} ${response.statusText}`);
        }
        const productData = await response.json();
        setProduct(productData);
      } catch (error) {
        setError(error.message || 'Failed to fetch product details');
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleDelete = async () => {
    const confirmDelete = window.confirm("Are you sure you want to delete this product?");
    if (confirmDelete) {
      try {
        const response = await fetch(`http://127.0.0.1:8000/api/products/${id}`, {
          method: 'DELETE',
        });

        if (!response.ok) {
          throw new Error(`Error deleting product: ${response.status} ${response.statusText}`);
        }

        onDelete(); // Call the refresh function passed from parent
        navigate('/products'); // Navigate back to the product list
      } catch (error) {
        console.error("Failed to delete product:", error);
        alert("Failed to delete product: " + error.message);
      }
    }
  };

  const handleBack = () => {
    navigate('/products'); // Navigate back to the product list
  };

  if (loading) return <p>Loading product...</p>;
  if (error) return <p>{error}</p>;

  if (!product) {
    return <p>No product found.</p>;
  }

  const formattedPrice = typeof product.price === 'number' ? product.price.toFixed(2) : 'N/A';

  return (
    <Container>
      <h2>Product Detail</h2>
      
      {/* Back Button */}
      <Button variant="secondary" onClick={handleBack} className="mb-3">
        Back to Product List
      </Button>

      <p><strong>Description:</strong> {product.description}</p>
      <p><strong>Price:</strong> ${formattedPrice}</p>
      <p><strong>Quantity:</strong> {product.quantity}</p>
      <p><strong>Category:</strong> {product.category}</p>

      <Button variant="danger" onClick={handleDelete}>
        Delete Product
      </Button>
    </Container>
  );
}

export default ProductDetail;
