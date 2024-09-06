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

const TermsAndConditions = () => {
  return (
    <Container sx={{ padding: "2rem 0" }}>
      <Typography variant="h4" gutterBottom>
        Terms & Conditions
      </Typography>

      <Divider sx={{ marginBottom: "2rem" }} />

      <Typography variant="h6" gutterBottom>
        Acceptance of Terms
      </Typography>
      <Typography paragraph>
        By accessing and using our platform, you agree to be bound by these
        terms and conditions. Please read them carefully.
      </Typography>

      <Box>
        <Typography variant="h6" gutterBottom>
          User Responsibilities
        </Typography>
        <List>
          <ListItem>
            <ListItemText primary="Provide accurate and up-to-date information." />
          </ListItem>
          <ListItem>
            <ListItemText primary="Comply with all local laws and regulations." />
          </ListItem>
        </List>
      </Box>

      <Box>
        <Typography variant="h6" gutterBottom>
          Limitation of Liability
        </Typography>
        <Typography paragraph>
          We are not liable for any damages that result from the use or
          inability to use our platform, including data loss or service
          interruptions.
        </Typography>
      </Box>

      <Box>
        <Typography variant="h6" gutterBottom>
          Changes to Terms
        </Typography>
        <Typography paragraph>
          We reserve the right to modify these terms at any time. Changes will
          be communicated to users via our platform.
        </Typography>
      </Box>

      <Divider sx={{ marginY: "2rem" }} />

      <Typography variant="body2" color="textSecondary">
        Last Updated: September 2024
      </Typography>
    </Container>
  );
};

export default TermsAndConditions;
