import "./App.css";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import { useCallback, useEffect, useState } from "react";
import { Spinner } from "react-bootstrap";
import axios from "axios";

// Pages
import Home from "./pages/Home/Home";
import Store from "./pages/Store/Store";
import About from "./pages/About/About";
import Blog from "./pages/Blog/Blog";
import Contact from "./pages/Contact/Contact";
import LoginPage from "./pages/LoginPage/LoginPage";

// Layouts
import Header from "./components/Layout/Header";
import Footer from "./components/Layout/Footer";

// Child Components
import CartModal from "./components/cart/CartModal";
import ProductDetails from "./components/shop/ProductDetails";

// Firebase
import { auth } from "./firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";

function App() {
  const navigate = useNavigate();
  const location = useLocation();

  const [products, setProducts] = useState([]);
  const [cartItems, setCartItems] = useState(() => {
    const saved = localStorage.getItem("savedItems");
    return saved ? JSON.parse(saved) : [];
  });
  const [showCart, setShowCart] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [customerQueries, setCustomerQueries] = useState([]);

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loadingAuth, setLoadingAuth] = useState(true);

  // Fetch Products
  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const res = await axios.get("https://api.escuelajs.co/api/v1/products");
        setProducts(res.data);
      } catch (err) {
        if (err.response) {
          if (err.response.status === 404) setError("Products not found (404)");
          else if (err.response.status === 500)
            setError("Server issue, try later");
        } else if (err.request) setError("Network error");
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  // Save cart to localStorage
  useEffect(() => {
    localStorage.setItem("savedItems", JSON.stringify(cartItems));
  }, [cartItems]);

  // Add to Cart
  const addToCart = useCallback((product) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing)
        return prev.map((item) =>
          item.id === product.id ? { ...item, qty: item.qty + 1 } : item
        );
      return [...prev, { ...product, qty: 1 }];
    });
    setShowCart(true);
  }, []);

  // Remove from Cart
  const onRemoveHandler = useCallback((id) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  }, []);

  // Handle Purchase
  const handlePurchase = useCallback(() => {
    alert("Thanks for shopping!");
    setCartItems([]);
    navigate("/");
  }, [navigate]);

  // Logout
  const handleLogout = async () => {
    await signOut(auth);
    setIsLoggedIn(false);
  };

  // Contact database
  const customerDatabase =
    "https://outfizz-ecommerce-sharpener-db-default-rtdb.firebaseio.com/customer.json";

  const customerQueryDatabase = useCallback(
    async (formData) => {
      const timestamp = new Date();
      const dataWithDate = {
        ...formData,
        date: timestamp.toLocaleDateString(),
        time: timestamp.toLocaleTimeString(),
      };
      try {
        await axios.post(customerDatabase, dataWithDate);
      } catch (err) {
        console.error("Error sending contact data:", err.message);
      }
    },
    [customerDatabase]
  );

  const fetchingCustomerDatabase = useCallback(async () => {
    try {
      const res = await axios.get(customerDatabase);
      if (!res.data) {
        setCustomerQueries([]);
        return;
      }
      const dataArray = Object.keys(res.data).map((key) => ({
        id: key,
        ...res.data[key],
      }));
      setCustomerQueries(dataArray);
    } catch (err) {
      console.error("Error fetching customer data:", err.message);
    }
  }, [customerDatabase]);

  const deleteCustomerRecord = useCallback(async (id) => {
    try {
      await axios.delete(
        `https://outfizz-ecommerce-sharpener-db-default-rtdb.firebaseio.com/customer/${id}.json`
      );
      setCustomerQueries((prev) => prev.filter((item) => item.id !== id));
    } catch (err) {
      console.error("Error deleting record:", err.message);
    }
  }, []);

  // FIREBASE AUTH LISTNER
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
      setLoadingAuth(false);
    });

  // Stop listening when component closes
    return () => unsubscribe();
  }, []);

  // LOGIN PAGE SPINER
  if (loadingAuth) {
    return (
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ height: "100vh" }}
      >
        <Spinner animation="border" role="status" />
      </div>
    );
  }

  return (
    <>
      {!isLoggedIn ? (
        <LoginPage onLoginSuccess={() => setIsLoggedIn(true)} />
      ) : (
        <>
          <Header
            onCartClick={() => setShowCart(true)}
            cartItems={cartItems}
            onLogout={handleLogout}
          />

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
                    <Spinner animation="border" role="status" />
                    <span className="ms-2 fw-semibold">
                      Loading products...
                    </span>
                  </div>
                ) : error ? (
                  <div
                    className="d-flex justify-content-center align-items-center flex-column text-center"
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
            <Route
              path="/product/:id"
              element={<ProductDetails addToCart={addToCart} />}
            />
            <Route path="/about" element={<About />} />
            <Route path="/blog" element={<Blog />} />
            <Route
              path="/contact"
              element={
                <Contact
                  customerQueryDatabase={customerQueryDatabase}
                  fetchingCustomerDatabase={fetchingCustomerDatabase}
                  customerQueries={customerQueries}
                  deleteCustomerRecord={deleteCustomerRecord}
                />
              }
            />
          </Routes>

          {location.pathname !== "/" && <Footer />}

          <CartModal
            show={showCart}
            onClose={() => setShowCart(false)}
            cartItems={cartItems}
            onRemove={onRemoveHandler}
            onPurchase={handlePurchase}
          />
        </>
      )}
    </>
  );
}

export default App;
