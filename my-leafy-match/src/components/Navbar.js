import React from "react";
import { Link } from "react-router-dom";
import { Navbar, Nav, Container } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

const NavigationBar = () => {
  // Check if token is present in local storage
  const token = localStorage.getItem("token");

  const handleLogout = () => {
    // Clear token from local storage
    localStorage.removeItem("token");
    // You may want to perform additional logout actions here
  };

  // Retrieve cart items from wherever it's stored in your application
  const cartItems = []; // Replace this with your actual cart items

  return (
    <Navbar collapseOnSelect expand="lg" bg="light" variant="light" fixed="top">
      <Container>
        <Navbar.Brand as={Link} to="/">
          LEAFY MATCH
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="mx-auto">
            <Nav.Link as={Link} to="/">
              Home
            </Nav.Link>
            <Nav.Link as={Link} to="/about">
              About
            </Nav.Link>
            <Nav.Link as={Link} to="/contact">
              Contact
            </Nav.Link>
          </Nav>
          <Nav>
            {!token ? (
              // If no token is present, display sign-in button
              <Nav.Link as={Link} to="/signin">
                <i className="fas fa-user"></i> Sign In
              </Nav.Link>
            ) : (
              // If token is present, display logout button
              <Nav.Link onClick={handleLogout}>
                <i className="fas fa-sign-out-alt"></i> Logout
              </Nav.Link>
            )}
            {/* Cart icon */}
            <Nav.Link as={Link} to="/cart">
              <i className="fas fa-shopping-cart"></i>
              {/* Include the number of items in the cart next to the cart icon */}
              {cartItems.length > 0 && (
                <span className="cart-item-count">{cartItems.length}</span>
              )}
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavigationBar;
