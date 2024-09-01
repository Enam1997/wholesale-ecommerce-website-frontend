import "./header.css";

import React from "react";
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

const Header = () => {
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
            <IconButton>
              <ShoppingCart />
            </IconButton>
            <IconButton>
              <AccountCircle />
            </IconButton>
          </Hidden>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
