import React, { useContext } from "react";
import {
  Badge,
  BottomNavigation,
  BottomNavigationAction,
  Tooltip,
} from "@mui/material";
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
          handleLoginOpen();
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
        backgroundColor: "#fff",
        display: { md: "none" },
        boxShadow: "0 -2px 10px rgba(0, 0, 0, 0.1)",
        zIndex: 1000,
        padding: "0.5rem 0",
      }}
    >
      <Tooltip title="Home" arrow>
        <BottomNavigationAction
          label="Home"
          icon={<Home />}
          sx={{
            "&.Mui-selected": {
              color: "#4a9b7f", // From gradient
              transform: "scale(1.15)",
            },
            "&:hover": {
              color: "#4a9b7f",
              textShadow: "0 0 8px rgba(74, 155, 127, 0.8)", // Glow
            },
            color: "#9E9E9E", // Neutral for inactive state
            transition: "transform 0.3s, color 0.3s",
          }}
        />
      </Tooltip>

      <Tooltip title="Shop" arrow>
        <BottomNavigationAction
          label="Shop"
          icon={
            <Badge badgeContent={cartItems.length} color="error">
              <ShoppingBag />
            </Badge>
          }
          sx={{
            "&.Mui-selected": {
              color: "#0a3431", // From gradient
              transform: "scale(1.15)",
            },
            "&:hover": {
              color: "#0a3431",
              textShadow: "0 0 8px rgba(10, 52, 49, 0.8)",
            },
            color: "#9E9E9E",
            transition: "transform 0.3s, color 0.3s",
          }}
        />
      </Tooltip>

      <Tooltip title="Wishlist" arrow>
        <BottomNavigationAction
          label="Wishlist"
          icon={<Favorite />}
          sx={{
            "&.Mui-selected": {
              color: "#71B280", // From gradient
              transform: "scale(1.15)",
            },
            "&:hover": {
              color: "#71B280",
              textShadow: "0 0 8px rgba(113, 178, 128, 0.8)",
            },
            color: "#9E9E9E",
            transition: "transform 0.3s, color 0.3s",
          }}
        />
      </Tooltip>

      <Tooltip title="Profile" arrow>
        <BottomNavigationAction
          label="Profile"
          icon={<AccountCircle />}
          sx={{
            "&.Mui-selected": {
              color: "#4a9b7f", // From gradient (reused for balance)
              transform: "scale(1.15)",
            },
            "&:hover": {
              color: "#4a9b7f",
              textShadow: "0 0 8px rgba(74, 155, 127, 0.8)",
            },
            color: "#9E9E9E",
            transition: "transform 0.3s, color 0.3s",
          }}
        />
      </Tooltip>
    </BottomNavigation>
  );
};

export default BottomNav;
