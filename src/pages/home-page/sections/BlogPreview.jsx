// BlogPreview.js
import React from "react";
import {
  Box,
  Typography,
  Grid,
  Link,
  Divider,
  IconButton,
} from "@mui/material";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

const BlogPreview = () => {
  const posts = [
    {
      id: 1,
      title: "Latest Fashion Trends in 2023",
      excerpt:
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
    <Box sx={{ padding: "2rem 0", textAlign: "center" }}>
      <Typography textAlign="start" variant="h4" gutterBottom>
        From Our Blog
      </Typography>
      <Grid container spacing={2} justifyContent="center">
        {posts.map((post) => (
          <Grid item xs={12} sm={6} md={3} key={post.id}>
            <Box
              sx={{
                backgroundColor: "#fff",
                overflow: "hidden",
                borderBottom: "3px solid transparent",
                transition: "0.3s",
                "&:hover": {
                  borderBottom: "3px solid #BFF14D",
                  "& img": {
                    transform: "scale(1.05)",
                  },
                  "& .arrowIcon": {
                    transform: "translateX(5px)",
                  },
                },
              }}
            >
              {/* Blog Image */}
              <Box
                component="img"
                src={post.image}
                alt={post.title}
                sx={{
                  width: "100%",
                  height: "250px",
                  objectFit: "cover",
                  transition: "transform 0.3s",
                }}
              />
              <Box sx={{ padding: "1rem" }}>
                {/* Blog Date */}
                <Typography
                  textAlign="start"
                  variant="body2"
                  color="textSecondary"
                  gutterBottom
                >
                  {post.date}
                </Typography>
                {/* Blog Title */}
                <Typography
                  textAlign="start"
                  variant="h6"
                  sx={{ fontWeight: 700 }}
                >
                  {post.title}
                </Typography>
                <Divider sx={{ my: 1 }} />
                {/* Blog Excerpt */}
                <Typography
                  variant="body2"
                  textAlign="start"
                  sx={{
                    display: "-webkit-box",
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: "vertical",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}
                >
                  {post.excerpt}
                </Typography>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "flex-start",
                    mt: 2,
                  }}
                >
                  {/* Read More */}
                  <Link
                    href={post.link}
                    underline="none"
                    sx={{
                      color: "#A04747",
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    Read More
                    <IconButton
                      sx={{ padding: "0", marginLeft: "5px" }}
                      className="arrowIcon"
                    >
                      <ArrowForwardIosIcon
                        sx={{ fontSize: "16px", transition: "transform 0.3s" }}
                      />
                    </IconButton>
                  </Link>
                </Box>
              </Box>
            </Box>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default BlogPreview;
