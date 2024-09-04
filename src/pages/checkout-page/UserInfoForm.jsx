import { Box, Typography, TextField } from "@mui/material";

const UserInfoForm = () => {
  return (
    <Box>
      <Typography variant="h6" sx={{ mb: 2 }}>
        User Information
      </Typography>
      {/* Add form fields here */}
      <TextField
        fullWidth
        label="Full Name"
        variant="outlined"
        sx={{ mb: 2 }}
      />
      <TextField fullWidth label="Email" variant="outlined" sx={{ mb: 2 }} />
      <TextField
        fullWidth
        label="Phone Number"
        variant="outlined"
        sx={{ mb: 2 }}
      />
    </Box>
  );
};

export default UserInfoForm;
