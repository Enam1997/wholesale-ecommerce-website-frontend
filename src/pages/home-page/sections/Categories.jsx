import React from "react";
import { Box, Typography, ButtonBase, Grid } from "@mui/material";
import allCategoryiamge from "../../../assets/category1.jpg";
import { useNavigate } from "react-router-dom";

const Categories = () => {
  const navigate = useNavigate();

  return (
    <Box mt={6} sx={{ padding: "1rem 0" }}>
      <Grid container spacing={2}>
        {[
          {
            name: "All",
            imageUrl: allCategoryiamge,
          },
          {
            name: "Man",
            imageUrl:
              "https://media.istockphoto.com/id/1214561965/photo/young-man-in-shopping-looking-for-presents-consumerism-fashion-lifestyle-concept.jpg?s=612x612&w=0&k=20&c=G1n6f4oQ6om156yTJgdKiQ8_Mn6KqtKAHHXDY0-4f3Q=",
          },
          {
            name: "Women",
            imageUrl:
              "https://st4.depositphotos.com/13193658/25036/i/450/depositphotos_250363028-stock-photo-smiling-beautiful-woman-holding-shopping.jpg",
          },
          {
            name: "Kids",
            imageUrl:
              "https://t4.ftcdn.net/jpg/01/33/96/57/360_F_133965710_qzv5mhpMxPOCwSG8QFQZVrUUVyoARDY8.jpg",
          },
        ].map((category, index) => (
          <Grid item xs={12} sm={6} key={index}>
            {/* Image size 150*150 */}
            <ButtonBase
              sx={{
                width: "100%",
                height: 200, // Height of the category item
                position: "relative",
                overflow: "hidden",
                borderRadius: "12px", // Rounded corners
                backgroundImage: `url(${category.imageUrl})`, // Background image
                backgroundSize: "cover",
                backgroundPosition: "center",
                "&:hover": {
                  "& .overlay": {
                    opacity: 0.7, // Darken the overlay on hover
                  },
                },
              }}
              onClick={() => navigate("/shop")}
            >
              <Box
                className="overlay"
                sx={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  backgroundColor: "rgba(0, 0, 0, 0.5)", // Overlay color
                  opacity: 0.5,
                  transition: "opacity 0.3s",
                }}
              />
              <Typography
                variant="h5"
                color="white"
                fontWeight="bold"
                sx={{
                  position: "absolute",
                  bottom: "16px",
                  left: "16px",
                  zIndex: 2,
                }}
              >
                {category.name}
              </Typography>
            </ButtonBase>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Categories;
