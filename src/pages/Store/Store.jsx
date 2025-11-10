import React, { useContext } from "react";
import { Container } from "react-bootstrap";
import classes from "@/pages/Store/Store.module.css";
import ProductCard from "@/components/shop/ProductCard";
import { Loader, ErrorMessage, EmptyState } from "@/components/common/StatusComponents";
import { ShopContext } from "@/components/contexts/ShopContext";

const Store = () => {
  const { productState, addToCart } = useContext(ShopContext);

  return (
    <>
      <Container
        fluid
        className={`d-flex align-items-center justify-content-center ${classes.store}`}
      >
        <h1>Store</h1>
      </Container>

      {productState.loading ? (
        <Loader message="Loading products..." />
      ) : productState.error ? (
        <ErrorMessage message={productState.error} />
      ) : productState.products.length === 0 ? (
        <EmptyState message="No products found here 😢" />
      ) : (
        <ProductCard productsData={productState.products} addToCart={addToCart} />
      )}
    </>
  );
};

export default React.memo(Store);
