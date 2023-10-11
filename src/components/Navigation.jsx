import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTasks } from "../app/api/apiSlice";

const Navigation = () => {
  const dispatch = useDispatch();
  const isLoading = useSelector((state) => state.task.isLoading);
  return (
    <div>
      {/* <h1>hello world</h1>
      <button onClick={(e) => dispatch(fetchTasks())}>Fetch</button> */}
    </div>
  );
};

export default Navigation;
