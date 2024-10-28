import React from "react";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  IconButton,
  Grid,
  Box,
  Button,
} from "@mui/material";
import { FavoriteBorder, ShoppingCart } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

const ShopLeftRecomendedProductCard = ({ product }) => {
  const { id, name, price, discount, featureImage, pcsPerBox } = product;
  const discountPercentage = discount
    ? Math.round(((price - discount) / price) * 100)
    : null;

  const navigate = useNavigate();

  return (
    <Card
      variant="outlined"
      sx={{
        display: "flex",
        flexDirection: "row",
        width: "100%",
        maxWidth: 400,
        position: "relative",
        overflow: "hidden",
        borderRadius: "10px",
        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
        cursor: "pointer",
        "&:hover img": {
          transform: "scale(1.1)",
        },
      }}
      onClick={() => navigate(`/productdetails/${id}`)}
    >
      {/* Left Side: Product Image */}
      <Box sx={{ flex: "0 0 35%", position: "relative" }}>
        <CardMedia
          component="img"
          image={featureImage}
          alt={name}
          sx={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            transition: "transform 0.3s ease-in-out",
            // "&:hover": { transform: "scale(1.1)" },
          }}
        />
        {discount && (
          <Typography
            variant="caption"
            sx={{
              position: "absolute",
              top: 8,
              right: 8,
              backgroundColor: "red",
              color: "white",
              padding: "0.25rem",
              borderRadius: "4px",
              fontWeight: "bold",
              fontSize: "12px",
            }}
          >
            -{discount}%
          </Typography>
        )}
        <IconButton
          sx={{
            position: "absolute",
            top: 8,
            left: 8,
            backgroundColor: "white",
            color: "black",
            padding: "0.25rem",
            borderRadius: "20px",
          }}
        >
          <FavoriteBorder sx={{ fontSize: "20px" }} />
        </IconButton>
      </Box>

      {/* Right Side: Product Details */}
      <CardContent
        sx={{
          flex: "1 0 65%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "10px 15px",
        }}
      >
        <Typography
          variant="body1"
          sx={{
            fontWeight: "bold",
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
            maxWidth: "100%",
          }}
        >
          {name.length > 21 ? `${name.slice(0, 20)}...` : name}
        </Typography>
        {pcsPerBox ? (
          <Typography
            variant="body2"
            sx={{
              color: "grey",
            }}
          >
            PCS: {pcsPerBox}
          </Typography>
        ) : (
          ""
        )}

        <Grid container justifyContent="space-between" alignItems="center">
          <Typography
            variant="body2"
            sx={{ fontWeight: "bold", fontSize: "16px" }}
          >
            {discount ? (
              <>
                <span style={{ color: "#2d2d2d" }}>AED {discount}</span>
                <span
                  style={{
                    textDecoration: "line-through",
                    marginLeft: "8px",
                    color: "grey",
                    fontSize: "14px",
                  }}
                >
                  {price}
                </span>
              </>
            ) : (
              <span>AED {price}</span>
            )}
          </Typography>
          {/* <Button
            variant="outlined"
            size="small"
            sx={{
              padding: "4px 8px",
              minWidth: "auto",
              borderRadius: "20px",
              transition: "0.3s",
              "&:hover": { backgroundColor: "#f0f0f0" },
            }}
          >
            <ShoppingCart fontSize="small" />
          </Button> */}
        </Grid>
      </CardContent>
    </Card>
  );
};

export default ShopLeftRecomendedProductCard;
