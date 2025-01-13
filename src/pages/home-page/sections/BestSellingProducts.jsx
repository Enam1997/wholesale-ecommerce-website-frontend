import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import { Box, Typography, Skeleton } from "@mui/material";
import axiosInstance from "../../../api";
import SectionTitle from "../../../component/section-title/SectionTitle";
import ProductCardThree from "../../../component/product-card-three/ProductCardThree";
import SampleNextArrow from "../../../component/sample-next-arrow/SampleNextArrow";
import SamplePrevArrow from "../../../component/sample-prev-arrow/SamplePrevArrow";

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
        console.log(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const settings = {
    autoplay: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4.4,
    slidesToScroll: 1,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    responsive: [
      { breakpoint: 1448, settings: { slidesToShow: 4 } },
      { breakpoint: 1024, settings: { slidesToShow: 2.5 } },
      { breakpoint: 768, settings: { slidesToShow: 2 } },
      { breakpoint: 500, settings: { slidesToShow: 1.9 } },
      {
        breakpoint: 480,
        settings: {
          centerMode: true,
          centerPadding: "50px",
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <Box mt={6}>
      <SectionTitle title={"Best Selling Products"} />
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
          : allBestSellingProducts.map((product, index) => (
              <Box key={index} sx={{ marginRight: "20px !important" }}>
                <ProductCardThree product={product} />
              </Box>
            ))}
      </Slider>
      {error && (
        <Typography color="error">Failed to load products: {error}</Typography>
      )}
    </Box>
  );
};

export default BestSellingProducts;
