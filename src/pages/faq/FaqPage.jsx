import React, { useEffect, useState } from "react";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Container,
  MenuItem,
  TextField,
  Typography,
} from "@mui/material";
import { ExpandMore } from "@mui/icons-material";
import axiosInstance from "../../api";

const FaqPage = () => {
  const [availableCategories, setAvailableCategories] = useState([
    "General",
    "Shipping",
    "Returns",
    "PrivacyPolycy",
    "TermsandCondition",
    "Delivery",
  ]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [faqs, setFaqs] = useState([]);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const response = await axiosInstance.get(
          `/website/faq/all?category=${selectedCategory}`
        );
        setFaqs(response.data.data.allFaq); // Assuming API returns an object like { address, phone, mobile, details }
      } catch (error) {
        console.error("Error fetching contact data:", error);
      }
    };
    fetchBlog();
  });

  return (
    <Container sx={{ padding: "2rem 1rem" }}>
      <TextField
        select
        fullWidth
        label="Category"
        variant="outlined"
        size="small"
        name="category"
        value={selectedCategory}
        onChange={(e) => setSelectedCategory(e.target.value)}
      >
        <MenuItem value="">All Categories</MenuItem>
        {availableCategories.map((category, index) => (
          <MenuItem key={index} value={category}>
            {category}
          </MenuItem>
        ))}
      </TextField>
      <Box sx={{ marginY: 2 }}>
        {faqs ? (
          <>
            {faqs.map((faq, index) => (
              <Accordion>
                <AccordionSummary expandIcon={<ExpandMore />}>
                  <Typography variant="h6">{faq?.question}</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography variant="body1">{faq?.answer}</Typography>
                </AccordionDetails>
              </Accordion>
            ))}
          </>
        ) : (
          <>No Faqs available</>
        )}
      </Box>
    </Container>
  );
};

export default FaqPage;
