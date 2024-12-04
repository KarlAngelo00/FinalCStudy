import React, { useState, useEffect } from 'react';
import { Table, Button, Spinner, Alert, Form, Row, Col, Modal } from 'react-bootstrap';

const ProductList = ({ onAddToCart }) => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [priceRange, setPriceRange] = useState([0, 10000]);
  const [availability, setAvailability] = useState('all');
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  // Fetch products from the API
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('http://127.0.0.1:8000/api/products');
        if (!response.ok) {
          throw new Error('Failed to fetch products');
        }
        const data = await response.json();
        setProducts(data.data);
        setFilteredProducts(data.data);
      } catch (error) {
        console.error(error);
        setError('There was an error loading the products.');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Filter products based on search term, price range, and availability
  useEffect(() => {
    let filtered = products;

    if (searchTerm) {
      filtered = filtered.filter(product =>
        (product.name && product.name.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (product.description && product.description.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (product.barcode && product.barcode.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    filtered = filtered.filter(product =>
      product.price >= priceRange[0] && product.price <= priceRange[1]
    );

    if (availability !== 'all') {
      filtered = filtered.filter(product =>
        availability === 'available' ? product.quantity > 0 : product.quantity === 0
      );
    }

    setFilteredProducts(filtered);
  }, [searchTerm, priceRange, availability, products]);

  // Show loading spinner while waiting for data
  if (loading) {
    return (
      <div className="d-flex justify-content-center mt-5">
        <Spinner animation="border" />
      </div>
    );
  }

  // Show error message if there is an issue fetching the products
  if (error) {
    return <Alert variant="danger">{error}</Alert>;
  }

  // Show message when no products are available
  if (filteredProducts.length === 0) {
    return (
      <div>
        <Alert variant="info">No products available matching your filters.</Alert>
      </div>
    );
  }

  // Reset Filters
  const resetFilters = () => {
    setSearchTerm('');
    setPriceRange([0, 10000]);
    setAvailability('all');
  };

  // Handle Product Details Modal
  const handleShowDetails = (product) => {
    setSelectedProduct(product);
    setShowDetailsModal(true);
  };

  const handleCloseDetails = () => {
    setShowDetailsModal(false);
  };

  // Handle Add to Cart
  const handleAddToCart = async (product) => {
    try {
      const response = await fetch('http://127.0.0.1:8000/api/cart/add', {  // Updated endpoint
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`,  // Include token if using authentication
        },
        body: JSON.stringify({
          product_id: product.id,
          quantity: 1,  // Assuming a quantity of 1 for simplicity
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to add product to cart');
      }

      const data = await response.json();
      if (data.success) {
        alert('Product added to cart successfully!');
      } else {
        alert('Failed to add product to cart.');
      }
    } catch (error) {
      console.error(error);
      alert('There was an error adding the product to the cart.');
    }
  };

  return (
    <div>
      <h2>Product List</h2>

      {/* Back Button */}
      <Button variant="secondary" onClick={resetFilters} className="mb-3">
        Reset Filters
      </Button>

      {/* Search and Filter Section */}
      <Row className="mb-3">
        <Col md={4}>
          <Form.Control
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            id="search-term"   // Added id and name for autofill support
            name="search-term"
          />
        </Col>
        <Col md={4}>
          <Form.Range
            min={0}
            max={10000}
            step={100}
            value={priceRange[0]}
            onChange={e => setPriceRange([+e.target.value, priceRange[1]])}
            id="price-range"    // Added id and name for autofill support
            name="price-range"
          />
          <Form.Text>Price: ₱{priceRange[0]} - ₱{priceRange[1]}</Form.Text>
        </Col>
        <Col md={4}>
          <Form.Select
            value={availability}
            onChange={e => setAvailability(e.target.value)}
            id="availability"   // Added id and name for autofill support
            name="availability"
          >
            <option value="all">All Availability</option>
            <option value="available">Available</option>
            <option value="unavailable">Out of Stock</option>
          </Form.Select>
        </Col>
      </Row>

      {/* Product Table */}
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Barcode</th>
            <th>Description</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {filteredProducts.map((product) => (
            <tr key={product.id}>
              <td>{product.id}</td>
              <td>{product.barcode || 'N/A'}</td>
              <td>{product.description || 'No description available'}</td>
              <td>₱{product.price}</td>
              <td>{product.quantity > 0 ? 'In Stock' : 'Out of Stock'}</td>
              <td>
                <Button
                  variant="success"
                  onClick={() => handleAddToCart(product)}  // Updated to call handleAddToCart
                  disabled={product.quantity === 0}
                >
                  {product.quantity > 0 ? 'Add to Cart' : 'Out of Stock'}
                </Button>
                <Button
                  variant="info"
                  onClick={() => handleShowDetails(product)}
                  className="ml-2"
                >
                  View Details
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* Product Details Modal */}
      <Modal show={showDetailsModal} onHide={handleCloseDetails}>
        <Modal.Header closeButton>
          <Modal.Title>Product Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedProduct && (
            <>
              <h5>{selectedProduct.name}</h5>
              <p>{selectedProduct.description}</p>
              <p><strong>Price:</strong> ₱{selectedProduct.price}</p>
              <p><strong>Quantity:</strong> {selectedProduct.quantity > 0 ? 'In Stock' : 'Out of Stock'}</p>
            </>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseDetails}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default ProductList;
