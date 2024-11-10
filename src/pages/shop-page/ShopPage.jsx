import React, { useEffect, useRef } from "react";
import { Box, Grid } from "@mui/material";
import FilterOptions from "./sections/FilterOptions";
import ProductDisplay from "./sections/ProductDisplay";

import { useSearchParams } from "react-router-dom";
import { useFilterContext } from "../../context/FilterContext";
import FilterDrawer from "../../component/filter-drawer/FilterDrawer";

const ShopPage = () => {
  const { filters, setFilters } = useFilterContext();
  const [searchParams, setSearchParams] = useSearchParams();
  const isFirstRender = useRef(true); // Track the first render to prevent looping

  // Sync URL query parameters with filters
  useEffect(() => {
    if (isFirstRender.current) {
      const newFilters = {
        category: searchParams.get("category") || [],
        subcategory: searchParams.get("subcategory") || [],
        minPrice: searchParams.get("minPrice") || 0,
        maxPrice: searchParams.get("maxPrice") || 100000,
        discount: searchParams.get("discount") || 0,
        newArrival: searchParams.get("newArrival") || 0,
        occasion: searchParams.get("occasion") || "",
        material: searchParams.get("material") || "",
        search: searchParams.get("search") || filters.search ||"",
        sortOrder: searchParams.get("sortOrder") || "DESC",
      };

      // Update filters only if there's a difference from current filters
      if (JSON.stringify(newFilters) !== JSON.stringify(filters)) {
        setFilters(newFilters);
      }

      isFirstRender.current = false; // Mark as rendered after first run
    }
  }, [searchParams, filters, setFilters]);

  // Update URL whenever filters change
  useEffect(() => {
    // Prevent infinite loop: only update the search params if the filters are different
    const currentParams = {
      category: searchParams.get("category") || [],
      subcategory: searchParams.get("subcategory") || [],
      minPrice: searchParams.get("minPrice") || 0,
      maxPrice: searchParams.get("maxPrice") || 0,
      discount: searchParams.get("discount") || 0,
      newArrival: searchParams.get("newArrival") || 0,
      occasion: searchParams.get("occasion") || "",
      material: searchParams.get("material") || "",
      search: searchParams.get("search") || filters.search || "",
      sortOrder: searchParams.get("sortOrder") || "DESC",
    };

    if (JSON.stringify(currentParams) !== JSON.stringify(filters)) {
      setSearchParams({
        category: filters.category,
        subcategory: filters.subcategory,
        minPrice: filters.minPrice,
        maxPrice: filters.maxPrice,
        discount: filters.discount,
        newArrival: filters.newArrival,
        occasion: filters.occasion,
        material: filters.material,
        search: filters.search,
        sortOrder: filters.sortOrder,
      });
    }
  }, [filters, searchParams, setSearchParams]);

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
        <Box sx={{ display: { xs: "block", md: "none" } }}>
          <FilterDrawer />
        </Box>
      </Grid>
    </Box>
  );
};

export default ShopPage;
