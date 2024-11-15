import React from "react";
import { Box, Typography, Divider, Paper, Chip } from "@mui/material";
import { calculateTotalOrderPrice } from "../../utils/orderPrice";
import { useCart } from "../../context/CartContext";
import calculateDiscountPrice from "../../utils/calculateProductDiscountPrice";

const Confirmation = ({ data }) => {
  const { cartItems } = useCart();
  const { totalProductPrice, shippingPrice, taxes, totalPrice } = calculateTotalOrderPrice(cartItems);

  return (
    <Paper
      elevation={4}
      sx={{
        p: 4,
        borderRadius: "20px",
        background: "linear-gradient(135deg, #f5f5f5, #e9f7ef)", // Soft background gradient
        maxWidth: "600px",
        margin: "0 auto",
        boxShadow: "0px 10px 20px rgba(0, 0, 0, 0.1)",
      }}
    >
      <Typography variant="h5" sx={{ mb: 3, fontWeight: "700", textAlign: "center", color: "#01A651" }}>
        Order Confirmation
      </Typography>
      <Typography variant="body1" sx={{ mb: 4, textAlign: "center", color: "#4E5D73" }}>
        Review your order details and confirm your purchase.
      </Typography>

      <Box>
        {cartItems.map((item, index) => (
          <Box key={index} sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
            <Typography variant="body2" sx={{ color: "#333", fontWeight: 500, maxWidth: "70%" }}>
              {item.name.length > 25 ? `${item.name.slice(0, 25)}...` : item.name}
              <Chip label={`x${item.quantity}`} sx={{ ml: 1, fontSize: "0.75rem", color: "#fff", backgroundColor: "#01A651" }} />
            </Typography>
            <Typography variant="body2" sx={{ fontWeight: "600", color: "#4A5568" }}>
              AED {(calculateDiscountPrice(item.price, item.discount) || item.price) * item.quantity.toFixed(2)}
            </Typography>
          </Box>
        ))}
      </Box>

      <Divider sx={{ my: 3, borderColor: "#CBD5E0" }} />

      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
        <Typography variant="body2" sx={{ color: "#64748B" }}>Subtotal</Typography>
        <Typography variant="body2" sx={{ fontWeight: "600", color: "#2D3748" }}>AED {totalProductPrice}</Typography>
      </Box>
      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
        <Typography variant="body2" sx={{ color: "#64748B" }}>Shipping</Typography>
        <Typography variant="body2" sx={{ fontWeight: "600", color: "#2D3748" }}>AED {shippingPrice}</Typography>
      </Box>
      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
        <Typography variant="body2" sx={{ color: "#64748B" }}>Taxes</Typography>
        <Typography variant="body2" sx={{ fontWeight: "600", color: "#2D3748" }}>AED {taxes}</Typography>
      </Box>

      <Divider sx={{ my: 3, borderColor: "#CBD5E0" }} />

      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 4 }}>
        <Typography variant="h6" sx={{ fontWeight: "700", color: "#01A651" }}>Total</Typography>
        <Typography variant="h6" sx={{ fontWeight: "700", color: "#C40233" }}>AED {totalPrice}</Typography>
      </Box>

      <Box sx={{ textAlign: "center", mt: 3 }}>
        <Typography variant="body2" sx={{ fontSize: "0.875rem", color: "#64748B" }}>
          By placing your order, you agree to our{" "}
          <span style={{  cursor: "pointer", fontWeight: "500" }}>terms and conditions</span>.
        </Typography>
      </Box>
    </Paper>
  );
};

export default Confirmation;
