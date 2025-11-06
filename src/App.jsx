import { useEffect, useState } from "react";
import "./App.css";
import Footer from "./components/Layout/Footer";
import Header from "./components/Layout/Header";
import Home from "./components/Layout/Home";
import Store from "./components/Layout/Store";
import axios from "axios";

function App() {
  const api = "https://api.escuelajs.co/api/v1/products";

  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(api);
        setProducts(res.data);
        console.log(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, []);

  return (
    <>
      {/* <Home /> */}
      <Store products={products} />
    </>
  );
}

export default App;

// API_KEY = https://api.escuelajs.co/api/v1/products
// API_KEY = https://api.escuelajs.co/api/v1/categories
