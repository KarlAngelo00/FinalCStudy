import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';

const Checkout = ({ clearCart }) => {
  const [details, setDetails] = useState({ name: '', address: '', payment: '' });

  const handleInputChange = (e) => {
    setDetails({ ...details, [e.target.name]: e.target.value });
  };

  const handleCheckout = () => {
    alert('Order confirmed!');
    clearCart();
  };

  return (
    <Form>
      <Form.Group>
        <Form.Label>Name</Form.Label>
        <Form.Control
          type="text"
          name="name"
          value={details.name}
          onChange={handleInputChange}
          placeholder="Enter your name"
        />
      </Form.Group>
      <Form.Group>
        <Form.Label>Address</Form.Label>
        <Form.Control
          type="text"
          name="address"
          value={details.address}
          onChange={handleInputChange}
          placeholder="Enter your address"
        />
      </Form.Group>
      <Form.Group>
        <Form.Label>Payment Method</Form.Label>
        <Form.Control
          as="select"
          name="payment"
          value={details.payment}
          onChange={handleInputChange}
        >
          <option value="">Select</option>
          <option value="cod">Cash on Delivery</option>
        </Form.Control>
      </Form.Group>
      <Button
        style={{ backgroundColor: '#6a8759', border: 'none' }}
        onClick={handleCheckout}
      >
        Confirm Order
      </Button>
    </Form>
  );
};

export default Checkout;
