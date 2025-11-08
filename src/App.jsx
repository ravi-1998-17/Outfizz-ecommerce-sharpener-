import "./App.css";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import Header from "./components/layout/Header";
import Home from "./pages/Home/Home";
import Store from "./pages/Store/Store";
import About from "./pages/About/About";
import Blog from "./pages/Blog/Blog";
import CartModal from "./components/cart/CartModal";
import { useCallback, useEffect, useState } from "react";
import axios from "axios";
import { Spinner } from "react-bootstrap";
import Footer from "./components/Layout/Footer";
import Contact from "./pages/Contact/Contact";
import ProductDetails from "./components/shop/ProductDetails";
import LoginPage from "./pages/LoginPage/LoginPage";

function App() {
  const [products, setProducts] = useState([]);
  const [cartItems, setCartItems] = useState(() => {
    const savedItems = localStorage.getItem("savedItems");
    return savedItems ? JSON.parse(savedItems) : [];
  });
  const navigate = useNavigate();
  const [showCart, setShowCart] = useState(false);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [customerQueries, setCustomerQueries] = useState([]);

  // Login and Logout
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  //FETCH PRODUCTS USING AXIOS & ASYNC AWAIT
  const api = "https://api.escuelajs.co/api/v1/products";
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const res = await axios.get(api);
        setProducts(res.data);
      } catch (err) {
        console.error("API Error:", err);
        if (err.response) {
          if (err.response.status === 404) {
            setError("Products not found (404). Check the API URL.");
          } else if (err.response.status === 500) {
            setError("Server issue. Please try again later.");
          }
        } else if (err.request) {
          setError("Network error: No response from server.");
        }
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  //STORE CART IN LOCALSTORAGE
  useEffect(() => {
    localStorage.setItem("savedItems", JSON.stringify(cartItems));
  }, [cartItems]);

  //ADD TO CART
  const addToCart = useCallback((product) => {
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
  }, []);

  // REMOVE FROM CART
  const onRemoveHandler = useCallback((id) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
  }, []);

  // HANDLE CART PURCHASE
  const handlePurchase = useCallback(() => {
    alert("Thanks for shopping!");
    setCartItems([]);
    navigate("/");
  }, []);

  const location = useLocation(); // get current route

  // FIREBASE URL (no change)
  const customerDatabase =
    "https://outfizz-ecommerce-sharpener-db-default-rtdb.firebaseio.com/customer.json";

  // SEND CONTACT FORM DATA
  const customerQueryDatabase = useCallback(
    async (formData) => {
      const timestamp = new Date();

      const dataWithDate = {
        ...formData,
        date: timestamp.toLocaleDateString(),
        time: timestamp.toLocaleTimeString(),
      };

      try {
        const response = await axios.post(customerDatabase, dataWithDate);
        console.log("Data sent successfully:", response.data);
      } catch (err) {
        console.error("Error sending data:", err.message);
      }
    },
    [customerDatabase]
  );

  // FETCH CONTACT DATABASE DATA
  const fetchingCustomerDatabase = useCallback(async () => {
    try {
      const response = await axios.get(customerDatabase);

      if (!response.data) {
        setCustomerQueries([]);
        return;
      }

      // Convert Firebase object into array
      const dataArray = [];
      for (const key in response.data) {
        dataArray.push({
          id: key,
          ...response.data[key],
        });
      }

      console.log("Fetched Customer Data:", dataArray);
      setCustomerQueries(dataArray);
    } catch (err) {
      console.error("Error fetching customer data:", err.message);
    }
  }, [customerDatabase]);

  // DELETE FETCH DATA FROM CONTACT DATABASE DATA
  const deleteCustomerRecord = useCallback(
    async (id) => {
      try {
        const deleteUrl = `https://outfizz-ecommerce-sharpener-db-default-rtdb.firebaseio.com/customer/${id}.json`;
        await axios.delete(deleteUrl);
        console.log(`Deleted record with id: ${id}`);

        setCustomerQueries((prevData) =>
          prevData.filter((item) => item.id !== id)
        );
      } catch (err) {
        console.error("Error deleting record:", err.message);
      }
    },
    [customerDatabase]
  );

  return (
    <>
      <>
        {!isLoggedIn ? (
          <LoginPage />
        ) : (
          <>
            <Header
              onCartClick={() => setShowCart(true)}
              cartItems={cartItems}
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
                      <Spinner
                        animation="border"
                        role="status"
                        variant="dark"
                      />
                      <span className="ms-2 fw-semibold">
                        Loading products...
                      </span>
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

            {/* Cart Modal */}
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
    </>
  );
}

export default App;

// const api = "https://api.escuelajs.co/api/v1/products";
// API_KEY = https://api.escuelajs.co/api/v1/products
// API_KEY = https://api.escuelajs.co/api/v1/categories
