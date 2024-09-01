import React from "react";
import "./bottomNavigation.css";
import {
  Home,
  ShoppingCart,
  Favorite,
  AccountCircle,
} from "@mui/icons-material";

const BottomNavigation = () => {
  return (
    <nav className="bottomNav">
      <Home className="bottomNav__icon" />
      <Favorite className="bottomNav__icon" />
      <ShoppingCart className="bottomNav__icon" />
      <AccountCircle className="bottomNav__icon" />
    </nav>
  );
};

export default BottomNavigation;
