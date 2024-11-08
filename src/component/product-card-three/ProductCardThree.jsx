import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  IconButton,
  Grid,
  Box,
  Button,
  Modal,
  Divider,
  Snackbar,
  Alert,
} from "@mui/material";
import { Favorite, FavoriteBorder, ShoppingCart, Close } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import calculateDiscountPrice from "../../utils/calculateProductDiscountPrice";
import { productImageLink } from "../../api";
import ProductQuickViewModal from "../product-quickview-modal/ProductQuickViewModal";
import { useWishlist } from "../../context/WishListContext"; // Adjust the import path as needed

const ProductCardThree = ({ product }) => {
  const [openModal, setOpenModal] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  const navigate = useNavigate();
  const isProductInWishlist = isInWishlist(product.id);

  const handleOpenModal = () => {
    setOpenModal(true);
    document.body.style.overflow = "hidden";
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    document.body.style.overflow = "auto";
  };

  const handleWishlistToggle = () => {
    if (isProductInWishlist) {
      removeFromWishlist(product.id);
      setSnackbarMessage("Product removed from wishlist");
    } else {
      addToWishlist(product);
      setSnackbarMessage("Product added to wishlist");
    }
    setSnackbarOpen(true);
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  return (
    <>
      <Card
        variant="outlined"
        sx={{
          width: "100%",
          maxWidth: 300,
          maxHeight: 400,
          height: 400,
          position: "relative",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          overflow: "hidden",
          cursor: "pointer",
          "&:hover img": {
            transform: "scale(1.1)",
          },
        }}
      >
        <Box sx={{ position: "relative", height: "70%", overflow: "hidden" }}>
          <CardMedia
            component="img"
            image={productImageLink(product?.featureImage)}
            alt={product?.name?.substr(0, 15)}
            sx={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              transition: "transform 0.3s ease-in-out",
            }}
          />
          {product?.discount && (
            <Typography
              variant="caption"
              sx={{
                position: "absolute",
                top: 8,
                left: 8,
                backgroundColor: "red",
                color: "white",
                padding: "0.25rem",
                borderRadius: "4px",
              }}
            >
              -{product?.discount}%
            </Typography>
          )}
        </Box>
        <CardContent sx={{ padding: "10px" }}>
          <Typography
            sx={{
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
              textOverflow: "ellipsis",
              marginBottom: "0.5rem",
              fontWeight: "700",
              height: "3.2em",
              lineHeight: "1.6em",
              "&:hover": {
                textDecoration: "underline",
              },
            }}
            onClick={() => navigate(`/productdetails/${product?.id}`)}
          >
            {product?.name}
          </Typography>
          {product?.pcsPerBox && (
            <Typography variant="body1" sx={{ color: "grey" }}>
              PCS: {product?.pcsPerBox}
            </Typography>
          )}

          <Grid container justifyContent="space-between" alignItems="end">
            <Typography variant="body1" sx={{ fontWeight: "bold", fontSize: "18px" }}>
              {product?.discount ? (
                <Box display="flex" flexDirection="column" justifyContent="start">
                  <span
                    style={{
                      textDecoration: "line-through",
                      color: "red",
                      fontSize: "14px",
                    }}
                  >
                    ${product?.price}
                  </span>
                  <span style={{ fontSize: "16px" }}>
                    AED {calculateDiscountPrice(product?.price, product?.discount)}
                  </span>
                </Box>
              ) : (
                <span>${product?.price}</span>
              )}
            </Typography>
            <Button
              sx={{
                display: "flex",
                alignItems: "center",
                padding: "4px 8px",
                transition: "0.3s",
                "&:hover": {
                  backgroundColor: "#f0f0f0",
                },
              }}
              onClick={(e) => {
                e.stopPropagation();
                handleOpenModal();
              }}
            >
              <ShoppingCart color="secondary" sx={{ fontSize: "20px" }} />
              <span
                style={{
                  marginLeft: "5px",
                  fontSize: "12px",
                  display: "none",
                }}
                className="add-to-cart-text"
              >
                Add to Cart
              </span>
            </Button>
          </Grid>
        </CardContent>
        <IconButton
          onClick={(e) => {
            e.stopPropagation();
            handleWishlistToggle();
          }}
          sx={{
            position: "absolute",
            top: 8,
            right: 8,
            backgroundColor: "white",
            padding: "0.25rem",
            borderRadius: "20px",
          }}
        >
          {isProductInWishlist ? (
            <Favorite sx={{ color: "green", fontSize: "25px" }} />
          ) : (
            <FavoriteBorder sx={{ color: "black", fontSize: "25px" }} />
          )}
        </IconButton>
      </Card>

      <ProductQuickViewModal
        product={product}
        openModal={openModal}
        handleCloseModal={handleCloseModal}
        quantity={quantity}
      />

      {/* Snackbar for wishlist feedback */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert onClose={handleSnackbarClose} severity="success" sx={{ width: "100%" }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </>
  );
};

export default ProductCardThree;
