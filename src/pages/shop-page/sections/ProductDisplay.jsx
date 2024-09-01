import React from "react";
import { Grid, Pagination, Box } from "@mui/material";
import ProductCard from "../../../component/product-card/ProductCard";
import { newproduct } from "../../../demo-data/newproduct";

const ProductDisplay = () => {
  return (
    <Box>
      <Grid container spacing={2}>
        {newproduct.map((product) => (
          <Grid item xs={12} sm={6} md={4} key={product.id}>
            <ProductCard product={product} />
          </Grid>
        ))}
      </Grid>
      {/* Pagination */}
      <Box mt={4} display="flex" justifyContent="center">
        <Pagination count={10} color="primary" />
      </Box>
    </Box>
  );
};

export default ProductDisplay;
