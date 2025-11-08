import React, { useState } from "react";
import { Form, Button, Card, Spinner } from "react-bootstrap";

const AuthenticationForm = () => {
  const [isLogin, setIsLogin] = useState(true); 
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [loader, setLoader] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isLogin) {
      console.log("Logging in with:", {
        email: formData.email,
        password: formData.password,
      });
    } else {
      console.log("Signing up with:", formData);
    }
  };

  const toggleForm = () => {
    setIsLogin((prev) => !prev);
    setFormData({ name: "", email: "", password: "" }); 
  };



  return (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{ minHeight: "100vh", backgroundColor: "#fff" }}
    >
      <Card style={{ width: "100%", maxWidth: "400px", padding: "2rem" }}>
        <h2 className="text-center mb-3" style={{ color: "var(--red)" }}>
          {isLogin ? "Welcome" : "Create Account"}
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
        </Form>

        <div className="text-center">

          {isLogin && <div className="d-flex justify-content-center align-items-center gap-1 mt-3 mb-4">
              <Spinner animation="border" size="sm" className="text-danger"></Spinner>
              <span>Authenticating User</span>
            </div>}

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
