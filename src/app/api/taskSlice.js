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
    try {
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
      } else {
        throw new Error("Network response was not ok");
      }
    } catch (error) {
      // Handle the error here, e.g., log it or return an error action.
      console.error("Error:", error);
      throw error; // Rethrow the error to be handled by Redux Toolkit
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
    console.log("Payload for updating task:", payload);

    console.log(
      "Fetching URL:",
      `http://localhost:3500/taskRoutes/${payload.id}`
    );

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
    } else {
      console.error("Fetch request failed with status:", resp.status);
      throw new Error("Fetch request failed");
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
      console.log("Task to be added:", task);
      state.push(task);
      console.log("State after adding task:", [...state]);
    },
    toggleComplete: (state, action) => {
      const index = state.findIndex((task) => task.id === action.payload.id);
      state[index].completed = action.payload.completed;
    },
    deleteTask: (state, action) => {
      // console.log("action received:", action);
      console.log("deleted:", action.payload.id);
      return state.filter((task) => task.id !== action.payload.id);
    },
  },
  extraReducers: {
    [getTaskAsync.fulfilled]: (state, action) => {
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
