import React, { useContext, useMemo } from "react";
import classes from "@/components/cart/Cart.module.css";
import CartItem from "./Cartitem/CartItem";
import { CloseButton, Button } from "react-bootstrap";
import { ShopContext } from "../contexts/ShopContext";

const Cart = () => {

  const { cartItems, clearCart, setShowCart } = useContext(ShopContext);

  const totalPrice = useMemo(
    () => cartItems.reduce((total, item) => total + item.price * item.qty, 0),
    [cartItems]
  );

  const handlePurchase = () => {
    alert("Thanks for shopping!");
    clearCart();
    setShowCart(false);
  };

  return (
    <div className={`${classes.cart} p-3 d-flex flex-column justify-content-between`}>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2 className="fs-4 fw-bold mb-0">Cart</h2>
        <CloseButton onClick={() => setShowCart(false)} />
      </div>
      <hr />

      <div className="flex-grow-1 overflow-auto mb-3">
        {cartItems.map((item) => (
          <CartItem key={item.id} item={item} />
        ))}
      </div>

      <div className="p-3 mt-3 border rounded bg-light d-flex justify-content-between align-items-center">
        <h5 className="mb-0">
          Total: <span className="fw-bold">${+totalPrice}</span>
        </h5>
        <Button variant="dark" onClick={handlePurchase}>
          Purchase
        </Button>
      </div>
    </div>
  );
};

export default Cart;
