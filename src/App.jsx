import { useState } from "react";
import "./App.css";
import { Container } from "react-bootstrap";
import Header from "./components/Layout/Header";

function App() {
 

  return (
    <>
    <Container className="custom-bg">
      <Header />
    </Container>
     
    </>
  );
}

export default App;

// API_KEY = https://api.escuelajs.co/api/v1/products
// API_KEY = https://api.escuelajs.co/api/v1/categories
