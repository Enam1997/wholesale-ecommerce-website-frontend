import { Box, Typography, TextField, Grid, Skeleton } from "@mui/material";

const UserInfoForm = ({ data, setData, errors, loading }) => {
  const handleChange = (e) => {
    setData((prev) => ({
      ...prev,
      userInfo: { ...prev.userInfo, [e.target.name]: e.target.value },
    }));
  };

  return (
    <Box>
      <Typography variant="h6" sx={{ mb: 2 }}>
        Receiver Information
      </Typography>
      {loading ? (
        <Grid container spacing={2}>
          {Array.from(new Array(3)).map((_, index) => (
            <Grid item xs={12} key={index}>
              <Skeleton variant="rectangular" height={56} />
            </Grid>
          ))}
        </Grid>
      ) : (
        <>
          <TextField
            fullWidth
            name="name"
            label="Name"
            variant="outlined"
            sx={{ mb: 2 }}
            value={data.name}
            onChange={handleChange}
            error={!!errors.name}
            helperText={errors.name}
          />
          <TextField
            fullWidth
            name="email"
            label="Email"
            variant="outlined"
            sx={{ mb: 2 }}
            value={data.email}
            onChange={handleChange}
            error={!!errors.email}
            helperText={errors.email}
          />
          <TextField
            fullWidth
            name="phone"
            label="Phone Number"
            variant="outlined"
            sx={{ mb: 2 }}
            value={data.phone}
            onChange={handleChange}
            error={!!errors.phone}
            helperText={errors.phone}
          />
        </>
      )}
    </Box>
  );
};

export default UserInfoForm;
