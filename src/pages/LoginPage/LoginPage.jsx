import React from "react";
import { Col, Row, Image } from "react-bootstrap";
import AuthenticationForm from "@/components/Authentication/AuthenticationForm";
import loginPageImg from "@/assets/loginPageImg.jpg";

const LoginPage = () => {
  return (
    <Row className="g-0" style={{ maxHeight: "100vh" }}>
      <Col
        xs={0}
        md={6}
        className="d-none d-md-flex"
        style={{ height: "100%" }}
      >
        <Image
          src={loginPageImg}
          alt="Login"
          fluid
          className="cusotm"
          style={{ height: "100vh", width: "100%", objectFit: "cover" }}
        />
      </Col>

      <Col>
        <div>
          <AuthenticationForm />
        </div>
      </Col>
    </Row>
  );
};

export default LoginPage;
