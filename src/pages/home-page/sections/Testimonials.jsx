// Testimonials.js
import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import {
  Box,
  Skeleton,
  Typography,
  Avatar,
  Paper,
  IconButton,
} from "@mui/material";
import { ArrowBack, ArrowForward } from "@mui/icons-material";
import axiosInstance, { websiteImageLink } from "../../../api";
import SectionTitle from "../../../component/section-title/SectionTitle";

const Testimonials = () => {
  const [allTestimonials, setAllTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchAllTestimonials = async () => {
    setLoading(true);
    try {
      const response = await axiosInstance.get(
        "/frontend-home-page/reviews/all"
      );
      setAllTestimonials(response.data.data.allReview);
    } catch (err) {
      console.error("Error fetching testimonials:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllTestimonials();
  }, []);

  // Custom Arrows
  const NextArrow = ({ onClick }) => (
    <IconButton onClick={onClick} sx={arrowStyle("right")}>
      <ArrowForward fontSize="large" />
    </IconButton>
  );

  const PrevArrow = ({ onClick }) => (
    <IconButton onClick={onClick} sx={arrowStyle("left")}>
      <ArrowBack fontSize="large" />
    </IconButton>
  );

  const settings = {
    // dots: true,
    infinite: true,
    speed: 800,
    autoplay: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 2 } },
      { breakpoint: 600, settings: { slidesToShow: 1 } },
    ],
  };

  return (
    <Box sx={{ mt: 6, px: 2 }}>
      <SectionTitle title="What Our Customers Say" />
      <Slider {...settings}>
        {loading
          ? Array.from(new Array(3)).map((_, index) => (
              <Paper
                key={index}
                sx={{
                  ...cardStyle,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  p: 3,
                }}
              >
                <Skeleton variant="circular" width={80} height={80} />
                <Skeleton
                  variant="text"
                  width="60%"
                  height={24}
                  sx={{ mt: 1 }}
                />
                <Skeleton
                  variant="text"
                  width="80%"
                  height={20}
                  sx={{ mt: 1 }}
                />
              </Paper>
            ))
          : allTestimonials.map((testi) => (
              <Paper
                key={testi.id}
                sx={{
                  ...cardStyle,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  p: 3,
                  transition: "transform 0.4s ease, box-shadow 0.4s ease",
                  "&:hover": { transform: "translateY(-8px)", boxShadow: 5 },
                }}
              >
                <Avatar
                  src={websiteImageLink(testi.image)}
                  alt={testi.name}
                  sx={{ width: 80, height: 80, mb: 1 }}
                />
                <Typography
                  variant="h6"
                  sx={{ fontWeight: 700, color: "primary.main" }}
                >
                  {testi.name}
                </Typography>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ mt: 1, fontStyle: "italic", textAlign: "center" }}
                >
                  "{testi.review || testi.feedback}"
                </Typography>
              </Paper>
            ))}
      </Slider>
    </Box>
  );
};

// Styles
const arrowStyle = (direction) => ({
  position: "absolute",
  top: "50%",
  [direction]: "16px",
  transform: "translateY(-50%)",
  zIndex: 2,
  color: "primary.main",
  backgroundColor: "rgba(255, 255, 255, 0.8)",
  boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
  "&:hover": { backgroundColor: "primary.light" },
});

const cardStyle = {
  borderRadius: 3,
  boxShadow: "0 8px 20px rgba(0, 0, 0, 0.12)",
  backgroundColor: "#f9f9f9",
};

export default Testimonials;
