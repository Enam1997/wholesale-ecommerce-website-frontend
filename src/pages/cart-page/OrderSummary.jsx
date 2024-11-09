import React, { useContext } from "react";
import { Box, Typography, Button, Divider } from "@mui/material";
import { calculateTotalOrderPrice } from "../../utils/orderPrice";
import { useCart } from "../../context/CartContext";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

const OrderSummary = () => {
  const { cartItems } = useCart();
  const { user, handleLoginOpen, handleRegisterOpen } = useContext(AuthContext);
  const { totalProductPrice, shippingPrice, taxes, totalPrice } =
    calculateTotalOrderPrice(cartItems);

  const navigate = useNavigate();

  const handleCheckOutButtonClick = (route) => {
    if (user) {
      navigate(route); // Navigate to the corresponding route
    } else {
      handleLoginOpen();
    }
  };

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
      <Button
        variant="contained"
        color="primary"
        fullWidth
        sx={{ fontWeight: 900, marginTop: "10px" }}
        onClick={() => handleCheckOutButtonClick("/checkout")}
      >
        Proceed to Checkout
      </Button>
    </Box>
  );
};

export default OrderSummary;
