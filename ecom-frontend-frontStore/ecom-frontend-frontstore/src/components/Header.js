import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';

const Header = ({ cartCount }) => {
  return (
    <Navbar bg="light" expand="lg">
      <Navbar.Brand href="/">Shop</Navbar.Brand>
      <Nav className="ml-auto">
        <Nav.Link href="/cart">Cart ({cartCount})</Nav.Link>
      </Nav>
    </Navbar>
  );
};

export default Header;
