import React, { useEffect, useState } from "react";
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
import {
  FavoriteBorder,
  ShoppingCart,
  Close,
  Remove,
  Add,
} from "@mui/icons-material";
import calculateDiscountPrice from "../../utils/calculateProductDiscountPrice";
import { productImageLink } from "../../api";
import { useCart } from "../../context/CartContext";
import { useNavigate } from "react-router-dom";

const ProductQuickViewModal = ({ product, openModal, handleCloseModal }) => {
  const { id, name, price, discount, featureImage, pcsPerBox, stock } = product;
  const navigate = useNavigate();

  const [quantity, setQuantity] = useState(1);
  const { addToCart, removeFromCart, updateCartQuantity, isInCart, cartItems } =
    useCart();

  useEffect(() => {
    if (isInCart(id)) {
      const item = cartItems.find((item) => item?.id === id);
      setQuantity(item.quantity);
    }
  }, [cartItems, product]);

  const handleIncrement = () => {
    setQuantity(quantity + 1);
    isInCart(id)
      ? updateCartQuantity(id, quantity + 1)
      : addToCart(product, quantity + 1);
  };

  const handleDecrement = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
      updateCartQuantity(id, quantity - 1);
    } else {
      removeFromCart(id);
    }
  };

  return (
    <div>
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
              src={productImageLink(featureImage)}
              alt={name}
              style={{ width: "100%", height: "auto", maxHeight: 200 }}
            />
          </Box>

          {/* Product Name */}
          <Typography variant="h6" sx={{ fontWeight: "bold" }}>
            {name}
          </Typography>

          <Divider sx={{ margin: "16px 0" }} />

          {/* Per Box Data */}

          <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
            <Typography variant="h6" sx={{ mr: 2 }}>
              Per Box:
            </Typography>
            <Typography variant="h6" sx={{ color: "black" }}>
              {pcsPerBox} pcs
            </Typography>
          </Box>
          <Divider sx={{ margin: "16px 0" }} />

          <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
            <Typography variant="h6" sx={{ mr: 2 }}>
              Price:
            </Typography>
            <Typography variant="h5" sx={{ color: discount ? "red" : "black" }}>
              {discount
                ? `$${calculateDiscountPrice(price, discount)}`
                : `$${price}`}
              {discount && (
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
                    {`Save ${discount}%`}
                  </Typography>
                </>
              )}
            </Typography>
          </Box>

          <Divider sx={{ margin: "16px 0" }} />

          {/* increment dicrement */}

          {/* Quantity Selector */}
          <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
            <Typography variant="h6" sx={{ mr: 2 }}>
              Quantity:
            </Typography>
            {stock <= 0 ? (
              <Typography variant="body1" color="red">
                Stock Empty
              </Typography>
            ) : (
              <>
                {" "}
                <IconButton
                  color="primary"
                  onClick={handleDecrement}
                  disabled={quantity === 1 && !isInCart(id)}
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
                  disabled={quantity >= stock}
                >
                  <Add />
                </IconButton>
              </>
            )}
          </Box>

          <Divider sx={{ margin: "16px 0" }} />

          {/* Total */}
          <Typography variant="body1" sx={{ fontWeight: "bold" }}>
            Total: $
            {(
              (calculateDiscountPrice(price, discount) || price) * quantity
            ).toFixed(2)}
          </Typography>

          {/* Add to Cart and details Button */}
          <Button
            variant="outlined"
            color="primary"
            fullWidth
            sx={{ fontWeight: 900, marginTop: 2 }}
            onClick={() => navigate(`/productdetails/${id}`)}
          >
            View Full Details
          </Button>
          <Box fullWidth mt={2}>
            {stock <= 0 ? (
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
                <Box>
                  {isInCart(id) ? (
                    <Button
                      variant="contained"
                      color="secondary"
                      fullWidth
                      onClick={() => removeFromCart(id)}
                      sx={{ fontWeight: 900 }}
                    >
                      Remove from Cart
                    </Button>
                  ) : (
                    <Button
                      variant="contained"
                      color="primary"
                      fullWidth
                      onClick={() => addToCart(product, quantity)}
                      sx={{ fontWeight: 900 }}
                    >
                      Add to Cart
                    </Button>
                  )}
                </Box>
              </>
            )}
          </Box>
        </Box>
      </Modal>
    </div>
  );
};

export default ProductQuickViewModal;
