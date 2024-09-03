import React from "react";
import {
  Grid,
  Box,
  Typography,
  Button,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import CustomSlider from "./sections/CustomSlider";
import ProductsSliderOne from "../../component/products-slider-one/ProductsSliderOne";
import { newproduct } from "../../demo-data/newproduct";

const ProductDetails = ({}) => {
  const product = {
    id: 1,
    name: "Vintage T9 Electric Hair Cutting Machine Hair ",
    price: 100,
    discountPrice: 0,
    image:
      "https://plus.unsplash.com/premium_photo-1690338237128-b32fedb44d55?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    images: [
      "https://m.media-amazon.com/images/I/61buPgvuzzL._AC_UY1100_.jpg",
      "https://m.media-amazon.com/images/I/81ZUL5rCfmL._AC_UY1100_.jpg",
      "https://plus.unsplash.com/premium_photo-1690338237128-b32fedb44d55?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    ],
  };
  const { name, price, discountPrice, images } = product;
  const discountPercentage = discountPrice
    ? Math.round(((price - discountPrice) / price) * 100)
    : null;

  return (
    <Box sx={{ padding: "16px" }}>
      {/* Product Images and Details Section */}
      <Grid container spacing={4}>
        {/* Left Part: Image Slider */}
        <Grid item xs={12} md={6}>
          <CustomSlider images={images} />
        </Grid>
        {/* Right Part: Product Details */}
        <Grid item xs={12} md={6}>
          <Typography variant="h4" sx={{ mb: 2 }}>
            {name}
          </Typography>
          <Typography
            variant="h5"
            sx={{ color: discountPrice ? "red" : "black", mb: 2 }}
          >
            {discountPrice ? `$${discountPrice}` : `$${price}`}
            {discountPrice && (
              <Typography
                variant="body2"
                sx={{ textDecoration: "line-through", color: "grey", ml: 1 }}
              >
                ${price}
              </Typography>
            )}
          </Typography>
          {discountPercentage && (
            <Typography variant="body2" sx={{ color: "green", mb: 2 }}>
              {`Save ${discountPercentage}%`}
            </Typography>
          )}
          <Box display="flex" gap={2} mb={2}>
            <Button variant="contained" color="primary">
              Add to Bag
            </Button>
            <Button variant="outlined" color="secondary">
              Add to Wishlist
            </Button>
          </Box>
        </Grid>
      </Grid>

      {/* Accordion Section */}
      <Box sx={{ mt: 4 }}>
        <Accordion defaultExpanded>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography>Product Highlights</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>{/* Content for Product Highlights */}</Typography>
          </AccordionDetails>
        </Accordion>
        <Accordion defaultExpanded>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography>Details</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>{/* Content for Details */}</Typography>
          </AccordionDetails>
        </Accordion>
        <Accordion defaultExpanded>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography>Delivery and Returns</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>{/* Content for Delivery and Returns */}</Typography>
          </AccordionDetails>
        </Accordion>
      </Box>

      <Box sx={{ mt: 4 }}>
        {/* Similar Products Slider */}
        <ProductsSliderOne title="Similar Products" products={newproduct} />

         {/* How About These Products Slider */}
        <ProductsSliderOne title="How About These" products={newproduct} />

         {/* Best Selling Products Slider */}
        <ProductsSliderOne
          title="Best Selling Products"
          products={newproduct}
        />
      </Box>
    </Box>
  );
};

export default ProductDetails;
