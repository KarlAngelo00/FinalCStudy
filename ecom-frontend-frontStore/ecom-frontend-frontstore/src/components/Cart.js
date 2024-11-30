import React, { useState } from 'react';
import { Table, Button, Form, Modal } from 'react-bootstrap';

const Cart = () => {
  const [cartItems, setCartItems] = useState([
    { id: 1, name: 'Product 1', price: 100, quantity: 2 },
    { id: 2, name: 'Product 2', price: 200, quantity: 1 },
    { id: 3, name: 'Product 3', price: 300, quantity: 3 },
  ]);
  const [showModal, setShowModal] = useState(false);
  const [shippingDetails, setShippingDetails] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('');

  // Calculate grand total
  const calculateGrandTotal = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  // Handle quantity change
  const handleQuantityChange = (id, newQuantity) => {
    const updatedCartItems = cartItems.map(item =>
      item.id === id ? { ...item, quantity: newQuantity } : item
    );
    setCartItems(updatedCartItems);
  };

  // Remove item from cart
  const handleRemoveItem = id => {
    const updatedCartItems = cartItems.filter(item => item.id !== id);
    setCartItems(updatedCartItems);
  };

  // Handle checkout button
  const handleCheckout = () => {
    setShowModal(true);
  };

  // Confirm checkout
  const confirmCheckout = () => {
    if (!shippingDetails || !paymentMethod) {
      alert('Please provide shipping details and select a payment method.');
      return;
    }
    // Clear cart and close modal
    setCartItems([]);
    setShowModal(false);
    alert('Order confirmed! Thank you for your purchase.');
  };

  return (
    <div>
      <h2>Cart</h2>
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
          {cartItems.map(item => (
            <tr key={item.id}>
              <td>{item.name}</td>
              <td>
                <Form.Control
                  type="number"
                  value={item.quantity}
                  min="1"
                  onChange={e => handleQuantityChange(item.id, parseInt(e.target.value) || 1)}
                  style={{ width: '70px' }}
                />
              </td>
              <td>₱{item.price}</td>
              <td>₱{item.price * item.quantity}</td>
              <td>
                <Button variant="danger" onClick={() => handleRemoveItem(item.id)}>
                  Remove
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <h3>Grand Total: ₱{calculateGrandTotal()}</h3>
      <Button
        style={{ backgroundColor: '#6a8759', border: 'none' }}
        disabled={cartItems.length === 0}
        onClick={handleCheckout}
      >
        Checkout
      </Button>

      {/* Checkout Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Checkout</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Shipping Details</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                value={shippingDetails}
                onChange={e => setShippingDetails(e.target.value)}
                placeholder="Enter your address and contact details"
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Payment Method</Form.Label>
              <Form.Check
                type="radio"
                label="Cash on Delivery"
                name="paymentMethod"
                value="Cash on Delivery"
                onChange={e => setPaymentMethod(e.target.value)}
              />
              <Form.Check
                type="radio"
                label="Credit/Debit Card"
                name="paymentMethod"
                value="Credit/Debit Card"
                onChange={e => setPaymentMethod(e.target.value)}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cancel
          </Button>
          <Button style={{ backgroundColor: '#6a8759', border: 'none' }} onClick={confirmCheckout}>
            Confirm Order
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Cart;
