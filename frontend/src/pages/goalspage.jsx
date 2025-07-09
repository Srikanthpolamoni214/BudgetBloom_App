
import GoalForm from '../components/goalspageComponents/goalsForm';
import GoalTracker from '../components/goalspageComponents/goalsTracker';


const GoalsPage = () => {

return (
  <div className="p-6 space-y-6">
    <h1 className="text-2xl font-bold">🎯 My Financial Goals</h1>
     <GoalForm onAdd={(newGoal) => console.log("New goal added", newGoal)} />
    <GoalTracker />
  </div> 
)
};

export default GoalsPage;