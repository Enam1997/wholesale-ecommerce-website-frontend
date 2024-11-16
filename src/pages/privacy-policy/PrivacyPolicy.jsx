import React, { useEffect, useState } from "react";
import {
  Typography,
  Container,
  Box,
  Divider,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import axiosInstance from "../../api";
import { formatDate } from "../../utils/formetDateTimeToEnUs";
import SectionTitle from "../../component/section-title/SectionTitle";

const PrivacyPolicy = () => {
  const [privacyData, setPrivacyData] = useState({
    introduction: "",
    informationWeCollect: "",
    howWeUseYourInformation: "",
    dataSecurity: "",
    updatedAt: new Date(),
  });

  const [firstLoading, setFirstLoading] = useState(false); // For button loading state

  // Fetch the data when the component loads
  useEffect(() => {
    const fetchData = async () => {
      setFirstLoading(true);
      try {
        const response = await axiosInstance.get(
          `/website/pppage/data/ppdetails`
        );
        setPrivacyData(response.data); // Assuming API returns an object like { address, phone, mobile, details }
        setFirstLoading(false);
      } catch (error) {
        console.error("Error fetching contact data:", error);
      }
    };
    fetchData();
  }, []);

  return (
    <Container sx={{ padding: "2rem 1rem" }}>
      {firstLoading ? (
        "Loading"
      ) : (
        <>
          <SectionTitle title={"Privacy Policy"} />
          <Divider sx={{ marginBottom: "2rem" }} />

          <Typography variant="h6" gutterBottom>
            Introduction
          </Typography>
          <Typography paragraph>{privacyData.introduction}</Typography>

          <Box>
            <Typography variant="h6" gutterBottom>
              Information We Collect
            </Typography>

            <Typography>{privacyData.informationWeCollect}</Typography>
          </Box>

          <Box>
            <Typography variant="h6" gutterBottom>
              How We Use Your Information
            </Typography>
            <Typography paragraph>
              {privacyData.howWeUseYourInformation}
            </Typography>
          </Box>

          <Box>
            <Typography variant="h6" gutterBottom>
              Data Security
            </Typography>
            <Typography paragraph>{privacyData.dataSecurity}</Typography>
          </Box>

          <Divider sx={{ marginY: "2rem" }} />

          <Typography variant="body2" color="textSecondary">
            Last Updated: {formatDate(privacyData?.updatedAt)}
          </Typography>
        </>
      )}
    </Container>
  );
};

export default PrivacyPolicy;
