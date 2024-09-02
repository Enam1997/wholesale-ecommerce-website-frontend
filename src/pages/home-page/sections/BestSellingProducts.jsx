import React from "react";
import Slider from "react-slick";
import { Box, Typography } from "@mui/material";
import { newproduct } from "../../../demo-data/newproduct";
import ProductCard from "../../../component/product-card/ProductCard";
import "./bestSellingProducts.css";

const BestSellingProducts = () => {
  const settings = {
    dots: true, // Hide dots
    arrows: false,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,

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
    <Box mt={10} sx={{ padding: "2rem 0" }}>
      <Typography variant="h4" gutterBottom>
        Best Selling Products
      </Typography>
      <Slider {...settings}>
        {newproduct.map((product) => (
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

export default BestSellingProducts;
