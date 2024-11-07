import React, { useState } from "react";
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

const AllBlog = () => {
  const posts = [
    {
      id: 1,
      title: "The Future of Sustainable Fashion in 2024",
      description:
        "As the fashion industry shifts towards more eco-friendly practices, discover the key trends driving sustainability in 2024. From upcycled materials to biodegradable fabrics, the future of fashion is green and ethical...",
      image:
        "https://app.dropinblog.com/uploaded/blogs/34243516/files/fast_fashion_vs_sustainable_fashion.jpeg",
      date: "July 15, 2023",
      link: "#",
    },
    {
      id: 2,
      title: "Mastering the Art of Minimalist Wardrobe",
      description:
        "arn how to curate a minimalist wardrobe that speaks volumes. Simplify your style and discover the beauty of owning fewer, high-quality pieces that transcend trends...",
      image:
        "https://www.graygroupintl.com/hubfs/Gray%20Group%20International/GGI%20-%20Assign%20and%20Sort%20%28WebP%29/Capsule%20Wardrobe%20Revamp%20Your%20Style%20the%20Minimalist%20Way.webp",
      date: "August 10, 2023",
      link: "#",
    },
    {
      id: 3,
      title: "Top 10 Fashion Accessories You Must Have This Season",
      description:
        "From bold statement pieces to timeless classics, these top 10 fashion accessories are essential to elevate any outfit this season. Whether it's for casual wear or formal events, accessorizing has never been easier...",
      image:
        "https://miro.medium.com/v2/resize:fit:1400/1*FE_4jPbut6XPlRaop-2Bgg.jpeg",
      date: "September 5, 2023",
      link: "#",
    },
    {
      id: 4,
      title: "How to Mix and Match Patterns Like a Pro",
      description:
        "Pattern mixing is one of the hottest trends in fashion today, but it can be tricky to master. This guide will teach you the dos and don'ts of combining prints, making sure you stand out for all the right reasons...",
      image:
        "https://i.ytimg.com/vi/_bZuq83w7ao/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLDXWp9zcxlVG9AzI4LuKU38bEOYiw",
      date: "September 12, 2023",
      link: "#",
    },
    {
      id: 1,
      title: "The Future of Sustainable Fashion in 2024",
      description:
        "As the fashion industry shifts towards more eco-friendly practices, discover the key trends driving sustainability in 2024. From upcycled materials to biodegradable fabrics, the future of fashion is green and ethical...",
      image:
        "https://app.dropinblog.com/uploaded/blogs/34243516/files/fast_fashion_vs_sustainable_fashion.jpeg",
      date: "July 15, 2023",
      link: "#",
    },
    {
      id: 2,
      title: "Mastering the Art of Minimalist Wardrobe",
      description:
        "arn how to curate a minimalist wardrobe that speaks volumes. Simplify your style and discover the beauty of owning fewer, high-quality pieces that transcend trends...",
      image:
        "https://www.graygroupintl.com/hubfs/Gray%20Group%20International/GGI%20-%20Assign%20and%20Sort%20%28WebP%29/Capsule%20Wardrobe%20Revamp%20Your%20Style%20the%20Minimalist%20Way.webp",
      date: "August 10, 2023",
      link: "#",
    },
    {
      id: 3,
      title: "Top 10 Fashion Accessories You Must Have This Season",
      description:
        "From bold statement pieces to timeless classics, these top 10 fashion accessories are essential to elevate any outfit this season. Whether it's for casual wear or formal events, accessorizing has never been easier...",
      image:
        "https://miro.medium.com/v2/resize:fit:1400/1*FE_4jPbut6XPlRaop-2Bgg.jpeg",
      date: "September 5, 2023",
      link: "#",
    },
    {
      id: 4,
      title: "How to Mix and Match Patterns Like a Pro",
      description:
        "Pattern mixing is one of the hottest trends in fashion today, but it can be tricky to master. This guide will teach you the dos and don'ts of combining prints, making sure you stand out for all the right reasons...",
      image:
        "https://i.ytimg.com/vi/_bZuq83w7ao/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLDXWp9zcxlVG9AzI4LuKU38bEOYiw",
      date: "September 12, 2023",
      link: "#",
    },
  ];

  return (
    <Box sx={{ padding: "2rem 1rem" }}>
      <Grid container spacing={3} justifyContent="center">
        {posts.map((post) => (
          <Grid item xs={12} sm={6} md={3} key={post.id}>
            <BlogCard post={post} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default AllBlog;
