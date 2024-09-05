import React from "react";
import { Box } from "@mui/material";
import "./Marquee.css";

const Marquee = () => {
  const texts = [
    "Exclusive Wholesale Fashion Deals – New Arrivals Every Week!",
    "Buy More, Save More – Unlock Special Discounts on Bulk Orders!",
    "Limited Time Offer: Up to 30% Off on Selected Styles!",
    "High-Quality Fashion at Unbeatable Wholesale Prices!",
    "Fast Shipping on All Orders – Shop the Latest Trends Now!",
  ];

  return (
    <Box className="marquee-wrapper">
      <Box className="marquee-content">
        {/* Repeat the content twice to create a seamless effect */}
        {texts.map((text, index) => (
          <span key={index}>
            {text}
            {index < texts.length - 1 && <span className="separator">•</span>}
          </span>
        ))}
        {texts.map((text, index) => (
          <span key={index + texts.length}>
            {text}
            {index < texts.length - 1 && <span className="separator">•</span>}
          </span>
        ))}
      </Box>
    </Box>
  );
};

export default Marquee;
