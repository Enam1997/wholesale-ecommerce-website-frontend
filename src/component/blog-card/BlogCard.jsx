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
import { blogImageLink } from "../../api";
import { formatDate } from "../../utils/formetDateTimeToEnUs";

const BlogCard = ({ post }) => {
  return (
    <Box
      sx={{
        backgroundColor: "#fff",
        overflow: "hidden",
        borderBottom: "3px solid transparent",
        transition: "0.3s",
        "&:hover": {
          borderBottom: "3px solid #01A651",
          "& img": {
            transform: "scale(1.05)",
          },
          // "& .arrowIcon": {
          //   transform: "translateX(5px)",
          // },
        },
      }}
    >
      {/* Blog Image */}
      <Box
        component="img"
        src={blogImageLink(post?.image)}
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
          {/* {formatDate(post.createdAt)} */}
          {post.createdAt ? `${formatDate(post.createdAt)}` : ""}
        </Typography>
        {/* Blog Title */}
        <Typography textAlign="start" variant="h6" sx={{ fontWeight: 700 }}>
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
          {post.description}
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
            href={`/blog-details/${post.id}`}
            target="_blank"
            underline="none"
            sx={{
              // color: "#A04747",
              background: "linear-gradient(135deg, #4a9b7f,#0a3431, #71B280)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              display: "flex",
              fontWeight: "600",
              alignItems: "center",
              "&:hover": {
                "& .arrowIcon": {
                  transform: "translateX(5px)",
                },
              },
            }}
          >
            Read More
            <IconButton
              sx={{
                padding: "0",
                marginLeft: "5px",
              }}
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
  );
};

export default BlogCard;
