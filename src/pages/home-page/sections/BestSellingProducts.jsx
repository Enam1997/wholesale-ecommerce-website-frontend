import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import { Box, Typography } from "@mui/material";
import { newproduct } from "../../../demo-data/newproduct";
import ProductCard from "../../../component/product-card/ProductCard";
import ProductCardThree from "../../../component/product-card-three/ProductCardThree";
import axiosInstance from "../../../api";
import SectionTitle from "../../../component/section-title/SectionTitle";

const BestSellingProducts = () => {
  const [loading, setLoading] = useState(true);
  const [allBestSellingProducts, setAllBestSellingProducts] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const response = await axiosInstance.get(
          `/product/get-10-best-selling-products`
        );

        let data = response.data.data.bestSellingProductsData;
        setAllBestSellingProducts(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []); // Depend on 'page' so it fetches again when page changes

  const settings = {
    // dots: true, // Hide dots
    autoplay: true,
    arrows: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4.4,
    slidesToScroll: 1,

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
        },
      },
      // {
      //   breakpoint: 480,
      //   settings: {
      //     slidesToShow: 1.3,
      //   },
      // },
      {
        breakpoint: 480,
        settings: {
          centerMode: true, // Center the main slide
          centerPadding: "50px", // Gap on each side of the main slide
          slidesToShow: 1, // Show 1 main slide in the center
        },
      },
    ],
  };

  return (
    <>
      {allBestSellingProducts ? (
        <Box mt={6}>
          <SectionTitle title={" Best Selling Products"} />
          <Slider {...settings}>
            {allBestSellingProducts.map((product, index) => (
              <Box key={index} sx={{ marginRight: "20px !important" }}>
                <ProductCardThree product={product} />
              </Box>
            ))}
          </Slider>
        </Box>
      ) : (
        ""
      )}
    </>
  );
};

export default BestSellingProducts;
