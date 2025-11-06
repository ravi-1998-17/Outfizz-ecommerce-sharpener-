import React from "react";
import classes from "@/pages/About/About.module.css";
import { Container, Row, Col, Image, Button } from "react-bootstrap";

const About = () => {
  return (
    <>
      <Container
        fluid
        className={`d-flex align-items-center justify-content-center ${classes.about}`}
      >
        <h1>About</h1>
      </Container>
      <section className="py-5 bg-light">
        <Container>
          <Row className="align-items-center">
            {/* Left Section - Image */}
            <Col md={6} className="mb-4 mb-md-0">
              <Image
                src="https://images.unsplash.com/photo-1523275335684-37898b6baf30"
                alt="About Us"
                fluid
                rounded
              />
            </Col>

            {/* Right Section - Text */}
            <Col md={6}>
              <h2 className="fw-bold mb-3">About Outfizz & Co.</h2>
              <p className="text-muted mb-4">
                At <strong>Outfizz & Co.</strong>, we believe fashion should be
                effortless, expressive, and ethical. Our mission is to provide
                high-quality apparel and accessories that fit your style while
                making you feel confident every day.
              </p>
              <p className="text-muted mb-4">
                We curate collections inspired by global trends, designed with
                comfort and sustainability in mind. Whether you’re dressing up
                or keeping it casual, we’ve got the perfect outfit for you.
              </p>
              <Button variant="dark" size="lg">
                Explore Our Store
              </Button>
            </Col>
          </Row>
        </Container>
      </section>
    </>
  );
};

export default About;
