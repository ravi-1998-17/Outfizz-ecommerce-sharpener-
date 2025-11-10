import "./App.css";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import { useCallback, useEffect, useState, useRef } from "react";
import axios from "axios";

// Context
import contactContext from "./components/contexts/ContactContext";
import { ShopProvider } from "./components/contexts/ShopContext";

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

// Reusable Status Components
import {
  Loader,
  FullPageLoader,
  ErrorMessage,
  EmptyState,
} from "./components/common/StatusComponents";
import ChangePassword from "./components/Authentication/ChangePassword";

function App() {
  const navigate = useNavigate();
  const location = useLocation();

  // 🕒 Auto Logout Duration (in milliseconds)
  // Example: 2 * 60 * 1000 = 2 minutes
  const AUTO_LOGOUT_TIME = 2 * 60 * 1000; // ⬅️ Change this manually when needed

  const logoutTimerRef = useRef(null);

  const [customerQueries, setCustomerQueries] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loadingAuth, setLoadingAuth] = useState(true);

  const customerDatabase =
    "https://outfizz-ecommerce-sharpener-db-default-rtdb.firebaseio.com/customer.json";

  // ✅ STEP 1 — Validate Firebase Token
  const validateToken = useCallback(async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      setIsLoggedIn(false);
      setLoadingAuth(false);
      return;
    }

    try {
      const response = await axios.post(
        `https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=AIzaSyAIHXEVXIfCWHYwW5VQ5EDj8Q3c26lXPAk`,
        { idToken: token }
      );

      if (response.data && response.data.users) {
        setIsLoggedIn(true);
      } else {
        localStorage.removeItem("token");
        setIsLoggedIn(false);
      }
    } catch (error) {
      console.error("Token validation failed:", error.response?.data || error.message);
      localStorage.removeItem("token");
      setIsLoggedIn(false);
    } finally {
      setLoadingAuth(false);
    }
  }, []);

  // ✅ STEP 2 — Validate token on load
  useEffect(() => {
    validateToken();
  }, [validateToken]);

  // ✅ STEP 3 — Auto Logout after idle time
  useEffect(() => {
    if (isLoggedIn) {
      if (logoutTimerRef.current) clearTimeout(logoutTimerRef.current);

      logoutTimerRef.current = setTimeout(() => {
        handleLogout();
        alert("You’ve been automatically logged out due to inactivity.");
      }, AUTO_LOGOUT_TIME);
    }

    return () => {
      if (logoutTimerRef.current) clearTimeout(logoutTimerRef.current);
    };
  }, [isLoggedIn]);

  // ✅ STEP 4 — Contact Handlers
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

  // ✅ STEP 5 — Logout Handler
  const handleLogout = useCallback(() => {
    try {
      localStorage.removeItem("token");
      setIsLoggedIn(false);
      navigate("/");
      if (logoutTimerRef.current) clearTimeout(logoutTimerRef.current);
    } catch (error) {
      console.error("Error during logout:", error);
    }
  }, [navigate]);

  // ✅ STEP 6 — Loader during authentication
  if (loadingAuth) return <FullPageLoader />;

  // ✅ STEP 7 — Render
  return (
    <ShopProvider>
      {!isLoggedIn ? (
        <LoginPage onLoginSuccess={() => setIsLoggedIn(true)} />
      ) : (
        <>
          <Header onLogout={handleLogout} />

          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/store" element={<Store />} />
            <Route path="/product/:id" element={<ProductDetails />} />
            <Route path="/about" element={<About />} />
            <Route path="/blog" element={<Blog />} />
            <Route
              path="/contact"
              element={
                <contactContext.Provider
                  value={{
                    customerQueryDatabase,
                    fetchingCustomerDatabase,
                    customerQueries,
                    deleteCustomerRecord,
                  }}
                >
                  <Contact />
                </contactContext.Provider>
              }
            />
            <Route
              path="/change-password"
              element={<ChangePassword onClose={() => navigate(-1)} />}
            />
          </Routes>

          {location.pathname !== "/" && <Footer />}
          <CartModal />
        </>
      )}
    </ShopProvider>
  );
}

export default App;
