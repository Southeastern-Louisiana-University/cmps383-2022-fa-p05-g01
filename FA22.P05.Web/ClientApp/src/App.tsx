import CssBaseline from "@mui/material/CssBaseline";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import React from "react"
import { ToastContainer } from "react-toastify";
import NavigationRoutes from "./routes/config";

const darkMode = createTheme({
  palette: {
    mode: 'dark',
  },
});

export default function App() {
  return (
    <ThemeProvider theme={darkMode}>
      <CssBaseline />
      <NavigationRoutes />
      <ToastContainer/>
    </ThemeProvider>
  );
}
