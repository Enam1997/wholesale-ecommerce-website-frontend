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

const TermsAndConditions = () => {
  const [temsCondition, setTemsCondition] = useState({
    acceptanceOfTerms: "",
    userResponsibilities: "",
    limitationOfLiability: "",
    changesToTerms: "",
    updatedAt: new Date(),
  });

  const [firstLoading, setFirstLoading] = useState(false); // For button loading state

  // Fetch the data when the component loads
  useEffect(() => {
    const fetchData = async () => {
      setFirstLoading(true);
      try {
        const response = await axiosInstance.get(
          `/website/tcpage/data/tcdetails`
        );
        setTemsCondition(response.data); // Assuming API returns an object like { address, phone, mobile, details }
        setFirstLoading(false);
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching contact data:", error);
      }
    };
    fetchData();
  }, []);

  return (
    <Container sx={{ padding: "2rem 1rem" }}>
      {firstLoading ? (
        ""
      ) : (
        <>
          <SectionTitle title={"Terms & Conditions"} />
          <Divider sx={{ marginBottom: "2rem" }} />
          <Typography variant="h6" gutterBottom>
            Acceptance of Terms
          </Typography>
          <Typography paragraph>{temsCondition.acceptanceOfTerms}</Typography>

          <Box>
            <Typography variant="h6" gutterBottom>
              User Responsibilities
            </Typography>
            <Typography paragraph>
              {temsCondition.userResponsibilities}
            </Typography>
          </Box>

          <Box>
            <Typography variant="h6" gutterBottom>
              Limitation of Liability
            </Typography>
            <Typography paragraph>
              {temsCondition.limitationOfLiability}
            </Typography>
          </Box>

          <Box>
            <Typography variant="h6" gutterBottom>
              Changes to Terms
            </Typography>
            <Typography paragraph>{temsCondition.changesToTerms}</Typography>
          </Box>

          <Divider sx={{ marginY: "2rem" }} />

          <Typography variant="body2" color="textSecondary">
            Last Updated: {formatDate(temsCondition?.updatedAt)}
          </Typography>
        </>
      )}
    </Container>
  );
};

export default TermsAndConditions;
