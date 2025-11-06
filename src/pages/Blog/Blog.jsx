import React from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import classes from "@/pages/Blog/Blog.module.css";

const blogPosts = [
  {
    id: 1,
    title: "Top 5 Fashion Trends of 2025",
    image:
      "https://static.fibre2fashion.com//articleresources/images/23/2287/SS988ebe_Small.jpg",
    date: "Nov 2, 2025",
    excerpt:
      "Discover the upcoming fashion trends that are redefining style in 2025 — from minimalistic designs to bold streetwear statements.",
  },
  {
    id: 2,
    title: "Sustainable Fashion: The Future of Style",
    image: "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?w=800",
    date: "Oct 27, 2025",
    excerpt:
      "Sustainability is more than a trend — it’s the future. Learn how conscious fashion choices can make a difference for our planet.",
  },
  {
    id: 3,
    title: "How to Style Casual Outfits Like a Pro",
    image: "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?w=800",
    date: "Oct 15, 2025",
    excerpt:
      "Get easy styling tips to turn your basic casual wear into effortlessly cool everyday outfits.",
  },
];

const Blog = () => {
  return (
    <>
      <Container
        fluid
        className={`d-flex flex-column align-items-center justify-content-center ${classes.blog}`}
      >
        <h1>Our Blog</h1>
        <p className="text-light">
          Stay inspired with the latest fashion tips, trends, and stories.
        </p>
      </Container>

      <section className="py-5 bg-light">
        <Container>
          <Row className="g-4">
            {blogPosts.map((post) => (
              <Col key={post.id} xs={12} sm={6} md={4}>
                <Card className="h-100 border-0 shadow-sm">
                  <Card.Img
                    variant="top"
                    src={post.image}
                    alt={post.title}
                    style={{ height: "220px", objectFit: "cover" }}
                  />
                  <Card.Body>
                    <Card.Subtitle className="text-muted small mb-2">
                      {post.date}
                    </Card.Subtitle>
                    <Card.Title className="fw-semibold">
                      {post.title}
                    </Card.Title>
                    <Card.Text className="text-muted">{post.excerpt}</Card.Text>
                    <Button variant="dark" size="sm">
                      Read More
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
      </section>
    </>
  );
};

export default Blog;
