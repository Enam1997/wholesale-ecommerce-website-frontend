import React from "react";
import {
  Container,
  Typography,
  Box,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Divider,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const ShippingAndReturns = () => {
  return (
    <Container maxWidth="md" sx={{ padding: "2rem 0" }}>
      {/* Shipping Policy Section */}
      <Typography variant="h4" gutterBottom>
        Shipping Policy
      </Typography>
      <Typography variant="body1" paragraph>
        We offer free standard shipping on all orders over $50. Expedited
        shipping options are available at an additional cost. Orders are
        processed within 1-2 business days and you will receive an email with
        tracking information once your order has shipped.
      </Typography>
      <Typography variant="body1" paragraph>
        Delivery times may vary depending on your location. Please note that we
        are not responsible for delays caused by customs or unforeseen carrier
        issues.
      </Typography>

      <Divider sx={{ marginY: 3 }} />

      {/* Returns Policy Section */}
      <Typography variant="h4" gutterBottom>
        Returns Policy
      </Typography>
      <Typography variant="body1" paragraph>
        If you are not satisfied with your purchase, you can return the item
        within 30 days of receipt for a full refund. Items must be in their
        original condition and packaging to be eligible for return. Please
        contact our support team to initiate the return process.
      </Typography>
      <Typography variant="body1" paragraph>
        Please note that return shipping costs are the responsibility of the
        customer unless the item received was incorrect or damaged.
      </Typography>

      <Divider sx={{ marginY: 3 }} />

      {/* FAQs Section */}
      <Typography variant="h4" gutterBottom>
        Frequently Asked Questions
      </Typography>

      <Box sx={{ marginY: 2 }}>
        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography variant="h6">
              What are your shipping options?
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography variant="body1">
              We offer standard and expedited shipping options. You can select
              your preferred shipping method during checkout.
            </Typography>
          </AccordionDetails>
        </Accordion>

        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography variant="h6">How do I return an item?</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography variant="body1">
              To return an item, please contact our customer support team and
              they will provide instructions for sending the item back to us.
            </Typography>
          </AccordionDetails>
        </Accordion>

        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography variant="h6">When will I receive my refund?</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography variant="body1">
              Refunds are processed within 5-7 business days after we receive
              your return. The refund will be issued to the original payment
              method.
            </Typography>
          </AccordionDetails>
        </Accordion>
      </Box>
    </Container>
  );
};

export default ShippingAndReturns;
