import React, { useEffect, useState } from "react";
import { Grid, Box } from "@mui/material";
import { demoCartItems, orderSummary } from "../../demo-data/cartData";

import CartItem from "./CartItem";
import OrderSummary from "./OrderSummary";
import ProductsSliderOne from "../../component/products-slider-one/ProductsSliderOne";
import { newproduct } from "../../demo-data/newproduct";
import { useCart } from "../../context/CartContext";
import axiosInstance from "../../api";

import SectionTitle from "../../component/section-title/SectionTitle";
import EmptyCartShowingCard from "../../component/empty-cart-showing-card/EmptyCartShowingCard";

const CartPage = () => {
  const { cartItems, updateCartQuantity, removeFromCart } = useCart();
  const [allBestSellingProducts, setAllBestSellingProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const response = await axiosInstance.get(
          `/product/get-10-best-selling-products`
        );
        const data = response.data.data.bestSellingProductsData;
        const mainData = data.map((d) => d.Product);
        setAllBestSellingProducts(mainData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []); // Depend on 'page' so it fetches again when page changes
  return (
    <Box sx={{ padding: "24px" }}>
      <SectionTitle title={"Shopping Cart"} />

      {cartItems?.length !== 0 ? (
        <>
          <Grid container spacing={4}>
            {/* Left Side: Cart Items */}
            <Grid item xs={12} md={8}>
              {cartItems?.map((item, index) => (
                <CartItem
                  key={index}
                  item={item}
                  onIncrease={() =>
                    updateCartQuantity(item.id, item.quantity + 1)
                  }
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
              <OrderSummary />
            </Grid>
          </Grid>

          <Grid container spacing={4}>
            <Grid item xs={12} md={8}></Grid>
          </Grid>
        </>
      ) : (
        <EmptyCartShowingCard />
      )}

      {allBestSellingProducts ? (
        <ProductsSliderOne
          title="Best Selling Products"
          products={allBestSellingProducts}
          loading={loading}
        />
      ) : (
        ""
      )}
    </Box>
  );
};

export default CartPage;
