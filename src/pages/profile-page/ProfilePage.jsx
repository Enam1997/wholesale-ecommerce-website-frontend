import React, { useState } from "react";
import {
  Box,
  Typography,
  Tabs,
  Tab,
  Grid,
  useMediaQuery,
  useTheme,
  Paper,
  Divider,
} from "@mui/material";
import ManageProfile from "./ManageProfile";
import DeliveryInformation from "./DeliveryInformation";
import AllOrder from "./AllOrder";

const ProfilePage = () => {
  const [selectedTab, setSelectedTab] = useState(0);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const handleTabChange = (event, newValue) => {
    setSelectedTab(newValue);
  };

  const tabItems = [
    "Manage Profile",
    "My Orders",
    "Delivery Addresses",
    "Support Ticket",
    "Wishlist",
    "Logout",
  ];

  return (
    <Box mt={4} mb={4}>
      <Grid container spacing={2}>
        {/* Left Side: User Info and Tabs */}
        <Grid item xs={12} sm={4}>
          <Paper sx={{ padding: "16px", border: "1px solid #ddd" }}>
            {/* Name Section */}
            <Typography variant="h6" fontWeight={900} gutterBottom>
              HI Enam
            </Typography>

            {/* Tabs Section */}
            <Box sx={{ border: "1px solid #ddd", borderRadius: "8px" }}>
              <Tabs
                value={selectedTab}
                onChange={handleTabChange}
                variant={isMobile ? "scrollable" : "fullWidth"}
                scrollButtons="auto"
                orientation={isMobile ? "horizontal" : "vertical"}
                sx={{
                  "& .MuiTab-root:hover": {
                    backgroundColor: "#01A651",
                    color: "white !important",
                  },
                  "& .Mui-selected": {
                    backgroundColor: "#01A651",
                    color: "white !important",
                  },
                  "& .MuiTabs-indicator": {
                    backgroundColor: "#BFF14D", // Change the tab indicator color to green
                  },
                }}
              >
                {tabItems.map((item, index) => (
                  <Tab
                    key={index}
                    label={item}
                    sx={{
                      color: "black !important",
                      fontWeight: "900",
                      alignItems: "start",
                    }}
                  />
                ))}
              </Tabs>
            </Box>
          </Paper>
        </Grid>

        {/* Right Side: Selected Tab Content */}
        <Grid item xs={12} sm={8}>
          <Paper
            sx={{ border: "1px solid #ccc", padding: 3, minHeight: "500px" }}
          >
            {selectedTab === 0 && (
              <Box>
                <Typography variant="h5" gutterBottom>
                  Profile
                </Typography>

                <Divider sx={{ marginBottom: 2 }} />

                <ManageProfile />
              </Box>
            )}
            {selectedTab === 1 && (
              <Typography variant="body1">
                <AllOrder />
              </Typography>
            )}
            {selectedTab === 2 && <DeliveryInformation />}
            {selectedTab === 3 && (
              <Typography variant="body1">Support Ticket Content</Typography>
            )}
            {selectedTab === 4 && (
              <Typography variant="body1">Wishlist Content</Typography>
            )}
            {selectedTab === 5 && (
              <Typography variant="body1">Logout Section</Typography>
            )}
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ProfilePage;
