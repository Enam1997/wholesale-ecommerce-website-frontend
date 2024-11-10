import React from "react";
import { Typography } from "@mui/material";

const SectionTitle = ({ title }) => {
  return (
    <Typography
      variant="h5"
      marginBottom={4}
      sx={{
        flexGrow: 1,
        background:
          "linear-gradient(90deg, #004526 0%, #C40233 50%, #004526 100%)",
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
        fontWeight: "700 !important",
      }}
    >
      {title}
    </Typography>
  );
};

export default SectionTitle;
