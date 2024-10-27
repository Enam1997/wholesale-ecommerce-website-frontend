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
      sx={{ padding: "24px", border: "1px solid #ddd", borderRadius: "8px" }}
    >
      <Typography variant="h5" sx={{ mb: 3 }}>
        Order Summary
      </Typography>

      {/* List of Products */}
      {cartItems.map((item, index) => (
        <Box key={index}>
          <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
            <Typography variant="body2">
              {item.name.length > 20
                ? `${item.name.slice(0, 20)}...`
                : item.name}
              {"  "}
              <span style={{ color: "gray" }}>x {item.quantity}</span>
            </Typography>
            <Typography variant="body1">
              {(
                (calculateDiscountPrice(item.price, item.discount) ||
                  item.price) * item.quantity
              ).toFixed(2)}
            </Typography>
          </Box>
        </Box>
      ))}

      <Divider sx={{ my: 2 }} />

      {/* Order Summary Details */}
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
    </Box>
  );
};

export default OrderSummaryCheckOut;
