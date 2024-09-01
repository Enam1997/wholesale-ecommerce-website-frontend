import React from "react";
import { Grid, Typography, Box } from "@mui/material";

import ProductCard from "../../../component/product-card/ProductCard";
import { newproduct } from "../../../demo-data/newproduct";

const NewProducts = () => {
  return (
    <div>
      <Box mt={6}>
        <Typography variant="h4" mb={4} gutterBottom>
          New Products
        </Typography>
        <Grid container spacing={2}>
          {newproduct.map((product) => (
            <Grid item xs={12} sm={6} md={4} lg={2.4} key={product.id}>
              <ProductCard product={product} />
            </Grid>
          ))}
        </Grid>
      </Box>
    </div>
  );
};

export default NewProducts;
