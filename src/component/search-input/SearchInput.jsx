import React, { useState, useEffect } from "react";
import { TextField, InputAdornment, Button } from "@mui/material";
import { Search } from "@mui/icons-material";
import { useMediaQuery } from "@mui/material";

const SearchInput = () => {
  const [placeholder, setPlaceholder] = useState("");
  const phrases = "  Search here any product which you want ...";
  let charIndex = 0;

  // Use Media Query to detect screen size
  const isSmallScreen = useMediaQuery("(max-width:600px)");

  useEffect(() => {
    const typeText = () => {
      setPlaceholder((prev) => prev + phrases.charAt(charIndex));
      charIndex++;

      if (charIndex === phrases.length) {
        clearInterval(typingInterval);
        setTimeout(() => {
          setPlaceholder("");
          charIndex = 0;
          typingInterval = setInterval(typeText, 100);
        }, 1000);
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
        endAdornment: (
          <InputAdornment position="end">
            {/* Show button on large screens and icon on small screens */}
            {isSmallScreen ? (
              <Search />
            ) : (
              <Button
                variant="contained"
                size="small"
                sx={{
                  backgroundColor: "#004526",

                  fontWeight: "900",
                }}
              >
                Search
              </Button>
            )}
          </InputAdornment>
        ),
        style: { height: 42, backgroundColor: "#fff" },
      }}
    />
  );
};

export default SearchInput;
