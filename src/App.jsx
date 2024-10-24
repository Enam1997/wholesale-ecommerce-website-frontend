import { useContext, useState } from "react";
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
import ShippingAndReturns from "./pages/shipping-and-returns/ShippingAndReturns";
import TermsAndConditions from "./pages/terms-and-conditions/TermsAndConditions";
import PrivacyPolicy from "./pages/privacy-policy/PrivacyPolicy";
import ScrollToTop from "./utils/ScrollToTop";
import { AuthContext, AuthProvider } from "./context/AuthContext";
import LoginDialog from "./component/login-dialoge/LoginDialog";
import RegisterDialog from "./component/register-dialoge/RegisterDialog";
import BackdropLoading from "./component/backdrop-loading/BackdropLoading";
import ProtectedRoute from "./routes/ProtectedRoute";

function App() {
  return (
    <Box>
      <AuthProvider>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Router>
            <ScrollToTop /> {/* <-- Add this component here */}
            <Header />
            <Marquee />
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/shop" element={<ShopPage />} />
              <Route path="/productdetails" element={<ProductDetails />} />
              <Route path="/cart" element={<CartPage />} />
              <Route path="/checkout" element={<CheckoutPage />} />
              <Route
                path="/profile"
                element={
                  <ProtectedRoute>
                    <ProfilePage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/shipping-returns"
                element={<ShippingAndReturns />}
              />
              <Route
                path="/terms-conditions"
                element={<TermsAndConditions />}
              />
              <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            </Routes>
            <Footer />
            <BottomNavigation />
          </Router>
          <LoginDialog />
          <RegisterDialog />
          <BackdropLoading />
        </ThemeProvider>
      </AuthProvider>
    </Box>
  );
}

export default App;
