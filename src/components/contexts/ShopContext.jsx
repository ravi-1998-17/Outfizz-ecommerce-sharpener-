import React, { createContext, useReducer, useState, useCallback, useEffect } from "react";
import axios from "axios";

export const shopContext = createContext();

export const ShopProvider = ({ children }) => {
  // CART REDUCER
  const cartReducer = (state, action) => {
    switch (action.type) {
      case "ADD_ITEM": {
        const existingItem = state.find((item) => item.id === action.payload.id);
        if (existingItem) {
          return state.map((item) =>
            item.id === action.payload.id ? { ...item, qty: item.qty + 1 } : item
          );
        }
        return [...state, { ...action.payload, qty: 1 }];
      }
      case "REMOVE_ITEM":
        return state.filter((item) => item.id !== action.payload);
      case "CLEAR_CART":
        return [];
      default:
        return state;
    }
  };

  // PRODUCT REDUCER
  const productReducer = (state, action) => {
    switch (action.type) {
      case "FETCH_START":
        return { ...state, loading: true, error: null };
      case "FETCH_SUCCESS":
        return { ...state, loading: false, products: action.payload };
      case "FETCH_ERROR":
        return { ...state, loading: false, error: action.payload };
      default:
        return state;
    }
  };

  // STATES
  const [cartItems, dispatchCart] = useReducer(
    cartReducer,
    JSON.parse(localStorage.getItem("savedItems")) || []
  );
  const [productState, dispatchProducts] = useReducer(productReducer, {
    products: [],
    loading: false,
    error: null,
  });
  const [showCart, setShowCart] = useState(false);

  // SAVE CART TO LOCALSTORAGE
  useEffect(() => {
    localStorage.setItem("savedItems", JSON.stringify(cartItems));
  }, [cartItems]);

  // ADD TO CART
  const addToCart = useCallback((product) => {
    dispatchCart({ type: "ADD_ITEM", payload: product });
    setShowCart(true);
  }, []);

  // REMOVE FROM CART
  const removeFromCart = useCallback((id) => {
    dispatchCart({ type: "REMOVE_ITEM", payload: id });
  }, []);

  // CLEAR CART / PURCHASE
  const clearCart = useCallback(() => {
    dispatchCart({ type: "CLEAR_CART" });
  }, []);

  // FETCH PRODUCTS
  useEffect(() => {
    const fetchProducts = async () => {
      dispatchProducts({ type: "FETCH_START" });
      try {
        const res = await axios.get("https://api.escuelajs.co/api/v1/products");
        dispatchProducts({ type: "FETCH_SUCCESS", payload: res.data });
      } catch (err) {
        let message = "Network error";
        if (err.response) {
          if (err.response.status === 404) message = "Products not found (404)";
          else if (err.response.status === 500) message = "Server issue, try later";
        }
        dispatchProducts({ type: "FETCH_ERROR", payload: message });
      }
    };
    fetchProducts();
  }, []);

  return (
    <shopContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        clearCart,
        showCart,
        setShowCart,
        productState,
      }}
    >
      {children}
    </shopContext.Provider>
  );
};
