import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  IconButton,
  Grid,
  Box,
  Tooltip,
  Button,
} from "@mui/material";
import { Favorite, FavoriteBorder, ShoppingCart } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { useWishlist } from "../../context/WishListContext"; // Adjust path as needed
import calculateDiscountPrice from "../../utils/calculateProductDiscountPrice";
import { productImageLink } from "../../api";
import ProductQuickViewModal from "../product-quickview-modal/ProductQuickViewModal";

const ShopLeftRecommendedProductCard = ({ product }) => {
  const { id, name, price, discount, featureImage, pcsPerBox } = product;
  const [openModal, setOpenModal] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const navigate = useNavigate();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  const isProductInWishlist = isInWishlist(id);

  const handleWishlistToggle = (e) => {
    e.stopPropagation();
    isProductInWishlist ? removeFromWishlist(id) : addToWishlist(product);
  };

  const handleOpenModal = () => {
    setOpenModal(true);
    document.body.style.overflow = "hidden";
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    document.body.style.overflow = "auto";
  };

  return (
    <>
      <Card
        variant="outlined"
        sx={{
          display: "flex",
          flexDirection: "row",
          width: "100%",
          // maxWidth: 300,
          borderRadius: 2,
          boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
          overflow: "hidden",
          cursor: "pointer",
          "&:hover img": { transform: "scale(1.05)" },
        }}
        onClick={() => navigate(`/productdetails/${id}`)}
      >
        {/* Image Section */}
        <Box sx={{ flex: "0 0 30%", position: "relative" }}>
          <CardMedia
            component="img"
            image={productImageLink(featureImage)}
            alt={name}
            sx={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              transition: "transform 0.3s ease-in-out",
            }}
          />
          {discount && (
            <Typography
              variant="caption"
              sx={{
                position: "absolute",
                top: 8,
                right: 8,
                backgroundColor: "red",
                color: "white",
                padding: "2px 4px",
                borderRadius: "4px",
                fontWeight: "bold",
              }}
            >
              -{discount}%
            </Typography>
          )}
          <IconButton
            onClick={handleWishlistToggle}
            sx={{
              position: "absolute",
              top: 8,
              left: 8,
              backgroundColor: "white",
              color: isProductInWishlist ? "green" : "black",
              padding: "2px",
              borderRadius: "50%",
            }}
          >
            {isProductInWishlist ? <Favorite /> : <FavoriteBorder />}
          </IconButton>
        </Box>

        {/* Product Details Section */}
        <CardContent
          sx={{
            flex: "1 0 65%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            padding: "8px 12px",
          }}
        >
          <Typography
            variant="body1"
            sx={{
              fontWeight: "bold",
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
              maxWidth: "100%",
            }}
          >
            {name.length > 20 ? `${name.slice(0, 20)}...` : name}
          </Typography>
          {pcsPerBox && (
            <Typography variant="body2" sx={{ color: "grey" }}>
              PCS: {pcsPerBox}
            </Typography>
          )}

          <Grid container justifyContent="space-between" alignItems="center">
            <Typography
              variant="body2"
              sx={{ fontWeight: "bold", fontSize: "14px" }}
            >
              {discount ? (
                <>
                  <span>AED {calculateDiscountPrice(price, discount)}</span>
                  <span
                    style={{
                      textDecoration: "line-through",
                      color: "grey",
                      marginLeft: 4,
                    }}
                  >
                    AED {price}
                  </span>
                </>
              ) : (
                <span>AED {price}</span>
              )}
            </Typography>
            <Tooltip title="Add to Cart">
              <Button
                variant="outlined"
                size="small"
                color="secondary"
                sx={{
                  padding: "4px",
                  minWidth: "auto",
                  borderRadius: "50%",
                  transition: "0.3s",
                  "&:hover": { backgroundColor: "#f0f0f0" },
                }}
                onClick={(e) => {
                  e.stopPropagation();
                  handleOpenModal();
                }}
              >
                <ShoppingCart color="secondary" fontSize="small" />
              </Button>
            </Tooltip>
          </Grid>
        </CardContent>
      </Card>

      <ProductQuickViewModal
        product={product}
        openModal={openModal}
        handleCloseModal={handleCloseModal}
        quantity={quantity}
      />
    </>
  );
};

export default ShopLeftRecommendedProductCard;
