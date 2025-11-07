import React from "react";
import ReactDOM from "react-dom";
import classes from "@/components/cart/CartModal.module.css";
import Cart from "./Cart";

const CartModal = ({ show, onClose, cartItems, onRemove, onPurchase }) => {
  if (!show) return null;

  return ReactDOM.createPortal(
    <>
      <div className={classes.modal}>
        <Cart onClose={onClose} cartItems={cartItems} onRemove={onRemove} onPurchase={onPurchase}/>
      </div>
    </>,
    document.getElementById("cart-overlay")
  );
};

export default React.memo(CartModal);
