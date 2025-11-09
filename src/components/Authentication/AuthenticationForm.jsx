import React, { useState } from "react";
import { Form, Button, Card, Spinner } from "react-bootstrap";
import { auth } from "@/firebase"; 
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";

const AuthenticationForm = ({ onLoginSuccess }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [loader, setLoader] = useState(false);
  const [error, setError] = useState("");

  // handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // handle submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoader(true);
    setError("");

    try {
      if (isLogin) {
        // LOGIN EXISTING USER
        await signInWithEmailAndPassword(auth, formData.email, formData.password);
        onLoginSuccess(); // tell App.js user is logged in
      } else {
        // CREATE NEW USER
        await createUserWithEmailAndPassword(auth, formData.email, formData.password);
        alert("Account created successfully! Now login.");
        setIsLogin(true);
      }
    } catch (err) {
      setError(err.message);
      console.log(err)
    } finally {
      setLoader(false);
    }
  };

  // toggle login/signup
  const toggleForm = () => {
    setIsLogin((prev) => !prev);
    setFormData({ name: "", email: "", password: "" });
    setError("");
  };

  return (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{ minHeight: "100vh", backgroundColor: "#fff" }}
    >
      <Card style={{ width: "100%", maxWidth: "400px", padding: "2rem" }}>
        <h2 className="text-center mb-3" style={{ color: "var(--red)" }}>
          {isLogin ? "Welcome Back" : "Create Account"}
        </h2>
        <p className="text-center text-muted mb-4">
          {isLogin ? "Login with your email" : "Sign up with your email"}
        </p>

        <Form onSubmit={handleSubmit}>
          {!isLogin && (
            <Form.Group className="mb-3" controlId="formName">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                name="name"
                placeholder="Enter your name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </Form.Group>
          )}

          <Form.Group className="mb-3" controlId="formEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              name="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Button
            type="submit"
            className="w-100 mb-3"
            style={{ backgroundColor: "var(--red)", borderColor: "var(--red)" }}
          >
            {isLogin ? "Login" : "Sign Up"}
          </Button>

          {loader && (
            <div className="d-flex justify-content-center align-items-center gap-1 mt-2">
              <Spinner animation="border" size="sm" className="text-danger" />
              <span>Authenticating...</span>
            </div>
          )}

          {error && <p className="text-danger text-center mt-2">{error}</p>}
        </Form>

        <div className="text-center mt-3">
          <Button
            variant="outline-danger"
            onClick={toggleForm}
            style={{ borderColor: "var(--red)", color: "var(--red)" }}
          >
            {isLogin
              ? "I don't have an account → Sign Up"
              : "Already have an account → Login"}
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default AuthenticationForm;
