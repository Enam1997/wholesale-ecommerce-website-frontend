import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import { Box, Skeleton } from "@mui/material";
import { slides } from "../../../demo-data/slides";
import axiosInstance, { homePageSliderImageLink } from "../../../api";
import { Link, useNavigate } from "react-router-dom";
import demoSlideImage from "../../../assets/Cehck.gif";
import SampleNextArrow from "../../../component/sample-next-arrow/SampleNextArrow";
import SamplePrevArrow from "../../../component/sample-prev-arrow/SamplePrevArrow";

const Hero = () => {
  const [loading, setLoading] = useState(true);
  const [allSlides, setAllSlides] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const response = await axiosInstance.get(
          `/frontend-home-page/top-slider/all`
        );
        setAllSlides(response.data.data.allSlider);
      } catch (err) {
        console.log(err.message);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []); // Depend on 'page' so it fetches again when page changes

  const settings = {
    // dots: true,
    infinite: true,
    arrows: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
  };

  return (
    <Box
      component="section"
      mt={3}
      sx={{ width: "100%", overflow: "hidden", borderRadius: "12px" }}
    >
      {loading ? (
        <>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              width: "100%",
              height: { xs: 300, sm: 400, lg: 500 }, // Set height based on screen size
              backgroundColor: "#f0f0f0",
            }}
          >
            <Skeleton
              variant="rectangular"
              width="100%"
              height="100%"
              animation="wave"
            />
          </Box>
        </>
      ) : (
        <>
          {allSlides.length != 0 ? (
            <Slider {...settings}>
              {allSlides.map((slide, index) => (
                <Link to={`${slide.targetLink}`} key={index}>
                  <Box
                    key={slide.id}
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      width: "100%",
                      height: { xs: 300, sm: 400, lg: 500 }, // Set height based on screen size
                      backgroundColor: "#f0f0f0", // Fallback background color
                    }}
                  >
                    <Box
                      component="img"
                      src={homePageSliderImageLink(slide.image)}
                      // onClick={() => navigate(`${slide.targetLink}`)}
                      alt={slide?.alt}
                      sx={{
                        width: "100%",
                        height: "100%",
                        objectFit: "fill", // Ensure the image covers the entire box
                      }}
                    />
                  </Box>
                </Link>
              ))}
            </Slider>
          ) : (
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                width: "100%",
                height: { xs: 300, sm: 400, lg: 500 }, // Set height based on screen size
                backgroundColor: "#f0f0f0", // Fallback background color
              }}
            >
              <Box
                component="img"
                src={demoSlideImage}
                alt={"Banglacottonae"}
                sx={{
                  width: "100%",
                  height: "100%",
                  objectFit: "fill", // Ensure the image covers the entire box
                }}
              />
            </Box>
          )}
        </>
      )}
    </Box>
  );
};

export default Hero;
