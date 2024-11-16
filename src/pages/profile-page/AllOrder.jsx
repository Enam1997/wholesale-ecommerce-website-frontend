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
            elevation={4}
            sx={{ borderRadius: 3, overflow: "hidden" }}
          >
            <CardContent sx={{ bgcolor: "#f9fafc", padding: "20px" }}>
              <Typography variant="h6" color="primary" gutterBottom>
                Order #{order.id}
              </Typography>
              <Typography variant="body2" color="textSecondary">
                Placed on: {new Date(order.createdAt).toLocaleDateString()}
              </Typography>

              <Divider sx={{ my: 1.5 }} />

              <Grid container alignItems="center" spacing={1}>
                <Grid item>
                  <AttachMoneyIcon color="success" />
                </Grid>
                <Grid item>
                  <Typography variant="body1">
                    Total Price: ${order.totalPrice.toFixed(2)}
                  </Typography>
                </Grid>
              </Grid>

              <Grid container alignItems="center" spacing={1} sx={{ mt: 1 }}>
                <Grid item>
                  <LocalShippingIcon color="action" />
                </Grid>
                <Grid item>
                  <Typography variant="body1">
                    Shipping Price:{" "}
                    {order.shipingPrice
                      ? `$${order.shipingPrice.toFixed(2)}`
                      : "N/A"}
                  </Typography>
                </Grid>
              </Grid>

              <Divider sx={{ my: 1.5 }} />

              <Typography variant="subtitle2" color="textSecondary">
                Delivery Status:
              </Typography>
              <Typography
                variant="body1"
                color={
                  order.deliveryStatus === "Delivered"
                    ? "success.main"
                    : "textPrimary"
                }
              >
                {order.deliveryStatus}{" "}
                {order.deliveryStatus === "Delivered" ? (
                  <DoneIcon color="success" />
                ) : (
                  <PendingIcon color="warning" />
                )}
              </Typography>

              <Typography
                variant="subtitle2"
                color="textSecondary"
                sx={{ mt: 2 }}
              >
                Receiver Information:
              </Typography>
              <Typography variant="body2">
                {/* {order.reciverInfo.name} ({order.reciverInfo.phone}) */}
                {JSON.parse(order.reciverInfo).name} (
                {JSON.parse(order.reciverInfo).phone})
              </Typography>
              <Typography variant="body2">
                {JSON.parse(order.address).streetAdress},{" "}
                {JSON.parse(order.address).city},{" "}
                {JSON.parse(order.address).state}
              </Typography>
            </CardContent>

            {/* <CardActions sx={{ bgcolor: "#e0f7fa", padding: "16px" }}>
              <IconButton color="primary" aria-label="Order Details">
                <Typography variant="button" color="primary">
                  View Details
                </Typography>
              </IconButton>
            </CardActions> */}
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default AllOrder;
