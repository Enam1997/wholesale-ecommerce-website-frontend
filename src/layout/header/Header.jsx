import React, { useState } from "react";
import "./header.css";
import {
  AppBar,
  Toolbar,
  IconButton,
  Box,
  Hidden,
  Button,
} from "@mui/material";
import { ShoppingCart, Favorite, AccountCircle } from "@mui/icons-material";
import SearchInput from "../../component/search-input/SearchInput";
import CartDrawer from "../../component/cart-drawer/CartDrawer";

const Header = () => {
  const [isCartOpen, setCartOpen] = useState(false);

  const handleCartOpen = () => {
    setCartOpen(true);
  };

  const handleCartClose = () => {
    setCartOpen(false);
  };

  const cartItems = [
    {
      name: "asdasd dasdasd asdasda dasdasdas dasdas",
      price: 50,
      quantity: 1,
      image:
        "https://5.imimg.com/data5/WD/MA/MY-5511146/men-s-cotton-pant-500x500.jpg",
    },
    {
      name: "Product 2",
      price: 30,
      quantity: 2,
      image:
        "https://media.istockphoto.com/id/173239968/photo/skinny-tight-blue-jeans-on-white-background.jpg?s=612x612&w=0&k=20&c=HsI-xC12KkzjeCaFC4eQ33SZuL53EerbfLMkPuLpaVw=",
    },
    {
      name: "Product 1",
      price: 50,
      quantity: 1,
      image:
        "https://img.huffingtonpost.com/asset/62701ad8260000bd118a783e.jpg?ops=scalefit_960_noupscale",
    },
    {
      name: "Product 2",
      price: 30,
      quantity: 2,
      image: "https://via.placeholder.com/150",
    },
    {
      name: "Product 1",
      price: 50,
      quantity: 1,
      image: "https://via.placeholder.com/150",
    },
    {
      name: "Product 2",
      price: 30,
      quantity: 2,
      image: "https://via.placeholder.com/150",
    },
    {
      name: "Product 1",
      price: 50,
      quantity: 1,
      image: "https://via.placeholder.com/150",
    },
    {
      name: "Product 2",
      price: 30,
      quantity: 2,
      image: "https://via.placeholder.com/150",
    },
    {
      name: "Product 1",
      price: 50,
      quantity: 1,
      image: "https://via.placeholder.com/150",
    },
    {
      name: "Product 2",
      price: 30,
      quantity: 2,
      image: "https://via.placeholder.com/150",
    },
  ];

  const totalPrice = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  return (
    <AppBar position="sticky" sx={{ backgroundColor: "#fff", boxShadow: 1 }}>
      <Toolbar>
        <Box
          sx={{ flexGrow: 1, fontSize: 24, fontWeight: "bold", color: "#000" }}
        >
          LOGO
        </Box>

        <Box sx={{ flexGrow: 2, mx: 2 }}>
          <SearchInput />
        </Box>

        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Hidden mdDown>
            <Button
              className="blink-button"
              sx={{ color: "#fff", borderRadius: 4 }}
            >
              Shop
            </Button>
            <IconButton>
              <Favorite />
            </IconButton>
            <IconButton onClick={handleCartOpen}>
              <ShoppingCart />
            </IconButton>
            <IconButton>
              <AccountCircle />
            </IconButton>
          </Hidden>
        </Box>
      </Toolbar>

      {/* Cart Drawer */}
      <CartDrawer
        open={isCartOpen}
        onClose={handleCartClose}
        cartItems={cartItems}
        totalPrice={totalPrice}
      />
    </AppBar>
  );
};

export default Header;
