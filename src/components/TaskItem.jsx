import "../assets/taskItem.css";
import { useDispatch } from "react-redux";
import { toggleComplete } from "../app/api/taskSlice";
import { deleteTask } from "../app/api/taskSlice";

const TaskItem = ({ id, title, description, completed }) => {
  const dispatch = useDispatch();

  const handleCompleteClick = () => {
    dispatch(toggleComplete({ id: id, completed: !completed }));
  };

  const handleDeleteClick = () => {
    dispatch(deleteTask({ id: id }));
  };

  return (
    <li>
      <div>
        <span>
          <input
            className="checkbox"
            type="checkbox"
            checked={completed}
            onChange={handleCompleteClick}
          ></input>
          <div className="task-info">
            <h3>{title}</h3> <p>{description}</p>
          </div>
        </span>
        <button onClick={handleDeleteClick} className="delete">
          Delete
        </button>
      </div>
    </li>
  );
};

export default TaskItem;
