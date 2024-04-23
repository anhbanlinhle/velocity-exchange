import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#033090",
    },
    secondary: {
      main: "#ffb838",
    },
    type: "light",
  },
  direction: "rtl",
  spacing: 8,
  shape: {
    borderRadius: 4,
  },
  typography: {
    fontFamily: '"Red Hat Display", "Roboto", sans-serif',
    button: {
      textTransform: 'none',
      fontWeight: 650,
    }
  },
});

export default theme;
