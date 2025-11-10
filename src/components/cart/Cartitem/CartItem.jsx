import React, { useContext } from "react";
import { Card, Form, Row, Col, Image, CloseButton } from "react-bootstrap";
import classes from "@/components/cart/Cartitem/CartItem.module.css";
import { ShopContext } from "@/components/contexts/ShopContext";

const CartItem = ({ item }) => {
  const { removeFromCart } = useContext(ShopContext);

  return (
    <Card className="mb-3">
      <Card.Body>
        <Row className="align-items-center">
          <Col>
            <Image src={item.images} rounded className={`${classes.imgBox}`} />
          </Col>
          <Col>
            <div className={`${classes.titleBox}`}>{item.title}</div>
          </Col>
          <Col xs={2} style={{ fontSize: 18 }}>
            ${item.price}
          </Col>
          <Col>
            <Form.Control
              type="number"
              min="1"
              className={`${classes.qtyBox}`}
              defaultValue={item.qty}
            />
          </Col>
          <Col>
            <CloseButton onClick={() => removeFromCart(item.id)} />
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
};

export default CartItem;
