import React from "react";
import { Box, Typography, Divider } from "@mui/material";
import { orderItems, orderSummary } from "../../demo-data/checkoutPageData";
import { calculateTotalOrderPrice } from "../../utils/orderPrice";
import { useCart } from "../../context/CartContext";

const Confirmation = () => {
  const { cartItems } = useCart();
  const { totalProductPrice, shippingPrice, taxes, totalPrice } =
    calculateTotalOrderPrice(cartItems);

  return (
    <Box>
      <Typography variant="h6" sx={{ mb: 2 }}>
        Confirmation
      </Typography>
      <Typography variant="body1" sx={{ mb: 2 }}>
        Please review your order details and confirm your purchase.
      </Typography>

      <Box>
        {cartItems.map((item, index) => (
          <Box key={index}>
            <Box
              sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}
            >
              <Typography variant="body2">
                {item.name.length > 25
                  ? `${item.name.slice(0, 25)}...`
                  : item.name}
                {"  "}
                <span style={{ color: "gray" }}>x {item.quantity}</span>
              </Typography>
              <Typography variant="body1">${item.totalPrice}</Typography>
            </Box>
          </Box>
        ))}
      </Box>

      <Divider sx={{ my: 2 }} />

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

      <Typography variant="body1">
        By placing your order, you agree to our terms and conditions.
      </Typography>
    </Box>
  );
};

export default Confirmation;
