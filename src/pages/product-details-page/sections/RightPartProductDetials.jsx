import React from "react";
import {
  Grid,
  Box,
  Typography,
  Button,
  Divider,
  IconButton,
  Skeleton,
} from "@mui/material";
import { Add, Remove, ExpandMore } from "@mui/icons-material";
import calculateDiscountPrice from "../../../utils/calculateProductDiscountPrice";

const ProductDetailsSkeleton = () => {
  return (
    <Grid item xs={12} md={6}>
      {/* Product Name */}
      <Skeleton variant="text" width="60%" height={40} sx={{ mb: 1 }} />

      {/* Reviews Placeholder */}
      {/* Uncomment if reviews are included */}
      {/* 
        <Box display="flex" alignItems="center" sx={{ mb: 2 }}>
          <Skeleton variant="circular" width={30} height={30} />
          <Skeleton variant="text" width="40px" height={20} sx={{ ml: 1 }} />
        </Box>
        */}

      <Divider sx={{ mb: 2 }} />

      {/* Product Price */}
      <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
        <Skeleton variant="text" width="20%" height={30} sx={{ mr: 2 }} />
        <Skeleton variant="text" width="40%" height={40} />
      </Box>

      <Divider sx={{ mb: 2 }} />

      {/* Product Per Box */}
      <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
        <Skeleton variant="text" width="20%" height={30} sx={{ mr: 2 }} />
        <Skeleton variant="text" width="40%" height={40} />
      </Box>

      <Divider sx={{ mb: 2 }} />

      {/* Quantity Selector */}
      <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
        <Skeleton variant="text" width="20%" height={30} sx={{ mr: 2 }} />
        <Box display="flex" alignItems="center" gap={2}>
          <Skeleton variant="circular" width={40} height={40} />
          <Skeleton variant="rectangular" width={50} height={40} />
          <Skeleton variant="circular" width={40} height={40} />
        </Box>
      </Box>

      <Divider sx={{ mb: 2 }} />

      {/* Add to Cart and Add to Wishlist Buttons */}
      <Box display="flex" gap={2} mb={2}>
        <Skeleton variant="rectangular" width="45%" height={50} />
        <Skeleton variant="rectangular" width="45%" height={50} />
      </Box>
    </Grid>
  );
};

const RightPartProductDetials = ({
  productData,
  handleIncrement,
  handleDecrement,
  handleAddToCart,
  handleRemoveFromCart,
  handleWishlistButton,
  quantity,
  productInCart,
  isProductInWishlist,
  loading = true,
}) => {
  return loading ? (
    <ProductDetailsSkeleton />
  ) : (
    <Grid item xs={12} md={6}>
      {/* Product Name */}
      <Typography variant="h5" sx={{ mb: 1 }}>
        {productData?.name}
      </Typography>

      {/* Placeholder for Reviews */}
      {/* <Box display="flex" alignItems="center" sx={{ mb: 2 }}>
      <Rating
        name="size-large"
        precision={0.5}
        value={3.5}
        size="large"
        readOnly
      />
      <Typography variant="body1" sx={{ ml: 1 }}>
        (3.5/5.0){" "}
      </Typography>
    </Box> */}

      <Divider sx={{ mb: 2 }} />

      {/* Product Price */}

      <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
        <Typography variant="h6" sx={{ mr: 2 }}>
          Price:
        </Typography>
        <Typography
          variant="h5"
          sx={{ color: productData?.discount ? "red" : "black" }}
        >
          {productData?.discount
            ? `AED ${calculateDiscountPrice(
                productData?.price,
                productData?.discount
              )}`
            : `AED ${productData.price}`}
          {productData?.discount && (
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
                AED {productData?.price}
              </Typography>
              <Typography
                variant="body2"
                sx={{ color: "green", ml: 1 }}
                component="span"
              >
                {`Save ${productData?.discount}%`}
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
          {productData.pcsPerBox}
        </Typography>
      </Box>

      <Divider sx={{ mb: 2 }} />

      {/* Quantity Selector */}
      <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
        <Typography variant="h6" sx={{ mr: 2 }}>
          Quantity:
        </Typography>
        {productData.stock <= 0 ? (
          <Typography variant="body1" color="red">
            Stock Empty
          </Typography>
        ) : (
          <>
            {" "}
            <IconButton
              color="primary"
              onClick={handleDecrement}
              disabled={quantity === 1 && !productInCart}
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
            <IconButton
              color="primary"
              onClick={handleIncrement}
              disabled={quantity >= productData.stock}
            >
              <Add />
            </IconButton>
          </>
        )}
      </Box>

      <Divider sx={{ mb: 2 }} />

      {/* Add to Cart and Add to Wishlist Buttons */}
      <Box display="flex" gap={2} mb={2}>
        {productData?.stock <= 0 ? (
          <Button variant="outlined" color="secondary" sx={{ fontWeight: 900 }}>
            Stock Empty
          </Button>
        ) : (
          <>
            {" "}
            <Box display="flex" gap={2} mb={2}>
              {productInCart ? (
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={handleRemoveFromCart}
                  sx={{ fontWeight: 900 }}
                >
                  Remove from Cart
                </Button>
              ) : (
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleAddToCart}
                  sx={{ fontWeight: 900 }}
                >
                  Add to Cart
                </Button>
              )}
            </Box>
          </>
        )}

        <Button
          variant="outlined"
          color={isProductInWishlist ? "secondary" : "primary"}
          onClick={() => handleWishlistButton()}
          sx={{ fontWeight: 700 }}
        >
          {isProductInWishlist ? "Remove From Wishlist" : "Add in Wishlist"}
        </Button>
      </Box>
    </Grid>
  );
};

export default RightPartProductDetials;
