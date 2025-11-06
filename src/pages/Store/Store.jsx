import ProductCard from "@/components/shop/ProductCard";
import React from "react";
import { Container } from "react-bootstrap";
import classes from "@/pages/Store/Store.module.css";

const Store = ({ productsData, addToCart }) => {
  return (
    <>
      <Container
        fluid
        className={`d-flex align-items-center justify-content-center ${classes.store}`}
      >
        <h1>Store</h1>
      </Container>
      <ProductCard productsData={productsData} addToCart={addToCart} />
    </>
  );
};

export default Store;
