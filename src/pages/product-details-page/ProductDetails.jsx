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
} from "@mui/material";
import { Add, Remove, ExpandMore } from "@mui/icons-material";
import CustomSlider from "./sections/CustomSlider";
import ProductsSliderOne from "../../component/products-slider-one/ProductsSliderOne";
import { newproduct } from "../../demo-data/newproduct";
import { singelProduct } from "../../demo-data/singelproduct";
import { useCart } from "../../context/CartContext";
import axiosInstance from "../../api";
import { useParams } from "react-router-dom";
import calculateDiscountPrice from "../../utils/calculateProductDiscountPrice";
import { AuthContext } from "../../context/AuthContext";
import { useWishlist } from "../../context/WishListContext";

const ProductDetails = () => {
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  const { user } = useContext(AuthContext);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [productData, setProductData] = useState();
  const [allBestSellingProducts, setAllBestSellingProducts] = useState([]);
  const [allRecomendedProducts, setAllRecomendedProducts] = useState([]);
  let { id } = useParams();
  const isProductInWishlist = isInWishlist(productData?.id);

  const handleWishlistButton = () => {
    if (isProductInWishlist) {
      removeFromWishlist(productData?.id);
    } else {
      addToWishlist(productData);
    }
  };

  const { name, price, discountPrice, images, productDetails } = singelProduct;
  const discountPercentage = discountPrice
    ? Math.round(((price - discountPrice) / price) * 100)
    : null;

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
      setLoading(true);
      try {
        const response = await axiosInstance.get(
          `/product/get-10-best-selling-products`
        );

        let data = response.data.data.bestSellingProductsData;
        setAllBestSellingProducts(data);
      } catch (err) {
        console.log(err.message);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []); // Depend on 'page' so it fetches again when page changes

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const response = await axiosInstance.get(
          `/product/get-10-recomended-products/${user ? user?.id : "notLogin"}`
        );
        setAllRecomendedProducts(response.data.data.recommendedProducts);
      } catch (err) {
        console.log(err.message);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []); // Depend on 'page' so it fetches again when page changes

  return (
    <Box sx={{ padding: "16px" }} className="product-details">
      {loading ? (
        "Loading"
      ) : (
        <Box>
          {error ? (
            <Box>No Product avaiable</Box>
          ) : (
            <>
              <Grid container spacing={4}>
                {/* Left Part: Image Slider */}
                <Grid item xs={12} md={6}>
                  <CustomSlider
                    images={[
                      { url: productData?.featureImage },
                      ...productData?.images,
                    ]}
                  />
                </Grid>

                {/* Right Part: Product Details */}
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
                      <Button
                        variant="outlined"
                        color="secondary"
                        sx={{ fontWeight: 900 }}
                      >
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
                      {isProductInWishlist
                        ? "Remove From Wishlist"
                        : "Add in Wishlist"}
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
            </>
          )}
        </Box>
      )}

      {/* Product Sliders */}
      <Box sx={{ mt: 4 }}>
        <ProductsSliderOne
          title="Similar Products"
          products={allBestSellingProducts}
        />
        <ProductsSliderOne
          title="How About These"
          products={allRecomendedProducts}
        />
        <ProductsSliderOne
          title="Best Selling Products"
          products={allBestSellingProducts}
        />
      </Box>
    </Box>
  );
};

export default ProductDetails;
