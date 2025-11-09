import React from "react";
import classes from "@/components/cart/CartButton.module.css";

const CartButton = ({ onCartClick, cartItems }) => {
  const cartCount = cartItems.length;

  return (
    <>
      <button
        onClick={onCartClick}
        className={`border-0 bg-transparent position-relative ${classes.cartButton}`}
      >
        <i className={`bi bi-cart ${classes.cartIcon}`}></i>

        <span className={`${classes.badge}`}>{cartCount}</span>
      </button>
    </>
  );
};

export default CartButton;
