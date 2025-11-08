import React, { useState } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import ContactDatabase from "./ContactDatabase";

const Contact = ({
  customerQueryDatabase,
  fetchingCustomerDatabase,
  customerQueries,
  deleteCustomerRecord
}) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });


  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    customerQueryDatabase(formData);
    setFormData({ name: "", email: "", phone: "", message: "" });
  };

  return (
    <>
    <Container className="py-5 mt-5 h-100vh">
      <Row className="align-items-center">
        {/* ---------- Left Section ---------- */}
        <Col md={6} className="pe-4">
          <h2 className="fw-bold mb-3" style={{ color: "#ff5757" }}>
            Get in Touch
          </h2>
          <p className="mb-4">I’d like to hear from you!</p>
          <p>
            If you have any inquiries or just want to say hi, please use the
            contact form!
          </p>

          <div className="mt-4">
            <p className="mb-1">
              <i className="bi bi-envelope me-2"></i>
              <a
                href="mailto:outfizz@gmail.com"
                className="text-decoration-none"
              >
                outfizz@gmail.com
              </a>
            </p>
            <div className="d-flex gap-3 mt-3" style={{ color: "#747474" }}>
              <i className="bi bi-facebook"></i>
              <i className="bi bi-instagram"></i>
              <i className="bi bi-pinterest"></i>
              <i className="bi bi-twitter-x"></i>
            </div>
          </div>
        </Col>

        {/* ---------- Right Section ---------- */}
        <Col md={6}>
          <Form onSubmit={handleSubmit}>
            <Row className="mb-3">
              <Col>
                <Form.Group controlId="formName">
                  <Form.Label>Full Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group controlId="formPhone">
                  <Form.Label>Phone</Form.Label>
                  <Form.Control
                    type="text"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                  />
                </Form.Group>
              </Col>
            </Row>

            <Form.Group controlId="formEmail" className="mb-3">
              <Form.Label>Email*</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group controlId="formMessage" className="mb-3">
              <Form.Label>Message</Form.Label>
              <Form.Control
                as="textarea"
                rows={4}
                name="message"
                value={formData.message}
                onChange={handleChange}
              />
            </Form.Group>

            <Button type="submit" className="px-4">
              Send
            </Button>
          </Form>
        </Col>
      </Row>

      {/* ---------- Fetch Data Section ---------- */}
      <Row className="mt-5">
        <Row className="d-flex justify-content-between align-items-center border py-3 px-4 rounded">
          <Col className="d-flex justify-content-between align-items-center">
            <span className="fs-4 fw-semibold">Click Button to Fetch Data</span>
            <Button onClick={() => fetchingCustomerDatabase()} className="btn btn-warning">
              Click Me
            </Button>
          </Col>
        </Row>

        {/* ---------- Data Display Section ---------- */}
        <div className="mt-4 border-start border-3 border-warning rounded">
          {customerQueries.length > 0 ? (
            customerQueries.map((item) => (
              <ContactDatabase
                key={item.id}
                date={item.date}
                time={item.time}
                name={item.name}
                email={item.email}
                phone={item.phone}
                message={item.message}
                deleteCustomerRecord={() => deleteCustomerRecord(item.id)}
              />
            ))
          ) : (
            <p className="text-muted mt-3">No data fetched yet...</p>
          )}
        </div>
      </Row>
    </Container>
                </>
  );
};

export default Contact;
