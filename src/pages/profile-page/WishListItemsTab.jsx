import React from "react";
import { Grid, Typography, Box } from "@mui/material";
import { useWishlist } from "../../context/WishListContext";
import ProductCardThree from "../../component/product-card-three/ProductCardThree";

const WishListItemsTab = () => {
  const { wishlistItems } = useWishlist();
  return (
    <Grid container spacing={2}>
      {wishlistItems.length != 0 ? (
        <>
          {wishlistItems.map((product) => (
            <Grid item xs={6} sm={6} md={4} lg={4} key={product.id}>
              <ProductCardThree product={product} />
            </Grid>
          ))}
        </>
      ) : (
        <>No Product Available</>
      )}
    </Grid>
  );
};

export default WishListItemsTab;
