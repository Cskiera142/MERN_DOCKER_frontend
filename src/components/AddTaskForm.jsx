import React, { useState } from "react";
import "../assets/addTaskForm.css";
import { useDispatch } from "react-redux";
import { addTask } from "../app/api/taskSlice";

const AddTaskForm = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const dispatch = useDispatch();

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(addTask({ title: title, description: description }));
  };

  return (
    <form onSubmit={onSubmit}>
      <label>
        <input
          className="form-input"
          type="text"
          placeholder="Add task..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        ></input>
        <textarea
          className="form-input"
          type="text"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        ></textarea>
        <button>Submit</button>
      </label>
    </form>
  );
};

export default AddTaskForm;
