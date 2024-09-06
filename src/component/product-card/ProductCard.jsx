import React from "react";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  IconButton,
  Grid,
  Box,
} from "@mui/material";
import { FavoriteBorder, ShoppingCart } from "@mui/icons-material";

const ProductCard = ({ product }) => {
  const { name, price, discountPrice, image } = product;
  const discountPercentage = discountPrice
    ? Math.round(((price - discountPrice) / price) * 100)
    : null;

  return (
    <Card
      variant="outlined"
      sx={{
        width: "100%",
        maxWidth: 400, // Fixed width
        position: "relative",
        height: 500, // Fixed height for the entire card
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      <Box sx={{ position: "relative", height: "80%" }}>
        <CardMedia
          component="img"
          image={image}
          alt={name}
          sx={{
            width: "100%",
            height: "100%", // Fill the height of the container
            objectFit: "cover",
            minHeight: "400px", // Ensure the image covers the entire area without distortion
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
      <CardContent sx={{ height: "20%" }}>
        <Typography
          noWrap
          sx={{
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
            marginBottom: "0.5rem",
            fontWeight: "700",
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
            sx={{ fontWeight: "bold", fontSize: "20px" }}
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
          <IconButton>
            <ShoppingCart />
          </IconButton>
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

export default ProductCard;
