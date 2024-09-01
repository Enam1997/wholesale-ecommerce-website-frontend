import React from "react";
import { Box, Grid, Typography } from "@mui/material";
import ProductCard from "../../../component/product-card/ProductCard";
import { newproduct } from "../../../demo-data/newproduct";

const RecommendedProducts = () => {
  return (
    <Box mt={4}>
      <Typography variant="h6" gutterBottom>
        Recommended Products
      </Typography>
      <Grid container spacing={2}>
        {newproduct.slice(0, 5).map((product) => (
          <Grid item xs={12} key={product.id}>
            <ProductCard product={product} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default RecommendedProducts;
