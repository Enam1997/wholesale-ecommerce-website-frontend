import React, { useState } from "react";
import {
  Grid,
  Box,
  Typography,
  Button,
  Divider,
  IconButton,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Rating,
} from "@mui/material";
import { Add, Remove, ExpandMore } from "@mui/icons-material";
import CustomSlider from "./sections/CustomSlider";
import ProductsSliderOne from "../../component/products-slider-one/ProductsSliderOne";
import { newproduct } from "../../demo-data/newproduct";
import { singelProduct } from "../../demo-data/singelproduct";

const ProductDetails = () => {
  const { name, price, discountPrice, images, productDetails } = singelProduct;
  const discountPercentage = discountPrice
    ? Math.round(((price - discountPrice) / price) * 100)
    : null;

  const [quantity, setQuantity] = useState(1);

  const handleIncrement = () => {
    setQuantity(quantity + 1);
  };

  const handleDecrement = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  return (
    <Box sx={{ padding: "16px" }} className="product-details">
      <Grid container spacing={4}>
        {/* Left Part: Image Slider */}
        <Grid item xs={12} md={6}>
          <CustomSlider images={images} />
        </Grid>

        {/* Right Part: Product Details */}
        <Grid item xs={12} md={6}>
          {/* Product Name */}
          <Typography variant="h4" sx={{ mb: 1 }}>
            {name}
          </Typography>

          {/* Placeholder for Reviews */}
          <Box display="flex" alignItems="center" sx={{ mb: 2 }}>
            <Rating
              name="size-large"
              precision={0.5}
              value={3.5}
              size="large"
              readOnly
            />
            <Typography variant="body1" sx={{ ml: 1 }}>
              (3.5/5.0) {/* Replace with dynamic reviews if available */}
            </Typography>
          </Box>

          <Divider sx={{ mb: 2 }} />

          {/* Product Price */}

          <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
            <Typography variant="h6" sx={{ mr: 2 }}>
              Price:
            </Typography>
            <Typography
              variant="h5"
              sx={{ color: discountPrice ? "red" : "black" }}
            >
              {discountPrice ? `$${discountPrice}` : `$${price}`}
              {discountPrice && (
                <>
                  <Typography
                    variant="body2"
                    sx={{
                      textDecoration: "line-through",
                      color: "grey",
                      ml: 1,
                    }}
                    component="span"
                  >
                    ${price}
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{ color: "green", ml: 1 }}
                    component="span"
                  >
                    {`Save ${discountPercentage}%`}
                  </Typography>
                </>
              )}
            </Typography>
          </Box>

          <Divider sx={{ mb: 2 }} />

          {/* Product Per Box*/}

          <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
            <Typography variant="h6" sx={{ mr: 2 }}>
              Per Box:
            </Typography>
            <Typography variant="h5" sx={{ color: "black" }}>
              20 pcs
            </Typography>
          </Box>

          <Divider sx={{ mb: 2 }} />

          {/* Quantity Selector */}
          <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
            <Typography variant="h6" sx={{ mr: 2 }}>
              Quantity:
            </Typography>
            <IconButton
              color="primary"
              onClick={handleDecrement}
              disabled={quantity === 1}
            >
              <Remove />
            </IconButton>
            <Typography
              variant="h6"
              sx={{
                mx: 2,
                border: "1px solid #ccc",
                padding: "0 12px",
                borderRadius: "4px",
              }}
            >
              {quantity}
            </Typography>
            <IconButton color="primary" onClick={handleIncrement}>
              <Add />
            </IconButton>
          </Box>

          <Divider sx={{ mb: 2 }} />

          {/* Add to Cart and Add to Wishlist Buttons */}
          <Box display="flex" gap={2} mb={2}>
            <Button variant="contained" color="primary">
              Add to Cart
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
          <AccordionSummary expandIcon={<ExpandMore />}>
            <Typography variant="h5">Product Highlights</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>{productDetails}</Typography>
          </AccordionDetails>
        </Accordion>
        <Accordion defaultExpanded>
          <AccordionSummary expandIcon={<ExpandMore />}>
            <Typography variant="h5">Details</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>{productDetails}</Typography>
          </AccordionDetails>
        </Accordion>
        <Accordion defaultExpanded>
          <AccordionSummary expandIcon={<ExpandMore />}>
            <Typography variant="h5">Delivery and Returns</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>{productDetails}</Typography>
          </AccordionDetails>
        </Accordion>
      </Box>

      {/* Product Sliders */}
      <Box sx={{ mt: 4 }}>
        <ProductsSliderOne title="Similar Products" products={newproduct} />
        <ProductsSliderOne title="How About These" products={newproduct} />
        <ProductsSliderOne
          title="Best Selling Products"
          products={newproduct}
        />
      </Box>
    </Box>
  );
};

export default ProductDetails;
