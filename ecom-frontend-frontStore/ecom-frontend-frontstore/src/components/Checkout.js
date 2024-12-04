import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';

const Checkout = ({ clearCart }) => {
  const [details, setDetails] = useState({ name: '', address: '', payment: '' });
  const [loading, setLoading] = useState(false); // To handle loading state while submitting
  const [error, setError] = useState(null); // To store any errors from the API

  const handleInputChange = (e) => {
    setDetails({ ...details, [e.target.name]: e.target.value });
  };

  const handleCheckout = async () => {
    if (!details.name || !details.address || !details.payment) {
      alert('Please fill out all fields');
      return;
    }

    setLoading(true); // Start loading before making the API request
    setError(null); // Reset any previous errors

    try {
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(details),
      });

      if (!response.ok) {
        throw new Error('Failed to confirm order');
      }

      const data = await response.json(); // Assuming the API returns a JSON response
      alert('Order confirmed!'); // Success message
      clearCart(); // Clear the cart after successful order

    } catch (err) {
      setError(err.message); // Set error message if the API call fails
      alert('Something went wrong, please try again later.');
    } finally {
      setLoading(false); // Stop loading after the API call completes
    }
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
        disabled={loading} // Disable button while submitting
      >
        {loading ? 'Submitting...' : 'Confirm Order'}
      </Button>

      {error && <p className="text-danger mt-2">{error}</p>} {/* Display error if any */}
    </Form>
  );
};

export default Checkout;
