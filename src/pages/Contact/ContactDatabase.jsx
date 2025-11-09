import React from "react";
import { Card, Row, Col, Button } from "react-bootstrap";
import classes from "@/pages/Contact/ContactDatabase.module.css";

const ContactDatabase = ({
  date,
  time,
  name,
  phone,
  email,
  message,
  deleteCustomerRecord,
}) => {
  return (
    <Card className="my-2 shadow-sm border-0">
      <Card.Body className="p-3">
        <Row className="g-0 align-items-center mb-2">
          <Col md={10}>
            <div className="d-flex flex-wrap gap-3">
              <span>
                <strong>Date:</strong> {date}
              </span>
              <span>
                <strong>Time:</strong> {time}
              </span>
            </div>
          </Col>
          <Col md={2} className="text-md-end text-start mt-2 mt-md-0">
            <Button
              variant="outline-danger"
              size="sm"
              onClick={deleteCustomerRecord}
            >
              Delete
            </Button>
          </Col>
        </Row>

        <Row className="mb-2 g-0">
          <Col>
            <strong>Name:</strong>
            {name}
            &nbsp; | &nbsp;
            <strong>Phone:</strong> {phone} &nbsp; | &nbsp;
            <strong>Email:</strong> {email}
          </Col>
        </Row>

        <Row className="g-0">
          <Col>
            <strong>Message:</strong>
            <div className="mt-1">{message}</div>
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
};

export default ContactDatabase;
