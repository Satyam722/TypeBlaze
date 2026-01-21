import React from "react";
import ReactDOM from "react-dom/client";
import { ClerkProvider } from "@clerk/clerk-react";
import App from "./App.jsx";
import "./index.css";

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

const root = ReactDOM.createRoot(document.getElementById("root"));

if (!PUBLISHABLE_KEY) {
  // If the key fails, run the app anyway without Clerk
  console.warn("Clerk Key missing: Running in 'Guest Mode' without Auth.");
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
} else {
  // If the key exists, run with Clerk normally
  root.render(
    <React.StrictMode>
      <ClerkProvider publishableKey={PUBLISHABLE_KEY} afterSignOutUrl="/">
        <App />
      </ClerkProvider>
    </React.StrictMode>
  );
}
