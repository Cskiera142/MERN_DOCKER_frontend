import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import taskReducer from "./api/taskSlice";

export const store = configureStore({
  reducer: {
    tasks: taskReducer,
  },
});

setupListeners(store.dispatch);
