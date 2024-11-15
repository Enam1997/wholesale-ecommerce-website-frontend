import React from "react";
import {
  Grid,
  Box,
  Typography,
  Card,
  CardContent,
  CardActions,
  Button,
} from "@mui/material";
import { AddShoppingCart, ShoppingCartOutlined } from "@mui/icons-material";

const EmptyCartShowingCard = () => {
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="400px"
      width="100%"
      sx={{ bgcolor: "#f9f9f9" }}
    >
      <Card
        elevation={2}
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          padding: 4,
          textAlign: "center",
          borderRadius: 3,
          maxWidth: 400,
          bgcolor: "#ffffff",
        }}
      >
        <ShoppingCartOutlined
          color="disabled"
          sx={{ fontSize: 80, mb: 2, color: "#c0c0c0" }}
        />
        <CardContent>
          <Typography variant="h5" gutterBottom>
            Your Cart is Empty
          </Typography>
          <Typography variant="body2" color="textSecondary" mb={3}>
            Add at least one product to your cart to start shopping!
          </Typography>
        </CardContent>
        <CardActions>
          <Button
            variant="contained"
            color="primary"
            startIcon={<AddShoppingCart />}
            href="/shop"
          >
            Go to Shop
          </Button>
        </CardActions>
      </Card>
    </Box>
  );
};

export default EmptyCartShowingCard;
