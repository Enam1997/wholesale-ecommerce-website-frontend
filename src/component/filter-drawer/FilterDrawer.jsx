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
import FilterOptionLoadinSkelton from "../filter-option-loading-skelton/FilterOptionLoadinSkelton";

const FilterDrawer = () => {
  const { filters, setFilters, handleFilterChange, clearFilter } =
    useFilterContext();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [categorySubcategory, setCategorySubcategory] = useState([]);
  const [loadingCategorySubCategory, setLoadingCategorySubCategory] =
    useState(true);

  const [occasionData, setOccasionData] = useState([]);
  const [loadingOccasionData, setLoadingOccasion] = useState(true);

  const [materialData, setMaterialData] = useState([]);
  const [loadingMaterialData, setLoadingMaterial] = useState(true);

  const [error, setError] = useState(null);
  // State management for different filters
  const [discount, setDiscount] = useState([]);
  const [newArrival, setNewArrival] = useState([]);
  const [occasion, setOccasion] = useState([]);
  const [material, setMaterial] = useState([]);

  const [tempFilters, setTempFilters] = useState({ ...filters });

  // Fetch category, occasion, and material data
  useEffect(() => {
    setLoadingCategorySubCategory(true);
    const fetchCategoryData = async () => {
      try {
        const response = await axiosInstance.get(
          "/subcategories/get-all-categories-subcategories"
        );
        setCategorySubcategory(response.data.data.categories);
      } catch (error) {
        console.error("Error fetching categories:", error);
      } finally {
        setLoadingCategorySubCategory(false);
      }
    };
    fetchCategoryData();

    const fetchOccasionData = async () => {
      setLoadingOccasion(true);
      try {
        const response = await axiosInstance.get("/occasion/get-all-occasion");
        setOccasionData(response.data.data.occasion);
      } catch (error) {
        console.error("Error fetching occasions:", error);
      } finally {
        setLoadingOccasion(false);
      }
    };
    fetchOccasionData();

    const fetchMaterialData = async () => {
      setLoadingMaterial(true);
      try {
        const response = await axiosInstance.get("/materials/get-all-material");
        setMaterialData(response.data.data.material);
      } catch (error) {
        console.error("Error fetching materials:", error);
      } finally {
        setLoadingMaterial(false);
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

  const handleCategoryChange = (event, subcategories) => {
    const value = event.target.name;

    setFilters((prev) => {
      const isCategoryChecked = event.target.checked;
      const currentCategories = Array.isArray(prev.category)
        ? prev.category
        : [];
      const currentSubcategories = Array.isArray(prev.subcategory)
        ? prev.subcategory
        : [];

      // Update categories based on checkbox state
      const updatedCategories = isCategoryChecked
        ? [...currentCategories, value]
        : currentCategories.filter((item) => item !== value);

      // Remove related subcategories if category is unchecked
      const updatedSubcategories = isCategoryChecked
        ? currentSubcategories
        : currentSubcategories.filter((sub) => !subcategories.includes(sub));

      return {
        ...prev,
        category: updatedCategories,
        subcategory: updatedSubcategories,
      };
    });
  };

  const handleSubcategoryChange = (event, parentCategory) => {
    const value = event.target.name;

    setFilters((prev) => {
      const isSubcategoryChecked = event.target.checked;
      const currentCategories = Array.isArray(prev.category)
        ? prev.category
        : [];
      const currentSubcategories = Array.isArray(prev.subcategory)
        ? prev.subcategory
        : [];

      // Update the subcategories based on checkbox state
      const updatedSubcategories = isSubcategoryChecked
        ? [...currentSubcategories, value]
        : currentSubcategories.filter((item) => item !== value);

      // Add parent category if not present
      const updatedCategories =
        isSubcategoryChecked && !currentCategories.includes(parentCategory)
          ? [...currentCategories, parentCategory]
          : currentCategories;

      return {
        ...prev,
        subcategory: updatedSubcategories,
        category: updatedCategories,
      };
    });
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

          <Box flex="1" overflow="auto" paddingBottom={6}>
            {/* Category & Subcategory Filter */}
            <Typography variant="subtitle1" fontWeight="bold">
              Category
            </Typography>
            {loadingCategorySubCategory ? (
              <>
                <FilterOptionLoadinSkelton />
                <FilterOptionLoadinSkelton />
                <FilterOptionLoadinSkelton />
                <FilterOptionLoadinSkelton />
                <FilterOptionLoadinSkelton />
              </>
            ) : (
              categorySubcategory &&
              categorySubcategory.map((ctgy, index) => (
                <FormGroup key={index}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={filters.category.includes(ctgy?.name)}
                        onChange={(e) =>
                          // handleCategoryChange(e, [...ctgy?.Subcategories])
                          handleCategoryChange(
                            e,
                            ctgy?.Subcategories.map((sub) => sub.name)
                          )
                        }
                      />
                    }
                    label={ctgy?.name}
                    name={ctgy?.name}
                  />
                  {ctgy.Subcategories ? (
                    <>
                      <FormGroup sx={{ pl: 2 }}>
                        {ctgy.Subcategories.map((subCtg, index) => (
                          <FormControlLabel
                            key={index}
                            control={
                              <Checkbox
                                checked={filters.subcategory.includes(
                                  subCtg?.name
                                )}
                                onChange={(e) =>
                                  handleSubcategoryChange(e, ctgy?.name)
                                }
                              />
                            }
                            label={subCtg?.name}
                            name={subCtg?.name}
                          />
                        ))}
                      </FormGroup>
                    </>
                  ) : (
                    ""
                  )}
                </FormGroup>
              ))
            )}

            <Divider sx={{ my: 2 }} />
            {/* Price Filter */}
            <Typography variant="subtitle1" fontWeight="bold">
              Price
            </Typography>
            <Box display="flex" flexDirection={"column"} gap={2}>
              <FormControl variant="outlined">
                <OutlinedInput
                  name="minPrice"
                  value={filters.minPrice}
                  onChange={handleFilterChange}
                  endAdornment={
                    <InputAdornment position="end">AED</InputAdornment>
                  }
                  size="small"
                  aria-describedby="min-price-helper-text"
                />
                <Typography variant="caption">Minimum</Typography>
              </FormControl>
              <FormControl variant="outlined">
                <OutlinedInput
                  name="maxPrice"
                  value={filters.maxPrice}
                  onChange={handleFilterChange}
                  endAdornment={
                    <InputAdornment position="end">AED</InputAdornment>
                  }
                  size="small"
                  aria-describedby="max-price-helper-text"
                />
                <Typography variant="caption">Maximum</Typography>
              </FormControl>
            </Box>

            <Divider sx={{ my: 2 }} />
            {/* Discount */}
            <Typography variant="subtitle1" fontWeight="bold">
              Discount
            </Typography>
            <FormControl component="fieldset">
              <RadioGroup
                name="discount"
                value={discount}
                onChange={handleFilterChange}
              >
                {[10, 20, 30, 40, 50, 60, 70, 80, 90].map((per) => (
                  <FormControlLabel
                    key={per}
                    value={per}
                    control={<Radio checked={filters.discount == per} />}
                    label={`Lest Than ${per}%`}
                  />
                ))}
              </RadioGroup>
            </FormControl>

            <Divider sx={{ my: 2 }} />
            {/* New Arrival */}
            <Typography variant="subtitle1" fontWeight="bold">
              New Arrival
            </Typography>
            <FormControl component="fieldset">
              <RadioGroup
                name="newArrival"
                value={newArrival}
                onChange={handleFilterChange}
              >
                {[10, 20, 30].map((per) => (
                  <FormControlLabel
                    key={per}
                    value={per}
                    control={<Radio checked={filters.newArrival == per} />}
                    label={`Lest Than ${per} days`}
                  />
                ))}
              </RadioGroup>
            </FormControl>

            <Divider sx={{ my: 2 }} />
            {/* Occasion */}
            <Typography variant="subtitle1" fontWeight="bold">
              Occasion
            </Typography>
            <Box>
              {loadingOccasionData ? (
                <FilterOptionLoadinSkelton />
              ) : (
                occasionData &&
                occasionData.map((ocas, index) => (
                  <FormGroup key={index}>
                    <FormControlLabel
                      label={ocas?.name}
                      name={"occasion"}
                      control={
                        <Checkbox
                          value={ocas.name}
                          checked={filters.occasion.includes(ocas?.name)}
                          onChange={handleFilterChange}
                        />
                      }
                    />
                  </FormGroup>
                ))
              )}
            </Box>

            <Divider sx={{ my: 2 }} />
            {/* Material */}
            <Typography variant="subtitle1" fontWeight="bold">
              Material
            </Typography>
            <Box>
              {loadingMaterialData ? (
                <FilterOptionLoadinSkelton />
              ) : (
                materialData &&
                materialData.map((mat, index) => (
                  <FormGroup key={index}>
                    <FormControlLabel
                      label={mat?.name}
                      name={"material"}
                      control={
                        <Checkbox
                          value={mat.name}
                          checked={filters.material.includes(mat?.name)}
                          onChange={handleFilterChange}
                        />
                      }
                    />
                  </FormGroup>
                ))
              )}
            </Box>
            {/* Filter End */}
          </Box>

          {/* Drawer Bottom Buttons */}
          <Box
            position="sticky"
            bottom="0"
            display="flex"
            justifyContent="space-between"
            p={1}
            // bgcolor="background.paper"
            // boxShadow={2}
          >
            <Button
              fullWidth
              variant="outlined"
              onClick={clearFilter}
              color="secondary"
              disabled={
                !filters.category.length &&
                !filters.subcategory.length &&
                !filters.minPrice &&
                !filters.maxPrice &&
                !filters.discount &&
                !filters.newArrival.length &&
                !filters.occasion.length &&
                !filters.material.length &&
                filters.maxPrice == 100000 &&
                filters.minPrice == 0 &&
                filters.sortOrder == "ASC"
              }
            >
              Clear Filters
            </Button>
          </Box>
        </Box>
      </Drawer>
    </>
  );
};

export default FilterDrawer;
