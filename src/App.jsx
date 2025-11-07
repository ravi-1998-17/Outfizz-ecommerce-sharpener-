import "./App.css";
import { Route, Routes } from "react-router-dom";
import Header from "./components/layout/Header";
import Home from "./pages/Home/Home";
import Store from "./pages/Store/Store";
import About from "./pages/About/About";
import Blog from "./pages/Blog/Blog";
import CartModal from "./components/cart/CartModal";
import { useEffect, useState } from "react";
import axios from "axios";
import CartItem from "./components/cart/Cartitem/CartItem";
import { Spinner } from "react-bootstrap";

function App() {
  const [products, setProducts] = useState([]);
  const [cartItems, setCartItems] = useState(() => {
    const savedItems = localStorage.getItem("savedItems");
    return savedItems ? JSON.parse(savedItems) : [];
  });
  const [showCart, setShowCart] = useState(false);
  const [loading, setLoading] = useState(false);

  //API CALL USING AXIOS & ASYNC AWAIT
  const api = "https://api.escuelajs.co/api/v1/products";
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const res = await axios.get(api);
        // console.log(res.data);
        setProducts(res.data);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  //Adding items to the local storage
  useEffect(() => {
    localStorage.setItem("savedItems", JSON.stringify(cartItems));
  }, [cartItems]);

  //Adding Items to cart
  const addToCart = (product) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.id === product.id);

      if (existingItem) {
        return prevItems.map((item) =>
          item.id === product.id ? { ...item, qty: item.qty + 1 } : item
        );
      } else {
        return [...prevItems, { ...product, qty: 1 }];
      }
    });

    setShowCart(true);
  };

  //Deleting Items to cart
  const onRemoveHandler = (id) => {
    setCartItems(cartItems.filter((item) => item.id !== id));
  };

  const handlePurchase = () => {
    alert("Thanks for shopping!");
    setCartItems([]);
  };

  return (
    <>
      <Header onCartClick={() => setShowCart(true)} cartItems={cartItems} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/store"
          element={
            loading ? (
              <div
                className="d-flex justify-content-center align-items-center"
                style={{ height: "80vh" }}
              >
                <Spinner animation="border" role="status" variant="dark" />
                <span className="ms-2 fw-semibold">Loading products...</span>
              </div>
            ) : (
              <Store productsData={products} addToCart={addToCart} />
            )
          }
        />

        <Route path="/about" element={<About />} />
        <Route path="/blog" element={<Blog />} />
      </Routes>

      {/* Cart Modal */}
      <CartModal
        show={showCart}
        onClose={() => setShowCart(false)}
        cartItems={cartItems}
        onRemove={onRemoveHandler}
        onPurchase={handlePurchase}
      />
    </>
  );
}

export default App;

// const api = "https://api.escuelajs.co/api/v1/products";
// API_KEY = https://api.escuelajs.co/api/v1/products
// API_KEY = https://api.escuelajs.co/api/v1/categories
