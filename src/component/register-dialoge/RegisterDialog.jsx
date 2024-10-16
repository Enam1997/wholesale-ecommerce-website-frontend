// src/components/RegisterDialog.js
import React, { useState, useContext } from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  TextField,
} from "@mui/material";
import { AuthContext } from "../../context/AuthContext.jsx";

const RegisterDialog = () => {
  const { register, registerOpen, handleRegisterClose } =
    useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const isSuccess = await register(email, password);
    if (isSuccess) handleRegisterClose(); // Close the dialog on successful registration
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
