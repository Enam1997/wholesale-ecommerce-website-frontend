import React, { useEffect, useState } from "react";
import { Box, Typography, Container } from "@mui/material";
import axiosInstance, { blogImageLink } from "../../api";
import { useParams } from "react-router-dom";
import { formatDate } from "../../utils/formetDateTimeToEnUs";

const BlogDetails = ({ blog }) => {
  const [blogDetails, setBlogDetails] = useState(null);
  const [loading, setLoading] = useState(null);
  let { blogId } = useParams();

  const fetchBlogDetails = async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.get(`/blog/get-blog/${blogId}`);
      console.log(response.data.data.blog);

      setBlogDetails(response.data.data.blog);
      setLoading(false);
    } catch (err) {
      console.error("Error fetching Marqueis:", err);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogDetails();
  }, []);

  // Example blog data; in practice, this would come from props or state
  blog = {
    image:
      "https://app.dropinblog.com/uploaded/blogs/34243516/files/fast_fashion_vs_sustainable_fashion.jpeg",
    date: "October 15, 2023",
    title: "The Future of Sustainable Fashion in 2024",
    content: `
      As the fashion industry shifts towards more eco-friendly practices,
      discover the key trends driving sustainability in 2024. From upcycled
      materials to biodegradable fabrics, the future of fashion is green and
      ethical. This article explores the innovative approaches brands are taking
      to address environmental challenges and how consumers can make a positive
      impact with their purchasing choices As the fashion industry shifts towards more eco-friendly practices,
      discover the key trends driving sustainability in 2024. From upcycled
      materials to biodegradable fabrics, the future of fashion is green and
      ethical. This article explores the innovative approaches brands are taking
      to address environmental challenges and how consumers can make a positive
      impact with their purchasing choices As the fashion industry shifts towards more eco-friendly practices,
      discover the key trends driving sustainability in 2024. From upcycled
      materials to biodegradable fabrics, the future of fashion is green and
      ethical. This article explores the innovative approaches brands are taking
      to address environmental challenges and how consumers can make a positive
      impact with their purchasing choices As the fashion industry shifts towards more eco-friendly practices,
      discover the key trends driving sustainability in 2024. From upcycled
      materials to biodegradable fabrics, the future of fashion is green and
      ethical. This article explores the innovative approaches brands are taking
      to address environmental challenges and how consumers can make a positive
      impact with their purchasing choices As the fashion industry shifts towards more eco-friendly practices,
      discover the key trends driving sustainability in 2024. From upcycled
      materials to biodegradable fabrics, the future of fashion is green and
      ethical. This article explores the innovative approaches brands are taking
      to address environmental challenges and how consumers can make a positive
      impact with their purchasing choices As the fashion industry shifts towards more eco-friendly practices,
      discover the key trends driving sustainability in 2024. From upcycled
      materials to biodegradable fabrics, the future of fashion is green and
      ethical. This article explores the innovative approaches brands are taking
      to address environmental challenges and how consumers can make a positive
      impact with their purchasing choices.
    `,
  };

  return (
    <>
      <Container sx={{ mt: 8, mb: 8 }}>
        {loading ? (
          "Loading"
        ) : (
          <>
            {blogDetails ? (
              <>
                <Box
                  component="img"
                  src={blogImageLink(blogDetails.image)}
                  alt={blogDetails.title}
                  sx={{
                    width: "100%",
                    maxHeight: "500px",
                    objectFit: "cover",
                    // borderRadius: "16px",
                    boxShadow: "0 8px 16px rgba(0, 0, 0, 0.1)",
                    mb: 4,
                  }}
                />
                <Typography
                  variant="body2"
                  color="textSecondary"
                  sx={{ marginBottom: "0.5rem" }}
                >
                  {formatDate(blogDetails.createdAt)}
                </Typography>
                <Typography
                  variant="h3"
                  component="h1"
                  sx={{
                    fontWeight: "bold",
                    mb: 3,
                    // color: "#433878",
                    // textAlign: "center",
                  }}
                >
                  {blogDetails.title}
                </Typography>
                <Typography
                  variant="body1"
                  sx={{ color: "#555", lineHeight: 1.6, textAlign: "justify" }}
                >
                  {blogDetails.description}
                </Typography>
              </>
            ) : (
              <>No Data Available</>
            )}
          </>
        )}
      </Container>
    </>
  );
};

export default BlogDetails;
