import React from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import classes from "@/components/Layout/Header.module.css";
import CartButton from "../cart/CartButton";
import LoginButton from "../Authentication/LoginButton";

const Header = ({ onCartClick, cartItems, onLogout }) => {
  return (
<Navbar
  expand="lg"
  className="py-3 shadow sticky-top"
  style={{ backgroundColor: "var(--bg)" }}
>
  <Container className="d-flex justify-content-between align-items-center px-3">
    <Navbar.Brand
      as={NavLink}
      to="/"
      className="fs-4 fw-semibold text-uppercase"
    >
      Outfizz & Co.
    </Navbar.Brand>

    {/* Always visible on right */}
    <div className="d-flex align-items-center gap-3 order-lg-2 ms-auto">
      <CartButton onCartClick={onCartClick} cartItems={cartItems} />
      <LoginButton onLogout={onLogout} />
      <Navbar.Toggle aria-controls="navbar-collapse" />
    </div>

    {/* Center nav links */}
    <Navbar.Collapse
      id="navbar-collapse"
      className="justify-content-center"
    >
      <Nav className="mx-auto gap-3">
        <Nav.Link as={NavLink} to="/" end className={`fs-5 ${classes.navLink}`}>
          Home
        </Nav.Link>
        <Nav.Link as={NavLink} to="/about" className={`fs-5 ${classes.navLink}`}>
          About
        </Nav.Link>
        <Nav.Link as={NavLink} to="/store" className={`fs-5 ${classes.navLink}`}>
          Store
        </Nav.Link>
        <Nav.Link as={NavLink} to="/blog" className={`fs-5 ${classes.navLink}`}>
          Blog
        </Nav.Link>
        <Nav.Link as={NavLink} to="/contact" className={`fs-5 ${classes.navLink}`}>
          Contact
        </Nav.Link>
      </Nav>
    </Navbar.Collapse>
  </Container>
</Navbar>
  );
};

export default React.memo(Header);
