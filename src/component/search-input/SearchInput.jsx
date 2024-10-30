import React, { useState, useEffect } from "react";
import { TextField, InputAdornment, Button } from "@mui/material";
import { Search } from "@mui/icons-material";
import { useMediaQuery } from "@mui/material";
import { useFilterContext } from "../../context/FilterContext";
import { useNavigate } from "react-router-dom";

const SearchInput = () => {
  const { filters, setFilters, handleFilterChange, clearFilter } =
    useFilterContext();
  const [searchData, setSearcData] = useState("");

  const [placeholder, setPlaceholder] = useState("");
  const phrases = "  Search here any product which you want ...";
  let charIndex = 0;
  const navigate = useNavigate();

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

  // Handler for discount selection
  const handleSearchClick = () => {
    setFilters((prev) => {
      return {
        ...prev,
        search: searchData,
      };
    });
    navigate("/shop");
  };

  const handleSearchDataChange = (event) => {
    setSearcData(event.target.value);
  };

  return (
    <TextField
      name="search"
      variant="outlined"
      fullWidth
      placeholder={placeholder}
      onChange={handleSearchDataChange}
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            {/* Show button on large screens and icon on small screens */}
            {isSmallScreen ? (
              <Search onClick={handleSearchClick} />
            ) : (
              <Button
                variant="contained"
                size="small"
                sx={{
                  backgroundColor: "#004526",

                  fontWeight: "900",
                }}
                onClick={handleSearchClick}
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
