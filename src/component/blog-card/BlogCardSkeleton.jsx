// BlogCardSkeleton.js
import React from "react";
import { Box, Skeleton, Divider } from "@mui/material";

const BlogCardSkeleton = () => {
  return (
    <Box
      sx={{
        backgroundColor: "#fff",
        overflow: "hidden",
        borderBottom: "3px solid transparent",
      }}
    >
      <Skeleton variant="rectangular" width="100%" height={250} />
      <Box sx={{ padding: "1rem" }}>
        <Skeleton variant="text" width="40%" />
        <Skeleton variant="text" width="80%" height={32} />
        <Divider sx={{ my: 1 }} />
        <Skeleton variant="text" width="100%" height={20} />
        <Skeleton variant="text" width="100%" height={20} />
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-start",
            mt: 2,
          }}
        >
          <Skeleton variant="text" width="40%" />
        </Box>
      </Box>
    </Box>
  );
};

export default BlogCardSkeleton;
