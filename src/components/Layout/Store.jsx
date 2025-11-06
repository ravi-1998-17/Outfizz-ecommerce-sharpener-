import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import Product from "./Product";
import { Container, Row, Col } from "react-bootstrap";

function Store({ products }) {
  // make categories from product data
  const categories = {};

  products.forEach((item) => {
    const cat = item.category ? item.category.name : "Other";
    if (!categories[cat]) {
      categories[cat] = [];
    }
    if (categories[cat].length < 8) {
      categories[cat].push(item);
    }
  });

  return (
    <>
      <Header />
      <Container className="my-4">
        {Object.keys(categories).map((catName, idx) => (
          <div key={idx} className="mb-5">
            <h3>{catName}</h3>
            <Row>
              {categories[catName].map((item) => (
                <Col key={item.id} xs={12} sm={6} md={4} lg={3} className="mb-4">
                  <Product
                    image={item.images[0]}
                    title={item.title}
                    price={item.price}
                  />
                </Col>
              ))}
            </Row>
          </div>
        ))}
      </Container>
      <Footer />
    </>
  );
}

export default Store;
