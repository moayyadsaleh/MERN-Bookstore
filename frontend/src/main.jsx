import React from "react";
import ReactDOM from "react-dom";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { SnackbarProvider } from "notistack";

ReactDOM.render(
  <BrowserRouter>
    <SnackbarProvider maxSnack={3}>
      {" "}
      {/* maxSnack is optional */}
      <App />
    </SnackbarProvider>
  </BrowserRouter>,
  document.getElementById("root")
);
