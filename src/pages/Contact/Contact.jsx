import React, { useState } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import axios from "axios";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        "https://your-firebase-url.firebaseio.com/contacts.json",
        formData
      );
      alert("Message sent successfully!");
      setFormData({ name: "", email: "", phone: "", message: "" });
    } catch (err) {
      alert("Error sending message.");
    }
  };

  return (
    <Container className="py-5 mt-5">
      <Row className="align-items-center">
        {/* Left Section */}
        <Col md={5} className="pe-4">
          <h2 className="fw-bold mb-3" style={{ color: "#ff5757" }}>
            Get in Touch
          </h2>
          <p className="mb-4">I’d like to hear from you!</p>
          <p>If you have any inquiries or just want to say hi, please use the contact form!</p>

          <div className="mt-4">
            <p className="mb-1">
              <i className="bi bi-envelope me-2"></i>
              <a href="mailto:youremail@gmail.com" className="text-decoration-none">
                outfizz@gmail.com
              </a>
            </p>
            <div className="d-flex gap-3 mt-3" style={{color: "#747474"}}>
              <i className="bi bi-facebook"></i>
              <i className="bi bi-instagram"></i>
              <i className="bi bi-pinterest"></i>
              <i className="bi bi-twitter-x"></i>
            </div>
          </div>
        </Col>

        {/* Right Section */}
        <Col md={7}>
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
    </Container>
  );
};

export default Contact;
