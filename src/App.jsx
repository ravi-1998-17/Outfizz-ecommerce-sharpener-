import "./App.css";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import { useCallback, useEffect, useState } from "react";
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

  const [customerQueries, setCustomerQueries] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loadingAuth, setLoadingAuth] = useState(true);

  const customerDatabase =
    "https://outfizz-ecommerce-sharpener-db-default-rtdb.firebaseio.com/customer.json";

  //  STEP 1 — Validate Firebase Token using /accounts:lookup
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
        // Token invalid
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

  //  STEP 2 — Run token validation when app loads or refreshes
  useEffect(() => {
    validateToken();
  }, [validateToken]);

  //  Contact database handlers
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

  //  Logout handler
  const handleLogout = () => {
    try {
      localStorage.removeItem("token");
      setIsLoggedIn(false);
      navigate("/"); // redirect to home
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  //  Loader for validation
  if (loadingAuth) return <FullPageLoader />;

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
