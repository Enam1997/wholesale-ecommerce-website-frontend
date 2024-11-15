import React, { useState, useEffect, useContext } from "react";
import {
  TextField,
  Typography,
  Button,
  Avatar,
  Box,
  Paper,
  Stack,
  IconButton,
  Skeleton,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import axiosInstance, { profileImageLink } from "../../api";
import { AddPhotoAlternate } from "@mui/icons-material";
import { AuthContext } from "../../context/AuthContext";

// Custom styles for a modern look
const ProfileContainer = styled(Paper)(({ theme }) => ({
  maxWidth: 600,
  margin: "40px auto",
  padding: theme.spacing(4),
  borderRadius: theme.spacing(2),
  boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.1)",
  background: "linear-gradient(135deg, #ffffff, #f1f3f5)",
}));

const ProfileButton = styled(Button)(({ theme }) => ({
  marginTop: theme.spacing(3),
  padding: theme.spacing(1.5),
  fontWeight: "bold",
  borderRadius: theme.spacing(1),
  transition: "background 0.3s ease",
  "&:hover": {
    backgroundColor: "#1769aa",
  },
}));

const ManageProfile = () => {
  const { user } = useContext(AuthContext);

  const [profile, setProfile] = useState(null); // Null initially for skeleton loading
  const [updatedData, setUpdatedData] = useState({});
  const [showUpdateButton, setShowUpdateButton] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axiosInstance.get(
          `/users/get-profile-info/${user?.id}`
        );
        setProfile(response.data);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching profile:", error);
        setIsLoading(false);
      }
    };
    fetchProfile();
  }, [user?.id]);

  const handleChange = (field, value) => {
    setUpdatedData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
    setShowUpdateButton(true);
  };

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

  const handleImageChange = async (event) => {
    const files = Array.from(event.target.files);
    const formData = new FormData();
    files.forEach((image) => formData.append("profileImage", image));

    try {
      const response = await axiosInstance.put(
        `/users/update-profile-image/${user?.id}`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      setProfile((prevProfile) => ({
        ...prevProfile,
        avatar: response.data.data.profileImage,
      }));
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  return (
    <ProfileContainer elevation={4}>
      <Stack alignItems="center" spacing={2} mb={3}>
        <Box sx={{ mb: 3, textAlign: "center" }}>
          <input
            accept="image/*"
            style={{ display: "none" }}
            id="profile-image-upload"
            type="file"
            onChange={handleImageChange}
          />
          <label htmlFor="profile-image-upload">
            <IconButton component="span">
              {isLoading ? (
                <Skeleton
                  variant="circular"
                  width={120}
                  height={120}
                  sx={{ boxShadow: 2 }}
                />
              ) : profile?.avatar ? (
                <Avatar
                  src={profileImageLink(profile.avatar)}
                  alt="Admin"
                  sx={{ width: 120, height: 120, boxShadow: 2 }}
                />
              ) : (
                <Box
                  sx={{
                    width: 120,
                    height: 120,
                    border: "2px dashed #ccc",
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    cursor: "pointer",
                  }}
                >
                  <AddPhotoAlternate fontSize="large" />
                </Box>
              )}
            </IconButton>
          </label>
        </Box>

        {isLoading ? (
          <Skeleton variant="rectangular" width="100%" height={56} />
        ) : (
          <TextField
            label="Name"
            variant="outlined"
            fullWidth
            value={updatedData.name ?? profile?.name}
            onChange={(e) => handleChange("name", e.target.value)}
            sx={{ background: "white", borderRadius: 1 }}
          />
        )}
      </Stack>

      {isLoading ? (
        <Skeleton variant="rectangular" width="100%" height={120} />
      ) : (
        <TextField
          label="Bio"
          variant="outlined"
          fullWidth
          multiline
          rows={4}
          value={updatedData.bio ?? profile?.bio}
          onChange={(e) => handleChange("bio", e.target.value)}
          sx={{ background: "white", borderRadius: 1, mb: 2 }}
        />
      )}

      <Typography variant="body1" fontWeight="bold" gutterBottom>
        Email:
      </Typography>
      {isLoading ? (
        <Skeleton variant="text" width="80%" />
      ) : (
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
          {profile?.email}
        </Typography>
      )}

      {isLoading ? (
        <Skeleton variant="rectangular" width="100%" height={56} />
      ) : (
        <TextField
          label="Phone"
          variant="outlined"
          fullWidth
          value={updatedData.phone ?? profile?.phone}
          onChange={(e) => handleChange("phone", e.target.value)}
          sx={{ background: "white", borderRadius: 1, mb: 2 }}
        />
      )}

      <Typography variant="body1" fontWeight="bold" gutterBottom>
        Profile Created At:
      </Typography>
      {isLoading ? (
        <Skeleton variant="text" width="60%" />
      ) : (
        <Typography
          variant="body2"
          sx={{
            color: "#333",
            background: "#f9f9f9",
            padding: "8px",
            borderRadius: 1,
          }}
        >
          {new Date(profile?.createdAt).toLocaleDateString()}
        </Typography>
      )}

      {showUpdateButton && (
        <ProfileButton variant="contained" onClick={handleUpdateProfile}>
          Update Profile
        </ProfileButton>
      )}
    </ProfileContainer>
  );
};

export default ManageProfile;
