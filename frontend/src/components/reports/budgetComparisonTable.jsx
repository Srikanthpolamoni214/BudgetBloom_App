// // BudgetComparisonTable.jsx
// import React, { useEffect, useState } from "react";

// const BudgetComparisonTable = () => {
//   const [data, setData] = useState([]);
//     const [expense, setExpenseData] = useState([]);



//   useEffect(()=>{
//     const fetchData = async () =>{
//       const response = await fetch('http://localhost:3201/budgets');
//       const datajson = await response.json();
//       setData(datajson);
//     }
//     fetchData();
//   }
    
//     , []);
//     useEffect(() => {
    
//       const fetchData = async () =>{
//         const response = await fetch('http://localhost:3201/expenses');
//         const datajson = await response.json();
//         setExpenseData(datajson);
//       }
//       fetchData();
//     }, [])

//     const filterdata=data.map((item, index) =>{
//       const expense = expense.filter((expenseItem) =>{
//         return expenseItem.category === item.name

//         })
//       })
//       console.log("filterdata", filterdata)
    
   
//   return (
//     <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow">
//       <h3 className="text-xl font-semibold mb-2">Budget vs Actual</h3>
//       <table className="w-full text-left border-collapse">
//         <thead>
//           <tr>
//             <th className="p-2 border-b">Category</th>
//             <th className="p-2 border-b">Budgeted</th>
//             <th className="p-2 border-b">Spent</th>
//           </tr>
//         </thead>
//         <tbody>
//           {data.map((row, index) => (
//             <tr key={index} className={row.spent > row.budgeted ? "text-red-500" : ""}>
//               <td className="p-2 border-b">{row.category}</td>
//               <td className="p-2 border-b">₹{row.budgeted}</td>
//               <td className="p-2 border-b">₹{row.spent}</td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default BudgetComparisonTable;
import React, { useEffect, useState } from "react";

const BudgetComparisonTable = () => {
  const [budgets, setBudgets] = useState([]);
  const [expenses, setExpenses] = useState([]);

  useEffect(() => {
    const fetchBudgets = async () => {
      const response = await fetch("http://localhost:3201/budgets");
      const data = await response.json();
      setBudgets(data);
    };
    fetchBudgets();
  }, []);

  useEffect(() => {
    const fetchExpenses = async () => {
      const response = await fetch(" http://localhost:3201/expenses");
      const data = await response.json();
      setExpenses(data);
    };
    fetchExpenses();
  }, []);

  // Merge budgets with actual spent data
  const mergedData = budgets.map((budgetItem) => {
    const totalSpent = expenses
      .filter((exp) => exp.category === budgetItem.name)
      .reduce((sum, exp) => sum + Number(exp.amount), 0);

    return {
      category: budgetItem.name,
      budgeted: Number(budgetItem.amount),
      spent: totalSpent,
    };
  });
  console.log("mergedData", mergedData);

  return (
    <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow">
      <h3 className="text-xl font-semibold mb-2">Budget vs Actual</h3>
      <table className="w-full text-left border-collapse">
        <thead>
          <tr>
            <th className="p-2 border-b">Category</th>
            <th className="p-2 border-b">Budgeted</th>
            <th className="p-2 border-b">Spent</th>
          </tr>
        </thead>
        <tbody>
          {mergedData.map((row, index) => (
            <tr key={index} className={row.spent > row.budgeted ? "text-red-500" : ""}>
              <td className="p-2 border-b">{row.category}</td>
              <td className="p-2 border-b">₹{row.budgeted}</td>
              <td className="p-2 border-b">₹{row.spent}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default BudgetComparisonTable;
