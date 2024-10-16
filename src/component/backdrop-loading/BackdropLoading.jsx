import React, { useContext } from "react";
import { Backdrop, CircularProgress, Typography } from "@mui/material";
import { AuthContext } from "../../context/AuthContext";

const BackdropLoading = () => {
  const { backdropLoadingText, loading } = useContext(AuthContext);

  return (
    <Backdrop
      sx={{
        color: "#fff",
        zIndex: (theme) => theme.zIndex.drawer + 1,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
      open={loading} // Assuming backdrop is always open when this component renders
    >
      <CircularProgress color="inherit" />
      <Typography variant="h6" sx={{ mt: 2 }}>
        {backdropLoadingText}
      </Typography>
    </Backdrop>
  );
};

export default BackdropLoading;
