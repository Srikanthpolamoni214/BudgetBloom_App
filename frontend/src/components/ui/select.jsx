
export function Select({ children, className = "" }) {
  return <div className={`relative ${className}`} >{children}</div>;
}

export function SelectTrigger({ value, onClick }) {
  return (
    <button
      onClick={onClick}
      className="w-full px-3 py-2 border rounded-md flex justify-between items-center"
    >
      <span >{value || "Select..."}</span>
      <svg
        className="w-4 h-4 ml-2"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24" style={{height:"20px"}}
      >
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
      </svg>
    </button>
  );
}

export function SelectValue({ value }) {
  return <span  >{value || "Select..."}</span>;
}


export function SelectContent({ open, children }) {
  return open ? (
    <ul className="absolute mt-1 w-full bg-white border rounded-md shadow-md z-10">
      {children}
    </ul>
  ) : null;
}

export function SelectItem({ value, onSelect }) {
  return (
    <li
      onClick={() => onSelect(value)}
      className="px-3 py-2 hover:bg-blue-100 cursor-pointer" >
    
      {value}
    </li>
  );
}


















// import React from "react";

// export function Select({ children, className = "" }) {
//   return <div className={`relative ${className}`}>{children}</div>;
// }

// export function SelectTrigger({ value, onClick }) {
//   return (
//     <button
//       onClick={onClick}
//       className="w-full px-3 py-2 border rounded-md flex justify-between items-center"
//     >
//       <span>{value || "Select..."}</span>
//       <svg
//         className="w-4 h-4 ml-2"
//         fill="none"
//         stroke="currentColor"
//         viewBox="0 0 24 24"
//       >
//         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
//       </svg>
//     </button>
//   );
// }

// export function SelectValue({ value }) {
//   return <span>{value || "Select..."}</span>;
// }

// export function SelectContent({ open, children }) {
//   return open ? (
//     <ul className="absolute mt-1 w-full bg-white border rounded-md shadow-md z-10">
//       {children}
//     </ul>
//   ) : null;
// }

// export function SelectItem({ value, onSelect }) {
//   return (
//     <li
//       onClick={() => onSelect(value)}
//       className="px-3 py-2 hover:bg-blue-100 cursor-pointer"
//     >
//       {value}
//     </li>
//   );
// }
