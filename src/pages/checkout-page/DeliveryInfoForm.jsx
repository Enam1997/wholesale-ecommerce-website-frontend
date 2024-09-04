import React from "react";
import { Box, Typography, TextField, MenuItem, Grid } from "@mui/material";

const DeliveryInfoForm = () => {
  return (
    <Box>
      <Typography variant="h6" sx={{ mb: 2 }}>
        Delivery Information
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            label="First Name"
            variant="outlined"
            sx={{ mb: 2 }}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            label="Last Name"
            variant="outlined"
            sx={{ mb: 2 }}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Street Address"
            variant="outlined"
            sx={{ mb: 2 }}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Apartment, Suite, etc. (Optional)"
            variant="outlined"
            sx={{ mb: 2 }}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField fullWidth label="City" variant="outlined" sx={{ mb: 2 }} />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            label="State/Province/Region"
            variant="outlined"
            sx={{ mb: 2 }}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            label="ZIP/Postal Code"
            variant="outlined"
            sx={{ mb: 2 }}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            label="Country"
            variant="outlined"
            select
            sx={{ mb: 2 }}
          >
            <MenuItem value="US">United States</MenuItem>
            <MenuItem value="CA">Canada</MenuItem>
            <MenuItem value="UK">United Kingdom</MenuItem>
          </TextField>
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Phone Number"
            variant="outlined"
            sx={{ mb: 2 }}
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default DeliveryInfoForm;
