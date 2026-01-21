import { useState } from "react";

// Utility function
export function cn(...classes) {
  return classes.filter(Boolean).join(" ");
}


// Button
export function Button({ className, ...props }) {
  return (
    <button
      className={cn(
        "inline-flex items-center justify-center rounded-lg px-4 py-2 text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 disabled:opacity-50 disabled:pointer-events-none",
        className
      )}
      {...props}
    />
  );
}

// Card, CardHeader, CardTitle, CardContent, Progress, Tabs, TabsList, TabsTrigger, TabsContent
// Copy exactly from your posted code
