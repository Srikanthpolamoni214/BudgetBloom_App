// // GoalProgressBar.jsx
// import React from 'react';

// const goals = [
//   { id: 1, label: 'Emergency Fund', current: 1500, target: 5000 },
//   { id: 2, label: 'Vacation Savings', current: 800, target: 2000 },
//   { id: 3, label: 'New Laptop', current: 400, target: 1200 }
// ];

// const GoalProgressBar = () => {
//   return (
//     <div className="bg-white p-6 rounded-lg shadow-md h-fit">
//       <h2 className="text-xl font-bold mb-4">Goal Progress</h2>
//       <div className="space-y-4">
//         {goals.map(goal => {
//           const percent = Math.min((goal.current / goal.target) * 100, 100);
//           return (
//             <div key={goal.id}>
//               <div className="flex justify-between text-sm font-medium text-gray-700 mb-1">
//                 <span>{goal.label}</span>
//                 <span>${goal.current} / ${goal.target}</span>
//               </div>
//               <div className="w-full bg-gray-200 rounded-full h-3">
//                 <div
//                   className="bg-green-500 h-3 rounded-full transition-all"
//                   style={{ width: `${percent}%` }}
//                 ></div>
//               </div>
//             </div>
//           );
//         })}
//       </div>
//     </div>
//   );
// };

// export default GoalProgressBar;


import React from "react";

const GoalProgressBar = ({ goal = 5000, totalSavings }) => {
  const progress = Math.min((totalSavings / goal) * 100, 100);

  return (
    <div className="bg-white p-4 rounded shadow-md mt-6">
      <h2 className="text-lg font-semibold mb-2 text-gray-700">Savings Goal</h2>
      <div className="w-full bg-gray-200 rounded-full h-4">
        <div
          className="bg-green-600 h-4 rounded-full transition-all duration-500"
          style={{ width: `${progress}%` }}
        ></div>
      </div>
      <p className="text-sm text-gray-500 mt-2">
        ₹{totalSavings} saved out of ₹{goal} ({progress.toFixed(0)}%)
      </p>
    </div>
  );
};

export default GoalProgressBar;
