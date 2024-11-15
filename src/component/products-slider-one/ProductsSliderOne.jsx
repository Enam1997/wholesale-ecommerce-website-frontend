import React from "react";
import Slider from "react-slick";
import { Box, Skeleton } from "@mui/material";
import SampleNextArrow from "../sample-next-arrow/SampleNextArrow";
import SamplePrevArrow from "../sample-prev-arrow/SamplePrevArrow";
import ProductCardThree from "../product-card-three/ProductCardThree";
import SectionTitle from "../section-title/SectionTitle";

const ProductsSliderOne = ({ title, products, loading = false }) => {
  const settings = {
    // dots: true, // Hide dots
    autoplay: true,
    arrows: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4.4,
    slidesToScroll: 1,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    responsive: [
      {
        breakpoint: 1448,
        settings: {
          slidesToShow: 4,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2.5,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 500,
        settings: {
          slidesToShow: 1.9,
          arrows: false,
        },
      },
      {
        breakpoint: 480,
        settings: {
          centerMode: true, // Center the main slide
          centerPadding: "50px", // Gap on each side of the main slide
          slidesToShow: 1, // Show 1 main slide in the center
          arrows: false,
        },
      },
    ],
  };

  return (
    <Box sx={{ padding: "2rem 0" }}>
      <SectionTitle title={title} />
      <Slider {...settings}>
        {loading
          ? Array.from(new Array(5)).map((_, index) => (
              <Box key={index} sx={{ marginRight: "20px !important" }}>
                <Skeleton
                  variant="rectangular"
                  width={210}
                  height={280}
                  sx={{ borderRadius: 2 }}
                />
                <Skeleton width="60%" sx={{ mt: 1, mx: "auto" }} />
                <Skeleton width="40%" sx={{ mt: 1, mx: "auto" }} />
              </Box>
            ))
          : products?.map((product, index) => (
              <Box key={index} sx={{ margin: "0 10px" }}>
                {" "}
                {/* Add margin between slides */}
                <ProductCardThree product={product} />
              </Box>
            ))}
      </Slider>
    </Box>
  );
};

export default ProductsSliderOne;
