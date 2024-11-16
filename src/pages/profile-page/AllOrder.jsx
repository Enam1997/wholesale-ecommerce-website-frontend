import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import {
  Skeleton,
  Typography,
  Card,
  CardContent,
  CardActions,
  Grid,
  Paper,
  IconButton,
  Divider,
  Button,
  Box,
} from "@mui/material";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import DoneIcon from "@mui/icons-material/Done";
import PendingIcon from "@mui/icons-material/Pending";
import axiosInstance from "../../api";
import { AuthContext } from "../../context/AuthContext";
import { AddShoppingCart, ShoppingBasketOutlined } from "@mui/icons-material";

const AllOrder = ({ userId }) => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setLoading(true);
        const response = await axiosInstance.get(
          `/order/get-customer-all-order/${user?.id}`
        );
        setOrders(response.data.data.orders);
        console.log(response.data.data.orders);
      } catch (error) {
        console.error("Error fetching orders:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [userId]);

  if (loading) {
    return (
      <Grid container spacing={2}>
        {[1, 2, 3].map((_, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Skeleton variant="rectangular" width="100%" height={220} />
          </Grid>
        ))}
      </Grid>
    );
  }

  if (!orders.length) {
    return (
      <Grid
        container
        justifyContent="center"
        alignItems="center"
        style={{ height: "50vh" }}
      >
        <Grid item xs={12} sm={8} md={6}>
          <Card
            elevation={3}
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              padding: "32px",
              textAlign: "center",
              bgcolor: "#f7f9fc",
              borderRadius: 3,
            }}
          >
            <ShoppingBasketOutlined
              color="primary"
              sx={{ fontSize: 80, mb: 2 }}
            />
            <Typography variant="h5" gutterBottom>
              No Orders Yet
            </Typography>
            <Typography variant="body1" color="textSecondary" mb={3}>
              You haven't placed any orders yet. Browse our collections to find
              something you love!
            </Typography>
            <CardActions>
              <Button
                variant="contained"
                color="primary"
                startIcon={<AddShoppingCart />}
                href="/shop"
              >
                Start Shopping
              </Button>
            </CardActions>
          </Card>
        </Grid>
      </Grid>
    );
  }

  return (
    <Grid container spacing={2}>
      {orders.map((order, index) => (
        <Grid item xs={12} sm={6} md={4} key={order.id}>
          <Card
            component={Paper}
            elevation={8}
            sx={{
              borderRadius: "16px", // Smooth and modern rounded corners
              overflow: "hidden",
              backgroundColor: "#ffffff", // Clean white background
              boxShadow: "0px 8px 20px rgba(0, 0, 0, 0.1)", // Subtle shadow for a premium look
            }}
          >
            <CardContent sx={{ padding: "24px" }}>
              {/* Order Header */}
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  mb: 2,
                }}
              >
                <Typography
                  variant="h6"
                  sx={{ fontWeight: 700, color: "primary.main" }}
                >
                  Order #{order.id}
                </Typography>
                <Typography
                  variant="caption"
                  sx={{
                    color: "#888",
                    fontWeight: 600,
                    padding: "4px 8px",
                    borderRadius: "8px",
                    backgroundColor: "#f5f5f5",
                  }}
                >
                  {new Date(order.createdAt).toLocaleDateString()}
                </Typography>
              </Box>

              {/* Price Details */}
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 1.5,
                  mb: 2,
                }}
              >
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <AttachMoneyIcon sx={{ color: "primary.main" }} />
                  <Typography
                    variant="body1"
                    sx={{ fontWeight: 600, color: "#333" }}
                  >
                    Total Price: ${order.totalPrice.toFixed(2)}
                  </Typography>
                </Box>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <LocalShippingIcon sx={{ color: "secondary.main" }} />
                  <Typography
                    variant="body1"
                    sx={{ fontWeight: 600, color: "#333" }}
                  >
                    Shipping Price:{" "}
                    {order.shipingPrice
                      ? `$${order.shipingPrice.toFixed(2)}`
                      : "N/A"}
                  </Typography>
                </Box>
              </Box>

              {/* Delivery Status */}
              <Box sx={{ mb: 2 }}>
                <Typography
                  variant="subtitle2"
                  sx={{ color: "#666", fontWeight: 600 }}
                >
                  Delivery Status:
                </Typography>
                <Typography
                  variant="body1"
                  sx={{
                    fontWeight: 600,
                    color:
                      order.deliveryStatus === "Delivered"
                        ? "primary.main"
                        : "warning.main",
                    display: "flex",
                    alignItems: "center",
                    gap: 0.5,
                  }}
                >
                  {order.deliveryStatus}{" "}
                  {order.deliveryStatus === "Delivered" ? (
                    <DoneIcon sx={{ fontSize: "18px" }} />
                  ) : (
                    <PendingIcon sx={{ fontSize: "18px" }} />
                  )}
                </Typography>
              </Box>

              {/* Receiver Information */}
              <Box>
                <Typography
                  variant="subtitle2"
                  sx={{ color: "#666", fontWeight: 600, mb: 1 }}
                >
                  Receiver Information:
                </Typography>
                <Typography variant="body2" sx={{ color: "#333" }}>
                  {JSON.parse(order.reciverInfo).name} (
                  {JSON.parse(order.reciverInfo).phone})
                </Typography>
                <Typography
                  variant="body2"
                  sx={{ color: "#333", mt: 0.5, lineHeight: 1.6 }}
                >
                  {JSON.parse(order.address).streetAdress},{" "}
                  {JSON.parse(order.address).city},{" "}
                  {JSON.parse(order.address).state}
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default AllOrder;
