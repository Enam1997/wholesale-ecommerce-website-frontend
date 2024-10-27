import React from "react";
import { Box, Typography, Button, Divider } from "@mui/material";
import { calculateTotalOrderPrice } from "../../utils/orderPrice";
import { useCart } from "../../context/CartContext";

const OrderSummary = () => {
  const { cartItems } = useCart();
  const { totalProductPrice, shippingPrice, taxes, totalPrice } =
    calculateTotalOrderPrice(cartItems);

  return (
    <Box
      sx={{ padding: "24px", border: "1px solid #ddd", borderRadius: "8px" }}
    >
      <Typography variant="h5" sx={{ mb: 3 }}>
        Order Summary
      </Typography>

      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
        <Typography variant="body1">Subtotal</Typography>
        <Typography variant="body1">${totalProductPrice}</Typography>
      </Box>

      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
        <Typography variant="body1">Shipping</Typography>
        <Typography variant="body1">${shippingPrice}</Typography>
      </Box>

      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
        <Typography variant="body1">Taxes</Typography>
        <Typography variant="body1">${taxes}</Typography>
      </Box>

      <Divider sx={{ my: 2 }} />

      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 4 }}>
        <Typography variant="h6">Total</Typography>
        <Typography variant="h6">${totalPrice}</Typography>
      </Box>

      <Button variant="contained" color="primary" fullWidth>
        Proceed to Checkout
      </Button>
    </Box>
  );
};

export default OrderSummary;
