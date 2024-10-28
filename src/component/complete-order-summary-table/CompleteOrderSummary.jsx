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
} from "@mui/material";

const CompleteOrderSummary = ({ order }) => {
  return (
    <Card variant="outlined" sx={{ maxWidth: 600, margin: "auto", padding: 2 }}>
      <CardContent>
        {/* {console.log("From Order Summary")}
        {console.log(order)} */}
        <Typography variant="h5" gutterBottom>
          Order Summary
        </Typography>
        <Divider sx={{ marginBottom: 2 }} />

        <Grid container spacing={2}>
          <Grid item xs={6}>
            <Typography variant="subtitle1">Order ID:</Typography>
            <Typography>{order.id}</Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="subtitle1">Order Status:</Typography>
            <Typography color="textSecondary">{order.orderStatus}</Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="subtitle1">Delivery Status:</Typography>
            <Typography color="textSecondary">
              {order.deliveryStatus}
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="subtitle1">Payment Status:</Typography>
            <Typography color="textSecondary">{order.paymentStatus}</Typography>
          </Grid>
        </Grid>

        <Divider sx={{ marginY: 2 }} />

        <Typography variant="h6" gutterBottom>
          Receiver Information
        </Typography>
        <Box mb={2}>
          <Typography>Name: {order?.reciverInfo?.name}</Typography>
          <Typography>Email: {order?.reciverInfo?.email}</Typography>
          <Typography>Phone: {order?.reciverInfo?.phone}</Typography>
        </Box>

        <Typography variant="h6" gutterBottom>
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

        <Divider sx={{ marginY: 2 }} />

        <Typography variant="h6" gutterBottom>
          Order Details
        </Typography>
        <TableContainer>
          <Table size="small">
            <TableBody>
              <TableRow>
                <TableCell>Total Price</TableCell>
                <TableCell align="right">
                  ${order.totalPrice.toFixed(2)}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Taxes</TableCell>
                <TableCell align="right">
                  ${order.taxesPrice.toFixed(2)}
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
  );
};

export default CompleteOrderSummary;
