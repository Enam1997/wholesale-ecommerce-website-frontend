import React from "react";
import {
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
  Typography,
  Button,
  Grid,
  Box,
} from "@mui/material";

import promoImage1 from "../../../assets/1.gif";
import promoImage3 from "../../../assets/Exclusive.png";
import promoImage4 from "../../../assets/offer.gif";

const PromotionalCards = () => {
  const promos = [
    {
      id: 1,
      title: "Summer Collection",
      image: promoImage1,
      link: "#",
    },
    {
      id: 2,
      title: "Winter Collection",
      image:
        "https://thumbs.dreamstime.com/b/fashion-banner-new-winter-collections-vector-poster-already-available-best-brands-61650374.jpg",
      link: "#",
    },
    {
      id: 3,
      title: "Exclusive Deals",
      image: promoImage3,
      link: "#",
    },
    {
      id: 4,
      title: "New Arrivals",
      image: promoImage4,
      link: "#",
    },
  ];

  return (
    <Box
      sx={{
        padding: "2rem 0",
      }}
    >
      <Grid
        container
        spacing={3}
        justifyContent="center"
      >
        {promos.map((promo) => (
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
              <CardActionArea component="a" href={promo.link}>
                <CardMedia
                  component="img"
                  image={promo.image}
                  alt={promo.title}
                  sx={{
                    height: 300,
                    objectFit: "cover",
                    transition: "transform 0.3s",
                    "&:hover": { transform: "scale(1.1)" }, // Image scale effect on hover
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
                    "&:hover": { opacity: 1 }, // Overlay appears on hover
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
    </Box>
  );
};

export default PromotionalCards;
