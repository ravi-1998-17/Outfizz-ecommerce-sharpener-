import React from "react";
import { Spinner } from "react-bootstrap";

// Loader Component (Inline loader)
export const Loader = ({ message = "Loading..." }) => (
  <div
    className="d-flex justify-content-center align-items-center"
    style={{ height: "80vh" }}
  >
    <Spinner animation="border" role="status" />
    <span className="ms-2 fw-semibold">{message}</span>
  </div>
);

// Full-page Loader (like login spinner)
export const FullPageLoader = () => (
  <div
    className="d-flex justify-content-center align-items-center"
    style={{ height: "100vh" }}
  >
    <Spinner animation="border" role="status" />
  </div>
);

// Error Message Component
export const ErrorMessage = ({ message }) => (
  <div
    className="d-flex justify-content-center align-items-center flex-column text-center"
    style={{ height: "80vh" }}
  >
    <h4 className="text-danger">{message}</h4>
    <p className="text-muted mt-2">
      Try refreshing the page or come back later.
    </p>
  </div>
);

// Empty State Component
export const EmptyState = ({ message }) => (
  <div
    className="d-flex justify-content-center align-items-center text-center"
    style={{ height: "80vh" }}
  >
    <h4 className="text-muted">{message}</h4>
  </div>
);
