import React, { useState } from 'react';
import { Card, Button, Form } from 'react-bootstrap';

const ProductList = ({ products, addToCart, showDetails }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [availabilityFilter, setAvailabilityFilter] = useState('all');

  // Filtered products based on search and availability
  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesAvailability =
      availabilityFilter === 'all' ||
      (availabilityFilter === 'available' && product.availability) ||
      (availabilityFilter === 'unavailable' && !product.availability);

    return matchesSearch && matchesAvailability;
  });

  return (
    <div>
      {/* Search and Filter Section */}
      <div className="mb-4">
        <Form>
          <div className="d-flex justify-content-between align-items-center">
            <Form.Control
              type="text"
              placeholder="Search for products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{ maxWidth: '400px', marginRight: '10px' }}
            />
            <Form.Select
              value={availabilityFilter}
              onChange={(e) => setAvailabilityFilter(e.target.value)}
              style={{ maxWidth: '200px' }}
            >
              <option value="all">All Products</option>
              <option value="available">Available Only</option>
              <option value="unavailable">Unavailable Only</option>
            </Form.Select>
          </div>
        </Form>
      </div>

      {/* Product Cards */}
      <div className="d-flex flex-wrap">
        {filteredProducts.map(product => (
          <Card style={{ width: '18rem', margin: '10px' }} key={product.id}>
            <Card.Body>
              <Card.Title>{product.name}</Card.Title>
              <Card.Text>{product.description}</Card.Text>
              <Card.Text>₱{product.price}</Card.Text>
              <Button
                style={{ backgroundColor: '#6a8759', border: 'none' }}
                onClick={() => addToCart(product)}
              >
                Add to Cart
              </Button>
              <Button
                variant="link"
                onClick={() => showDetails(product)}
              >
                View Details
              </Button>
            </Card.Body>
          </Card>
        ))}
      </div>

      {/* No Products Message */}
      {filteredProducts.length === 0 && (
        <div className="text-center mt-4">
          <p>No products match your search or filter criteria.</p>
        </div>
      )}
    </div>
  );
};

export default ProductList;
