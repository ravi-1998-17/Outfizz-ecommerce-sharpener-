import React from "react";
import { Container, Form, Nav, Navbar } from "react-bootstrap";
import SearchInput from "../UI/SearchInput";
import classes from "@/components/Layout/Header.module.css";

const Header = () => {
  return (
    <>
      <Navbar className="py-4" collapseOnSelect expand="lg border">
        <Container
          fluid
          className="d-flex justify-content-between align-items-center"
        >
          <Navbar.Brand
            href="#"
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
              <Nav.Link href="#" className={`fs-5 ${classes.navLink}`}>
                About
              </Nav.Link>
              <Nav.Link href="#" className={`fs-5 ${classes.navLink}`}>
                Store
              </Nav.Link>
              <Nav.Link href="#" className={`fs-5 ${classes.navLink}`}>
                Blog
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>

          <Form className="d-flex justify-content-ceter align-items-center gap-3">
            <i className={`bi bi-cart ${classes.cartIcon}`}></i>
            <SearchInput
              type="text"
              name="search"
              // value=""
              onChange={() => console.log("Item Searching")}
              placeholder="Search..."
            />
          </Form>
        </Container>
      </Navbar>
    </>
  );
};

export default Header;
