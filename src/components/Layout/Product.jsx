import React, { useState } from "react";
import { Card, Button } from "react-bootstrap";

function Product({ image, title, price }) {
  const [qty, setQty] = useState(1);

  return (
    <Card className="shadow-sm">
      <Card.Img
        variant="top"
        src={image}
        alt={title}
        style={{ height: "250px", objectFit: "cover" }}
      />
      <Card.Body className="text-center">
        <Card.Title>{title}</Card.Title>
        <h6>${price}</h6>

        <div className="d-flex justify-content-center align-items-center gap-2 mt-2">
          <Button
            variant="outline-secondary"
            size="sm"
            onClick={() => setQty(qty > 1 ? qty - 1 : 1)}
          >
            -
          </Button>
          <span>{qty}</span>
          <Button
            variant="outline-secondary"
            size="sm"
            onClick={() => setQty(qty + 1)}
          >
            +
          </Button>
        </div>

        <Button variant="outline-danger" size="sm" className="mt-3 w-100">
          Add to Cart
        </Button>
      </Card.Body>
    </Card>
  );
}

export default Product;
