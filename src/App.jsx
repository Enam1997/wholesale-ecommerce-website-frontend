import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import HomePage from "./pages/home-page/HomePage";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Header from "./layout/header/Header";
import Footer from "./layout/footer/Footer";
import BottomNavigation from "./layout/bottom-navigation/BottomNavigation";
import ShopPage from "./pages/shop-page/ShopPage";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ProductDetails from "./pages/product-details-page/ProductDetails";
import CartPage from "./pages/cart-page/CartPage";
import CheckoutPage from "./pages/checkout-page/CheckoutPage";
import Marquee from "./component/marquee-top/Marquee";
import ProfilePage from "./pages/profile-page/ProfilePage";
import { Box, CssBaseline } from "@mui/material";
import { ThemeProvider } from "@emotion/react";
import { theme } from "./theme";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Box>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Router>
            <Header />
            <Marquee />
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/shop" element={<ShopPage />} />
              <Route path="/productdetails" element={<ProductDetails />} />
              <Route path="/cart" element={<CartPage />} />
              <Route path="/checkout" element={<CheckoutPage />} />
              <Route path="/profile" element={<ProfilePage />} />
            </Routes>

            <Footer />
            <BottomNavigation />
          </Router>
        </ThemeProvider>
      </Box>
    </>
  );
}

export default App;
