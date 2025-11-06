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

function App() {
  const [products, setProducts] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [showCart, setShowCart] = useState(false);

  //API CALL
  const api = "https://api.escuelajs.co/api/v1/products";
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(api);
        // console.log(res.data);
        setProducts(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, []);

  //Adding Items to cart
  const addToCart = (product) => {
    console.log(product);
    setCartItems((prev) => [...prev, { ...product, qty: 1 }]);
    setShowCart(true);
  };

  //Deleting Items to cart
  const onRemoveHandler = (id) => {
    setCartItems(cartItems.filter((item) => item.id !== id));
  };

  const handlePurchase = () => {
    alert("Thanks for shopping!");
    setCartItems([]);
    // setShowCart(false);
  };

  return (
    <>
      <Header onCartClick={() => setShowCart(true)} cartItems={cartItems} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/store"
          element={<Store productsData={products} addToCart={addToCart} />}
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
