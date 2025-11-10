import React from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import { NavLink, useNavigate } from "react-router-dom";
import classes from "@/components/Layout/Header.module.css";
import CartButton from "../cart/CartButton";
import LoginButton from "../Authentication/LoginButton";
import { ShopContext } from "../contexts/ShopContext";

const Header = ({ onLogout }) => {
  const navigate = useNavigate();
  const { cartItems, setShowCart } = React.useContext(ShopContext);

  const handleChangePassword = () => {
    navigate("/change-password");
  };

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

        <div className="d-flex align-items-center gap-3 order-lg-2 ms-auto">
          <CartButton onCartClick={() => setShowCart(true)} cartItems={cartItems} />

          {/* 🔹 Change Password Button */}
          <button
            onClick={handleChangePassword}
            className="border-0 bg-transparent position-relative text-danger fw-semibold"
            style={{ cursor: "pointer" }}
          >
            <i className="bi bi-key me-1"></i> Change Pwd
          </button>

          {/* 🔹 Logout Button */}
          <LoginButton onLogout={onLogout} />
          <Navbar.Toggle aria-controls="navbar-collapse" />
        </div>

        <Navbar.Collapse id="navbar-collapse" className="justify-content-center">
          <Nav className="mx-auto gap-3">
            <Nav.Link as={NavLink} to="/" end className={`${classes.navLink}`}>
              Home
            </Nav.Link>
            <Nav.Link as={NavLink} to="/about" className={`${classes.navLink}`}>
              About
            </Nav.Link>
            <Nav.Link as={NavLink} to="/store" className={`${classes.navLink}`}>
              Store
            </Nav.Link>
            <Nav.Link as={NavLink} to="/blog" className={`${classes.navLink}`}>
              Blog
            </Nav.Link>
            <Nav.Link as={NavLink} to="/contact" className={`${classes.navLink}`}>
              Contact
            </Nav.Link>
            
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default React.memo(Header);
