import React, { useEffect, useState } from "react";
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
import { useFilterContext } from "../../../context/FilterContext";
import axiosInstance from "../../../api";
import ProductCardThreeSkeleton from "../../../component/product-card-three/ProductCardThreeSkelton";

const ProductDisplay = () => {
  const [sortValue, setSortValue] = useState("ASC");
  const { filters, setFilters, handleFilterChange } = useFilterContext();
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [totalProduct, setTotalProduct] = useState(0);
  const [allProdcut, setAllProduct] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        // Construct the query string dynamically
        // const query = `name=&category=${filters.category}&subcategory=${filters.subcategory}&minPrice=${filters.minPrice}&maxPrice=${filters.maxPrice}&material${filters.material}=&discount=${filters.discount}&newArrival=${filters.newArrival}&page=${currentPage}&limit=28&status=Active&order=${filters.sortOrder}`;

        const query = `name=${filters.search}&category=${filters.category}&subcategory=${filters.subcategory}&minPrice=${filters.minPrice}&maxPrice=${filters.maxPrice}&material=${filters.material}&occasion=${filters.occasion}&discount=${filters.discount}&newArrival=${filters.newArrival}&page=${currentPage}&limit=28&status=Active&order=${filters.sortOrder}`;

        const response = await axiosInstance.get(
          `/product/get-all-with-filter?${query}`
        );
        setAllProduct(response.data.data.products);
        setTotalPage(response.data.data.totalPages);
        setTotalProduct(response.data.data.totalProducts);
      } catch (err) {
        console.log(err.message);

        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [currentPage, filters]); // Depend on 'page' so it fetches again when page changes

  const handleSortChange = (event) => {
    handleFilterChange(event);

    // Implement sorting logic based on selected value
  };

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
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
        <Typography variant="body2">Showing {totalProduct} Results</Typography>
        {/* Sort By Selector */}
        <Box display="flex" alignItems="center">
          <Typography variant="body2" mr={1}>
            Sort By:
          </Typography>
          <FormControl sx={{ minWidth: 150 }}>
            <Select
              labelId="sort-by-label"
              value={filters?.sortOrder}
              label="Sort By"
              onChange={handleSortChange}
              variant="standard"
              name="sortOrder"
            >
              <MenuItem value="DESC">New</MenuItem>
              <MenuItem value="ASC">Previos</MenuItem>
            </Select>
          </FormControl>
        </Box>
      </Box>

      {/* Product Grid */}
      {loading ? (
        <>
          <Grid container alignItems="center" spacing={2}>
            {[1, 2, 3, 4, 5, 6, 7, 8].map((index) => (
              <Grid item xs={6} sm={6} md={3} key={index}>
                <ProductCardThreeSkeleton />
              </Grid>
            ))}
          </Grid>
        </>
      ) : (
        <>
          {error ? (
            <Box>
              <Typography variant="body2">{error}</Typography>
            </Box>
          ) : (
            <Grid container alignItems="center" spacing={2}>
              {allProdcut?.map((product) => (
                <Grid item xs={6} sm={6} md={3} key={product.id}>
                  <ProductCardThree product={product} />
                </Grid>
              ))}
            </Grid>
          )}
        </>
      )}

      {/* Pagination */}
      <Box mt={4} display="flex" justifyContent="center">
        <Pagination
          count={totalPage}
          page={currentPage}
          onChange={handlePageChange}
          color="primary"
        />
      </Box>
    </Box>
  );
};

export default ProductDisplay;
