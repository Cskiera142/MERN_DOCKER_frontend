import AddTaskForm from "./components/AddTaskForm";
import TaskList from "./components/TaskList";
import TotalCompletedTasks from "./components/TotalCompletedTasks";
import "./index.css";

function App() {
  return (
    <div>
      <h1>Task Manager</h1>
      <AddTaskForm />
      <TaskList />
      <TotalCompletedTasks />
    </div>
  );
}

export default App;
