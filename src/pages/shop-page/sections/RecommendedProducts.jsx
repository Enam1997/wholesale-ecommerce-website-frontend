import React, { useContext, useEffect, useState } from "react";
import { Box, Grid, Typography } from "@mui/material";
import { newproduct } from "../../../demo-data/newproduct";
import ShopLeftRecomendedProductCard from "../../../component/shop-left-recomended-product-card/ShopLeftRecomendedProductCard";
import { AuthContext } from "../../../context/AuthContext";
import axiosInstance from "../../../api";

const RecommendedProducts = () => {
  const { user } = useContext(AuthContext);
  const [loading, setLoading] = useState(true);
  const [allRecomendedProducts, setAllRecomendedProducts] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const response = await axiosInstance.get(
          `/product/get-10-recomended-products/${user ? user?.id : "notLogin"}`
        );
        setAllRecomendedProducts(response.data.data.recommendedProducts);
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
    <Box mt={4}>
      <Typography variant="h6" gutterBottom>
        Recommended Products
      </Typography>
      <Grid container spacing={2}>
        {allRecomendedProducts.slice(0, 5).map((product) => (
          <Grid item xs={12} key={product.id}>
            <ShopLeftRecomendedProductCard product={product} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default RecommendedProducts;
