import React, { useEffect, useState } from 'react';
import axios from 'axios';
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
} from '@mui/material';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import DoneIcon from '@mui/icons-material/Done';
import PendingIcon from '@mui/icons-material/Pending';

const AllOrder = ({ userId }) => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`http://localhost:5000/api/v1/order/get-customer-all-order/${1}`);
        setOrders(response.data.data.orders);
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
    return <Typography variant="h6">No orders here</Typography>;
  }

  return (
    <Grid container spacing={2}>
      {orders.map((order) => (
        <Grid item xs={12} sm={6} md={4} key={order.id}>
          <Card component={Paper} elevation={4} sx={{ borderRadius: 3, overflow: 'hidden' }}>
            <CardContent sx={{ bgcolor: '#f9fafc', padding: '20px' }}>
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
                  <Typography variant="body1">Shipping Price: {order.shipingPrice ? `$${order.shipingPrice.toFixed(2)}` : "N/A"}</Typography>
                </Grid>
              </Grid>

              <Divider sx={{ my: 1.5 }} />

              <Typography variant="subtitle2" color="textSecondary">
                Delivery Status:
              </Typography>
              <Typography variant="body1" color={order.deliveryStatus === 'Delivered' ? 'success.main' : 'textPrimary'}>
                {order.deliveryStatus} {order.deliveryStatus === 'Delivered' ? <DoneIcon color="success" /> : <PendingIcon color="warning" />}
              </Typography>

              <Typography variant="subtitle2" color="textSecondary" sx={{ mt: 2 }}>
                Receiver Information:
              </Typography>
              <Typography variant="body2">
                {order.reciverInfo.name} ({order.reciverInfo.phone})
              </Typography>
              <Typography variant="body2">
                {order.address.streetAdress}, {order.address.city}, {order.address.state}
              </Typography>
            </CardContent>

            <CardActions sx={{ bgcolor: '#e0f7fa', padding: '16px' }}>
              <IconButton color="primary" aria-label="Order Details">
                <Typography variant="button" color="primary">
                  View Details
                </Typography>
              </IconButton>
            </CardActions>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default AllOrder;
