import React from "react";
import { Card, Button, Form, Row, Col, Image, CloseButton } from "react-bootstrap";
import classes from "@/components/cart/Cartitem/CartItem.module.css";

const CartItem = ({ img, title, qty, price, onRemove, }) => (
  <Card className="mb-3">
    <Card.Body>
      <Row className="align-items-center">
        <Col>
          <Image src={img} rounded className={`${classes.imgBox}`} />
        </Col>
        <Col>
          <div className={`${classes.titleBox}`}>{title}</div>
        </Col>
        <Col xs={2} style={{ fontSize: 18 }}>
          ${price}
        </Col>
        <Col>
          <Form.Control
            type="number"
            min="1"
            className={`${classes.qtyBox}`}
            defaultValue={qty}
          />
        </Col>
        <Col>
          <CloseButton onClick={onRemove}>
            
          </CloseButton>
        </Col>
      </Row>
    </Card.Body>
  </Card>
);

export default CartItem;
