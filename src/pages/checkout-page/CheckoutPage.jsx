import React, { useContext, useEffect, useState } from "react";
import {
  Grid,
  Box,
  Typography,
  Button,
  Stepper,
  Step,
  StepLabel,
  Divider,
  CircularProgress,
  Backdrop,
  Collapse,
  Alert,
  IconButton,
  AlertTitle,
} from "@mui/material";
import UserInfoForm from "./UserInfoForm";
import DeliveryInfoForm from "./DeliveryInfoForm";
import PaymentForm from "./PaymentForm";
import Confirmation from "./Confirmation";
import { orderItems, orderSummary } from "../../demo-data/checkoutPageData"; // Example data
import OrderSummaryCheckOut from "./OrderSummaryCheckOut";
import { useCart } from "../../context/CartContext";
import axiosInstance from "../../api";
import { AuthContext } from "../../context/AuthContext";
import calculateDiscountPrice from "../../utils/calculateProductDiscountPrice";
import CompleteOrderSummary from "../../component/complete-order-summary-table/CompleteOrderSummary";
import { calculateTotalOrderPrice } from "../../utils/orderPrice";
import { Close } from "@mui/icons-material";

const steps = ["User Info", "Delivery Info", "Payment", "Confirmation"];

const CheckoutPage = () => {
  const { cartItems, setCartItems } = useCart();
  const { user, handleLoginOpen, handleRegisterOpen } = useContext(AuthContext);
  const [orderStart, setOrderStart] = useState(false);
  const [orderConfirm, setOrderConfirm] = useState(false);
  const [orderConfirmData, setOrderConfirmData] = useState({});
  const [orderError, setOrderError] = useState(false);
  const [orderErrorMessage, setOrderErrorMessage] = useState();

  const [activeStep, setActiveStep] = useState(0);

  const [formData, setFormData] = useState({
    userInfo: { name: "", email: "", phone: "" },
    deliveryInfo: {
      streetAdress: "",
      apartment: "",
      city: "",
      state: "",
      zip: "",
      country: "UAE",
      phone: "",
    },
    paymentInfo: {
      paymentType: "CashOn",
      cardName: "",
      cardNumber: "",
      expiry: "",
      cvv: "",
      billingZip: "",
    },
  });
  // Form Error
  const [errors, setErrors] = useState({});

  const handleOrder = async () => {
    const itemIterate = (item) => {
      return {
        productId: item?.id,
        quantity: item?.quantity,
        price: calculateDiscountPrice(item?.price, item?.discount),
      };
    };
    const { shippingPrice, taxes, totalPrice } =
      calculateTotalOrderPrice(cartItems);

    try {
      setOrderStart(true);
      const orderData = {
        userId: user?.id,
        items: cartItems.map((itm) => itemIterate(itm)),
        totalPrice: Number(totalPrice),
        shippingPrice: Number(shippingPrice),
        taxesPrice: Number(taxes),
        paymentMethod: "CashOn",
        address: formData?.deliveryInfo,
        reciverInfo: formData?.userInfo,
      };
      console.log(orderData);

      const response = await axiosInstance.post(
        "/order/create-order",
        orderData
      );
      const orderConfirmData = response.data.data;
      console.log(orderConfirmData);
      setOrderConfirmData(orderConfirmData);
      setOrderConfirm(true);
      setCartItems([]);
      setOrderStart(false);
    } catch (error) {
      setOrderError(true);
      setOrderStart(false);
      setActiveStep(0);
      setOrderErrorMessage(error.response.data.errors);
    }
  };

  const validateStep = (step) => {
    let stepErrors = {};

    if (step === 0) {
      const { name, email, phone } = formData.userInfo;
      if (!name) stepErrors.name = "Name is required";
      if (!email || !/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email))
        stepErrors.email = "Valid email is required";
      if (!phone || phone.length < 10)
        stepErrors.phone = "Valid phone number is required";
    }
    if (step === 1) {
      const { streetAdress, apartment, city, state, zip, country, phone } =
        formData.deliveryInfo;
      if (!streetAdress) stepErrors.streetAdress = "Street Address is required";
      // if (!apartment) stepErrors.address = "Apartment is required";
      if (!city) stepErrors.city = "City is required";
      if (!state) stepErrors.state = "State is required";
      if (!zip) stepErrors.zip = "ZIP code is required";
      if (!country) stepErrors.country = "Country is required";
      if (!phone) stepErrors.phone = "Phone Number is required";
    }
    if (step === 2) {
      const { paymentType, cardName, cardNumber, expiry, cvv } =
        formData.paymentInfo;
      if (paymentType !== "CashOn") {
        if (!cardName) stepErrors.cardName = "Cardholder's name is required";
        if (!cardNumber || cardNumber.length < 16)
          stepErrors.cardNumber = "Valid card number is required";
        if (!expiry) stepErrors.expiry = "Expiry date is required";
        if (!cvv || cvv.length < 3) stepErrors.cvv = "CVV is required";
      }
    }

    setErrors(stepErrors);
    return Object.keys(stepErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(activeStep)) {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    }
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const getStepContent = (step) => {
    switch (step) {
      case 0:
        return (
          <UserInfoForm
            data={formData.userInfo}
            setData={setFormData}
            errors={errors}
          />
        );
      case 1:
        return (
          <DeliveryInfoForm
            data={formData.deliveryInfo}
            setData={setFormData}
            errors={errors}
          />
        );
      case 2:
        return (
          <PaymentForm
            data={formData.paymentInfo}
            setData={setFormData}
            errors={errors}
          />
        );
      case 3:
        return <Confirmation data={formData} />;
      default:
        return "Unknown step";
    }
  };

  const fetchDeliveryData = async () => {
    try {
      const response = await axiosInstance.get(
        `/users/get-delivery-info/${user?.id}`
      );
      setFormData((prev) => ({
        ...prev,
        deliveryInfo: response.data.data.deliveryInfo,
      }));
      console.log(response.data);
    } catch (error) {
      console.error("Error fetching delivery data:", error);
    }
  };

  const fetchProfileData = async () => {
    try {
      const response = await axiosInstance.get(
        `/users/get-profile-info/${user?.id}`
      );

      let { name, email, phone } = response.data;
      setFormData((prev) => ({
        ...prev,
        userInfo: { name, email, phone },
      }));

      console.log(response.data);
    } catch (error) {
      console.error("Error fetching delivery data:", error);
    }
  };

  // Fetch delivery data on component mount
  useEffect(() => {
    fetchDeliveryData();
    fetchProfileData();
  }, [user?.id]);

  return (
    <Box sx={{ padding: "24px" }}>
      {orderConfirm ? (
        <Box display={"flex"} justifyContent={"center"} alignItems={"center"}>
          <CompleteOrderSummary order={orderConfirmData} />
        </Box>
      ) : (
        <>
          {cartItems?.length !== 0 ? (
            <>
              <Typography variant="h4" sx={{ mb: 4 }}>
                Checkout
              </Typography>
              <Collapse in={orderError}>
                <Alert
                  severity="error"
                  action={
                    <IconButton
                      aria-label="close"
                      color="inherit"
                      size="small"
                      onClick={() => {
                        setOrderError(false);
                      }}
                    >
                      <Close fontSize="inherit" />
                    </IconButton>
                  }
                  sx={{ mb: 2 }}
                >
                  <AlertTitle>Error</AlertTitle>
                  {orderErrorMessage} Please Try Again
                </Alert>
              </Collapse>
              <Stepper activeStep={activeStep} alternativeLabel sx={{ mb: 4 }}>
                {steps.map((label) => (
                  <Step key={label}>
                    <StepLabel>{label}</StepLabel>
                  </Step>
                ))}
              </Stepper>
              <Grid container spacing={4}>
                {/* Left Side: Steps */}
                <Grid item xs={12} md={activeStep == 3 ? 12 : 8}>
                  {getStepContent(activeStep)}

                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      mt: 4,
                    }}
                  >
                    <Button disabled={activeStep === 0} onClick={handleBack}>
                      Back
                    </Button>
                    {/* <Button
                  variant="contained"
                  color="primary"
                  onClick={handleNext}
                >
                  {activeStep === steps.length - 1 ? "Place Order" : "Next"}
                </Button> */}
                    {activeStep == 3 ? (
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={handleOrder}
                      >
                        Place Order
                      </Button>
                    ) : (
                      <>
                        <Button
                          variant="contained"
                          color="primary"
                          onClick={handleNext}
                        >
                          Next
                        </Button>
                      </>
                    )}
                  </Box>
                </Grid>

                {/* Right Side: Order Summary */}
                {activeStep != 3 && (
                  <Grid item xs={12} md={4}>
                    <OrderSummaryCheckOut items={orderItems} />
                  </Grid>
                )}
              </Grid>
            </>
          ) : (
            <Box
              display={"flex"}
              justifyContent={"center"}
              width={"100%"}
              alignItems={"center"}
              minHeight={"400px"}
            >
              <Typography variant="h5" color="gray">
                Your Cart Is Empty Please Add miniMum 1 Product
              </Typography>
            </Box>
          )}
        </>
      )}

      {/* ORder Backdrop */}

      <Backdrop
        sx={(theme) => ({ color: "#fff", zIndex: theme.zIndex.drawer + 1 })}
        open={orderStart}
      >
        <Box display={"flex"} flexDirection={"column"} alignItems={"center"}>
          <CircularProgress color="inherit" sx={{ marginBottom: 2 }} />
          <Typography>Order Processing, please wait</Typography>
        </Box>
      </Backdrop>
    </Box>
  );
};

export default CheckoutPage;
