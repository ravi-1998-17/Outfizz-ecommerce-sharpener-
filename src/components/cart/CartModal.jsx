import React, { useContext } from "react";
import ReactDOM from "react-dom";
import classes from "@/components/cart/CartModal.module.css";
import Cart from "./Cart";
import { shopContext } from "@/components/contexts/shopContext";

const CartModal = () => {
  const { showCart } = useContext(shopContext);

  if (!showCart) return null;

  return ReactDOM.createPortal(
    <div className={classes.modal}>
      <Cart />
    </div>,
    document.getElementById("cart-overlay")
  );
};

export default React.memo(CartModal);
