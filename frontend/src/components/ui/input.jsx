import React from "react";

export function Input({ type = "text", className = "", ...props }) {
  return (
    <input
      type={type}
      className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-400 ${className}`}
      {...props}
    />
  );
}
