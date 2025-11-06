import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import Product from "./Product";

const ProductCard = ({ productsData }) => {
  const categories = {};

  productsData.forEach((item) => {
    const CAT = item.category ? item.category.name : "Other";
    if (!categories[CAT]) {
      categories[CAT] = [];
    }
    categories[CAT].push(item);
  });

  console.log(categories);

  return (
    <Container className="my-5">
      {Object.keys(categories).map((catName) => (
        <section key={catName} className="mb-5">
          <h2 className="fw-bold mb-4 text-uppercase">{catName}</h2>

          <Row className="g-4">
            {categories[catName].map((product) => (
              <Col key={product.id} xs={12} sm={6} md={3}>
                <Product product={product} />
              </Col>
            ))}
          </Row>
        </section>
      ))}
    </Container>
  );
};

export default ProductCard;
