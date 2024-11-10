import React, { useContext, useEffect, useState } from "react";
import { Grid, Typography, Box } from "@mui/material";

import ProductCard from "../../../component/product-card/ProductCard";
import { newproduct } from "../../../demo-data/newproduct";
import ProductCardThree from "../../../component/product-card-three/ProductCardThree";
import ProductCardThreeSkeleton from "../../../component/product-card-three/ProductCardThreeSkelton";
import axiosInstance from "../../../api";
import { AuthContext } from "../../../context/AuthContext";

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
    <div>
      <Box mt={6}>
        <Typography variant="h4" mb={4} gutterBottom>
          Recommended Products
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
            {allRecomendedProducts.length != 0 ? (
              <>
                {allRecomendedProducts.map((product) => (
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

export default RecommendedProducts;
