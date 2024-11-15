import React, { useContext, useState } from "react";
import {
  Drawer,
  Box,
  IconButton,
  Typography,
  Button,
  Divider,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
} from "@mui/material";
import { Close, Remove, Add, Delete } from "@mui/icons-material";
import { useNavigate } from "react-router-dom"; // to navigate between routes
import { useCart } from "../../context/CartContext";
import { productImageLink } from "../../api";
import calculateDiscountPrice from "../../utils/calculateProductDiscountPrice";
import { calculateTotalProductPrice } from "../../utils/orderPrice";
import { AuthContext } from "../../context/AuthContext";

const CartDrawer = ({ open, onClose, demoCartItems }) => {
  const [cart, setCart] = useState(demoCartItems);
  const { user, handleLoginOpen, handleRegisterOpen } = useContext(AuthContext);
  const { cartItems, updateCartQuantity, removeFromCart } = useCart();

  const navigate = useNavigate();

  const handleIncrement = (item) => {
    updateCartQuantity(item.id, item.quantity + 1);
  };

  const handleDecrement = (item) => {
    item.quantity > 1
      ? updateCartQuantity(item.id, item.quantity - 1)
      : removeFromCart(item.id);
  };

  const totalPrice = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  // Handle navigation when clicked
  const handleDrawerClose = (route) => {
    navigate(route); // Navigate to the corresponding route
    onClose(); // Close the menu
  };

  const handleCheckOutButtonClick = (route) => {
    if (user) {
      navigate(route); // Navigate to the corresponding route
      onClose(); // Close the menu
    } else {
      handleLoginOpen();
      onClose();
    }
  };

  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: {
          width: { sm: "100%", md: "350px" },
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        },
      }}
    >
      {/* Top Back Button */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "16px",
          borderBottom: "1px solid #ddd",
        }}
      >
        <Typography variant="h6">Your Cart</Typography>
        <IconButton onClick={onClose}>
          <Close />
        </IconButton>
      </Box>

      {/* Scrollable Cart Items */}
      <Box
        sx={{
          flexGrow: 1,
          overflowY: "auto",
        }}
      >
        <List sx={{ p: 2 }}>
          {cartItems.map((item, index) => (
            <ListItem
              key={index}
              alignItems="flex-start"
              sx={{
                mb: 2,
                p: 2,
                borderRadius: "12px",
                backgroundColor: "#f9f9f9",
                boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.05)",
                transition: "background 0.3s ease",
                "&:hover": { backgroundColor: "#e8f5e9" },
              }}
            >
              <ListItemAvatar>
                <Avatar
                  alt={item.name}
                  src={productImageLink(item.featureImage)}
                  sx={{
                    width: 60,
                    height: 60,
                    border: "2px solid #01A651",
                    boxShadow: "0px 2px 6px rgba(0, 0, 0, 0.1)",
                    mr: "10px",
                  }}
                />
              </ListItemAvatar>
              <ListItemText
                primary={
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      mb: 1,
                    }}
                  >
                    <Typography
                      variant="body2"
                      sx={{ fontWeight: "600", color: "#333" }}
                    >
                      {item.name.length > 38
                        ? `${item.name.slice(0, 37)}...`
                        : item.name}
                    </Typography>
                    <Box display="flex" alignItems="center">
                      {/* <Typography
                        variant="body2"
                        sx={{ color: "#757575", fontSize: "0.875rem" }}
                      >
                        x{item.quantity}
                      </Typography> */}
                      <IconButton
                        onClick={() => removeFromCart(item.id)}
                        sx={{ color: "#C40233", ml: 1 }}
                      >
                        <Delete />
                      </IconButton>
                    </Box>
                  </Box>
                }
                secondary={
                  <>
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        mt: 1,
                      }}
                    >
                      <Typography
                        variant="body2"
                        sx={{ color: "#4E5D73", fontWeight: "500" }}
                      >
                        AED{" "}
                        {(
                          calculateDiscountPrice(item.price, item.discount) *
                          item.quantity
                        ).toFixed(2)}
                      </Typography>
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          backgroundColor: "#f1f1f1",
                          borderRadius: "8px",
                          px: 1,
                          py: 0.5,
                        }}
                      >
                        <IconButton
                          onClick={() => handleDecrement(item)}
                          size="small"
                          sx={{ color: "#757575" }}
                        >
                          <Remove />
                        </IconButton>
                        <Typography
                          variant="body1"
                          sx={{ mx: 2, fontWeight: "600" }}
                        >
                          {item.quantity}
                        </Typography>
                        <IconButton
                          onClick={() => handleIncrement(item)}
                          size="small"
                          sx={{ color: "#757575" }}
                          disabled={item.quantity >= item.stock}
                        >
                          <Add />
                        </IconButton>
                      </Box>
                    </Box>
                    <Divider sx={{ my: 1, borderColor: "#E0E0E0" }} />
                  </>
                }
              />
            </ListItem>
          ))}
        </List>
      </Box>

      {/* Sticky Total and Proceed Button */}
      <Box
        sx={{
          padding: "16px",
          borderTop: "1px solid #ddd",
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            mb: 2,
          }}
        >
          <Typography variant="h6">Total</Typography>
          <Typography variant="body1">
            {" "}
            {`AED ${calculateTotalProductPrice(cartItems)}`}
          </Typography>
        </Box>
        <Button
          variant="contained"
          color="primary"
          fullWidth
          sx={{ fontWeight: 900 }}
          onClick={() => handleDrawerClose("/cart")}
        >
          View Order Details
        </Button>
        <Button
          variant="contained"
          color="primary"
          fullWidth
          sx={{ fontWeight: 900, marginTop: "10px" }}
          onClick={() => handleCheckOutButtonClick("/checkout")}
        >
          Proceed to Checkout
        </Button>
      </Box>
    </Drawer>
  );
};

export default CartDrawer;
