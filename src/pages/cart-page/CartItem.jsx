import React from "react";
import { Box, Typography, IconButton } from "@mui/material";
import { Add, Remove, Delete, FavoriteBorder } from "@mui/icons-material";
import { productImageLink } from "../../api";

const CartItem = ({ item, onIncrease, onDecrease, onRemove }) => {
  const { name, description, image, price, quantity, featureImage, stock } =
    item;

  return (
    <Box
      sx={{
        display: "flex",
        mb: 4,
        padding: "16px",
        border: "1px solid #ddd",
        borderRadius: "8px",
      }}
    >
      {/* Product Image */}
      <Box sx={{ width: "100px", height: "100px", mr: 3 }}>
        <img
          src={productImageLink(featureImage)}
          alt={name}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            borderRadius: "8px",
          }}
        />
      </Box>

      {/* Product Details */}
      <Box sx={{ flex: 1 }}>
        <Typography variant="h6" sx={{ mb: 1 }}>
          {name}
        </Typography>
        <Typography variant="body2" sx={{ color: "gray", mb: 2 }}>
          {description.length > 50
            ? `${description.slice(0, 50)}...`
            : description}
        </Typography>

        {/* Quantity Control */}
        <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
          <IconButton onClick={() => onDecrease()}>
            <Remove />
          </IconButton>
          <Typography variant="body1" sx={{ mx: 2 }}>
            {quantity}
          </Typography>
          <IconButton onClick={onIncrease} disabled={quantity >= stock}>
            <Add />
          </IconButton>
        </Box>

        {/* Action Buttons */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Typography variant="h6">${price}</Typography>
          <Box>
            <IconButton onClick={() => onRemove()}>
              <Delete />
            </IconButton>
            {/* <IconButton onClick={() => console.log("Add to Wishlist")}>
              <FavoriteBorder />
            </IconButton> */}
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default CartItem;
