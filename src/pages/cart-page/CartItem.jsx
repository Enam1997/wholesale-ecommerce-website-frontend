import React from "react";
import { Box, Typography, IconButton } from "@mui/material";
import { Add, Remove, Delete, FavoriteBorder } from "@mui/icons-material";
import { productImageLink } from "../../api";
import calculateDiscountPrice from "../../utils/calculateProductDiscountPrice";

const CartItem = ({ item, onIncrease, onDecrease, onRemove }) => {
  const { name, description, featureImage, price, quantity, stock, discount } =
    item;

  return (
    <Box
      sx={{
        display: "flex",
        mb: 3,
        padding: "20px",
        border: "1px solid #e0e0e0",
        borderRadius: "12px",
        boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.05)",
        backgroundColor: "#fff",
        transition: "transform 0.2s ease",
        "&:hover": { transform: "scale(1.02)" },
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
            borderRadius: "10px",
            border: "2px solid #01A651",
          }}
        />
      </Box>

      {/* Product Details */}
      <Box sx={{ flex: 1 }}>
        <Typography
          variant="h6"
          sx={{ mb: 1, fontWeight: "600", color: "#333" }}
        >
          {name}
        </Typography>
        <Typography variant="body2" sx={{ color: "#757575", mb: 2 }}>
          {description.length > 50
            ? `${description.slice(0, 50)}...`
            : description}
        </Typography>

        {/* Quantity Control */}
        <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
          <IconButton onClick={() => onDecrease()} sx={{ color: "#757575" }}>
            <Remove />
          </IconButton>
          <Typography
            variant="body1"
            sx={{ mx: 2, fontWeight: "600", color: "#333" }}
          >
            {quantity}
          </Typography>
          <IconButton
            onClick={onIncrease}
            disabled={quantity >= stock}
            sx={{ color: "#757575" }}
          >
            <Add />
          </IconButton>
        </Box>

        {/* Price and Actions */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Typography
            variant="body1"
            sx={{ color: "#4E5D73", fontWeight: "500" }}
          >
            AED{" "}
            {(calculateDiscountPrice(price, discount) * quantity).toFixed(2)}
          </Typography>

          <Box>
            <IconButton onClick={() => onRemove()} sx={{ color: "#C40233" }}>
              <Delete />
            </IconButton>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default CartItem;
