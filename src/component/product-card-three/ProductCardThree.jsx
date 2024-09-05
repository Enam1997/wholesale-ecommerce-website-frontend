import React from "react";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  IconButton,
  Grid,
  Box,
  Button,
} from "@mui/material";
import { FavoriteBorder, ShoppingCart } from "@mui/icons-material";

const ProductCardThree = ({ product }) => {
  const { name, price, discountPrice, image } = product;
  const discountPercentage = discountPrice
    ? Math.round(((price - discountPrice) / price) * 100)
    : null;

  return (
    <Card
      variant="outlined"
      sx={{
        width: "100%",
        maxWidth: 300,
        maxHeight: 400,
        height: 400,
        position: "relative",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        overflow: "hidden", // Ensure content doesn't overflow
        "&:hover img": {
          transform: "scale(1.1)", // Image scales up on hover
        },
      }}
    >
      <Box sx={{ position: "relative", height: "70%", overflow: "hidden" }}>
        <CardMedia
          component="img"
          image={image}
          alt={name}
          sx={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            transition: "transform 0.3s ease-in-out",
          }}
        />
        {discountPercentage && (
          <Typography
            variant="caption"
            sx={{
              position: "absolute",
              top: 8,
              left: 8,
              backgroundColor: "red",
              color: "white",
              padding: "0.25rem",
              borderRadius: "4px",
            }}
          >
            -{discountPercentage}%
          </Typography>
        )}
      </Box>
      <CardContent sx={{ padding: "10px" }}>
        <Typography
          sx={{
            display: "-webkit-box", // Required for line clamping
            WebkitLineClamp: 2, // Limit to 2 lines
            WebkitBoxOrient: "vertical", // Vertical text orientation
            overflow: "hidden", // Ensure overflow is hidden
            textOverflow: "ellipsis", // Truncate with ellipsis
            marginBottom: "0.5rem",
            fontWeight: "700",
            height: "3.2em", // Approximate height for 2 lines of text
            lineHeight: "1.6em", // Line height to ensure proper spacing
          }}
        >
          {name}
        </Typography>

        <Grid
          container
          justifyContent="space-between"
          alignItems="center"
          sx={{ marginTop: "1rem" }}
        >
          <Typography
            variant="body1"
            sx={{ fontWeight: "bold", fontSize: "18px" }}
          >
            {discountPrice ? (
              <>
                <span>${discountPrice}</span>
                <span
                  style={{
                    textDecoration: "line-through",
                    marginLeft: "0.5rem",
                    color: "red",
                    fontSize: "15px",
                  }}
                >
                  ${price}
                </span>
              </>
            ) : (
              <span>${price}</span>
            )}
          </Typography>
          <Button
            sx={{
              display: "flex",
              alignItems: "center",
              padding: "4px 8px",
              transition: "0.3s",
              "&:hover": {
                backgroundColor: "#f0f0f0", // Light gray on hover
              },
            }}
          >
            <ShoppingCart color="secondary" sx={{ fontSize: "20px" }} />
            <span
              style={{
                marginLeft: "5px",
                fontSize: "12px",
                display: "none", // Initially hidden text
              }}
              className="add-to-cart-text"
            >
              Add to Cart
            </span>
          </Button>
        </Grid>
      </CardContent>
      <IconButton
        sx={{
          position: "absolute",
          top: 8,
          right: 8,
          backgroundColor: "white",
          color: "white",
          padding: "0.25rem",
          borderRadius: "20px",
        }}
      >
        <FavoriteBorder sx={{ color: "black", fontSize: "25px" }} />
      </IconButton>
    </Card>
  );
};

export default ProductCardThree;
