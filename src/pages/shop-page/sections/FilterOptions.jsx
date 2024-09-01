import React from 'react';
import { Accordion, AccordionSummary, AccordionDetails, Typography, FormGroup, FormControlLabel, Checkbox, Box } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import RecommendedProducts from './RecommendedProducts'; // Import the new component

const FilterOptions = () => {
  return (
    <Box>
      {/* Category Filter */}
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography>Category</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <FormGroup>
            <FormControlLabel control={<Checkbox />} label="Men" />
            <FormGroup sx={{ pl: 2 }}>
              <FormControlLabel control={<Checkbox />} label="Shirt" />
              <FormControlLabel control={<Checkbox />} label="Pant" />
              <FormControlLabel control={<Checkbox />} label="T-Shirt" />
            </FormGroup>
            <FormControlLabel control={<Checkbox />} label="Women" />
            <FormGroup sx={{ pl: 2 }}>
              <FormControlLabel control={<Checkbox />} label="Plazo" />
              <FormControlLabel control={<Checkbox />} label="Burkha" />
              <FormControlLabel control={<Checkbox />} label="Salwar" />
              <FormControlLabel control={<Checkbox />} label="Bra" />
            </FormGroup>
          </FormGroup>
        </AccordionDetails>
      </Accordion>

      {/* Price Filter */}
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography>Price</Typography>
        </AccordionSummary>
        <AccordionDetails>
          {/* Add price filter options here */}
        </AccordionDetails>
      </Accordion>

      {/* Discount Filter */}
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography>Discount</Typography>
        </AccordionSummary>
        <AccordionDetails>
          {/* Add discount filter options here */}
        </AccordionDetails>
      </Accordion>

      {/* Recommended Products */}
      <Box sx={{ display: { xs: 'none', md: 'block' } }}>
        <RecommendedProducts />
      </Box>
    </Box>
  );
};

export default FilterOptions;
