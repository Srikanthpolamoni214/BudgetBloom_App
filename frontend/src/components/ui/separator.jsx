import React from "react";

export function Separator({ className = "" }) {
  return (
    <hr className={`border-t border-gray-300 my-4 ${className}`} />
  );
}
