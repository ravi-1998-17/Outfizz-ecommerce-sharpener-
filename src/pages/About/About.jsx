import React from "react";
import { Container, Row, Col, Image, Button } from "react-bootstrap";
import classes from "@/pages/About/About.module.css";

const About = () => {
  return (
    <>
      {/* Header Section */}
      <header className={classes.aboutHeader}>
        <Container className="h-100 d-flex flex-column justify-content-center align-items-center text-center text-white">
          <h1 className="display-4 fw-bold">About Outfizz & Co.</h1>
          <p className="lead mt-2">Where fashion meets style, comfort, and sustainability.</p>
        </Container>
      </header>

      {/* Slide 1 - Our Story */}
      <section className="py-5 bg-light">
        <Container>
          <Row className="align-items-center">
            <Col md={6} className="mb-4 mb-md-0">
              <Image
                src="https://images.unsplash.com/photo-1523275335684-37898b6baf30"
                alt="Our Story"
                fluid
                rounded
              />
            </Col>
            <Col md={6}>
              <h2 className="fw-bold mb-3">Our Story</h2>
              <p className="text-muted mb-3">
                Founded with passion and creativity, <strong>Outfizz & Co.</strong> started as a vision to make fashion effortless and expressive.
              </p>
              <p className="text-muted">
                Every collection is carefully curated to reflect trends, comfort, and sustainability, allowing you to feel confident in your style every day.
              </p>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Slide 2 - Our Mission */}
      <section className="py-5">
        <Container>
          <Row className="align-items-center flex-md-row-reverse">
            <Col md={6} className="mb-4 mb-md-0">
              <Image
                src="https://images.unsplash.com/photo-1503342217505-b0a15ec3261c"
                alt="Our Mission"
                fluid
                rounded
              />
            </Col>
            <Col md={6}>
              <h2 className="fw-bold mb-3">Our Mission</h2>
              <p className="text-muted mb-3">
                We strive to make fashion inclusive, sustainable, and enjoyable. Our mission is to provide high-quality apparel that resonates with your personality.
              </p>
              <p className="text-muted">
                With attention to detail and ethical practices, we ensure every piece you wear makes a statement without compromising on values.
              </p>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Slide 3 - Join Us */}
      <section className="py-5 bg-light">
        <Container>
          <Row className="align-items-center">
            <Col md={6} className="mb-4 mb-md-0">
              <Image
                src="https://images.unsplash.com/photo-1542831371-d531d36971e6"
                alt="Join Us"
                fluid
                rounded
              />
            </Col>
            <Col md={6}>
              <h2 className="fw-bold mb-3">Join Our Journey</h2>
              <p className="text-muted mb-3">
                We invite you to explore our collections and experience fashion that speaks to your soul. Outfizz & Co. is more than apparel—it's a lifestyle.
              </p>
              <Button variant="dark" size="lg">Explore Our Store</Button>
            </Col>
          </Row>
        </Container>
      </section>
    </>
  );
};

export default About;
