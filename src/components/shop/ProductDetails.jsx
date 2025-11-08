import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Container, Row, Col, Carousel, Button, Spinner } from "react-bootstrap";
import axios from "axios";

const ProductDetails = ({ addToCart }) => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  const api = `https://api.escuelajs.co/api/v1/products/${id}`;

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get(api);
        setProduct(res.data);
      } catch (err) {
        console.error("Error fetching product:", err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading)
    return (
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ height: "70vh" }}
      >
        <Spinner animation="border" variant="dark" />
        <span className="ms-2 fw-semibold">Loading product...</span>
      </div>
    );

  if (!product)
    return (
      <h3 className="text-center text-muted mt-5">
        Product not found or unavailable.
      </h3>
    );

  return (
    <Container className="my-5">
      <Row className="g-4">
        {/* LEFT: IMAGE SLIDER */}
        <Col md={6}>
          <Carousel>
            {product.images.map((img, index) => (
              <Carousel.Item key={index}>
                <img
                  src={img}
                  alt={`Product ${index}`}
                  className="d-block w-100"
                  style={{
                    height: "400px",
                    objectFit: "cover",
                    borderRadius: "10px",
                  }}
                />
              </Carousel.Item>
            ))}
          </Carousel>
        </Col>

        {/* RIGHT: DETAILS */}
        <Col md={6}>
          <h2 className="fw-bold">{product.title}</h2>
          <p className="text-muted mb-1">Category: {product.category?.name}</p>
          <h4 className="text-danger mb-3">${product.price}</h4>
          <p className="mb-4">{product.description}</p>

          <Button
            variant="dark"
            className="w-100"
            onClick={() => addToCart(product)}
            style={{ backgroundColor: "var(--red)", border: "none" }}
          >
            Add to Cart
          </Button>

          <hr />

          <h5 className="mt-4">⭐ Ratings & Reviews</h5>
          <p className="text-muted">Coming soon...</p>
        </Col>
      </Row>
    </Container>
  );
};

export default ProductDetails;
