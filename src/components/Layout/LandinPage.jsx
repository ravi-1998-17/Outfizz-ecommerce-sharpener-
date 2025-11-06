import React from "react";
import Carousel from "react-bootstrap/Carousel";
import classes from "@/components/Layout/LandinPage.module.css";

import landingPageBg1 from "@/assets/landingPageBg_1.jpg";
import landingPageBg2 from "@/assets/landingPageBg_2.jpg";
import landingPageBg3 from "@/assets/landingPageBg_3.jpg";

const LandinPage = () => {
  return (
    <>
      <Carousel
        fade
        controls={false}
        indicators={false}
        interval={3000}
        pause={false}
      >
        <Carousel.Item>
          <img
            className={`w-100 ${classes.carouselImage}`}
            src={landingPageBg1}
            alt="First slide"
          />
          <Carousel.Caption className={classes.caption}>
            <h3>Style Redefined</h3>
            <p>
              Discover timeless trends and elevate your wardrobe with our latest
              fashion collections.
            </p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className={`w-100 ${classes.carouselImage}`}
            src={landingPageBg2}
            alt="Second slide"
          />
          <Carousel.Caption className={classes.caption}>
            <h3>Wear Your Confidence</h3>
            <p>
              Step out bold and beautiful with outfits designed to express your
              true self.
            </p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className={`w-100 ${classes.carouselImage}`}
            src={landingPageBg3}
            alt="Third slide"
          />
          <Carousel.Caption className={classes.caption}>
            <h3>Trendy. Chic. You.</h3>
            <p>
              From everyday essentials to runway-ready looks — your perfect
              style starts here.
            </p>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
    </>
  );
};

export default LandinPage;
