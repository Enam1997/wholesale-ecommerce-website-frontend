import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import { Box, Typography } from "@mui/material";
import { newproduct } from "../../../demo-data/newproduct";
import ProductCard from "../../../component/product-card/ProductCard";
import "./bestSellingProducts.css";
import ProductCardThree from "../../../component/product-card-three/ProductCardThree";
import axiosInstance from "../../../api";

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
        setAllBestSellingProducts(response.data.data.bestSellingProductsData);

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
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1.06,
        },
      },
    ],
  };

  return (
    <>
      {allBestSellingProducts ? (
        <Box mt={10} sx={{ padding: "2rem 0" }}>
          <Typography variant="h4" gutterBottom>
            Best Selling Products
          </Typography>
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
