import React from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import classes from "@/pages/Blog/Blog.module.css";

const blogPosts = [
  {
    id: 1,
    title: "Top 5 Fashion Trends of 2025",
    image:
      "https://static.fibre2fashion.com/articleresources/images/23/2287/SS988ebe_Small.jpg",
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
  {
    id: 4,
    title: "Streetwear Essentials: Elevate Your Look",
    image: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=800",
    date: "Sep 30, 2025",
    excerpt:
      "Master the art of streetwear with these go-to essentials for a modern, urban wardrobe.",
  },
  {
    id: 5,
    title: "Boho Chic in Suede: The New Bohemian",
    image: "https://images.unsplash.com/photo-1464983953574-0892a716854b?w=800",
    date: "Sep 21, 2025",
    excerpt:
      "Boho vibes and suede pieces are making a comeback – learn to style this timeless trend for any season.",
  },
  {
    id: 6,
    title: "Athleisure Comfort: Fashion Meets Function",
    image: "https://images.unsplash.com/photo-1500917293891-ef795e70e1f6?w=800",
    date: "Aug 28, 2025",
    excerpt:
      "Combine comfort and style with the perfect athleisure outfits for gym, work, and everywhere in between.",
  },
  {
    id: 7,
    title: "Monochrome Magic: One-Color Looks",
    image: "https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?w=800",
    date: "Aug 12, 2025",
    excerpt:
      "Create show-stopping looks with bold monochrome styling tips inspired by runway favorites.",
  },
  {
    id: 8,
    title: "Accessorize Like an Icon",
    image: "https://static.fibre2fashion.com/articleresources/images/23/2287/SS988ebe_Small.jpg",
    date: "Jul 25, 2025",
    excerpt:
      "Statement accessories are key — discover how the right bag, shoes, and jewelry can transform your outfits.",
  },
  {
    id: 9,
    title: "Denim for Days: Timeless Blue",
    image: "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?w=800",
    date: "Jul 10, 2025",
    excerpt:
      "Find out why denim is the undisputed champion of casual style and how to reinvent it each season.",
  },
  {
    id: 10,
    title: "Retro Revival: 90s Streetwear Vibes",
    image: "https://images.unsplash.com/photo-1465101162946-4377e57745c3?w=800",
    date: "Jun 19, 2025",
    excerpt:
      "Go bold with prints, oversized fits, and vintage sneakers — the ultimate guide to 90s streetwear essentials.",
  },
  {
    id: 11,
    title: "Summer Styles: Breezy & Cool",
    image: "https://images.unsplash.com/photo-1508672019048-805c876b67e2?w=800",
    date: "Jun 1, 2025",
    excerpt:
      "Beat the heat with lightweight fabrics, vibrant colors, and the latest summer dress trends.",
  },
  {
    id: 12,
    title: "Winter Layering: Stay Fashionably Warm",
    image: "https://images.unsplash.com/photo-1519681393784-d120267933ba?w=800",
    date: "May 16, 2025",
    excerpt:
      "Layer up without losing your style! Essential winter fashion tips for warmth and flair.",
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
