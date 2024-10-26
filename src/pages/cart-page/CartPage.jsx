import React from "react";
import { Grid, Box, Typography } from "@mui/material";
import { demoCartItems, orderSummary } from "../../demo-data/cartData";

import CartItem from "./CartItem";
import OrderSummary from "./OrderSummary";
import ProductsSliderOne from "../../component/products-slider-one/ProductsSliderOne";
import { newproduct } from "../../demo-data/newproduct";
import { useCart } from "../../context/CartContext";

const CartPage = () => {
  const { cartItems, updateCartQuantity, removeFromCart } = useCart();
  return (
    <Box sx={{ padding: "24px" }}>
      <Typography variant="h4" sx={{ mb: 4 }}>
        Shopping Cart
      </Typography>

      <Grid container spacing={4}>
        {/* Left Side: Cart Items */}
        <Grid item xs={12} md={8}>
          {cartItems?.map((item, index) => (
            <CartItem
              key={index}
              item={item}
              onIncrease={() => updateCartQuantity(item.id, item.quantity + 1)}
              onDecrease={() =>
                item.quantity > 1
                  ? updateCartQuantity(item.id, item.quantity - 1)
                  : removeFromCart(item.id)
              }
              onRemove={() => removeFromCart(item.id)}
            />
          ))}
        </Grid>

        {/* Right Side: Order Summary */}
        <Grid item xs={12} md={4}>
          <OrderSummary summary={orderSummary} />
        </Grid>
      </Grid>

      <Grid container spacing={4}>
        <Grid item xs={12} md={8}></Grid>
      </Grid>

      <ProductsSliderOne title="Similar Products" products={newproduct} />
    </Box>
  );
};

export default CartPage;
