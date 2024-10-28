import { Box, Typography, TextField } from "@mui/material";

const UserInfoForm = ({ data, setData, errors }) => {
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
    </Box>
  );
};

export default UserInfoForm;
