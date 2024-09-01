import React, { useState, useEffect } from "react";
import { TextField, InputAdornment } from "@mui/material";
import { Search } from "@mui/icons-material";

const SearchInput = () => {
  const [placeholder, setPlaceholder] = useState("");
  const phrases = "Search here any product which you want ...";
  let charIndex = 0;

  useEffect(() => {
    const typeText = () => {
      setPlaceholder((prev) => prev + phrases.charAt(charIndex));
      charIndex++;

      if (charIndex === phrases.length) {
        clearInterval(typingInterval);  // Stop typing when the phrase is fully typed out
        setTimeout(() => {
          setPlaceholder("");  // Clear the placeholder
          charIndex = 0;  // Reset charIndex to start typing from the beginning
          typingInterval = setInterval(typeText, 100);  // Restart typing
        }, 1000);  // Pause for 1 second before restarting
      }
    };

    let typingInterval = setInterval(typeText, 100);

    return () => clearInterval(typingInterval);
  }, []);

  return (
    <TextField
      variant="outlined"
      fullWidth
      placeholder={placeholder}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <Search />
          </InputAdornment>
        ),
        style: { height: 45, backgroundColor: "#fff" },
      }}
    />
  );
};

export default SearchInput;
