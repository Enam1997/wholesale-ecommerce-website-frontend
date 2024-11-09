import React, { useContext } from "react";
import { Badge, BottomNavigation, BottomNavigationAction } from "@mui/material";
import {
  Home,
  ShoppingCart,
  Favorite,
  AccountCircle,
  ShoppingBag,
} from "@mui/icons-material";
import { useNavigate, useLocation } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext.jsx";
import { useCart } from "../../context/CartContext.jsx";

const BottomNav = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, handleLoginOpen } = useContext(AuthContext);
  const { cartItems } = useCart();

  // Define active value based on current route
  const getActiveTab = () => {
    switch (location.pathname) {
      case "/":
        return 0;
      case "/shop":
        return 1;
      case "/wishlist":
        return 2;
      case "/profile/0":
        return 3;
      default:
        return -1;
    }
  };

  const handleChange = (event, newValue) => {
    switch (newValue) {
      case 0:
        navigate("/");
        break;
      case 1:
        navigate("/shop");
        break;
      case 2:
        navigate("/wishlist");
        break;
      case 3:
        if (user) {
          navigate("/profile/0");
        } else {
          handleLoginOpen(); // Open login modal if user is not logged in
        }
        break;
      default:
        break;
    }
  };

  return (
    <BottomNavigation
      value={getActiveTab()}
      onChange={handleChange}
      sx={{
        width: "100%",
        position: "fixed",
        bottom: 0,
        borderTop: "1px solid #ddd",
        backgroundColor: "#fff",
        display: { md: "none" },
      }}
    >
      <BottomNavigationAction label="Home" icon={<Home />} />
      <BottomNavigationAction label="Shop" icon={<ShoppingBag />} />
      <BottomNavigationAction label="Favourite" icon={<Favorite />} />
      <BottomNavigationAction label="Profile" icon={<AccountCircle />} />
    </BottomNavigation>
  );
};

export default BottomNav;
