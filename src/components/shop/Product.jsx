import React from "react";
import { Card, Button } from "react-bootstrap"; 
import { useNavigate } from "react-router-dom";

const Product = ({ product }) => {
  const navigate = useNavigate();

  const handleSeeMore = () => {
    navigate(`/product/${product.id}`);
  };

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

        <Button
          onClick={handleSeeMore}
          variant="dark"
          className="w-100"
          style={{ backgroundColor: "var(--red)", border: "none" }}
        >
          See More
        </Button>
      </Card.Body>
    </Card>
  );
};

export default Product;
