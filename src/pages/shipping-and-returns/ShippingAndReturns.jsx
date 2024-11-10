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
