import React from "react";
import {
  Card,
  CardContent,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableRow,
  TableContainer,
  Divider,
  Box,
  Grid,
  Button,
  Paper,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

const CompleteOrderSummary = ({ order }) => {
  const navigate = useNavigate();

  return (
    <Box sx={{ padding: 3, backgroundColor: "#f8f8f8", minHeight: "100vh" }}>
      {/* Congratulations Section */}
      <Paper
        elevation={3}
        sx={{
          textAlign: "center",
          py: 4,
          px: 3,
          borderRadius: 3,
          background: "linear-gradient(135deg, #4a9b7f, #0a3431, #71B280)",
          color: "white",
          maxWidth: 500,
          mx: "auto",
          mb: 4,
        }}
      >
        <Typography variant="h4" fontWeight="bold" letterSpacing={1}>
          🎉 Congratulations! 🎉
        </Typography>
        <Typography variant="h6" mt={1}>
          Your Order is Completed
        </Typography>
        <Typography variant="body1" mt={2}>
          Thank you for shopping with us. We hope to see you again!
        </Typography>
      </Paper>

      {/* Order Summary Card */}
      <Card
        elevation={4}
        sx={{
          maxWidth: 800,
          mx: "auto",
          mb: 4,
          borderRadius: 3,
          overflow: "hidden",
        }}
      >
        <CardContent sx={{ padding: 4 }}>
          <Typography
            variant="h5"
            fontWeight="bold"
            gutterBottom
            sx={{
              color: "primary.main",
              textTransform: "uppercase",
              letterSpacing: 1,
            }}
          >
            Order Summary
          </Typography>
          <Divider sx={{ my: 2, backgroundColor: "secondary.main" }} />

          <Grid container spacing={2} sx={{ mb: 2 }}>
            <Grid item xs={12} sm={6}>
              <Typography variant="subtitle1" fontWeight="bold">
                Order ID:
              </Typography>
              <Typography>{order.id}</Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="subtitle1" fontWeight="bold">
                Order Status:
              </Typography>
              <Typography color="text.secondary">{order.orderStatus}</Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="subtitle1" fontWeight="bold">
                Delivery Status:
              </Typography>
              <Typography color="text.secondary">
                {order.deliveryStatus}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="subtitle1" fontWeight="bold">
                Payment Status:
              </Typography>
              <Typography color="text.secondary">
                {order.paymentStatus}
              </Typography>
            </Grid>
          </Grid>

          <Divider sx={{ my: 3, backgroundColor: "secondary.main" }} />

          {/* Receiver Information */}
          <Typography
            variant="h6"
            fontWeight="bold"
            gutterBottom
            sx={{ color: "primary.main" }}
          >
            Receiver Information
          </Typography>
          <Box mb={2}>
            <Typography>Name: {order?.reciverInfo?.name}</Typography>
            <Typography>Email: {order?.reciverInfo?.email}</Typography>
            <Typography>Phone: {order?.reciverInfo?.phone}</Typography>
          </Box>

          {/* Delivery Address */}
          <Typography
            variant="h6"
            fontWeight="bold"
            gutterBottom
            sx={{ color: "primary.main" }}
          >
            Delivery Address
          </Typography>
          <Box mb={2}>
            <Typography>{order?.address?.street}</Typography>
            <Typography>
              {order?.address?.city}, {order?.address?.state}{" "}
              {order.address.postalCode}
            </Typography>
            <Typography>{order.address.country}</Typography>
          </Box>

          <Divider sx={{ my: 3, backgroundColor: "secondary.main" }} />

          {/* Order Details */}
          <Typography
            variant="h6"
            fontWeight="bold"
            gutterBottom
            sx={{ color: "primary.main" }}
          >
            Order Details
          </Typography>
          <TableContainer>
            <Table size="small">
              <TableBody>
                <TableRow>
                  <TableCell>Taxes</TableCell>
                  <TableCell align="right">
                    ${order.taxesPrice.toFixed(2)}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Total Price</TableCell>
                  <TableCell align="right">
                    ${order.totalPrice.toFixed(2)}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Order Date</TableCell>
                  <TableCell align="right">
                    {new Date(order.createdAt).toLocaleDateString()}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Last Updated</TableCell>
                  <TableCell align="right">
                    {new Date(order.updatedAt).toLocaleDateString()}
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </CardContent>
      </Card>

      {/* Buttons */}
      <Box
        sx={{
          maxWidth: 500,
          mx: "auto",
          display: "flex",
          flexDirection: { xs: "column", sm: "row" },
          gap: 2,
        }}
      >
        <Button
          variant="contained"
          fullWidth
          onClick={() => navigate("/shop")}
          sx={{
            fontWeight: "bold",
            borderRadius: 50,
            py: 1.5,
            background:
              "linear-gradient(135deg, #4a9b7f, #0a3431, #71B280)",
            color: "white",
            "&:hover": {
              background:
                "linear-gradient(135deg, #0a3431, #4a9b7f, #71B280)",
            },
          }}
        >
          Go to Shop
        </Button>
        <Button
          variant="contained"
          fullWidth
          onClick={() => navigate("/")}
          sx={{
            fontWeight: "bold",
            borderRadius: 50,
            py: 1.5,
            backgroundColor: "secondary.main",
            color: "white",
            "&:hover": {
              backgroundColor: "#A0022A",
            },
          }}
        >
          Go to Home
        </Button>
      </Box>
    </Box>
  );
};

export default CompleteOrderSummary;
