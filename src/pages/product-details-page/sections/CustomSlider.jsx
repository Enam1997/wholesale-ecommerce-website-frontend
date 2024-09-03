import React from "react";
import Slider from "react-slick";
import { Box } from "@mui/material";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function SampleNextArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{
        ...style,
        display: "block",
        background: "wgite",
      }}
      onClick={onClick}
    />
  );
}

function SamplePrevArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: "block", background: "green" }}
      onClick={onClick}
    />
  );
}

const CustomSlider = ({ images }) => {
  const settings = {
    customPaging: function (i) {
      return (
        <a>
          <img
            src={images[i]}
            alt={`Thumbnail ${i + 1}`}
            style={{
              width: "60px",
              height: "60px",
              objectFit: "cover",
              borderRadius: "8px",
              margin: "0 5px", // Adding margin to create spacing between thumbnails
            }}
          />
        </a>
      );
    },
    dots: true,
    dotsClass: "slick-dots slick-thumb",
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
  };

  return (
    <Box
      sx={{ maxWidth: "100%", maxHeight: "600px", position: "relative" }}
      className="custom-slider"
    >
      <Slider {...settings}>
        {images.map((image, index) => (
          <Box key={index}>
            <img
              src={image}
              alt={`Product ${index + 1}`}
              style={{
                width: "100%",
                height: "500px",
                objectFit: "cover",
                borderRadius: "10px",
              }}
            />
          </Box>
        ))}
      </Slider>
    </Box>
  );
};

export default CustomSlider;
