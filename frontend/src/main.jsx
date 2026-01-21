import React from 'react';
import ReactDOM from 'react-dom/client';
import { ClerkProvider } from '@clerk/clerk-react';
import App from './App.jsx';
import './index.css';

// 1. Grab the key (ensure it starts with VITE_ for Vite projects)
const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

// 2. Add a safety check to prevent a blank page crash
if (!PUBLISHABLE_KEY) {
  console.error("Clerk Publishable Key is missing! Check Vercel Env Vars.");
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* 3. Pass the key explicitly to the provider */}
    <ClerkProvider publishableKey={PUBLISHABLE_KEY} afterSignOutUrl="/">
      <App />
    </ClerkProvider>
  </React.StrictMode>
);
