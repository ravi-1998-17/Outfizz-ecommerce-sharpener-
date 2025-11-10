import React, { useRef, useState } from "react";
import { Form, Button, Card, Spinner } from "react-bootstrap";
import axios from "axios";

const AuthenticationForm = ({ onLoginSuccess }) => {
  const AUTH_API_KEY = "AIzaSyAIHXEVXIfCWHYwW5VQ5EDj8Q3c26lXPAk";

  // toggle login/signup
  const [isLogin, setIsLogin] = useState(true);
  const [loader, setLoader] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [isResetMode, setIsResetMode] = useState(false);

  // useRef for inputs instead of useState
  const nameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();

  // handle submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoader(true);
    setError("");
    setMessage("");

    const email = emailRef.current.value;
    const password = passwordRef.current.value;

    try {
      if (isResetMode) {
        // Forgot Password API call
        const resetURL = `https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=${AUTH_API_KEY}`;
        await axios.post(resetURL, {
          requestType: "PASSWORD_RESET",
          email,
        });
        setMessage("Password reset email sent! Check your inbox.");
        setIsResetMode(false);
        setLoader(false);
        return;
      }

      // Login / Signup URLs
      const url = isLogin
        ? `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${AUTH_API_KEY}`
        : `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${AUTH_API_KEY}`;

      const response = await axios.post(url, {
        email,
        password,
        returnSecureToken: true,
      });

      // Store JWT token
      localStorage.setItem("token", response.data.idToken);

      if (isLogin) {
        onLoginSuccess();
      } else {
        alert("Account created successfully! Please login.");
        setIsLogin(true);
      }
    } catch (err) {
      console.error("Auth error:", err);
      if (isLogin) {
        alert("Wrong password or invalid credentials. Please retry.");
      }
      setError("Authentication failed. Please check your details.");
    } finally {
      setLoader(false);
    }
  };

  // toggle login/signup
  const toggleForm = () => {
    setIsLogin((prev) => !prev);
    setIsResetMode(false);
    setError("");
    setMessage("");
  };

  // handle "Forgot Password" toggle
  const handleForgotPassword = () => {
    setIsResetMode(true);
    setError("");
    setMessage("");
  };

  return (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{ minHeight: "100vh", backgroundColor: "#fff" }}
    >
      <Card style={{ width: "100%", maxWidth: "400px", padding: "2rem" }}>
        <h2 className="text-center mb-3" style={{ color: "var(--red)" }}>
          {isResetMode
            ? "Reset Password"
            : isLogin
            ? "Welcome Back"
            : "Create Account"}
        </h2>

        <p className="text-center text-muted mb-4">
          {isResetMode
            ? "Enter your email to receive password reset link"
            : isLogin
            ? "Login with your email"
            : "Sign up with your email"}
        </p>

        <Form onSubmit={handleSubmit}>
          {!isLogin && !isResetMode && (
            <Form.Group className="mb-3" controlId="formName">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                name="name"
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
              name="email"
              placeholder="Enter your email"
              ref={emailRef}
              required
            />
          </Form.Group>

          {!isResetMode && (
            <Form.Group className="mb-3" controlId="formPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                name="password"
                placeholder="Enter your password"
                ref={passwordRef}
                required
              />
            </Form.Group>
          )}

          <Button
            type="submit"
            className="w-100 mb-3"
            style={{ backgroundColor: "var(--red)", borderColor: "var(--red)" }}
          >
            {loader ? (
              <>
                <Spinner animation="border" size="sm" className="me-2" />
                {isResetMode
                  ? "Sending..."
                  : isLogin
                  ? "Logging in..."
                  : "Signing up..."}
              </>
            ) : isResetMode ? (
              "Send Reset Link"
            ) : isLogin ? (
              "Login"
            ) : (
              "Sign Up"
            )}
          </Button>

          {error && <p className="text-danger text-center mt-2">{error}</p>}
          {message && <p className="text-success text-center mt-2">{message}</p>}
        </Form>

        {!isResetMode && isLogin && (
          <p
            onClick={handleForgotPassword}
            className="text-center text-decoration-underline mt-2"
            style={{ color: "var(--red)", cursor: "pointer" }}
          >
            Forgot Password?
          </p>
        )}

        <div className="text-center mt-3">
          <Button
            variant="outline-danger"
            onClick={toggleForm}
            style={{ borderColor: "var(--red)", color: "var(--red)" }}
          >
            {isResetMode
              ? "← Back to Login"
              : isLogin
              ? "I don't have an account → Sign Up"
              : "Already have an account → Login"}
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default AuthenticationForm;
