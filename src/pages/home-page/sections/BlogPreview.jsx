// BlogPreview.js
import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Grid,
  Link,
  Divider,
  IconButton,
} from "@mui/material";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import BlogCard from "../../../component/blog-card/BlogCard";
import axiosInstance from "../../../api";
import SectionTitle from "../../../component/section-title/SectionTitle";

const BlogPreview = () => {
  const [letestBlog, setLetestBlog] = useState([]);

  const fetchFourLetestBlog = async () => {
    try {
      const response = await axiosInstance.get("/blog/get-four-letest-blog");
      console.log(response.data);
      setLetestBlog(response.data.data.allBlog);
    } catch (err) {
      console.error("Error fetching Marqueis:", err);
    }
  };

  useEffect(() => {
    fetchFourLetestBlog();
  }, []);

  const posts = [
    {
      id: 1,
      title: "Latest Fashion Trends in 2023",
      description:
        "Discover the hottest fashion trends of 2023 and how to style them...",
      image:
        "https://plus.unsplash.com/premium_photo-1672883551901-caa4758abba7?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      date: "July 15, 2023",
      link: "#",
    },
    {
      id: 2,
      title: "How to Choose the Right Outfit",
      excerpt:
        "Tips and tricks on selecting the perfect outfit for any occasion...",
      image:
        "https://images.unsplash.com/photo-1487744480471-9ca1bca6fb7d?q=80&w=2091&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      date: "August 10, 2023",
      link: "#",
    },
    {
      id: 3,
      title: "How to Choose the Right Outfit",
      excerpt:
        "Tips and tricks on selecting the perfect outfit for any occasion...",
      image:
        "https://images.unsplash.com/photo-1487744480471-9ca1bca6fb7d?q=80&w=2091&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      date: "August 10, 2023",
      link: "#",
    },
    {
      id: 4,
      title: "How to Choose the Right Outfit",
      excerpt:
        "Tips and tricks on selecting the perfect outfit for any occasion...",
      image:
        "https://images.unsplash.com/photo-1487744480471-9ca1bca6fb7d?q=80&w=2091&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      date: "August 10, 2023",
      link: "#",
    },
    // Add more posts as needed
  ];

  return (
    <Box sx={{ padding: "2rem 0" }}>
      <SectionTitle title={"From Our Blog"} />
      {letestBlog ? (
        <>
          <Grid container spacing={2} justifyContent="center">
            {letestBlog.map((post) => (
              <Grid item xs={12} sm={6} md={3} key={post.id}>
                <BlogCard post={post} />
              </Grid>
            ))}
          </Grid>
        </>
      ) : (
        <>
          <Grid container spacing={2} justifyContent="center">
            {posts.map((post) => (
              <Grid item xs={12} sm={6} md={3} key={post.id}>
                <BlogCard post={post} />
              </Grid>
            ))}
          </Grid>
        </>
      )}
    </Box>
  );
};

export default BlogPreview;
