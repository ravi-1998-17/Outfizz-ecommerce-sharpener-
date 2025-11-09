import React from "react";
import { Container, Form, Nav, Navbar } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import classes from "@/components/Layout/Header.module.css";
import SearchIpt from "../common/SearchIpt";
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
        {/* Logo */}
        <Navbar.Brand
          as={NavLink}
          to="/"
          className="fs-4 fw-semibold text-uppercase"
        >
          Outfizz & Co.
        </Navbar.Brand>

        {/* Top-right actions on mobile + desktop */}
        <div className="d-flex align-items-center gap-2 order-lg-2">
          <CartButton onCartClick={onCartClick} cartItems={cartItems} />
          <LoginButton onLogout={onLogout} />
          {/* Hamburger button visible on mobile */}
          <Navbar.Toggle aria-controls="navbar-collapse" />
        </div>

        {/* Collapsible nav links + search */}
        <Navbar.Collapse
          id="navbar-collapse"
          className="order-lg-1 mt-3 mt-lg-0"
        >
          <Nav className="flex-column flex-lg-row gap-2 gap-lg-3 align-items-start align-items-lg-center">
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

            {/* Search bar inside menu on mobile */}
            <Form className="d-lg-none mt-3 w-100">
              <SearchIpt
                type="text"
                name="search"
                placeholder="Search..."
                onChange={() => console.log("Searching item")}
              />
            </Form>
          </Nav>
        </Navbar.Collapse>

        {/* Desktop search bar */}
        <Form className="d-none d-lg-block ms-3">
          <SearchIpt
            type="text"
            name="search"
            placeholder="Search..."
            onChange={() => console.log("Searching item")}
          />
        </Form>
      </Container>
    </Navbar>
  );
};

export default React.memo(Header);
