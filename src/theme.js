import { createTheme } from "@mui/material";

const theme = createTheme({
  palette: {
    primary: {
      main: "#BFF14D", // Still define the primary color
    },
    secondary: {
      main: "#dc004e", // Still define the secondary color
    },
    customGreen: {
      main: "#00ff00", // Custom color named 'customGreen'
      contrastText: "#fff", // Optional: text color on customGreen background
    },
    customBlue: {
      main: "#0033cc", // Custom color named 'customBlue'
      contrastText: "#fff",
    },
  },
  typography: {
    fontFamily: "Roboto, sans-serif",
  },
});

export { theme };
