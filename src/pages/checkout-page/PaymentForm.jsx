import React, { useState } from "react";
import { Box, Typography, TextField, Grid } from "@mui/material";

const PaymentForm = ({ data, setData, errors }) => {
  const handleChange = (e) => {
    setData((prev) => ({
      ...prev,
      paymentInfo: { ...prev.userInfo, [e.target.name]: e.target.value },
    }));
  };
  return (
    <Box>
      {data?.paymentType == "CashOn" ? (
        <Box
          display={"flex"}
          justifyContent={"center"}
          minHeight={"150px"}
          alignItems={"center"}
        >
          <Typography variant="h5" color="gray" fontWeight={"700"}>
            CashOn Delivey
          </Typography>
        </Box>
      ) : (
        <>
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
              <TextField
                fullWidth
                label="CVV"
                variant="outlined"
                sx={{ mb: 2 }}
              />
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
        </>
      )}
    </Box>
  );
};

export default PaymentForm;
