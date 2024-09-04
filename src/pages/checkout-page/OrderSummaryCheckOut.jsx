import React from "react";
import { Box, Typography, Button, Divider } from "@mui/material";

const OrderSummaryCheckOut = ({ items, summary }) => {
  const { subtotal, shipping, taxes, total } = summary;

  return (
    <Box
      sx={{ padding: "24px", border: "1px solid #ddd", borderRadius: "8px" }}
    >
      <Typography variant="h5" sx={{ mb: 3 }}>
        Order Summary
      </Typography>

      {/* List of Products */}
      {items.map((item, index) => (
        <Box key={index}>
          <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
            <Typography variant="body2">
              {item.name}{" "}
              <span style={{ color: "gray" }}>x{item.quantity}</span>
            </Typography>
            <Typography variant="body1">$ 300</Typography>
          </Box>
          {index < items.length - 1 && <Divider sx={{ my: 2 }} />}
        </Box>
      ))}

      <Divider sx={{ my: 2 }} />

      {/* Order Summary Details */}
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
    </Box>
  );
};

export default OrderSummaryCheckOut;
