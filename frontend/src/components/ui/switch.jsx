import React from "react";

export function Switch({ checked, onChange }) {
  return (
    <button
      role="switch"
      aria-checked={checked}
      onClick={() => onChange(!checked)}
      className={`w-12 h-6 flex items-center bg-gray-300 rounded-full p-1 transition ${
        checked ? "bg-green-500" : ""
      }`}
    >
      <div
        className={`w-4 h-4 bg-white rounded-full shadow-md transform duration-300 ease-in-out ${
          checked ? "translate-x-6" : "translate-x-0"
        }`}
      />
    </button>
  );
}
