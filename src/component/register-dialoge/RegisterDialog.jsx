// src/components/RegisterDialog.js
import React, { useState, useContext } from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  TextField,
  Typography,
} from "@mui/material";
import { AuthContext } from "../../context/AuthContext.jsx";

const RegisterDialog = () => {
  const {
    register,
    registerOpen,
    handleRegisterClose,
    handleLoginOpen,
    registerError,
  } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const isSuccess = await register(email, password);
    if (isSuccess) handleRegisterClose(); // Close the dialog on successful registration
  };

  const handleLoginClick = () => {
    handleLoginOpen();
    handleRegisterClose(); // Close the regoster dialog
  };

  return (
    <Dialog open={registerOpen} onClose={handleRegisterClose}>
      <DialogTitle>Register</DialogTitle>
      <DialogContent>
        <form onSubmit={handleSubmit}>
          <TextField
            margin="dense"
            label="Email"
            type="email"
            fullWidth
            variant="outlined"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <TextField
            margin="dense"
            label="Password"
            type="password"
            fullWidth
            variant="outlined"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          {registerError && (
            <Typography variant="body2" color="secondary" align="center">
              {registerError}
            </Typography>
          )}
          <Typography
            variant="body2"
            color="textSecondary"
            align="center"
            sx={{ mt: 2, cursor: "pointer" }}
            onClick={handleLoginClick}
          >
            Alredy have an account? Please login
          </Typography>
          <DialogActions>
            <Button onClick={handleRegisterClose}>Cancel</Button>
            <Button type="submit" color="primary" variant="contained">
              Register
            </Button>
          </DialogActions>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default RegisterDialog;
