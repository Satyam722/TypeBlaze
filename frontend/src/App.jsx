import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ClerkProvider } from "@clerk/clerk-react";
import LandingPage from "./components/LandingPage";
import TypeBlazeUI from "./components/TypeBlazeUI";

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

function App() {
  if (!PUBLISHABLE_KEY) {
    return <div style={{color: 'white', textAlign: 'center'}}>Missing Clerk Key in .env</div>;
  }

  return (
    <ClerkProvider publishableKey={PUBLISHABLE_KEY}>
      <Router>
        <Routes>
          {/* Landing Page */}
          <Route path="/" element={<LandingPage />} />

          {/* Direct Access: No more RedirectToSignIn guard here */}
          <Route path="/typeblaze" element={<TypeBlazeUI />} />
        </Routes>
      </Router>
    </ClerkProvider>
  );
}

export default App;