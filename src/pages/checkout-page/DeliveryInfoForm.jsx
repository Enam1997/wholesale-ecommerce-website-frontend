import React from "react";
import { Box, Typography, TextField, MenuItem, Grid } from "@mui/material";

const DeliveryInfoForm = ({ data, setData, errors }) => {
  const handleChange = (e) => {
    setData((prev) => ({
      ...prev,
      deliveryInfo: { ...prev.deliveryInfo, [e.target.name]: e.target.value },
    }));
  };

  return (
    <Box>
      <Typography variant="h6" sx={{ mb: 2 }}>
        Delivery Information
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            fullWidth
            name="stretAddress"
            label="Street Address"
            variant="outlined"
            sx={{ mb: 2 }}
            value={data.stretAddress}
            onChange={handleChange}
            error={!!errors.stretAddress}
            helperText={errors.stretAddress}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            name="apartment"
            label="Apartment, Suite, etc. (Optional)"
            variant="outlined"
            sx={{ mb: 2 }}
            value={data.apartment}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            name="city"
            fullWidth
            label="City"
            variant="outlined"
            sx={{ mb: 2 }}
            value={data.city}
            onChange={handleChange}
            error={!!errors.city}
            helperText={errors.city}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            name="state"
            fullWidth
            label="State/Province/Region"
            variant="outlined"
            sx={{ mb: 2 }}
            value={data.state}
            onChange={handleChange}
            error={!!errors.state}
            helperText={errors.state}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            name="zip"
            fullWidth
            label="ZIP/Postal Code"
            variant="outlined"
            sx={{ mb: 2 }}
            value={data.zip}
            onChange={handleChange}
            error={!!errors.zip}
            helperText={errors.zip}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            name="country"
            fullWidth
            label="Country"
            variant="outlined"
            select
            sx={{ mb: 2 }}
            value={data.country}
            onChange={handleChange}
            error={!!errors.country}
            helperText={errors.country}
          >
            <MenuItem value="UAE">United Arab Emirat</MenuItem>
            <MenuItem value="CA">Canada</MenuItem>
            <MenuItem value="UK">United Kingdom</MenuItem>
          </TextField>
        </Grid>
        <Grid item xs={12}>
          <TextField
            name="phone"
            fullWidth
            label="Phone Number"
            variant="outlined"
            sx={{ mb: 2 }}
            value={data.phone}
            onChange={handleChange}
            error={!!errors.phone}
            helperText={errors.phone}
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default DeliveryInfoForm;
