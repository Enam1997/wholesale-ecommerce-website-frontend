import { Box, Card, Skeleton, Grid, IconButton } from "@mui/material";
import FavoriteBorder from "@mui/icons-material/FavoriteBorder";

const ProductCardThreeSkeleton = () => {
  return (
    <Card
      variant="outlined"
      sx={{
        width: "100%",
        maxWidth: 300,
        maxHeight: 400,
        height: 400,
        position: "relative",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        overflow: "hidden",
        cursor: "pointer",
      }}
    >
      <Box sx={{ position: "relative", height: "70%", overflow: "hidden" }}>
        <Skeleton
          variant="rectangular"
          width="100%"
          height="100%"
          sx={{ objectFit: "cover" }}
        />
      </Box>
      <Box sx={{ padding: "10px", flexGrow: 1 }}>
        <Skeleton variant="text" height={40} sx={{ marginBottom: "0.5rem" }} />
        <Skeleton variant="text" width="60%" sx={{ marginBottom: "1rem" }} />

        <Grid container justifyContent="space-between" alignItems="center">
          <Skeleton variant="text" width="40%" />
          <Skeleton variant="rectangular" width={40} height={40} />
        </Grid>
      </Box>
      <IconButton
        sx={{
          position: "absolute",
          top: 8,
          right: 8,
          backgroundColor: "white",
          padding: "0.25rem",
          borderRadius: "20px",
        }}
      >
        <FavoriteBorder sx={{ color: "black", fontSize: "25px" }} />
      </IconButton>
    </Card>
  );
};

export default ProductCardThreeSkeleton;
