import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  Box,
  Container,
  Grid,
  Typography,
  IconButton,
  Divider,
  Skeleton,
} from "@mui/material";
import {
  Instagram,
  Facebook,
  Twitter,
  ConnectWithoutContact,
  YouTube,
  SportsEsports,
  MusicNote,
  LinkedIn,
  Forum,
} from "@mui/icons-material";
import axiosInstance from "../../api";

const allSocialIcons = {
  Facebook: <Facebook />,
  Twitter: <Twitter />,
  Instagram: <Instagram />,
  Twitch: <ConnectWithoutContact />,
  YouTube: <YouTube />,
  Discord: <SportsEsports />,
  TikTok: <MusicNote />,
  LinkedIn: <LinkedIn />,
  Community: <Forum />,
};

const Footer = () => {
  const [socialMediaData, setSocialMediaData] = useState([]);
  const [socialMediaDataLoading, setSocialMediaDataLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setSocialMediaDataLoading(true);
      try {
        const response = await axiosInstance.get("website/social/data/all");
        setSocialMediaData(response.data);
        setSocialMediaDataLoading(false);
      } catch (error) {
        console.error("Error fetching Social Media data:", error);
      }
    };
    fetchData();
  }, []);

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
          {/* <Grid item xs={12} sm={6} md={3}>
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
          </Grid> */}

          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" gutterBottom sx={{ color: "#e74c3c" }}>
              Follow Us
            </Typography>
            {socialMediaDataLoading ? (
              <Skeleton
                variant="text"
                sx={{
                  bgcolor: "grey.700",
                  minHeight: "20px",
                  maxWidth: "100px",
                }}
              />
            ) : (
              <>
                {socialMediaData ? (
                  <>
                    <Box>
                      {socialMediaData.map((social, index) => (
                        <IconButton
                          key={index}
                          href={social.link}
                          target="_blank"
                          sx={{
                            color: "#fff",
                            "&:hover": {
                              color: "#ff6b6b",
                            },
                            transition: "color 0.3s ease",
                          }}
                        >
                          {allSocialIcons[social?.name]}
                        </IconButton>
                      ))}
                    </Box>
                  </>
                ) : (
                  ""
                )}
              </>
            )}
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
