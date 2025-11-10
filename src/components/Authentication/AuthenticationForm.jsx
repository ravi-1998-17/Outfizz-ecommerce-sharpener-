import React, { useRef, useState } from "react";
import { Form, Button, Card, Spinner } from "react-bootstrap";
import axios from "axios";

const AuthenticationForm = ({ onLoginSuccess }) => {
  const AUTH_API_KEY = "AIzaSyAIHXEVXIfCWHYwW5VQ5EDj8Q3c26lXPAk";

  const [isLogin, setIsLogin] = useState(true);
  const [loader, setLoader] = useState(false);
  const [error, setError] = useState("");

  const nameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoader(true);
    setError("");

    const email = emailRef.current.value;
    const password = passwordRef.current.value;

    try {
      const url = isLogin
        ? `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${AUTH_API_KEY}`
        : `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${AUTH_API_KEY}`;

      const response = await axios.post(url, {
        email,
        password,
        returnSecureToken: true,
      });

      // Store token
      localStorage.setItem("token", response.data.idToken);

      if (isLogin) {
        onLoginSuccess();
      } else {
        alert("Account created successfully! Please login.");
        setIsLogin(true);
      }
    } catch (err) {
      console.error("Auth error:", err);
      alert("Invalid credentials or something went wrong.");
      setError("Authentication failed. Please check your details.");
    } finally {
      setLoader(false);
    }
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
                placeholder="Enter your name"
                ref={nameRef}
                required
              />
            </Form.Group>
          )}

          <Form.Group className="mb-3" controlId="formEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter your email"
              ref={emailRef}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter your password"
              ref={passwordRef}
              required
            />
          </Form.Group>

          <Button
            type="submit"
            className="w-100 mb-3"
            style={{ backgroundColor: "var(--red)", borderColor: "var(--red)" }}
          >
            {loader ? (
              <>
                <Spinner animation="border" size="sm" className="me-2" />
                {isLogin ? "Logging in..." : "Signing up..."}
              </>
            ) : isLogin ? (
              "Login"
            ) : (
              "Sign Up"
            )}
          </Button>

          {error && <p className="text-danger text-center mt-2">{error}</p>}
        </Form>

        <div className="text-center mt-3">
          <Button
            variant="outline-danger"
            onClick={() => setIsLogin(!isLogin)}
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
