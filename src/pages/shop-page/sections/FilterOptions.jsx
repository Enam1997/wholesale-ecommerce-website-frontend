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

const FilterOptions = () => {
  const { filters, setFilters, handleFilterChange, clearFilter } =
    useFilterContext();
  const [categorySubcategory, setCategorySubcategory] = useState([]);
  const [loadingCategorySubCategory, setLoadingCategorySubCategory] =
    useState(true);
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
        console.log(err.message);
        setError(err.message);
      } finally {
        setLoadingCategorySubCategory(false);
      }
    };

    fetchProducts();
  }, []); // Depend on 'page' so it fetches again when page changes

  const handleCategoryChange = (event, subcategories) => {
    console.log("Handle change subcategories");
    console.log(subcategories);

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

  // Handler for discount selection
  const handleDiscountChange = (event) => {
    console.log("dicount change");

    handleFilterChange(event);
    const value = event.target.name;
    if (event.target.checked) {
      setDiscount([...discount, value]);
    } else {
      setDiscount(discount.filter((item) => item !== value));
    }
  };

  // Handler for new arrival selection
  const handleNewArrivalChange = (event) => {
    const value = event.target.name;
    if (event.target.checked) {
      setNewArrival([...newArrival, value]);
    } else {
      setNewArrival(newArrival.filter((item) => item !== value));
    }
  };

  // Handler for occasion selection
  const handleOccasionChange = (event) => {
    const value = event.target.name;
    if (event.target.checked) {
      setOccasion([...occasion, value]);
    } else {
      setOccasion(occasion.filter((item) => item !== value));
    }
  };

  // Handler for material selection
  const handleMaterialChange = (event) => {
    const value = event.target.name;
    if (event.target.checked) {
      setMaterial([...material, value]);
    } else {
      setMaterial(material.filter((item) => item !== value));
    }
  };

  return (
    <Box>
      <Box display="flex" justifyContent="space-between" mb={2}>
        {console.log(filters)}
        <Typography variant="h6">Filter by:</Typography>
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
            filters.maxPrice == 10000 &&
            filters.minPrice == 0
          }
        >
          Clear
        </Button>
      </Box>
      {/* Fetch Category Implement */}

      <Accordion defaultExpanded>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography sx={{ fontWeight: 900 }}>Category</Typography>
        </AccordionSummary>
        <AccordionDetails>
          {categorySubcategory ? (
            <>
              {categorySubcategory.map((ctgy, index) => (
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
              ))}
            </>
          ) : (
            ""
          )}
        </AccordionDetails>
      </Accordion>

      {/* Price Filter */}
      <Accordion defaultExpanded>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography sx={{ fontWeight: 900 }}>Price</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Box display="flex" gap={2}>
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
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography sx={{ fontWeight: 900 }}>Discount</Typography>
        </AccordionSummary>
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
              {/* <FormControlLabel
                value="10%"
                control={<Radio checked={filters.discount === "10%"} />}
                label="10%"
              />
              <FormControlLabel
                value="20%"
                control={<Radio checked={filters.discount === "20%"} />}
                label="20%"
              />
              <FormControlLabel
                value="30%"
                control={<Radio checked={filters.discount === "30%"} />}
                label="30%"
              /> */}
            </RadioGroup>
          </FormControl>
        </AccordionDetails>
      </Accordion>

      {/* NewArrival Filter */}
      <Accordion defaultExpanded>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography sx={{ fontWeight: 900 }}>New Arrival</Typography>
        </AccordionSummary>
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
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography sx={{ fontWeight: 900 }}>Occasion</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <FormControl component="fieldset">
            <RadioGroup
              name="occasion"
              value={occasion}
              onChange={handleFilterChange}
            >
              {["Casual", "Formal", "Party", "Sports"].map((per) => (
                <FormControlLabel
                  key={per}
                  value={per}
                  control={<Radio checked={filters.occasion == per} />}
                  label={`${per}`}
                />
              ))}
            </RadioGroup>
          </FormControl>
        </AccordionDetails>
      </Accordion>

      {/* Material Filter */}
      <Accordion defaultExpanded>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography sx={{ fontWeight: 900 }}>Occasion</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <FormControl component="fieldset">
            <RadioGroup
              name="material"
              value={material}
              onChange={handleFilterChange}
            >
              {["Cotton", "Polyester", "Leather", "Wool"].map((per) => (
                <FormControlLabel
                  key={per}
                  value={per}
                  control={<Radio checked={filters.material == per} />}
                  label={`${per}`}
                />
              ))}
            </RadioGroup>
          </FormControl>
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
