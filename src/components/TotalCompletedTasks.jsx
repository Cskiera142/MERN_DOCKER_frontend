import React from "react";
import { useSelector } from "react-redux";

const TotalCompleteItems = () => {
  const tasks = useSelector((state) =>
    state.tasks.filter((task) => task.completed === true)
  );

  return <h4 className="mt-3">Total complete items: {tasks.length}</h4>;
};

export default TotalCompleteItems;
