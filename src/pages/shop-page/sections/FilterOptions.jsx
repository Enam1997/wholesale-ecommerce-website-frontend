import React, { useState } from "react";
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
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import RecommendedProducts from "./RecommendedProducts";

const FilterOptions = () => {
  // State management for different filters
  const [category, setCategory] = useState([]);
  const [subcategory, setSubcategory] = useState([]);
  const [price, setPrice] = useState({ min: "", max: "" });
  const [discount, setDiscount] = useState([]);
  const [newArrival, setNewArrival] = useState([]);
  const [occasion, setOccasion] = useState([]);
  const [material, setMaterial] = useState([]);

  // Handler for category selection
  const handleCategoryChange = (event, subcategories) => {
    const value = event.target.name;
    if (event.target.checked) {
      setCategory([...category, value]);
    } else {
      setCategory(category.filter((item) => item !== value));
      setSubcategory(subcategory.filter((sub) => !subcategories.includes(sub)));
    }
  };

  // Handler for subcategory selection
  const handleSubcategoryChange = (event, parentCategory) => {
    const value = event.target.name;
    if (event.target.checked) {
      setSubcategory([...subcategory, value]);
      if (!category.includes(parentCategory)) {
        setCategory([...category, parentCategory]);
      }
    } else {
      setSubcategory(subcategory.filter((item) => item !== value));
    }
  };

  // Handler for price range
  const handlePriceChange = (event) => {
    const { name, value } = event.target;
    setPrice({ ...price, [name]: value });
  };

  // Handler for discount selection
  const handleDiscountChange = (event) => {
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

  // Handler for clearing all filters
  const handleClearAll = () => {
    setCategory([]);
    setSubcategory([]);
    setPrice({ min: "", max: "" });
    setDiscount([]);
    setNewArrival([]);
    setOccasion([]);
    setMaterial([]);
  };

  return (
    <Box>
      <Box display="flex" justifyContent="space-between" mb={2}>
        <Typography variant="h6">Filter by:</Typography>
        <Button
          variant="text"
          color="secondary"
          onClick={handleClearAll}
          disabled={
            !category.length &&
            !subcategory.length &&
            !price.min &&
            !price.max &&
            !discount.length &&
            !newArrival.length &&
            !occasion.length &&
            !material.length
          }
        >
          Clear
        </Button>
      </Box>

      <Accordion defaultExpanded>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography>Category</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <FormGroup>
            <FormControlLabel
              control={
                <Checkbox
                  checked={category.includes("Men")}
                  onChange={(e) =>
                    handleCategoryChange(e, ["Shirt", "Pant", "T-Shirt"])
                  }
                />
              }
              label="Men"
              name="Men"
            />
            <FormGroup sx={{ pl: 2 }}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={subcategory.includes("Shirt")}
                    onChange={(e) => handleSubcategoryChange(e, "Men")}
                  />
                }
                label="Shirt"
                name="Shirt"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={subcategory.includes("Pant")}
                    onChange={(e) => handleSubcategoryChange(e, "Men")}
                  />
                }
                label="Pant"
                name="Pant"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={subcategory.includes("T-Shirt")}
                    onChange={(e) => handleSubcategoryChange(e, "Men")}
                  />
                }
                label="T-Shirt"
                name="T-Shirt"
              />
            </FormGroup>
            <FormControlLabel
              control={
                <Checkbox
                  checked={category.includes("Women")}
                  onChange={(e) =>
                    handleCategoryChange(e, [
                      "Plazo",
                      "Burkha",
                      "Salwar",
                      "Bra",
                    ])
                  }
                />
              }
              label="Women"
              name="Women"
            />
            <FormGroup sx={{ pl: 2 }}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={subcategory.includes("Plazo")}
                    onChange={(e) => handleSubcategoryChange(e, "Women")}
                  />
                }
                label="Plazo"
                name="Plazo"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={subcategory.includes("Burkha")}
                    onChange={(e) => handleSubcategoryChange(e, "Women")}
                  />
                }
                label="Burkha"
                name="Burkha"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={subcategory.includes("Salwar")}
                    onChange={(e) => handleSubcategoryChange(e, "Women")}
                  />
                }
                label="Salwar"
                name="Salwar"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={subcategory.includes("Bra")}
                    onChange={(e) => handleSubcategoryChange(e, "Women")}
                  />
                }
                label="Bra"
                name="Bra"
              />
            </FormGroup>
          </FormGroup>
        </AccordionDetails>
      </Accordion>

      {/* Price Filter */}
      <Accordion defaultExpanded>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography>Price</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Box display="flex" gap={2}>
            <FormControl variant="outlined">
              <OutlinedInput
                name="min"
                value={price.min}
                onChange={handlePriceChange}
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
                name="max"
                value={price.max}
                onChange={handlePriceChange}
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
          <Typography>Discount</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <FormGroup>
            <FormControlLabel
              control={
                <Checkbox
                  checked={discount.includes("10%")}
                  onChange={handleDiscountChange}
                />
              }
              label="10%"
              name="10%"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={discount.includes("20%")}
                  onChange={handleDiscountChange}
                />
              }
              label="20%"
              name="20%"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={discount.includes("30%")}
                  onChange={handleDiscountChange}
                />
              }
              label="30%"
              name="30%"
            />
          </FormGroup>
        </AccordionDetails>
      </Accordion>

      {/* New Arrival Filter */}
      <Accordion defaultExpanded>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography>New Arrival</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <FormGroup>
            <FormControlLabel
              control={
                <Checkbox
                  checked={newArrival.includes("Last 10 days")}
                  onChange={handleNewArrivalChange}
                />
              }
              label="Last 10 days"
              name="Last 10 days"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={newArrival.includes("Last 20 Days")}
                  onChange={handleNewArrivalChange}
                />
              }
              label="Last 20 Days"
              name="Last 20 Days"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={newArrival.includes("Last 30 Days")}
                  onChange={handleNewArrivalChange}
                />
              }
              label="Last 30 Days"
              name="Last 30 Days"
            />
          </FormGroup>
        </AccordionDetails>
      </Accordion>

      {/* Occasion Filter */}
      <Accordion defaultExpanded>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography>Occasion</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <FormGroup>
            <FormControlLabel
              control={
                <Checkbox
                  checked={occasion.includes("Casual")}
                  onChange={handleOccasionChange}
                />
              }
              label="Casual"
              name="Casual"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={occasion.includes("Formal")}
                  onChange={handleOccasionChange}
                />
              }
              label="Formal"
              name="Formal"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={occasion.includes("Party")}
                  onChange={handleOccasionChange}
                />
              }
              label="Party"
              name="Party"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={occasion.includes("Sports")}
                  onChange={handleOccasionChange}
                />
              }
              label="Sports"
              name="Sports"
            />
          </FormGroup>
        </AccordionDetails>
      </Accordion>

      {/* Material Filter */}
      <Accordion defaultExpanded>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography>Material</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <FormGroup>
            <FormControlLabel
              control={
                <Checkbox
                  checked={material.includes("Cotton")}
                  onChange={handleMaterialChange}
                />
              }
              label="Cotton"
              name="Cotton"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={material.includes("Polyester")}
                  onChange={handleMaterialChange}
                />
              }
              label="Polyester"
              name="Polyester"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={material.includes("Leather")}
                  onChange={handleMaterialChange}
                />
              }
              label="Leather"
              name="Leather"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={material.includes("Wool")}
                  onChange={handleMaterialChange}
                />
              }
              label="Wool"
              name="Wool"
            />
          </FormGroup>
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
