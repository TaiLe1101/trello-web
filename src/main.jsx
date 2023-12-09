import React from "react";
import ReactDOM from "react-dom/client";
import { ToastContainer } from "react-toastify";

import CssBaseline from "@mui/material/CssBaseline";
import { Experimental_CssVarsProvider as CssVarsProvider } from "@mui/material/styles";

import App from "./App.jsx";
import theme from "./theme";
import "react-toastify/dist/ReactToastify.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <CssVarsProvider theme={theme}>
      <CssBaseline />
      <App />
      <ToastContainer theme="colored" position="bottom-left" autoClose={1000} />
    </CssVarsProvider>
  </React.StrictMode>
);
