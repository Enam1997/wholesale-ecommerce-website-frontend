import React, { useEffect, useState } from "react";
import { Box } from "@mui/material";
import "./Marquee.css";
import axiosInstance from "../../api";

const Marquee = () => {
  const [marqueis, setMarqueis] = useState([]);

  const texts = [
    "Exclusive Wholesale Fashion Deals – New Arrivals Every Week!",
    "Buy More, Save More – Unlock Special Discounts on Bulk Orders!",
    "Limited Time Offer: Up to 30% Off on Selected Styles!",
    "High-Quality Fashion at Unbeatable Wholesale Prices!",
    "Fast Shipping on All Orders – Shop the Latest Trends Now!",
  ];

  const fetchAllMarqueis = async () => {
    try {
      const response = await axiosInstance.get("/website/marque/all");
      console.log(response.data.marquies);

      setMarqueis(response.data.marquies);
    } catch (err) {
      console.error("Error fetching Marqueis:", err);
    }
  };

  useEffect(() => {
    fetchAllMarqueis();
  }, []);

  return (
    <Box className="marquee-wrapper" color="white">
      <Box className="marquee-content">
        {marqueis ? (
          <>
            {/* Repeat the content twice to create a seamless effect */}
            {marqueis.map((marq, index) => (
              <span key={index}>
                {marq.text}
                {index < marqueis.length - 1 && (
                  <span className="separator">#</span>
                )}
              </span>
            ))}
            {marqueis.map((marq, index) => (
              <span key={index + marqueis.length}>
                {marq.text}
                {index < marqueis.length - 1 && (
                  <span className="separator">#</span>
                )}
              </span>
            ))}
          </>
        ) : (
          <>
            {/* Repeat the content twice to create a seamless effect */}
            {texts.map((text, index) => (
              <span key={index}>
                {text}
                {index < texts.length - 1 && (
                  <span className="separator">#</span>
                )}
              </span>
            ))}
            {texts.map((text, index) => (
              <span key={index + texts.length}>
                {text}
                {index < texts.length - 1 && (
                  <span className="separator">#</span>
                )}
              </span>
            ))}
          </>
        )}
      </Box>
    </Box>
  );
};

export default Marquee;
