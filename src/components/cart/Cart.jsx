import React, { useMemo } from "react";
import classes from "@/components/cart/Cart.module.css";
import CartItem from "./Cartitem/CartItem";
import { CloseButton, Button } from "react-bootstrap";

const Cart = ({ onClose, cartItems, onRemove, onPurchase }) => {
  // Derived value with useMemo
  const totalPrice = useMemo(() => {
    return cartItems.reduce(
      (total, item) => total + Number(item.price) * Number(item.qty),
      0
    );
  }, [cartItems]);

  return (
    <div
      className={`${classes.cart} p-3 d-flex flex-column justify-content-between`}
    >
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2 className="fs-4 fw-bold mb-0">Cart</h2>
        <CloseButton onClick={onClose} />
      </div>
      <hr />

      <div className="flex-grow-1 overflow-auto mb-3">
        {cartItems.map((item, idx) => (
          <CartItem
            key={idx}
            img={item.images}
            title={item.title}
            qty={item.qty}
            price={`${item.price}`}
            onRemove={() => onRemove(item.id)}
          />
        ))}
        <hr />
      </div>

      <div className="p-3 mt-5 border rounded bg-light d-flex justify-content-between align-items-center">
        <h5 className="mb-0">
          Total: <span className="fw-bold">${+totalPrice}</span>
        </h5>
        <Button variant="dark" onClick={onPurchase}>
          Purchase
        </Button>
      </div>
    </div>
  );
};

export default Cart;
