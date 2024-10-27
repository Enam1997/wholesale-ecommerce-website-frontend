import React, { useState } from "react";
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
import { Close, Remove, Add } from "@mui/icons-material";
import { useNavigate } from "react-router-dom"; // to navigate between routes
import { useCart } from "../../context/CartContext";
import { productImageLink } from "../../api";
import calculateDiscountPrice from "../../utils/calculateProductDiscountPrice";
import { calculateTotalProductPrice } from "../../utils/orderPrice";

const CartDrawer = ({ open, onClose, demoCartItems }) => {
  const [cart, setCart] = useState(demoCartItems);
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
        <List>
          {cartItems.map((item, index) => (
            <ListItem key={index} alignItems="flex-start" sx={{ mb: 1 }}>
              <ListItemAvatar>
                <Avatar
                  alt={item.name}
                  src={productImageLink(item.featureImage)}
                  sx={{ width: 60, height: 60 }}
                />
              </ListItemAvatar>
              <ListItemText
                primary={
                  <Box
                    sx={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <Typography variant="body1">{item.name}</Typography>
                    <Typography variant="body2" sx={{ color: "gray" }}>
                      x{item.quantity}
                    </Typography>
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
                      <Typography variant="body2">
                        ${calculateDiscountPrice(item.price, item.discount)}
                      </Typography>
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          mb: 2,
                        }}
                      >
                        <IconButton
                          onClick={() => handleDecrement(item)}
                          size="small"
                        >
                          <Remove />
                        </IconButton>
                        <Typography variant="body1" sx={{ mx: 2 }}>
                          {item.quantity}
                        </Typography>
                        <IconButton
                          onClick={() => handleIncrement(item)}
                          size="small"
                          disabled={item.quantity >= item.stock}
                        >
                          <Add />
                        </IconButton>
                      </Box>
                    </Box>
                    <Divider sx={{ my: 1 }} />
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
          onClick={() => handleDrawerClose("/checkout")}
        >
          Proceed to Checkout
        </Button>
      </Box>
    </Drawer>
  );
};

export default CartDrawer;
