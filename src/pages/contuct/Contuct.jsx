import React, { useEffect, useState } from "react";
import {
  Container,
  Grid,
  Typography,
  TextField,
  Button,
  Alert,
  Snackbar,
  Paper,
  Box,
  Skeleton,
} from "@mui/material";
import axiosInstance from "../../api";

const Contuct = () => {
  const [contuctData, setContuctData] = useState({});
  const [firstLoading, setFirstLoading] = useState(false); // For button loading state

  // Fetch the data when the component loads
  useEffect(() => {
    const fetchData = async () => {
      setFirstLoading(true);
      try {
        const response = await axiosInstance.get(
          `/website/contuctpage/data/contuctdetails`
        );
        setContuctData(response.data); // Assuming API returns an object like { address, phone, mobile, details }
        setFirstLoading(false);

        console.log(response.data);
      } catch (error) {
        console.error("Error fetching contact data:", error);
      }
    };
    fetchData();
  }, []);

  return (
    <Paper elevation={2} sx={{ paddingY: 6, paddingX: 2 }}>
      <Typography variant="h6" gutterBottom>
        Contact Details
      </Typography>
      <div style={{ position: "relative" }}>
        <iframe
          width="100%"
          height="100%"
          frameBorder="0"
          title="map"
          marginHeight="0"
          marginWidth="0"
          scrolling="no"
          src={contuctData?.map}
          style={{
            filter: "grayscale(0.5) contrast(0.9) opacity(1)",
            minHeight: "500px",
          }}
        ></iframe>
        <div
          style={{
            position: "absolute",
            bottom: 10,
            left: 10,
            backgroundColor: "white",
            padding: 10,
          }}
        >
          <Typography variant="body2">Address:</Typography>
          <Typography variant="body2">{contuctData?.adress} </Typography>
          <Typography variant="body2">Phone: {contuctData?.phone}</Typography>
          <Typography variant="body2">Mobile: {contuctData?.mobile}</Typography>
        </div>
      </div>
    </Paper>
  );
};

export default Contuct;
