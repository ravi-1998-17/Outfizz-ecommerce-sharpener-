import React from "react";
import classes from "@/components/Cart/CartButton.module.css";

const CartButton = () => {
  const cartCount = 3;

  return (
    <>
      <button
        className={`border-0 bg-transparent position-relative ${classes.cartButton}`}
      >
        <i className={`bi bi-cart ${classes.cartIcon}`}></i>

        <span className={`${classes.badge}`}>{cartCount}</span>
      </button>
    </>
  );
};

export default CartButton;
