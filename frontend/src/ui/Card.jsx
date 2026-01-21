// frontend/src/ui/Card.jsx
import React from "react";

function cn(...classes) {
  return classes.filter(Boolean).join(" ");
}

export function Card({ className, ...props }) {
  return <div className={cn("rounded-xl border bg-white text-gray-900 shadow-sm", className)} {...props} />;
}

export function CardHeader({ className, ...props }) {
  return <div className={cn("p-4 border-b", className)} {...props} />;
}

export function CardTitle({ className, ...props }) {
  return <h3 className={cn("text-lg font-semibold", className)} {...props} />;
}

export function CardContent({ className, ...props }) {
  return <div className={cn("p-4", className)} {...props} />;
}

export function Progress({ value, className }) {
  return (
    <div className={cn("w-full h-2 rounded-full bg-gray-200 overflow-hidden", className)}>
      <div className="h-full bg-indigo-600 transition-all" style={{ width: `${Math.min(100, Math.max(0, value))}%` }} />
    </div>
  );
}
