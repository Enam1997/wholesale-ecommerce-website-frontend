import React, { useEffect, useState } from "react";
import { Grid, Typography, Box } from "@mui/material";

import ProductCard from "../../../component/product-card/ProductCard";
import { newproduct } from "../../../demo-data/newproduct";
import ProductCardTwo from "../../../component/product-card-2/ProductCardTwo";
import ProductCardThree from "../../../component/product-card-three/ProductCardThree";
import axiosInstance from "../../../api";
import ProductCardThreeSkeleton from "../../../component/product-card-three/ProductCardThreeSkelton";

const NewProducts = () => {
  const [loading, setLoading] = useState(true);
  const [allNewProducts, setAllNewProducts] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const response = await axiosInstance.get(
          `/product/get-10-new-products`
        );
        setAllNewProducts(response.data.data.newProducts);
      } catch (err) {
        console.log(err.message);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []); // Depend on 'page' so it fetches again when page changes

  return (
    <div>
      <Box mt={6}>
        <Typography variant="h4" mb={4} gutterBottom>
          New Products
        </Typography>
        {loading ? (
          <Grid container alignItems="center" spacing={2}>
            {[1, 2, 3, 4, 5, 6, 7, 8].map((index) => (
              <Grid item xs={6} sm={6} md={3} key={index}>
                <ProductCardThreeSkeleton />
              </Grid>
            ))}
          </Grid>
        ) : (
          <Grid container spacing={2}>
            {allNewProducts.length != 0 ? (
              <>
                {allNewProducts.map((product) => (
                  <Grid item xs={6} sm={6} md={4} lg={2} key={product.id}>
                    <ProductCardThree product={product} />
                  </Grid>
                ))}
              </>
            ) : (
              <>No Product Available</>
            )}
          </Grid>
        )}
      </Box>
    </div>
  );
};

export default NewProducts;
