import React, { useEffect, useState } from "react";
import {
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
  Typography,
  Button,
  Grid,
  Box,
  Skeleton,
} from "@mui/material";
import axiosInstance, { homePageSliderImageLink } from "../../../api";

const PromotionalCards = () => {
  const [loading, setLoading] = useState(true);
  const [allPromotionalCards, setAllPromotionalCards] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const response = await axiosInstance.get(
          `/frontend-home-page/promotional-card/all`
        );
        setAllPromotionalCards(response.data.data.allPromotionalCard);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <Box mt={6}>
      <Grid container spacing={3} justifyContent="center">
        {loading
          ? Array.from(new Array(4)).map((_, index) => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
                <Card
                  sx={{
                    position: "relative",
                    overflow: "hidden",
                    borderRadius: "8px",
                  }}
                >
                  <Skeleton variant="rectangular" height={300} />
                  <CardContent>
                    <Skeleton width="60%" height={30} sx={{ mb: 1 }} />
                    <Skeleton width="40%" height={20} />
                  </CardContent>
                </Card>
              </Grid>
            ))
          : allPromotionalCards.map((promo) => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={promo.id}>
                <Card
                  sx={{
                    position: "relative",
                    overflow: "hidden",
                    borderRadius: "8px",
                    cursor: "pointer",
                    transition: "transform 0.3s",
                    "&:hover": { transform: "scale(1.05)" },
                  }}
                >
                  <CardActionArea component="a" href={promo.targetLink}>
                    <CardMedia
                      component="img"
                      image={homePageSliderImageLink(promo.image)}
                      alt={promo.title}
                      sx={{
                        height: 300,
                        objectFit: "cover",
                        transition: "transform 0.3s",
                        "&:hover": { transform: "scale(1.1)" },
                      }}
                    />
                    <CardContent
                      sx={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        width: "100%",
                        height: "100%",
                        backgroundColor: "rgba(0, 0, 0, 0.5)",
                        color: "#fff",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "center",
                        opacity: 0,
                        transition: "opacity 0.3s",
                        "&:hover": { opacity: 1 },
                      }}
                    >
                      <Typography
                        variant="h5"
                        component="h3"
                        sx={{
                          marginBottom: "1rem",
                          textTransform: "uppercase",
                          fontWeight: 700,
                          letterSpacing: 1,
                        }}
                      >
                        {promo.title}
                      </Typography>
                      <Button
                        variant="contained"
                        color="secondary"
                        sx={{
                          fontWeight: 700,
                          textTransform: "none",
                          padding: "0.5rem 1.5rem",
                          backgroundColor: "#e74c3c",
                          "&:hover": {
                            backgroundColor: "#c0392b",
                          },
                        }}
                      >
                        Shop Now
                      </Button>
                    </CardContent>
                  </CardActionArea>
                </Card>
              </Grid>
            ))}
      </Grid>
      {error && <Typography color="error">Failed to load promotional cards: {error}</Typography>}
    </Box>
  );
};

export default PromotionalCards;
