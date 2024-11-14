import React from "react";
import { ArrowForward } from "@mui/icons-material";
import { IconButton } from "@mui/material";

// Custom Arrows
const SampleNextArrow = ({ onClick }) => (
  <IconButton onClick={onClick} sx={arrowStyle("right")}>
    <ArrowForward fontSize="large" />
  </IconButton>
);

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

export default SampleNextArrow;
