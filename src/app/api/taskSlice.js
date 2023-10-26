import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { nanoid } from "nanoid";

export const getTaskAsync = createAsyncThunk("task/getTaskAsync", async () => {
  const resp = await fetch("http://localhost:3500/taskRoutes");
  if (resp.ok) {
    const task = await resp.json();
    return { task };
  }
});

export const addTaskAsync = createAsyncThunk(
  "task/addTaskAsync",
  async (payload) => {
    const resp = await fetch(`http://localhost:3500/taskRoutes/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: payload.title,
        description: payload.description,
      }),
    });

    if (resp.ok) {
      const task = await resp.json();
      return { task };
    }
  }
);

export const toggleCompleteAsync = createAsyncThunk(
  "task/completeTaskAsync",
  async (payload) => {
    const resp = await fetch(`http://localhost:3500/taskRoutes/${payload.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ completed: payload.completed }),
    });

    if (resp.ok) {
      const task = await resp.json();
      return { task };
    }
  }
);

export const updateTaskAsync = createAsyncThunk(
  "task/updateTaskAsync",
  async (payload) => {
    const resp = await fetch(`http://localhost:3500/taskRoutes/${payload.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ completed: payload.completed }),
    });

    if (resp.ok) {
      const task = await resp.json();
      return { task };
    }
  }
);

export const deleteTaskAsync = createAsyncThunk(
  "task/deleteTaskAsync",
  async (payload) => {
    const resp = await fetch(`http://localhost:3500/taskRoutes/${payload.id}`, {
      method: "DELETE",
    });

    if (resp.ok) {
      return { id: payload.id };
    }
  }
);

export const taskSlice = createSlice({
  name: "task",
  initialState: [],
  reducers: {
    addTask: (state, action) => {
      const task = {
        id: nanoid(),
        title: action.payload.title,
        description: action.payload.description,
        completed: false,
      };
      state.push(task);
    },
    toggleComplete: (state, action) => {
      const index = state.findIndex((task) => task.id === action.payload.id);
      state[index].completed = action.payload.completed;
    },
    deleteTask: (state, action) => {
      console.log("deleted:", action.payload.id);
      return state.filter((task) => task.id !== action.payload.id);
    },
  },
  extraReducers: {
    [getTaskAsync.fulfilled]: (state, action) => {
      console.log("succeeded");
      return action.payload.task;
    },
    [addTaskAsync.fulfilled]: (state, action) => {
      state.push(action.payload.task);
    },
    [toggleCompleteAsync.fulfilled]: (state, action) => {
      const index = state.findIndex(
        (task) => task.id === action.payload.task.id
      );
      state[index].completed = action.payload.task.completed;
    },
    [deleteTaskAsync.fulfilled]: (state, action) => {
      return state.filter((task) => task.id !== action.payload.id);
    },
  },
});

export const { addTask, toggleComplete, deleteTask } = taskSlice.actions;

export default taskSlice.reducer;
