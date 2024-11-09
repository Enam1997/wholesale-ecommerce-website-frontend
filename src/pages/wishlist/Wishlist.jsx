import React from "react";
import { Box, Grid } from "@mui/material";
import ProductCardThree from "../../component/product-card-three/ProductCardThree";
import { useWishlist } from "../../context/WishListContext";

const Wishlist = () => {
  const { wishlistItems } = useWishlist();
  return (
    <Box sx={{ padding: "2rem 0" }}>
      <Grid container spacing={2}>
        {wishlistItems.length != 0 ? (
          <>
            {wishlistItems.map((product) => (
              <Grid item xs={6} sm={6} md={4} lg={2} key={product.id}>
                <ProductCardThree product={product} />
              </Grid>
            ))}
          </>
        ) : (
          <Box display="flex" justifyContent="center" width='100%'>
            No Product In Wishlist
          </Box>
        )}
      </Grid>
    </Box>
  );
};

export default Wishlist;
