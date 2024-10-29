import React, { useState, useEffect, useContext } from "react";
import {
  TextField,
  Typography,
  Button,
  Avatar,
  Box,
  Paper,
  Stack,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";
import axiosInstance from "../../api";

// Custom styles for an eye-catching look
const ProfileContainer = styled(Paper)(({ theme }) => ({
  maxWidth: 600,
  margin: "40px auto",
  padding: theme.spacing(4),
  borderRadius: theme.spacing(2),
  boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.1)",
  background: "linear-gradient(135deg, #f5f7fa, #c3cfe2)",
}));

const ProfileAvatar = styled(Avatar)({
  width: 100,
  height: 100,
  border: "4px solid white",
  boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)",
});

const ProfileButton = styled(Button)(({ theme }) => ({
  marginTop: theme.spacing(3),
  padding: theme.spacing(1.5),
  fontWeight: "bold",
  borderRadius: theme.spacing(1),
  transition: "background 0.3s",
  "&:hover": {
    backgroundColor: "#155bb5",
  },
}));

const ManageProfile = () => {
  const { user } = useContext(AuthContext);

  const [profile, setProfile] = useState({
    name: "",
    bio: "",
    email: "",
    phone: "",
    createdAt: "",
    imageUrl: "",
  });
  const [updatedData, setUpdatedData] = useState({});
  const [showUpdateButton, setShowUpdateButton] = useState(false);

  // Fetch profile data
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axiosInstance.get(
          `/users/get-profile-info/${user?.id}`
        );
        setProfile(response.data);
      } catch (error) {
        console.error("Error fetching profile:", error);
      }
    };
    fetchProfile();
  }, [user?.id]);

  // Handle input change and track updates
  const handleChange = (field, value) => {
    setUpdatedData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
    setShowUpdateButton(true);
  };

  // Handle update profile
  const handleUpdateProfile = async () => {
    try {
      await axiosInstance.put(
        `/users/update-profile-info/${user?.id}`,
        updatedData
      );
      setProfile((prevProfile) => ({ ...prevProfile, ...updatedData }));
      setUpdatedData({});
      setShowUpdateButton(false);
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  return (
    <ProfileContainer elevation={4}>
      <Stack alignItems="center" spacing={2} mb={3}>
        <ProfileAvatar src={profile.imageUrl} alt="Profile Image" />
        <TextField
          label="Name"
          variant="outlined"
          fullWidth
          value={updatedData.name ?? profile.name}
          onChange={(e) => handleChange("name", e.target.value)}
          sx={{ background: "white", borderRadius: 1 }}
        />
      </Stack>

      <TextField
        label="Bio"
        variant="outlined"
        fullWidth
        multiline
        rows={4}
        value={updatedData.bio ?? profile.bio}
        onChange={(e) => handleChange("bio", e.target.value)}
        sx={{ background: "white", borderRadius: 1, mb: 2 }}
      />

      <Typography variant="body1" fontWeight="bold" gutterBottom>
        Email:
      </Typography>
      <Typography
        variant="body2"
        sx={{
          mb: 2,
          color: "#333",
          background: "#f9f9f9",
          padding: "8px",
          borderRadius: 1,
        }}
      >
        {profile.email}
      </Typography>

      <TextField
        label="Phone"
        variant="outlined"
        fullWidth
        value={updatedData.phone ?? profile.phone}
        onChange={(e) => handleChange("phone", e.target.value)}
        sx={{ background: "white", borderRadius: 1, mb: 2 }}
      />

      <Typography variant="body1" fontWeight="bold" gutterBottom>
        Profile Created At:
      </Typography>
      <Typography
        variant="body2"
        sx={{
          color: "#333",
          background: "#f9f9f9",
          padding: "8px",
          borderRadius: 1,
        }}
      >
        {new Date(profile.createdAt).toLocaleDateString()}
      </Typography>

      {showUpdateButton && (
        <ProfileButton variant="contained" onClick={handleUpdateProfile}>
          Update Profile
        </ProfileButton>
      )}
    </ProfileContainer>
  );
};

export default ManageProfile;
