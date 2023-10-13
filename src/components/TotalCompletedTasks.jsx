import { useSelector } from "react-redux";
import { createSelector } from "reselect";

const selectCompletedTasks = (state) =>
  state.tasks.filter((task) => task.completed === true);

const getTotalCompletedTasks = createSelector(
  selectCompletedTasks,
  (completedTasks) => completedTasks.length
);

const TotalCompleteItems = () => {
  const totalCompleteItems = useSelector((state) =>
    getTotalCompletedTasks(state)
  );

  return <h4 className="mt-3">Total complete items: {totalCompleteItems}</h4>;
};

export default TotalCompleteItems;
