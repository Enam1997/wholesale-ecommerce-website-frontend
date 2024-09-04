import React from "react";
import { Box, Typography, Button, Divider } from "@mui/material";


const OrderSummary = ({ summary }) => {
  const { subtotal, shipping, taxes, total } = summary;

  return (
    <Box
      sx={{ padding: "24px", border: "1px solid #ddd", borderRadius: "8px" }}
    >
      <Typography variant="h5" sx={{ mb: 3 }}>
        Order Summary
      </Typography>

      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
        <Typography variant="body1">Subtotal</Typography>
        <Typography variant="body1">${subtotal}</Typography>
      </Box>

      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
        <Typography variant="body1">Shipping</Typography>
        <Typography variant="body1">${shipping}</Typography>
      </Box>

      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
        <Typography variant="body1">Taxes</Typography>
        <Typography variant="body1">${taxes}</Typography>
      </Box>

      <Divider sx={{ my: 2 }} />

      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 4 }}>
        <Typography variant="h6">Total</Typography>
        <Typography variant="h6">${total}</Typography>
      </Box>

      <Button variant="contained" color="primary" fullWidth>
        Proceed to Checkout
      </Button>
    </Box>
  );
};

export default OrderSummary;
