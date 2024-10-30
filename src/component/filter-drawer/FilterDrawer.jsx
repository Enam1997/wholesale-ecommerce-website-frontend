import React, { useEffect, useState } from "react";
import {
  Drawer,
  IconButton,
  Typography,
  Box,
  FormGroup,
  FormControlLabel,
  Checkbox,
  Button,
  OutlinedInput,
  InputAdornment,
  Fab,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import FilterListIcon from "@mui/icons-material/FilterList";
import { useFilterContext } from "../../context/FilterContext.jsx";
import axiosInstance from "../../api.js";

const FilterDrawer = () => {
  const { filters, setFilters, handleFilterChange, clearFilter } =
    useFilterContext();
  const [categorySubcategory, setCategorySubcategory] = useState([]);
  const [loadingCategorySubCategory, setLoadingCategorySubCategory] =
    useState(true);
  const [tempFilters, setTempFilters] = useState(filters); // Temporary filters
  const [drawerOpen, setDrawerOpen] = useState(false);

  const toggleDrawer = (open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setDrawerOpen(open);
  };

  useEffect(() => {
    setLoadingCategorySubCategory(true);
    const fetchCategories = async () => {
      try {
        const response = await axiosInstance.get(
          `/subcategories/get-all-categories-subcategories`
        );
        setCategorySubcategory(response.data.data.categories);
      } catch (err) {
        console.error(err.message);
      } finally {
        setLoadingCategorySubCategory(false);
      }
    };
    fetchCategories();
  }, []);

  const handleTempFilterChange = (event) => {
    const { name, value, checked } = event.target;
    setTempFilters((prev) => ({
      ...prev,
      [name]: checked
        ? [...prev[name], value]
        : prev[name].filter((item) => item !== value),
    }));
  };

  const handleFilterDataSet = () => {
    return;
  };

  const applyFilters = () => {
    // handleFilterDataSet();
    // setFilters(tempFilters); // Apply temp filters to actual filters
    setDrawerOpen(false); // Close the drawer
  };

  const clearAllFilters = () => {
    clearFilter(); // Clear filters from context
    setTempFilters({}); // Reset temporary filters
  };

  return (
    <Box>
      {/* Floating Action Button for opening the filter drawer on small screens */}
      <Fab
        color="secondary"
        aria-label="filter"
        sx={{
          position: "fixed",
          bottom: 40,
          left: "50%",
          transform: "translateX(-50%)",
        }}
        onClick={toggleDrawer(true)}
      >
        <FilterListIcon />
      </Fab>

      {/* Filter Drawer */}
      <Drawer anchor="bottom" open={drawerOpen} onClose={toggleDrawer(false)}>
        <Box sx={{ width: "100%", p: 2 }}>
          <Box display={"flex"} justifyContent={"space-between"}>
            {/* Filter Heading */}
            <Typography variant="h6" sx={{ mb: 2 }}>
              Filter by
            </Typography>
            {/* Close button */}
            <IconButton onClick={toggleDrawer(false)} sx={{ mb: 1 }}>
              <CloseIcon />
            </IconButton>
          </Box>

          {/* Categories */}
          {categorySubcategory.map((category, index) => (
            <FormGroup key={index}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={
                      tempFilters.category?.includes(category.name) || false
                    }
                    onChange={(e) =>
                      handleTempFilterChange(e, category.subcategories)
                    }
                  />
                }
                label={category.name}
                name="category"
                value={category.name}
              />
              <Box sx={{ pl: 2 }}>
                {category.subcategories?.map((sub, subIndex) => (
                  <FormControlLabel
                    key={subIndex}
                    control={
                      <Checkbox
                        checked={
                          tempFilters.subcategory?.includes(sub.name) || false
                        }
                        onChange={(e) => handleTempFilterChange(e)}
                      />
                    }
                    label={sub.name}
                    name="subcategory"
                    value={sub.name}
                  />
                ))}
              </Box>
            </FormGroup>
          ))}

          {/* Price Filter */}
          <Typography sx={{ fontWeight: "bold", mt: 2 }}>Price</Typography>
          <FormGroup>
            <OutlinedInput
              name="minPrice"
              value={tempFilters.minPrice || ""}
              onChange={handleTempFilterChange}
              endAdornment={<InputAdornment position="end">AED</InputAdornment>}
              placeholder="Minimum Price"
              sx={{ mt: 1 }}
            />
            <OutlinedInput
              name="maxPrice"
              value={tempFilters.maxPrice || ""}
              onChange={handleTempFilterChange}
              endAdornment={<InputAdornment position="end">AED</InputAdornment>}
              placeholder="Maximum Price"
              sx={{ mt: 1 }}
            />
          </FormGroup>

          {/* Drawer bottom buttons */}
          <Box display="flex" justifyContent="space-between" mt={3}>
            <Button onClick={clearAllFilters} color="secondary">
              Clear Filters
            </Button>
            <Button variant="contained" onClick={applyFilters} color="primary">
              Apply Filters
            </Button>
          </Box>
        </Box>
      </Drawer>
    </Box>
  );
};

export default FilterDrawer;
