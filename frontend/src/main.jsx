// src/main.jsx (after moving)
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";  // Changed from "./components/App"
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);