import { useState } from "react";
import { useDispatch } from "react-redux";
import {
  toggleCompleteAsync,
  updateTaskAsync,
  deleteTask,
} from "../app/api/taskSlice";
import "../assets/taskItem.css";

const TaskItem = ({ id, title, description, completed }) => {
  const dispatch = useDispatch();
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(title);
  const [editedDescription, setEditedDescription] = useState(description);
  const [editedCompleted, setEditedCompleted] = useState(completed);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = () => {
    dispatch(
      updateTaskAsync({
        id,
        title: editedTitle,
        description: editedDescription,
        completed: editedCompleted,
      })
    );
    setIsEditing(false);
  };

  const handleCancelClick = () => {
    setIsEditing(false);
  };

  return (
    <li className="task-li">
      {isEditing ? (
        <div>
          <input
            className="task-info"
            type="text"
            value={editedTitle}
            onChange={(e) => setEditedTitle(e.target.value)}
          />
          <input
            className="task-info"
            value={editedDescription}
            onChange={(e) => setEditedDescription(e.target.value)}
          />
          <div className="task-div">
            <input
              type="checkbox"
              checked={editedCompleted}
              onChange={() => setEditedCompleted(!editedCompleted)}
            />
            <button className="edit" onClick={handleSaveClick}>
              Save
            </button>
            <button className="edit" onClick={handleCancelClick}>
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <div>
          <span>
            <input
              className="checkbox"
              type="checkbox"
              checked={editedCompleted}
              onChange={() =>
                dispatch(
                  toggleCompleteAsync({ id, completed: !editedCompleted })
                )
              }
            />
            <div className="task-div">
              <h3>{editedTitle}</h3> <p>{editedDescription}</p>
            </div>
          </span>
          <button onClick={handleEditClick} className="edit">
            Edit
          </button>
          <button
            onClick={() => dispatch(deleteTask({ id }))}
            className="delete"
          >
            Delete
          </button>
        </div>
      )}
    </li>
  );
};

export default TaskItem;
