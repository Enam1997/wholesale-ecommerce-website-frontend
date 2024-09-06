import React, { useState } from "react";
import {
  Grid,
  Pagination,
  Box,
  Typography,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material";
import ProductCard from "../../../component/product-card/ProductCard";
import { shopproduct } from "../../../demo-data/shopproducts";
import ProductCardThree from "../../../component/product-card-three/ProductCardThree";

const ProductDisplay = () => {
  const [sortValue, setSortValue] = useState("recomended");

  const handleSortChange = (event) => {
    setSortValue(event.target.value);
    // Implement sorting logic based on selected value
  };

  return (
    <Box>
      {/* Top Section: Results and Sort Selector */}
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={3}
      >
        {/* Showing Total Results */}
        <Typography variant="body1">Showing 995 Results</Typography>
        {/* Sort By Selector */}
        <Box display="flex" alignItems="center">
          <Typography variant="body2" mr={1}>
            Sort By:
          </Typography>
          <FormControl sx={{ minWidth: 150 }}>
            <Select
              labelId="sort-by-label"
              value={sortValue}
              label="Sort By"
              onChange={handleSortChange}
              variant="standard"
            >
              <MenuItem value="recomended">Recomended</MenuItem>
              <MenuItem value="discount">Discount</MenuItem>
              <MenuItem value="newArrivals">New Arrivals</MenuItem>
              <MenuItem value="priceLowHigh">Price (Low to High)</MenuItem>
              <MenuItem value="priceHighLow">Price (High to Low)</MenuItem>
            </Select>
          </FormControl>
        </Box>
      </Box>

      {/* Product Grid */}
      <Grid container alignItems="center" spacing={2}>
        {shopproduct.map((product) => (
          <Grid item xs={12} sm={6} md={3} key={product.id}>
            <ProductCardThree product={product} />
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
