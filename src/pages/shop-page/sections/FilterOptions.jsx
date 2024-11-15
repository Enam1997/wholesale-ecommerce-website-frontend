import React, { useEffect, useState } from "react";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
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
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import RecommendedProducts from "./RecommendedProducts";
import { useFilterContext } from "../../../context/FilterContext";
import axiosInstance from "../../../api";
import FilterOptionLoadinSkelton from "../../../component/filter-option-loading-skelton/FilterOptionLoadinSkelton";

const FilterOptionAccrodionSummary = ({ title }) => {
  return (
    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
      <Typography
        sx={{
          fontWeight: 900,
          flexGrow: 1,
          background:
            "linear-gradient(90deg, #004526 0%, #C40233 50%, #004526 100%)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          // fontWeight: "700 !important",
        }}
      >
        {title}
      </Typography>
    </AccordionSummary>
  );
};

const FilterOptions = () => {
  const { filters, setFilters, handleFilterChange, clearFilter } =
    useFilterContext();
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

  useEffect(() => {
    setLoadingCategorySubCategory(true);
    const fetchProducts = async () => {
      try {
        const response = await axiosInstance.get(
          `/subcategories/get-all-categories-subcategories`
        );
        setCategorySubcategory(response.data.data.categories);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoadingCategorySubCategory(false);
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    setLoadingOccasion(true);
    const fetchOccasions = async () => {
      try {
        const response = await axiosInstance.get(`/occasion/get-all-occasion`);
        setOccasionData(response.data.data.occasion);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoadingOccasion(false);
      }
    };

    fetchOccasions();
  }, []);

  useEffect(() => {
    setLoadingMaterial(true);
    const fetchOccasions = async () => {
      try {
        const response = await axiosInstance.get(`/materials/get-all-material`);
        setMaterialData(response.data.data.material);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoadingMaterial(false);
      }
    };

    fetchOccasions();
  }, []);

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
    <Box>
      <Box display="flex" justifyContent="space-between" mb={2}>
        <Typography
          variant="body1"
          sx={{
            flexGrow: 1,
            background:
              "linear-gradient(90deg, #004526 0%, #C40233 50%, #004526 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            fontWeight: "700 !important",
          }}
        >
          Filter by:
        </Typography>
        <Button
          variant="text"
          color="secondary"
          onClick={clearFilter}
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
          Clear
        </Button>
      </Box>
      {/* Fetch Category Implement */}

      <Accordion defaultExpanded>
        <FilterOptionAccrodionSummary title="Category" />
        <AccordionDetails>
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

          {categorySubcategory ? <>{}</> : ""}
        </AccordionDetails>
      </Accordion>

      {/* Price Filter */}
      <Accordion defaultExpanded>
        <FilterOptionAccrodionSummary title="Price" />
        <AccordionDetails>
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
        </AccordionDetails>
      </Accordion>

      {/* Discount Filter */}
      <Accordion defaultExpanded>
        <FilterOptionAccrodionSummary title="Discount" />
        <AccordionDetails>
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
        </AccordionDetails>
      </Accordion>

      {/* NewArrival Filter */}
      <Accordion defaultExpanded>
        <FilterOptionAccrodionSummary title="New Arrival" />
        <AccordionDetails>
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
        </AccordionDetails>
      </Accordion>

      {/* Occasion Filter */}
      <Accordion defaultExpanded>
        <FilterOptionAccrodionSummary title="Occasion" />
        <AccordionDetails>
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

          {occasionData ? <>{}</> : ""}
        </AccordionDetails>
      </Accordion>

      {/* Material Filter */}
      <Accordion defaultExpanded>
        <FilterOptionAccrodionSummary title="Material" />
        <AccordionDetails>
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
        </AccordionDetails>
      </Accordion>

      {/* Recommended Products - Hidden on small displays */}
      <Box sx={{ display: { xs: "none", md: "block" } }}>
        <RecommendedProducts />
      </Box>
    </Box>
  );
};

export default FilterOptions;
