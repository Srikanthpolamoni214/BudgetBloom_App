import { PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';

const GoalChart = ({ goals }) => {
  const COLORS = ['#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

  return (
    <PieChart width={400} height={300}>
      <Pie
        data={goals}
        dataKey="saved"
        nameKey="name"
        cx="50%"
        cy="50%"
        outerRadius={100}
        fill="#8884d8"
        label
      >
        {goals.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
        ))}
      </Pie>
      <Tooltip />
      <Legend />
    </PieChart>
  );
};

export default GoalChart;
