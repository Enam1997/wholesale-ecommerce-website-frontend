import React from "react";
import {
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
  Typography,
  Button,
} from "@mui/material";

const PromotionalCards = () => {
  const promos = [
    {
      id: 1,
      title: "Summer Collection",
      image:
        "/1.gif",
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
      image: "/Exclusive.png",
      link: "#",
    },
    {
      id: 4,
      title: "New Arrivals",
      image: "/offer.gif",
      link: "#",
    },
  ];

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
        gap: "1.5rem",
        padding: "2rem 0",
      }}
    >
      {promos.map((promo) => (
        <Card
          key={promo.id}
          sx={{
            position: "relative",
            overflow: "hidden",
            borderRadius: "8px",
            cursor: "pointer",
            transition: "transform 0.3s",
            "&:hover": { transform: "scale(1.03)" },
          }}
        >
          <CardActionArea component="a" href={promo.link}>
            <CardMedia
              component="img"
              image={promo.image}
              alt={promo.title}
              sx={{ height: 400, objectFit: "fill" }} // Ensure the image covers the card properly
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
                sx={{ marginBottom: "1rem" }}
              >
                {promo.title}
              </Typography>
              <Button variant="contained" color="secondary">
                Shop Now
              </Button>
            </CardContent>
          </CardActionArea>
        </Card>
      ))}
    </div>
  );
};

export default PromotionalCards;
