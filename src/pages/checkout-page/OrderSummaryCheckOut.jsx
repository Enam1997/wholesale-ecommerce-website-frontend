import React from "react";
import { Box, Typography, Button, Divider } from "@mui/material";
import { useCart } from "../../context/CartContext";
import { calculateTotalOrderPrice } from "../../utils/orderPrice";
import calculateDiscountPrice from "../../utils/calculateProductDiscountPrice";

const OrderSummaryCheckOut = ({ items }) => {
  const { cartItems } = useCart();
  const { totalProductPrice, shippingPrice, taxes, totalPrice } =
    calculateTotalOrderPrice(cartItems);

  return (
    <Box
      sx={{
        padding: "24px",
        border: "1px solid #e0e0e0",
        borderRadius: "12px",
        backgroundColor: "#f9f9f9",
        boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.05)",
      }}
    >
      <Typography variant="h5" sx={{ mb: 3, fontWeight: "600", color: "#333" }}>
        Order Summary
      </Typography>

      {/* List of Products */}
      {cartItems.map((item, index) => (
        <Box key={index} sx={{ mb: 2 }}>
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Typography variant="body2" sx={{ color: "#555" }}>
              {item.name.length > 20
                ? `${item.name.slice(0, 20)}...`
                : item.name}{" "}
              <span style={{ color: "#888" }}>x {item.quantity}</span>
            </Typography>
            <Typography variant="body1" sx={{ fontWeight: "500", color: "#333" }}>
              AED {(
                (calculateDiscountPrice(item.price, item.discount) ||
                  item.price) * item.quantity
              ).toFixed(2)}
            </Typography>
          </Box>
          {index < cartItems.length - 1 && <Divider sx={{ my: 1 }} />}
        </Box>
      ))}

      <Divider sx={{ my: 2, borderColor: "#ddd" }} />

      {/* Order Summary Details */}
      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
        <Typography variant="body1" sx={{ color: "#555" }}>Subtotal</Typography>
        <Typography variant="body1" sx={{ color: "#333", fontWeight: "500" }}>
          AED {totalProductPrice}
        </Typography>
      </Box>

      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
        <Typography variant="body1" sx={{ color: "#555" }}>Shipping</Typography>
        <Typography variant="body1" sx={{ color: "#333", fontWeight: "500" }}>
          AED {shippingPrice}
        </Typography>
      </Box>

      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
        <Typography variant="body1" sx={{ color: "#555" }}>Taxes</Typography>
        <Typography variant="body1" sx={{ color: "#333", fontWeight: "500" }}>
          AED {taxes}
        </Typography>
      </Box>

      <Divider sx={{ my: 2, borderColor: "#ddd" }} />

      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 4 }}>
        <Typography variant="h6" sx={{ color: "#004526", fontWeight: "600" }}>
          Total
        </Typography>
        <Typography variant="h6" sx={{ color: "#01A651", fontWeight: "600" }}>
          AED {totalPrice}
        </Typography>
      </Box>

      <Button
        variant="contained"
        color="primary"
        fullWidth
        sx={{
          padding: "12px 0",
          borderRadius: "8px",
          fontWeight: "600",
          boxShadow: "0px 4px 8px rgba(1, 166, 81, 0.2)",
          
        }}
      >
        Proceed to Checkout
      </Button>
    </Box>
  );
};

export default OrderSummaryCheckOut;
