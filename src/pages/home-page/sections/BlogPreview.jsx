// BlogPreview.js
import React, { useEffect, useState } from "react";
import { Box, Grid } from "@mui/material";
import axiosInstance from "../../../api";
import SectionTitle from "../../../component/section-title/SectionTitle";
import BlogCard from "../../../component/blog-card/BlogCard";
import BlogCardSkeleton from "../../../component/blog-card/BlogCardSkeleton";

const BlogPreview = () => {
  const [letestBlog, setLetestBlog] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFourLetestBlog = async () => {
      setLoading(true);
      try {
        const response = await axiosInstance.get("/blog/get-four-letest-blog");
        setLetestBlog(response.data.data.allBlog);
      } catch (err) {
        console.error("Error fetching blogs:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchFourLetestBlog();
  }, []);

  return (
    <Box sx={{ padding: "2rem 0" }}>
      <SectionTitle title={"From Our Blog"} />
      <Grid container spacing={2} justifyContent="center">
        {loading
          ? Array.from(new Array(4)).map((_, index) => (
              <Grid item xs={12} sm={6} md={3} key={index}>
                <BlogCardSkeleton />
              </Grid>
            ))
          : letestBlog.map((post) => (
              <Grid item xs={12} sm={6} md={3} key={post.id}>
                <BlogCard post={post} />
              </Grid>
            ))}
      </Grid>
    </Box>
  );
};

export default BlogPreview;
