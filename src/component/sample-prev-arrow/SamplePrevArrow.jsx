import React from "react";
import { ArrowBackIos } from "@mui/icons-material";

const SamplePrevArrow = (props) => {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{
        ...style,
        background: "white",
        borderRadius: "50%",
        width: "50px",
        height: "50px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        left: "20px",
        boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)", // Optional: Add shadow for a better look
        zIndex: 1, // Ensure the arrow is above the slider content
      }}
      onClick={onClick}
    >
      <ArrowBackIos style={{ color: "black", fontSize: "24px" }} />
    </div>
  );
};

export default SamplePrevArrow;
