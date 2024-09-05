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

const CartDrawer = ({ open, onClose, cartItems }) => {
  const [cart, setCart] = useState(cartItems);

  const handleIncrement = (index) => {
    const updatedCart = cart.map((item, i) =>
      i === index ? { ...item, quantity: item.quantity + 1 } : item
    );
    setCart(updatedCart);
  };

  const handleDecrement = (index) => {
    const updatedCart = cart.map((item, i) =>
      i === index && item.quantity > 1
        ? { ...item, quantity: item.quantity - 1 }
        : item
    );
    setCart(updatedCart);
  };

  const totalPrice = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: {
          width: 350,
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
          padding: "16px",
        }}
      >
        <List>
          {cart.map((item, index) => (
            <ListItem key={index} alignItems="flex-start" sx={{ mb: 2 }}>
              <ListItemAvatar>
                <Avatar
                  alt={item.name}
                  src={item.image}
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
                      <Typography variant="body2">${item.price}</Typography>
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          mb: 2,
                        }}
                      >
                        <IconButton
                          onClick={() => handleDecrement(index)}
                          size="small"
                        >
                          <Remove />
                        </IconButton>
                        <Typography variant="body1" sx={{ mx: 2 }}>
                          {item.quantity}
                        </Typography>
                        <IconButton
                          onClick={() => handleIncrement(index)}
                          size="small"
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
          <Typography variant="h6">${totalPrice}</Typography>
        </Box>
        <Button
          variant="contained"
          color="primary"
          fullWidth
          sx={{ fontWeight: 900 }}
        >
          Proceed to Checkout
        </Button>
      </Box>
    </Drawer>
  );
};

export default CartDrawer;
