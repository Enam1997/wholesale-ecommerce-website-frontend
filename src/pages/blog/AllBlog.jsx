import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Grid,
  Link,
  Divider,
  IconButton,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  CircularProgress,
} from "@mui/material";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import BlogCard from "../../component/blog-card/BlogCard";
import axiosInstance from "../../api";

const AllBlog = () => {
  const [blog, setBlog] = useState([]);
  const [loading, seLoading] = useState([]);

  const fetchBlog = async () => {
    seLoading(true);
    try {
      const response = await axiosInstance.get("/blog/get-all-blog");
      console.log(response.data);
      setBlog(response.data.data.allBlog);
    } catch (err) {
      console.error("Error fetching Blog:", err);
    } finally {
      seLoading(false);
    }
  };

  useEffect(() => {
    fetchBlog();
  }, []);

  return (
    <Box sx={{ padding: "2rem 1rem" }}>
      {loading ? (
        <Box
          width={"100%"}
          minHeight={400}
          display={"flex"}
          justifyContent={"center"}
          alignItems={"center"}
        >
          <CircularProgress />
        </Box>
      ) : (
        <>
          {blog ? (
            <>
              <Grid container spacing={3}>
                {blog.map((blog) => (
                  <Grid item xs={12} sm={6} md={3} key={blog.id}>
                    <BlogCard post={blog} />
                  </Grid>
                ))}
              </Grid>
            </>
          ) : (
            <>No Blog Available</>
          )}
        </>
      )}
    </Box>
  );
};

export default AllBlog;
