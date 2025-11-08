import React from "react";
import { Container, Form, Nav, Navbar } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import classes from "@/components/layout/Header.module.css";
import SearchIpt from "../common/SearchIpt";
import CartButton from "../cart/CartButton";
import LoginButton from "../Authentication/LoginButton";

const Header = ({ onCartClick, cartItems }) => {
  return (
    <Navbar
      className={`py-4 sticky-top shadow`}
      style={{ backgroundColor: "var(--bg)" }}
      collapseOnSelect
      expand="lg"
    >
      <Container className="d-flex justify-content-between align-items-center">
        <Navbar.Brand
          as={NavLink}
          to="/"
          sticky="top"
          className="fs-4 fw-semibold text-uppercase"
        >
          Outfizz & Co.
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse
          id="responsive-navbar-nav"
          className="justify-content-center"
        >
          <Nav className="gap-5">
            <Nav.Link
              as={NavLink}
              to="/"
              end
              className={`fs-5 ${classes.navLink}`}
            >
              Home
            </Nav.Link>
            <Nav.Link
              as={NavLink}
              to="/about"
              className={`fs-5 ${classes.navLink}`}
            >
              About
            </Nav.Link>
            <Nav.Link
              as={NavLink}
              to="/store"
              className={`fs-5 ${classes.navLink}`}
            >
              Store
            </Nav.Link>
            <Nav.Link
              as={NavLink}
              to="/blog"
              className={`fs-5 ${classes.navLink}`}
            >
              Blog
            </Nav.Link>
            <Nav.Link
              as={NavLink}
              to="/contact"
              className={`fs-5 ${classes.navLink}`}
            >
              Contact
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>

        <div className="d-flex justify-content-ceter align-items-center gap-3">
          <CartButton onCartClick={onCartClick} cartItems={cartItems} />
          <Form>
            <SearchIpt
              type="text"
              name="search"
              placeholder="Search..."
              onChange={() => console.log("Searching item")}
            />
          </Form>
          {/* Login Button */}

        </div>
      </Container>
    </Navbar>
  );
};

export default React.memo(Header);
