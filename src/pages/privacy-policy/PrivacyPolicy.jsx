import React from "react";
import {
  Typography,
  Container,
  Box,
  Divider,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";

const PrivacyPolicy = () => {
  return (
    <Container sx={{ padding: "2rem 0" }}>
      <Typography variant="h4" gutterBottom>
        Privacy Policy
      </Typography>

      <Divider sx={{ marginBottom: "2rem" }} />

      <Typography variant="h6" gutterBottom>
        Introduction
      </Typography>
      <Typography paragraph>
        We value your privacy and are committed to protecting your personal
        information. This privacy policy outlines how we collect, use, and
        safeguard your data.
      </Typography>

      <Box>
        <Typography variant="h6" gutterBottom>
          Information We Collect
        </Typography>
        <List>
          <ListItem>
            <ListItemText primary="Personal Information: Name, email, phone, etc." />
          </ListItem>
          <ListItem>
            <ListItemText primary="Usage Data: How you interact with our platform." />
          </ListItem>
        </List>
      </Box>

      <Box>
        <Typography variant="h6" gutterBottom>
          How We Use Your Information
        </Typography>
        <Typography paragraph>
          We use your data to improve our services, personalize your experience,
          and communicate with you about our products and services.
        </Typography>
      </Box>

      <Box>
        <Typography variant="h6" gutterBottom>
          Data Security
        </Typography>
        <Typography paragraph>
          We implement strict security measures to ensure your data is protected
          from unauthorized access.
        </Typography>
      </Box>

      <Divider sx={{ marginY: "2rem" }} />

      <Typography variant="body2" color="textSecondary">
        Last Updated: September 2024
      </Typography>
    </Container>
  );
};

export default PrivacyPolicy;
