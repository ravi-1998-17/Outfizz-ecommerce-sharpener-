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
import { Spinner } from "react-bootstrap";

function App() {
  const [products, setProducts] = useState([]);
  const [cartItems, setCartItems] = useState(() => {
    const savedItems = localStorage.getItem("savedItems");
    return savedItems ? JSON.parse(savedItems) : [];
  });
  const [showCart, setShowCart] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

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
        console.error("API Error:", err);

        if (err.response) {
          if (err.response.status === 404) {
            setError(
              "⚠️ Oops! Products not found (404). Please check the API URL."
            );
          } else if (err.response.status === 500) {
            setError("🚨 Server is having issues. Please try again later.");
          } else {
            setError(`❌ Unexpected error: ${err.response.statusText}`);
          }
        } else if (err.request) {
          setError("🌐 Network error: No response from the server.");
        } else {
          setError("❗ Something went wrong while setting up the request.");
        }
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
            ) : error ? (
              <div
                className="d-flex justify-content-center align-items-center text-center flex-column"
                style={{ height: "80vh" }}
              >
                <h4 className="text-danger">{error}</h4>
                <p className="text-muted mt-2">
                  Try refreshing the page or come back later.
                </p>
              </div>
            ) : products.length === 0 ? (
              <div
                className="d-flex justify-content-center align-items-center text-center"
                style={{ height: "80vh" }}
              >
                <h4 className="text-muted">No products found here 😢</h4>
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
