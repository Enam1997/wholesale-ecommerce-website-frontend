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

const ProductCardTwo = ({ product }) => {
  const { name, price, discountPrice, image } = product;
  const discountPercentage = discountPrice
    ? Math.round(((price - discountPrice) / price) * 100)
    : null;

  return (
    <Card
      variant="outlined"
      sx={{
        display: "flex",
        flexDirection: "row", // Arrange content horizontally
        width: "100%",
        maxWidth: 400, // Fixed width
        position: "relative",
        overflow: "hidden", // Ensures no overflow outside card boundaries
      }}
    >
      {/* Left side: Product Image */}
      <Box sx={{ flex: "0 0 30%", position: "relative" }}>
        <CardMedia
          component="img"
          image={image}
          alt={name}
          sx={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
        />
        {discountPercentage && (
          <Typography
            variant="caption"
            sx={{
              position: "absolute",
              top: 8,
              right: 8,
              backgroundColor: "red",
              color: "white",
              padding: "0.25rem",
              borderRadius: "4px",
              fontWeight: "bold",
            }}
          >
            -{discountPercentage}%
          </Typography>
        )}
        <IconButton
          sx={{
            position: "absolute",
            top: 8,
            left: 8,
            backgroundColor: "white",
            color: "black",
            padding: "0.25rem",
            borderRadius: "20px",
          }}
        >
          <FavoriteBorder sx={{ fontSize: "25px" }} />
        </IconButton>
      </Box>

      {/* Right side: Product Details */}
      <CardContent
        sx={{
          flex: "1 0 70%",

          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
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

        <Grid container alignItems="center">
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
    </Card>
  );
};

export default ProductCardTwo;
