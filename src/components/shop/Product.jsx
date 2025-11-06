import React from "react";
import { Card } from "react-bootstrap";

const Product = ({ product, addToCart }) => {
  return (
    <Card className="p-2 shadow-sm" style={{ width: "18rem", border: "none" }}>
      <Card.Img
        variant="top"
        src={product.images[0]}
        alt={product.title}
        style={{
          height: "200px",
          objectFit: "cover",
          borderRadius: "10px",
        }}
      />
      <Card.Body>
        <Card.Title className="fs-6 fw-bold">{product.title}</Card.Title>
        <Card.Text className="text-muted">${product.price}</Card.Text>
      </Card.Body>
      <button
        onClick={() => addToCart(product)}
        className="w-100 btn btn-secondary"
        style={{ backgroundColor: "var(--red)", border: "none" }}
      >
        Add to Cart
      </button>
    </Card>
  );
};

export default Product;
