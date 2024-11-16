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
    <Box
      sx={{
        background: "linear-gradient(135deg, #4a9b7f,#0a3431, #71B280)",
        color: "#fff",
        padding: "3rem 1rem",
        overflow: "hidden",
      }}
    >
      <Container>
        <Grid container spacing={4} mb={4}>
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" gutterBottom sx={{ color: "#ffd700" }}>
              About Us
            </Typography>
            <Typography variant="body2" paragraph>
              We are a leading e-commerce platform providing a wide range of
              products to our customers. Our mission is to deliver quality
              products at the best prices.
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" gutterBottom sx={{ color: "#ffd700" }}>
              Quick Links
            </Typography>
            <Box>
              {["Home", "Shop", "Blog", "contuct"].map((link, index) => (
                <Typography
                  key={index}
                  variant="body2"
                  sx={{
                    display: "block",
                    color: "#fff",
                    textDecoration: "none",
                    marginBottom: "0.5rem",
                    "&:hover": { color: "#ffd700" },
                  }}
                  component={Link}
                  to={`/${link.toLowerCase().replace(" ", "-")}`}
                >
                  {link}
                </Typography>
              ))}
            </Box>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" gutterBottom sx={{ color: "#ffd700" }}>
              Customer Service
            </Typography>
            <Box>
              {[
                "FAQ",
                "Shipping & Returns",
                "Privacy Policy",
                "Terms & Conditions",
              ].map((link, index) => (
                <Typography
                  key={index}
                  variant="body2"
                  sx={{
                    display: "block",
                    color: "#fff",
                    textDecoration: "none",
                    marginBottom: "0.5rem",
                    "&:hover": { color: "#ffd700" },
                  }}
                  component={Link}
                  to={`/${link
                    .toLowerCase()
                    .replace(" & ", "-")
                    .replace(" ", "-")}`}
                >
                  {link}
                </Typography>
              ))}
            </Box>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" gutterBottom sx={{ color: "#ffd700" }}>
              Follow Us
            </Typography>
            {socialMediaDataLoading ? (
              <Skeleton
                variant="text"
                sx={{
                  bgcolor: "rgba(255, 255, 255, 0.2)",
                  minHeight: "20px",
                  maxWidth: "100px",
                }}
              />
            ) : (
              <Box sx={{ display: "flex", gap: 1 }}>
                {socialMediaData.map((social, index) => (
                  <IconButton
                    key={index}
                    href={social.link}
                    target="_blank"
                    sx={{
                      color: "#fff",
                      backgroundColor: "rgba(255, 255, 255, 0.2)",
                      "&:hover": {
                        backgroundColor: "#ffd700",
                        color: "#333",
                      },
                      transition: "all 0.3s ease",
                    }}
                  >
                    {allSocialIcons[social?.name]}
                  </IconButton>
                ))}
              </Box>
            )}
          </Grid>
        </Grid>
        <Divider sx={{ borderColor: "rgba(255, 255, 255, 0.2)", mb: 2 }} />
        <Typography
          variant="body2"
          align="center"
          sx={{
            color: "rgba(255, 255, 255, 0.7)",
          }}
        >
          &copy; {new Date().getFullYear()} Your Company Name. All Rights
          Reserved.
        </Typography>
      </Container>
    </Box>
  );
};

export default Footer;
