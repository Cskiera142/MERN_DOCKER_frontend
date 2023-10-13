import TaskItem from "./TaskItem";
import "../assets/taskList.css";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getTaskAsync } from "../app/api/taskSlice";

const TaskList = () => {
  const tasks = useSelector((state) => state.tasks);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getTaskAsync());
  }, [dispatch]);

  return (
    <ul className="list-group">
      {tasks.map((task) => (
        <TaskItem
          key={task.id}
          id={task.id}
          title={task.title}
          description={task.description}
          completed={task.completed}
        />
      ))}
    </ul>
  );
};

export default TaskList;
