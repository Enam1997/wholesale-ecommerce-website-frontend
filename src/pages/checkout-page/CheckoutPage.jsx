import React, { useState } from "react";
import {
  Grid,
  Box,
  Typography,
  Button,
  Stepper,
  Step,
  StepLabel,
  Divider,
} from "@mui/material";
import UserInfoForm from "./UserInfoForm";
import DeliveryInfoForm from "./DeliveryInfoForm";
import PaymentForm from "./PaymentForm";
import Confirmation from "./Confirmation";
import { orderItems, orderSummary } from "../../demo-data/checkoutPageData"; // Example data
import OrderSummaryCheckOut from "./OrderSummaryCheckOut";

const steps = ["User Info", "Delivery Info", "Payment", "Confirmation"];

const CheckoutPage = () => {
  const [activeStep, setActiveStep] = useState(0);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const getStepContent = (step) => {
    switch (step) {
      case 0:
        return <UserInfoForm />;
      case 1:
        return <DeliveryInfoForm />;
      case 2:
        return <PaymentForm />;
      case 3:
        return <Confirmation />;
      default:
        return "Unknown step";
    }
  };

  return (
    <Box sx={{ padding: "24px" }}>
      <Typography variant="h4" sx={{ mb: 4 }}>
        Checkout
      </Typography>
      <Stepper activeStep={activeStep} alternativeLabel sx={{ mb: 4 }}>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      <Grid container spacing={4}>
        {/* Left Side: Steps */}
        <Grid item xs={12} md={8}>
          {getStepContent(activeStep)}

          <Box sx={{ display: "flex", justifyContent: "space-between", mt: 4 }}>
            <Button disabled={activeStep === 0} onClick={handleBack}>
              Back
            </Button>
            <Button variant="contained" color="primary" onClick={handleNext}>
              {activeStep === steps.length - 1 ? "Finish" : "Next"}
            </Button>
          </Box>
        </Grid>

        {/* Right Side: Order Summary */}
        <Grid item xs={12} md={4}>
          <OrderSummaryCheckOut items={orderItems} summary={orderSummary} />
        </Grid>
      </Grid>
    </Box>
  );
};

export default CheckoutPage;
