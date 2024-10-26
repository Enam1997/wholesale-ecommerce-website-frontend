import React from "react";
import Slider from "react-slick";
import { Box, Typography } from "@mui/material";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./customSlider.css";
import SampleNextArrow from "../../../component/sample-next-arrow/SampleNextArrow";
import SamplePrevArrow from "../../../component/sample-prev-arrow/SamplePrevArrow";
import { productImageLink } from "../../../api";

const CustomSlider = ({ images }) => {
  const settings = {
    customPaging: function (i) {
      return (
        <a>
          <img
            src={productImageLink(images[i].url)}
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
    autoplay: true,
    autoplaySpeed: 3000,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
  };

  return (
    <Box
      sx={{
        maxWidth: "100%",
        maxHeight: "600px",
        position: "relative",
        paddingBottom: "80px", // Space for the thumbnails
      }}
      className="custom-slider"
    >
      {images.length == 0 ? (
        <Typography>No Images Available</Typography>
      ) : (
        <>
          <Slider {...settings}>
            {console.log(images)}
            {images.map((image, index) => (
              <Box key={index}>
                {console.log(productImageLink(image.url))}
                <img
                  src={productImageLink(image.url)}
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
          <Box
            sx={{
              position: "absolute",
              bottom: "0", // Move thumbnails to the bottom of the image
              width: "100%",
              display: "flex",
              justifyContent: "center",
              padding: "10px 0", // Space above and below the thumbnails
            }}
          >
            <ul
              className="slick-dots slick-thumb"
              style={{
                margin: "0", // Remove extra margin
                display: "flex", // Make sure thumbnails are inline
                gap: "10px", // Gap between thumbnails
                justifyContent: "center",
              }}
            />
          </Box>
        </>
      )}
    </Box>
  );
};

export default CustomSlider;
