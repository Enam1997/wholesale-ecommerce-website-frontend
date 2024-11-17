import React, { useContext, useEffect, useState } from "react";
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
  Skeleton,
} from "@mui/material";
import { Add, Remove, ExpandMore } from "@mui/icons-material";
import CustomSlider from "./sections/CustomSlider";
import ProductsSliderOne from "../../component/products-slider-one/ProductsSliderOne";
import { useCart } from "../../context/CartContext";
import axiosInstance from "../../api";
import { useParams } from "react-router-dom";
import calculateDiscountPrice from "../../utils/calculateProductDiscountPrice";
import { AuthContext } from "../../context/AuthContext";
import { useWishlist } from "../../context/WishListContext";
import RightPartProductDetials from "./sections/rightPartProductDetials";

const DetailsAccordionSkeleton = () => {
  return (
    <Box sx={{ mt: 4, width: "100%" }}>
      {[1, 2, 3].map((_, index) => (
        <Accordion
          key={index}
          disabled
          sx={{
            background: "linear-gradient(135deg, #f0f0f0, #e0e0e0)",
            borderRadius: 2,
            color: "#aaa",
            mb: 2,
            "&:before": { display: "none" },
          }}
        >
          <AccordionSummary
            expandIcon={<ExpandMore sx={{ color: "#ccc" }} />}
            sx={{
              "& .MuiAccordionSummary-content": { margin: "0 !important" },
            }}
          >
            <Skeleton variant="text" width="60%" height={30} />
          </AccordionSummary>
          <AccordionDetails
            sx={{
              backgroundColor: "#f9f9f9",
              borderRadius: "0 0 8px 8px",
              padding: 2,
            }}
          >
            <Skeleton variant="rectangular" width="100%" height={80} />
          </AccordionDetails>
        </Accordion>
      ))}
    </Box>
  );
};

const ProductDetails = () => {
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  const { user } = useContext(AuthContext);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [productData, setProductData] = useState();
  const [allBestSellingProducts, setAllBestSellingProducts] = useState([]);
  const [loadingBestSellingProducts, setLoadingBestSellingProducts] =
    useState(true);
  const [allRecomendedProducts, setAllRecomendedProducts] = useState([]);
  const [loadingRecomendedProducts, setLoadingRecomendedProducts] =
    useState(true);
  let { id } = useParams();
  const isProductInWishlist = isInWishlist(productData?.id);

  const handleWishlistButton = () => {
    if (isProductInWishlist) {
      removeFromWishlist(productData?.id);
    } else {
      addToWishlist(productData);
    }
  };

  const [quantity, setQuantity] = useState(1);
  const { addToCart, removeFromCart, updateCartQuantity, isInCart, cartItems } =
    useCart();

  const productInCart = isInCart(productData?.id);

  useEffect(() => {
    if (productInCart) {
      const item = cartItems.find((item) => item?.id === productData?.id);
      setQuantity(item.quantity);
    }
  }, [productInCart, cartItems, productData]);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const response = await axiosInstance.get(`/product/get-product/${id}`);
        setProductData(response.data.data.product);
      } catch (err) {
        console.log(err.message);

        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [id]); // Depend on 'page' so it fetches again when page changes

  const handleIncrement = () => {
    setQuantity(quantity + 1);
    productInCart
      ? updateCartQuantity(productData.id, quantity + 1)
      : addToCart(productData, quantity + 1);
  };

  const handleDecrement = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
      updateCartQuantity(productData.id, quantity - 1);
    } else {
      removeFromCart(productData.id);
    }
  };

  const handleAddToCart = () => {
    addToCart(productData, quantity);
  };

  const handleRemoveFromCart = () => {
    removeFromCart(productData.id);
  };

  // Fetch Best Selling Product
  useEffect(() => {
    const fetchProducts = async () => {
      setLoadingBestSellingProducts(true);
      try {
        const response = await axiosInstance.get(
          `/product/get-10-best-selling-products`
        );

        let data = response.data.data.bestSellingProductsData;
        const mainData = data.map((d) => d.Product);
        setAllBestSellingProducts(mainData);
      } catch (err) {
        console.log(err.message);
        setError(err.message);
      } finally {
        setLoadingBestSellingProducts(false);
      }
    };

    fetchProducts();
  }, []); // Depend on 'page' so it fetches again when page changes

  useEffect(() => {
    const fetchProducts = async () => {
      setLoadingRecomendedProducts(true);
      try {
        const response = await axiosInstance.get(
          `/product/get-10-recomended-products/${user ? user?.id : "notLogin"}`
        );
        setAllRecomendedProducts(response.data.data.recommendedProducts);
      } catch (err) {
        console.log(err.message);
        setError(err.message);
      } finally {
        setLoadingRecomendedProducts(false);
      }
    };

    fetchProducts();
  }, []); // Depend on 'page' so it fetches again when page changes

  return (
    <Box sx={{ padding: "16px" }} className="product-details">
      <Box>
        {error ? (
          <Box>No Product avaiable</Box>
        ) : (
          <>
            <Grid container spacing={4}>
              {/* Left Part: Image Slider */}
              <Grid item xs={12} md={6}>
                <CustomSlider
                  images={
                    productData && [
                      { url: productData?.featureImage },
                      ...productData?.images,
                    ]
                  }
                  loading={loading}
                />
              </Grid>

              {/* Right Part: Product Details */}
              <RightPartProductDetials
                productData={productData}
                handleIncrement={handleIncrement}
                handleDecrement={handleDecrement}
                handleAddToCart={handleAddToCart}
                handleRemoveFromCart={handleRemoveFromCart}
                handleWishlistButton={handleWishlistButton}
                quantity={quantity}
                productInCart={productInCart}
                isProductInWishlist={isProductInWishlist}
                loading={loading}
              />
            </Grid>

            {/* Accordion Section */}
            {loading ? (
              <DetailsAccordionSkeleton />
            ) : (
              <Box sx={{ mt: 4 }}>
                <Accordion defaultExpanded>
                  <AccordionSummary expandIcon={<ExpandMore />}>
                    <Typography variant="h5">Product Highlights</Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Typography>{productData?.productHeighlight}</Typography>
                  </AccordionDetails>
                </Accordion>
                <Accordion defaultExpanded>
                  <AccordionSummary expandIcon={<ExpandMore />}>
                    <Typography variant="h5">Details</Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Typography>{productData?.description}</Typography>
                  </AccordionDetails>
                </Accordion>
                <Accordion defaultExpanded>
                  <AccordionSummary expandIcon={<ExpandMore />}>
                    <Typography variant="h5">Delivery and Returns</Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Typography>
                      {productData?.deliveryReturnDetails}
                    </Typography>
                  </AccordionDetails>
                </Accordion>
              </Box>
            )}
          </>
        )}
      </Box>

      {/* Product Sliders */}
      <Box sx={{ mt: 4 }}>
        <ProductsSliderOne
          title="Similar Products"
          products={allBestSellingProducts}
          loading={loadingBestSellingProducts}
        />
        <ProductsSliderOne
          title="How About These"
          products={allRecomendedProducts}
          loading={loadingRecomendedProducts}
        />
        <ProductsSliderOne
          title="Best Selling Products"
          loading={loadingBestSellingProducts}
          products={allBestSellingProducts}
        />
      </Box>
    </Box>
  );
};

export default ProductDetails;
