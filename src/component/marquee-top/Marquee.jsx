import React, { useEffect, useState } from "react";
import { Box, Skeleton } from "@mui/material";
import "./Marquee.css";
import axiosInstance from "../../api";

const Marquee = () => {
  const [marqueis, setMarqueis] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchAllMarqueis = async () => {
    setLoading(true);
    try {
      const response = await axiosInstance.get("/website/marque/all");
      setMarqueis(response.data.marquies);
    } catch (err) {
      console.error("Error fetching Marqueis:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllMarqueis();
  }, []);

  return (
    <Box className="marquee-wrapper" color="white">
      <Box className="marquee-content">
        {loading ? (
          // Loading skeleton placeholder
          <>
            {[...Array(10)].map((_, index) => (
              <Skeleton
                key={index}
                variant="text"
                width={400}
                height={30}
                sx={{
                  // bgcolor: "#555",
                  display: "inline-block",
                  marginRight: "10px",
                }}
              />
            ))}
          </>
        ) : (
          marqueis && (
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
          )
        )}
      </Box>
    </Box>
  );
};

export default Marquee;
