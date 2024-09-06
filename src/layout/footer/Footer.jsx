import React from "react";
import { Link } from "react-router-dom";
import {
  Box,
  Container,
  Grid,
  Typography,
  IconButton,
  Divider,
} from "@mui/material";
import { Facebook, Twitter, Instagram, LinkedIn } from "@mui/icons-material";

const Footer = () => {
  return (
    <Box sx={{ backgroundColor: "#333", color: "#fff", padding: "2rem 1rem" }}>
      <Container>
        <Grid container spacing={4} mb={4}>
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" gutterBottom sx={{ color: "#e74c3c" }}>
              About Us
            </Typography>
            <Typography variant="body2" paragraph>
              We are a leading e-commerce platform providing a wide range of
              products to our customers. Our mission is to deliver quality
              products at the best prices.
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" gutterBottom sx={{ color: "#e74c3c" }}>
              Quick Links
            </Typography>
            <Typography variant="body2">
              <Link to="/" style={{ textDecoration: "none", color: "#fff" }}>
                Home
              </Link>
              <br />
              <Link
                to="/shop"
                style={{ textDecoration: "none", color: "#fff" }}
              >
                Shop
              </Link>
              <br />
              <Link
                to="/blog"
                style={{ textDecoration: "none", color: "#fff" }}
              >
                Blog
              </Link>
              <br />
              <Link
                to="/contact"
                style={{ textDecoration: "none", color: "#fff" }}
              >
                Contact Us
              </Link>
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" gutterBottom sx={{ color: "#e74c3c" }}>
              Customer Service
            </Typography>
            <Typography variant="body2">
              <Link to="/faq" style={{ textDecoration: "none", color: "#fff" }}>
                FAQ
              </Link>
              <br />
              <Link
                to="/shipping-returns"
                style={{ textDecoration: "none", color: "#fff" }}
              >
                Shipping & Returns
              </Link>
              <br />
              <Link
                to="/privacy-policy"
                style={{ textDecoration: "none", color: "#fff" }}
              >
                Privacy Policy
              </Link>
              <br />
              <Link
                to="/terms-conditions"
                style={{ textDecoration: "none", color: "#fff" }}
              >
                Terms & Conditions
              </Link>
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" gutterBottom sx={{ color: "#e74c3c" }}>
              Follow Us
            </Typography>
            <Box>
              <IconButton component={Link} to="#" sx={{ color: "#fff", mr: 1 }}>
                <Facebook />
              </IconButton>
              <IconButton component={Link} to="#" sx={{ color: "#fff", mr: 1 }}>
                <Twitter />
              </IconButton>
              <IconButton component={Link} to="#" sx={{ color: "#fff", mr: 1 }}>
                <Instagram />
              </IconButton>
              <IconButton component={Link} to="#" sx={{ color: "#fff", mr: 1 }}>
                <LinkedIn />
              </IconButton>
            </Box>
          </Grid>
        </Grid>
        <Divider sx={{ borderColor: "#444", mb: 2 }} />
        <Typography variant="body2" align="center" sx={{ color: "#aaa" }}>
          &copy; {new Date().getFullYear()} Your Company Name. All Rights
          Reserved.
        </Typography>
      </Container>
    </Box>
  );
};

export default Footer;
