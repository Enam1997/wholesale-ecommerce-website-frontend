import React from "react";
import { Box, Typography, TextField, Grid } from "@mui/material";

const PaymentForm = () => {
  return (
    <Box>
      <Typography variant="h6" sx={{ mb: 2 }}>
        Payment Information
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Cardholder's Name"
            variant="outlined"
            sx={{ mb: 2 }}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Card Number"
            variant="outlined"
            sx={{ mb: 2 }}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            label="Expiry Date (MM/YY)"
            variant="outlined"
            sx={{ mb: 2 }}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField fullWidth label="CVV" variant="outlined" sx={{ mb: 2 }} />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Billing Address"
            variant="outlined"
            sx={{ mb: 2 }}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="ZIP/Postal Code"
            variant="outlined"
            sx={{ mb: 2 }}
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default PaymentForm;
