import React, { useContext, useState } from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Box,
  Hidden,
  Button,
  Menu,
  MenuItem,
  Slide,
  Badge,
} from "@mui/material";
import {
  ShoppingCart,
  Favorite,
  AccountCircle,
  Login,
} from "@mui/icons-material";
import SearchInput from "../../component/search-input/SearchInput";
import CartDrawer from "../../component/cart-drawer/CartDrawer";
import { useNavigate } from "react-router-dom"; // to navigate between routes
import "./header.css";
import { AuthContext } from "../../context/AuthContext";
import { useCart } from "../../context/CartContext";
import logo from "../../assets/logo.png";

const Header = (props) => {
  const [isCartOpen, setCartOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null); // For managing the menu open state
  const isLoggedIn = false; // Change this value based on login state (for now it's hardcoded)

  const { user, handleLoginOpen, handleRegisterOpen, accessToken, logout } =
    useContext(AuthContext);
  const { cartItems } = useCart();

  const navigate = useNavigate();

  // Open the cart drawer
  const handleCartOpen = () => {
    setCartOpen(true);
  };

  // Close the cart drawer
  const handleCartClose = () => {
    setCartOpen(false);
  };

  // Handle menu opening
  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  // Handle menu closing
  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  // Handle navigation based on selected menu item
  const handleMenuClick = (route) => {
    navigate(route); // Navigate to the corresponding route
    handleMenuClose(); // Close the menu
  };

  // Sample cart items
  // const cartItems = [
  //   {
  //     name: "Product 1",
  //     price: 50,
  //     quantity: 1,
  //     image:
  //       "https://img.freepik.com/premium-photo/tattooed-man-wearing-sunglasses-white-tshirt-walks-down-cobblestone-street_862489-39720.jpg",
  //   },
  //   {
  //     name: "Product 2",
  //     price: 30,
  //     quantity: 2,
  //     image:
  //       "https://s3.ap-south-1.amazonaws.com/goshop.com.bd/uploads/all/dr4lQQ0QqS9BtB5EaCoaWnRreWnG0G1rq2OLT7RH.jpg",
  //   },
  // ];

  const totalPrice = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  return (
    <AppBar position="sticky" sx={{ backgroundColor: "#fff", boxShadow: 1 }}>
      <Toolbar>
        <Box
          sx={{
            flexGrow: 1,
            fontSize: 24,
            fontWeight: "bold",
            color: "#000",
            "&:hover": {
              cursor: "pointer",
            },
          }}
          onClick={() => navigate("/")}
        >
          {/* Bangla Cottonae */}
          <img
            src={logo}
            alt="Logo"
            style={{
              height: 80,
              marginRight: 8,
            }}
          />
        </Box>

        <Box sx={{ flexGrow: 2, mx: 2 }}>
          <SearchInput />
        </Box>

        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Hidden mdDown>
            <Button
              className="blink-button"
              sx={{ color: "#000", borderRadius: 4, fontWeight: 900 }}
              onClick={() => handleMenuClick("/shop")}
            >
              Shop
            </Button>
            <IconButton>
              <Favorite />
            </IconButton>
            <IconButton onClick={handleCartOpen}>
              <Badge color="primary" badgeContent={cartItems?.length}>
                <ShoppingCart />
              </Badge>
            </IconButton>

            {/*Logged in user account menu Account Menu */}
            <IconButton onClick={handleMenuOpen}>
              {accessToken ? <AccountCircle /> : <Login />}
            </IconButton>
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleMenuClose}
              sx={{
                "& .MuiPaper-root": {
                  borderRadius: 2,
                  boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
                  minWidth: 200,
                },
              }}
              disableScrollLock={true} // Prevent body from shifting when the menu opens
            >
              {accessToken ? (
                <Box>
                  <MenuItem
                    sx={{
                      // "&:hover": {
                      //   backgroundColor: "#F0FBD5",
                      // },
                      fontWeight: 700,
                    }}
                    onClick={() => handleMenuClick("/profile")}
                  >
                    My Profile
                  </MenuItem>
                  {/* <MenuItem
                    sx={{
                      "&:hover": {
                        backgroundColor: "#F0FBD5",
                      },
                      fontWeight: 700,
                    }}
                    onClick={() => handleMenuClick("/profile")}
                  >
                    My Orders
                  </MenuItem>
                  <MenuItem
                    sx={{
                      "&:hover": {
                        backgroundColor: "#F0FBD5",
                      },
                      fontWeight: 700,
                    }}
                    onClick={() => handleMenuClick("/profile")}
                  >
                    Delivery Addresses
                  </MenuItem>
                  <MenuItem
                    sx={{
                      "&:hover": {
                        backgroundColor: "#F0FBD5",
                      },
                      fontWeight: 700,
                    }}
                    onClick={() => handleMenuClick("/profile")}
                  >
                    Support Ticket
                  </MenuItem>
                  <MenuItem
                    sx={{
                      "&:hover": {
                        backgroundColor: "#F0FBD5",
                      },
                      fontWeight: 700,
                    }}
                    onClick={() => handleMenuClick("/profile")}
                  >
                    Wishlist
                  </MenuItem> */}
                  <MenuItem
                    sx={{
                      // "&:hover": {
                      //   backgroundColor: "#F0FBD5",
                      // },
                      fontWeight: 700,
                      color: "red",
                    }}
                    onClick={() => {
                      handleMenuClose();
                      logout();
                    }}
                  >
                    Logout
                  </MenuItem>
                </Box>
              ) : (
                <Box>
                  <MenuItem
                    sx={{
                      "&:hover": {
                        backgroundColor: "#F0FBD5",
                      },
                      fontWeight: 700,
                    }}
                    onClick={() => {
                      handleMenuClose();
                      handleLoginOpen();
                    }}
                  >
                    Login
                  </MenuItem>
                  <MenuItem
                    sx={{
                      "&:hover": {
                        backgroundColor: "#F0FBD5",
                      },
                      fontWeight: 700,
                    }}
                    onClick={() => {
                      handleMenuClose();
                      handleRegisterOpen();
                    }}
                  >
                    Sign Up
                  </MenuItem>
                </Box>
              )}
            </Menu>
          </Hidden>
        </Box>
      </Toolbar>

      {/* Cart Drawer */}
      <CartDrawer
        open={isCartOpen}
        onClose={handleCartClose}
        demoCartItems={cartItems}
        totalPrice={totalPrice}
      />
    </AppBar>
  );
};

export default Header;
