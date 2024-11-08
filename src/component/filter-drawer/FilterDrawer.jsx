import React, { useEffect, useState } from "react";
import {
  Typography,
  FormGroup,
  FormControlLabel,
  Checkbox,
  Box,
  FormControl,
  OutlinedInput,
  InputAdornment,
  Button,
  RadioGroup,
  Radio,
  Divider,
  Drawer,
  Fab,
  IconButton,
} from "@mui/material";
import FilterListIcon from "@mui/icons-material/FilterList";
import CloseIcon from "@mui/icons-material/Close";
import { useFilterContext } from "../../context/FilterContext";
import axiosInstance from "../../api";

const FilterDrawer = () => {
  const { filters, setFilters, handleFilterChange, clearFilter } =
    useFilterContext();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [categorySubcategory, setCategorySubcategory] = useState([]);
  const [occasionData, setOccasionData] = useState([]);
  const [materialData, setMaterialData] = useState([]);
  const [tempFilters, setTempFilters] = useState({ ...filters });

  // Fetch category, occasion, and material data
  useEffect(() => {
    const fetchCategoryData = async () => {
      try {
        const response = await axiosInstance.get(
          "/subcategories/get-all-categories-subcategories"
        );
        setCategorySubcategory(response.data.data.categories);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };
    fetchCategoryData();

    const fetchOccasionData = async () => {
      try {
        const response = await axiosInstance.get("/occasion/get-all-occasion");
        setOccasionData(response.data.data.occasion);
      } catch (error) {
        console.error("Error fetching occasions:", error);
      }
    };
    fetchOccasionData();

    const fetchMaterialData = async () => {
      try {
        const response = await axiosInstance.get("/materials/get-all-material");
        setMaterialData(response.data.data.material);
      } catch (error) {
        console.error("Error fetching materials:", error);
      }
    };
    fetchMaterialData();
  }, []);

  const toggleDrawer = () => {
    setDrawerOpen((prev) => !prev);
    setTempFilters({ ...filters }); // Reset temp filters to current filters on open/close
  };

  // Handle temporary filter changes
  const handleTempFilterChange = (e, value) => {
    const { name, checked } = e.target;
    setTempFilters((prev) => ({
      ...prev,
      [name]: checked
        ? [...(prev[name] || []), value]
        : prev[name].filter((v) => v !== value),
    }));
  };

  // Clear all temporary filters
  const clearAllTempFilters = () => {
    setTempFilters({
      category: [],
      subcategory: [],
      minPrice: "",
      maxPrice: "",
      discount: "",
      newArrival: "",
      occasion: [],
      material: [],
    });
  };

  // Apply filters and update context
  const applyFilters = () => {
    setFilters(tempFilters);
    setDrawerOpen(false);
  };

  return (
    <>
      {/* Floating Action Button for Filter */}
      <Fab
        color="primary"
        aria-label="filter"
        onClick={toggleDrawer}
        sx={{
          position: "fixed",
          bottom: 40,
          left: "50%",
          transform: "translateX(-50%)",
        }}
      >
        <FilterListIcon />
      </Fab>

      {/* Filter Drawer */}
      <Drawer
        anchor="bottom"
        open={drawerOpen}
        onClose={toggleDrawer}
        PaperProps={{
          style: {
            height: "100vh",
            width: "100%",
          },
        }}
      >
        <Box
          p={2}
          role="presentation"
          display="flex"
          flexDirection="column"
          height="100%"
        >
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <Typography variant="h6">Filter Options</Typography>
            <IconButton onClick={toggleDrawer}>
              <CloseIcon />
            </IconButton>
          </Box>

          <Divider sx={{ my: 2 }} />

          <Box flex="1" overflow="auto">
            {/* Category & Subcategory Filter */}
            <Typography variant="subtitle1" fontWeight="bold">
              Category
            </Typography>
            <FormGroup>
              {categorySubcategory.map((ctgy) => (
                <Box key={ctgy.name}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={tempFilters.category?.includes(ctgy.name)}
                        onChange={(e) => handleTempFilterChange(e, ctgy.name)}
                        name="category"
                      />
                    }
                    label={ctgy.name}
                  />
                  <Box pl={2}>
                    {ctgy.Subcategories.map((subCtg) => (
                      <FormControlLabel
                        key={subCtg.name}
                        control={
                          <Checkbox
                            checked={tempFilters.subcategory?.includes(
                              subCtg.name
                            )}
                            onChange={(e) =>
                              handleTempFilterChange(e, subCtg.name)
                            }
                            name="subcategory"
                          />
                        }
                        label={subCtg.name}
                      />
                    ))}
                  </Box>
                </Box>
              ))}
            </FormGroup>

            <Divider sx={{ my: 2 }} />

            {/* Other Filters... (Price, Discount, New Arrival, Occasion, Material) */}
            {/* The structure for these sections would be similar to the category section */}
          </Box>

          {/* Drawer Bottom Buttons */}
          <Box
            position="sticky"
            bottom="0"
            display="flex"
            justifyContent="space-between"
            p={2}
            bgcolor="background.paper"
            boxShadow={2}
          >
            <Button onClick={clearAllTempFilters} color="secondary">
              Clear Filters
            </Button>
            <Button variant="contained" onClick={applyFilters} color="primary">
              Apply Filters
            </Button>
          </Box>
        </Box>
      </Drawer>
    </>
  );
};

export default FilterDrawer;
