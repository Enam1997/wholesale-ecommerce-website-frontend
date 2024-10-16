// src/components/LoginDialog.js
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

const LoginDialog = () => {
  const { user, login, loginOpen, handleLoginClose } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const isSuccess = await login(email, password);
      if (isSuccess) handleLoginClose(); // Close the dialog on successful login
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Dialog open={loginOpen} onClose={handleLoginClose}>
      <DialogTitle>Login</DialogTitle>
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
            <Button onClick={handleLoginClose}>Cancel</Button>
            <Button type="submit" color="primary" variant="contained">
              Login
            </Button>
          </DialogActions>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default LoginDialog;
