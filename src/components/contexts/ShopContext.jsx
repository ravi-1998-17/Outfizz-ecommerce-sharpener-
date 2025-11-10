import React, { createContext, useReducer, useState, useCallback, useEffect } from "react";
import axios from "axios";

export const shopContext = createContext();

export const ShopProvider = ({ children }) => {
  // CART REDUCER
  const cartReducer = (state, action) => {
    switch (action.type) {
      case "SET_CART":
        return action.payload;
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

  // STATES
  const [cartItems, dispatchCart] = useReducer(cartReducer, []);
  const [productState, setProductState] = useState({ products: [], loading: false, error: null });
  const [showCart, setShowCart] = useState(false);
  const [userId, setUserId] = useState(null);

  const FIREBASE_URL =
    "https://outfizz-ecommerce-sharpener-db-default-rtdb.firebaseio.com";

  // FETCH PRODUCTS
  useEffect(() => {
    const fetchProducts = async () => {
      setProductState((p) => ({ ...p, loading: true }));
      try {
        const res = await axios.get("https://api.escuelajs.co/api/v1/products");
        setProductState({ products: res.data, loading: false, error: null });
      } catch (err) {
        setProductState({ products: [], loading: false, error: "Error loading products" });
      }
    };
    fetchProducts();
  }, []);

  // ✅ Get User UID from Firebase Auth Lookup API
  const fetchUserId = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return null;
      const res = await axios.post(
        `https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=AIzaSyAIHXEVXIfCWHYwW5VQ5EDj8Q3c26lXPAk`,
        { idToken: token }
      );
      return res.data?.users?.[0]?.localId || null;
    } catch {
      return null;
    }
  };

  // ✅ Load User Cart from Firebase
  const loadCartFromFirebase = useCallback(async (uid) => {
    try {
      const res = await axios.get(`${FIREBASE_URL}/userCarts/${uid}.json`);
      if (res.data) {
        const cartArray = Object.keys(res.data).map((key) => ({
          firebaseId: key,
          ...res.data[key],
        }));
        dispatchCart({ type: "SET_CART", payload: cartArray });
      } else {
        dispatchCart({ type: "SET_CART", payload: [] });
      }
    } catch (err) {
      console.error("Error fetching cart:", err.message);
    }
  }, []);

  // ✅ Save Cart to Firebase
  const saveCartToFirebase = useCallback(async (uid, cartItems) => {
    try {
      await axios.put(`${FIREBASE_URL}/userCarts/${uid}.json`, cartItems);
    } catch (err) {
      console.error("Error saving cart:", err.message);
    }
  }, []);

  // ✅ Add to Cart
  const addToCart = useCallback(
    async (product) => {
      dispatchCart({ type: "ADD_ITEM", payload: product });
      setShowCart(true);
      if (userId) {
        const updatedCart = [...cartItems, { ...product, qty: 1 }];
        await saveCartToFirebase(userId, updatedCart);
      }
    },
    [cartItems, userId, saveCartToFirebase]
  );

  // ✅ Remove from Cart
  const removeFromCart = useCallback(
    async (id) => {
      const updatedCart = cartItems.filter((item) => item.id !== id);
      dispatchCart({ type: "REMOVE_ITEM", payload: id });
      if (userId) await saveCartToFirebase(userId, updatedCart);
    },
    [cartItems, userId, saveCartToFirebase]
  );

  // ✅ Clear Cart
  const clearCart = useCallback(async () => {
    dispatchCart({ type: "CLEAR_CART" });
    if (userId) await saveCartToFirebase(userId, []);
  }, [userId, saveCartToFirebase]);

  // ✅ Load user ID & fetch their cart
  useEffect(() => {
    const init = async () => {
      const uid = await fetchUserId();
      if (uid) {
        setUserId(uid);
        await loadCartFromFirebase(uid);
      }
    };
    init();
  }, [loadCartFromFirebase]);

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
