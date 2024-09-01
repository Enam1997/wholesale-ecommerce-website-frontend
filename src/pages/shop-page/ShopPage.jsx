import React from "react";
import { Box, Grid } from "@mui/material";
import FilterOptions from "./sections/FilterOptions";
import ProductDisplay from "./sections/ProductDisplay";

const ShopPage = () => {
  return (
    <Box sx={{ mt: 2, p: 2 }}>
      <Grid container spacing={2}>
        {/* Filter Options */}
        <Grid item xs={12} md={3} sx={{ display: { xs: "none", md: "block" } }}>
          <FilterOptions />
        </Grid>

        {/* Product Display */}
        <Grid item xs={12} md={9}>
          <ProductDisplay />
        </Grid>
      </Grid>
    </Box>
  );
};

export default ShopPage;
