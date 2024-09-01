import React from "react";
import { Box, Typography, ButtonBase, Grid } from "@mui/material";

// This is another version of categories if needed later

const Categories2 = () => (
  <Box mt={6} sx={{ padding: "1rem 0" }}>
    <Grid container spacing={2}>
      {[
        { name: "All", imageUrl: "https://via.placeholder.com/150" },
        { name: "Man", imageUrl: "https://via.placeholder.com/150" },
        { name: "Women", imageUrl: "https://via.placeholder.com/150" },
        { name: "Kids", imageUrl: "https://via.placeholder.com/150" },
      ].map((category, index) => (
        <Grid item xs={12} sm={6} key={index}>
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

export default Categories2;
