import { createTheme } from "@mui/material";

const theme = createTheme({
  palette: {
    primary: {
      // main: "#004526", // Still define the primary color
      main: "#01A651",
    },
    secondary: {
      main: "#C40233", // Still define the secondary color
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
    fontFamily: "Domine, sans-serif",
  },
});

export { theme };
