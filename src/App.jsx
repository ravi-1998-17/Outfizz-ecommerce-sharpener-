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

function App() {
  const [showCart, setShowCart] = useState(false);

  const api = "https://api.escuelajs.co/api/v1/products";
  const [products, setProducts] = useState([]);

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

  return (
    <>
      <Header onCartClick={() => setShowCart(true)} />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/store" element={<Store productsData={products} />} />
        <Route path="/about" element={<About />} />
        <Route path="/blog" element={<Blog />} />
      </Routes>

      {showCart && <CartModal onClose={() => setShowCart(false)} />}
    </>
  );
}

export default App;

// const api = "https://api.escuelajs.co/api/v1/products";
// API_KEY = https://api.escuelajs.co/api/v1/products
// API_KEY = https://api.escuelajs.co/api/v1/categories
