import React, { useState } from "react";
import { cn } from "./Button.jsx";

export function Tabs({ defaultValue, children, className }) {
  const [active, setActive] = useState(defaultValue);
  return (
    <div className={cn("w-full", className)}>
      {children.map((child) => {
        if (child.type.displayName === "TabsList") {
          return <child.type {...child.props} active={active} setActive={setActive} />;
        }
        if (child.type.displayName === "TabsContent" && child.props.value === active) {
          return child;
        }
        return null;
      })}
    </div>
  );
}

export function TabsList({ children, className, active, setActive }) {
  return (
    <div className={cn("flex", className)}>
      {children.map((child) => (
        <child.type
          {...child.props}
          key={child.props.value}
          isActive={active === child.props.value}
          onClick={() => setActive(child.props.value)}
        />
      ))}
    </div>
  );
}
TabsList.displayName = "TabsList";

export function TabsTrigger({ value, children, isActive, onClick }) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "px-3 py-2 text-sm font-medium border-b-2",
        isActive ? "border-indigo-600 text-indigo-600" : "border-transparent text-gray-500"
      )}
    >
      {children}
    </button>
  );
}
TabsTrigger.displayName = "TabsTrigger";

export function TabsContent({ children }) {
  return <div>{children}</div>;
}
TabsContent.displayName = "TabsContent";
