import React, { useRef, useState } from "react";
import { Card, Form, Button, Spinner } from "react-bootstrap";
import axios from "axios";

const ChangePassword = ({ onClose }) => {
  const [loader, setLoader] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const newPasswordRef = useRef();

  const handleChangePassword = async (e) => {
    e.preventDefault();
    setLoader(true);
    setError("");
    setMessage("");

    const token = localStorage.getItem("token");
    const newPassword = newPasswordRef.current.value;

    if (!token) {
      setError("You must be logged in to change your password.");
      setLoader(false);
      return;
    }

    try {
      const url = `https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyAIHXEVXIfCWHYwW5VQ5EDj8Q3c26lXPAk`;

      await axios.post(url, {
        idToken: token,
        password: newPassword,
        returnSecureToken: true,
      });

      setMessage("Password updated successfully ✅");
      newPasswordRef.current.value = "";
    } catch (err) {
      console.error("Error updating password:", err);
      setError("Failed to update password. Try again.");
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
        <h3 className="text-center mb-4" style={{ color: "var(--red)" }}>
          Change Password
        </h3>

        <Form onSubmit={handleChangePassword}>
          <Form.Group className="mb-3">
            <Form.Label>New Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter new password"
              ref={newPasswordRef}
              required
            />
          </Form.Group>

          <Button
            type="submit"
            className="w-100"
            style={{ backgroundColor: "var(--red)", borderColor: "var(--red)" }}
          >
            {loader ? (
              <>
                <Spinner animation="border" size="sm" className="me-2" />
                Updating...
              </>
            ) : (
              "Update Password"
            )}
          </Button>

          {message && (
            <p className="text-success text-center mt-3">{message}</p>
          )}
          {error && <p className="text-danger text-center mt-3">{error}</p>}

          <div className="text-center mt-3">
            <Button
              variant="outline-danger"
              onClick={onClose}
              style={{ borderColor: "var(--red)", color: "var(--red)" }}
            >
              ← Back
            </Button>
          </div>
        </Form>
      </Card>
    </div>
  );
};

export default ChangePassword;
