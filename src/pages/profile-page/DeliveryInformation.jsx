import React, { useState, useEffect, useContext } from "react";
import {
  Box,
  Typography,
  TextField,
  MenuItem,
  Grid,
  Button,
} from "@mui/material";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";
import axiosInstance from "../../api";

const DeliveryInformation = () => {
  const { user } = useContext(AuthContext);
  const [deliveryData, setDeliveryData] = useState({
    name: "",
    streetAdress: "",
    apartment: "",
    city: "",
    state: "",
    zip: "",
    country: "",
    phone: "",
  });
  const [updatedData, setUpdatedData] = useState({});
  const [showUpdateButton, setShowUpdateButton] = useState(false);

  // Fetch delivery data on component mount
  useEffect(() => {
    const fetchDeliveryData = async () => {
      try {
        const response = await axiosInstance.get(
          `/users/get-delivery-info/${user?.id}`
        );
        setDeliveryData(response.data.data.deliveryInfo);
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching delivery data:", error);
      }
    };
    fetchDeliveryData();
  }, [user?.id]);

  // Handle input changes and track updates
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdatedData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setDeliveryData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    setShowUpdateButton(true);
  };

  // Update delivery data
  const handleUpdateDeliveryData = async () => {
    try {
      await axiosInstance.put(
        `/users/update-delivery-info/${user?.id}`,
        updatedData
      );
      setShowUpdateButton(false);
    } catch (error) {
      console.error("Error updating delivery data:", error);
    }
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
            name="name"
            label="Name"
            variant="outlined"
            sx={{ mb: 2 }}
            value={deliveryData.name}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            name="streetAdress"
            label="Street Address"
            variant="outlined"
            sx={{ mb: 2 }}
            value={deliveryData.streetAdress}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            name="apartment"
            label="Apartment, Suite, etc. (Optional)"
            variant="outlined"
            sx={{ mb: 2 }}
            value={deliveryData.apartment}
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
            value={deliveryData.city}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            name="state"
            fullWidth
            label="State/Province/Region"
            variant="outlined"
            sx={{ mb: 2 }}
            value={deliveryData.state}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            name="zip"
            fullWidth
            label="ZIP/Postal Code"
            variant="outlined"
            sx={{ mb: 2 }}
            value={deliveryData.zip}
            onChange={handleChange}
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
            value={deliveryData.country}
            onChange={handleChange}
          >
            <MenuItem value="UAE">United Arab Emirates</MenuItem>
          </TextField>
        </Grid>
        <Grid item xs={12}>
          <TextField
            name="phone"
            fullWidth
            label="Phone Number"
            variant="outlined"
            sx={{ mb: 2 }}
            value={deliveryData.phone}
            onChange={handleChange}
          />
        </Grid>
      </Grid>

      {showUpdateButton && (
        <Button
          variant="contained"
          color="primary"
          onClick={handleUpdateDeliveryData}
          sx={{ mt: 3 }}
        >
          Update Delivery Information
        </Button>
      )}
    </Box>
  );
};

export default DeliveryInformation;
