import React, { useState, useEffect } from 'react';
import { Table, Button, Form, Modal, Spinner, Alert, Toast } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [shippingDetails, setShippingDetails] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    // Simulate loading fake data into cart (replace with localStorage logic if needed)
    const fakeCartItems = [
      { id: 1, name: 'Product 1', price: 100, quantity: 2 },
      { id: 2, name: 'Product 2', price: 150, quantity: 1 },
      { id: 3, name: 'Product 3', price: 200, quantity: 3 },
    ];

    // Save the fake cart items into localStorage for persistence
    localStorage.setItem('cartItems', JSON.stringify(fakeCartItems));

    // Load the cart items from localStorage and set state
    const savedCartItems = localStorage.getItem('cartItems');
    if (savedCartItems) {
      try {
        const parsedItems = JSON.parse(savedCartItems);
        setCartItems(Array.isArray(parsedItems) ? parsedItems : []);
      } catch (e) {
        setError('Failed to parse cart items. Clearing cart.');
        setCartItems([]);
      }
    }

    setLoading(false);
  }, []);

  const calculateGrandTotal = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const handleQuantityChange = (id, newQuantity) => {
    if (newQuantity < 1) return; // Prevent invalid quantity
    const updatedCartItems = cartItems.map((item) =>
      item.id === id ? { ...item, quantity: newQuantity } : item
    );
    setCartItems(updatedCartItems);
    localStorage.setItem('cartItems', JSON.stringify(updatedCartItems));
  };

  const handleRemoveItem = (id) => {
    const updatedCartItems = cartItems.filter((item) => item.id !== id);
    setCartItems(updatedCartItems);
    localStorage.setItem('cartItems', JSON.stringify(updatedCartItems));
    showToastNotification('Item removed from cart.');
  };

  const handleCheckout = () => {
    if (cartItems.length === 0) {
      showToastNotification('Your cart is empty!');
      return;
    }
    setShowModal(true);
  };

  const confirmCheckout = () => {
    if (!shippingDetails || !paymentMethod) {
      showToastNotification('Please provide shipping details and select a payment method.');
      return;
    }
    setCartItems([]);
    localStorage.setItem('cartItems', JSON.stringify([]));
    setShowModal(false);
    showToastNotification('Order confirmed! Thank you for your purchase.');
  };

  const showToastNotification = (message) => {
    setToastMessage(message);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  if (loading) {
    return <div className="d-flex justify-content-center mt-5"><Spinner animation="border" /></div>;
  }

  if (error) {
    return <Alert variant="danger">{error}</Alert>;
  }

  return (
    <div>
      <Toast
        show={showToast}
        onClose={() => setShowToast(false)}
        className="position-fixed top-0 end-0 p-3"
        bg="info"
      >
        <Toast.Body>{toastMessage}</Toast.Body>
      </Toast>

      <h2>Cart</h2>
      <Button onClick={() => navigate(-1)} className="mb-3">Back</Button>

      {cartItems.length === 0 ? (
        <Alert variant="info">Your cart is empty</Alert>
      ) : (
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Product</th>
              <th>Quantity</th>
              <th>Price</th>
              <th>Total</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {cartItems.map((item) => (
              <tr key={item.id}>
                <td>{item.name}</td>
                <td>
                  <Form.Control
                    type="number"
                    value={item.quantity}
                    min="1"
                    onChange={(e) =>
                      handleQuantityChange(item.id, parseInt(e.target.value) || 1)
                    }
                  />
                </td>
                <td>₱{item.price}</td>
                <td>₱{item.price * item.quantity}</td>
                <td>
                  <Button
                    variant="danger"
                    onClick={() => handleRemoveItem(item.id)}
                  >
                    Remove
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}

      <h3>Grand Total: ₱{calculateGrandTotal()}</h3>
      <Button
        style={{ backgroundColor: '#6a8759', border: 'none' }}
        disabled={cartItems.length === 0}
        onClick={handleCheckout}
      >
        Checkout
      </Button>

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Checkout</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Label>Shipping Details</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                value={shippingDetails}
                onChange={(e) => setShippingDetails(e.target.value)}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Payment Method</Form.Label>
              <Form.Check
                type="radio"
                label="Cash on Delivery"
                name="paymentMethod"
                value="Cash on Delivery"
                onChange={(e) => setPaymentMethod(e.target.value)}
              />
              <Form.Check
                type="radio"
                label="Credit/Debit Card"
                name="paymentMethod"
                value="Credit/Debit Card"
                onChange={(e) => setPaymentMethod(e.target.value)}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cancel
          </Button>
          <Button
            style={{ backgroundColor: '#6a8759', border: 'none' }}
            onClick={confirmCheckout}
          >
            Confirm Order
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Cart;
