import React from "react";
import Slider from "react-slick";
import { Box, Typography } from "@mui/material";
import ProductCard from "../product-card/ProductCard";
import SampleNextArrow from "../sample-next-arrow/SampleNextArrow";
import SamplePrevArrow from "../sample-prev-arrow/SamplePrevArrow";

const ProductsSliderOne = ({ title, products }) => {
  const settings = {
    dots: true, // Hide dots
    arrows: true,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,

    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <Box sx={{ padding: "2rem 0" }}>
      <Typography variant="h4" gutterBottom>
        {title}
      </Typography>
      <Slider {...settings}>
        {products.map((product) => (
          <Box key={product.id} sx={{ margin: "0 10px" }}>
            {" "}
            {/* Add margin between slides */}
            <ProductCard product={product} />
          </Box>
        ))}
      </Slider>
    </Box>
  );
};

export default ProductsSliderOne;
