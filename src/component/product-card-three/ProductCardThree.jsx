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
} from "@mui/material";
import { FavoriteBorder, ShoppingCart, Close } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

const ProductCardThree = ({ product }) => {
  const { name, price, discountPrice, image } = product;
  const [openModal, setOpenModal] = useState(false);
  const [quantity, setQuantity] = useState(1);

  const navigate = useNavigate();

  const discountPercentage = discountPrice
    ? Math.round(((price - discountPrice) / price) * 100)
    : null;

  const handleOpenModal = () => {
    setOpenModal(true);
    document.body.style.overflow = "hidden"; // Prevent background scroll
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    document.body.style.overflow = "auto"; // Reset background scroll
  };

  const handleQuantityChange = (operation) => {
    if (operation === "increment") setQuantity(quantity + 1);
    if (operation === "decrement" && quantity > 1) setQuantity(quantity - 1);
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
        onClick={() => navigate("/productdetails")}
      >
        <Box sx={{ position: "relative", height: "70%", overflow: "hidden" }}>
          <CardMedia
            component="img"
            image={image}
            alt={name}
            sx={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              transition: "transform 0.3s ease-in-out",
            }}
          />
          {discountPercentage && (
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
              -{discountPercentage}%
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
            }}
          >
            {name}
          </Typography>

          <Grid
            container
            justifyContent="space-between"
            alignItems="center"
            sx={{ marginTop: "1rem" }}
          >
            <Typography
              variant="body1"
              sx={{ fontWeight: "bold", fontSize: "18px" }}
            >
              {discountPrice ? (
                <>
                  <span>${discountPrice}</span>
                  <span
                    style={{
                      textDecoration: "line-through",
                      marginLeft: "0.5rem",
                      color: "red",
                      fontSize: "15px",
                    }}
                  >
                    ${price}
                  </span>
                </>
              ) : (
                <span>${price}</span>
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
                e.stopPropagation(); // Prevent card click
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
          sx={{
            position: "absolute",
            top: 8,
            right: 8,
            backgroundColor: "white",
            padding: "0.25rem",
            borderRadius: "20px",
          }}
        >
          <FavoriteBorder sx={{ color: "black", fontSize: "25px" }} />
        </IconButton>
      </Card>

      {/* Modal */}
      <Modal open={openModal} onClose={handleCloseModal}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
            outline: "none",
          }}
        >
          {/* Close Button */}
          <IconButton
            sx={{ position: "absolute", top: 8, right: 8 }}
            onClick={handleCloseModal}
          >
            <Close />
          </IconButton>

          {/* Product Image */}
          <Box sx={{ textAlign: "center", marginBottom: 2 }}>
            <img
              src={image}
              alt={name}
              style={{ width: "100%", height: "auto", maxHeight: 200 }}
            />
          </Box>

          {/* Product Name */}
          <Typography variant="h6" sx={{ fontWeight: "bold" }}>
            {name}
          </Typography>

          <Divider sx={{ margin: "16px 0" }} />

          {/* Price */}
          <Typography variant="body1" sx={{ fontWeight: "bold" }}>
            Price: ${discountPrice || price}
          </Typography>

          <Divider sx={{ margin: "16px 0" }} />

          {/* Quantity */}
          <Box sx={{ display: "flex", alignItems: "center", gap: 3 }}>
            <Button
              variant="contained"
              onClick={() => handleQuantityChange("decrement")}
            >
              -
            </Button>
            <Typography>{quantity}</Typography>
            <Button
              variant="contained"
              onClick={() => handleQuantityChange("increment")}
            >
              +
            </Button>
          </Box>

          <Divider sx={{ margin: "16px 0" }} />

          {/* Total */}
          <Typography variant="body1" sx={{ fontWeight: "bold" }}>
            Total: ${((discountPrice || price) * quantity).toFixed(2)}
          </Typography>

          {/* Add to Cart Button */}
          <Button
            variant="contained"
            color="primary"
            fullWidth
            sx={{ fontWeight: 900, marginTop: 2 }}
          >
            Add to Cart
          </Button>
        </Box>
      </Modal>
    </>
  );
};

export default ProductCardThree;
