import React, { useEffect, useState } from "react";
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
import axiosInstance from "../../api";
import { formatDate } from "../../utils/formetDateTimeToEnUs";

const ShippingAndReturns = () => {
  const [shippingReturn, setShippingReturn] = useState({
    shippingPolycy: "",
    returnPolycy: "",
    updatedAt: new Date(),
  });

  const [firstLoading, setFirstLoading] = useState(false); // For button loading state

  // Fetch the data when the component loads
  useEffect(() => {
    const fetchData = async () => {
      setFirstLoading(true);
      try {
        const response = await axiosInstance.get(`/website/sr/data/srdetails`);
        setShippingReturn(response.data); // Assuming API returns an object like { address, phone, mobile, details }
        setFirstLoading(false);
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching Shipping Return data:", error);
      }
    };
    fetchData();
  }, []);

  return (
    <Container maxWidth="md" sx={{ padding: "2rem 0" }}>
      <>
        {firstLoading ? (
          <>Loading</>
        ) : (
          <>
            {/* Shipping Policy Section */}
            <Typography variant="h4" gutterBottom>
              Shipping Policy
            </Typography>
            <Typography variant="body1" paragraph>
              {shippingReturn.shippingPolycy}
            </Typography>

            <Divider sx={{ marginY: 3 }} />

            {/* Returns Policy Section */}
            <Typography variant="h4" gutterBottom>
              Returns Policy
            </Typography>
            <Typography variant="body1" paragraph>
              {shippingReturn.returnPolycy}
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
                    We offer standard and expedited shipping options. You can
                    select your preferred shipping method during checkout.
                  </Typography>
                </AccordionDetails>
              </Accordion>

              <Accordion>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  <Typography variant="h6">How do I return an item?</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography variant="body1">
                    To return an item, please contact our customer support team
                    and they will provide instructions for sending the item back
                    to us.
                  </Typography>
                </AccordionDetails>
              </Accordion>

              <Accordion>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  <Typography variant="h6">
                    When will I receive my refund?
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography variant="body1">
                    Refunds are processed within 5-7 business days after we
                    receive your return. The refund will be issued to the
                    original payment method.
                  </Typography>
                </AccordionDetails>
              </Accordion>
            </Box>

            <Typography variant="body2" color="textSecondary">
              Last Updated: {formatDate(shippingReturn?.updatedAt)}
            </Typography>
          </>
        )}
      </>
    </Container>
  );
};

export default ShippingAndReturns;
