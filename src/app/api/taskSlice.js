import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchTasks = createAsyncThunk("fetchTasks", async () => {
  const res = await fetch("http://localhost:3500/");
  try {
    const tasks = await res.json();
    return { tasks };
  } catch (err) {
    console.log(err);
  }
});

// const apiSlice = createSlice({
//   name: "task",
//   initialState: {
//     isLoading: false,
//     data: null,
//     isError: false,
//   },

//   extraReducers: (builder) => {
//     builder.addCase(fetchTasks.pending, (state, action) => {
//       state.isLoading = true;
//     });
//     builder.addCase(fetchTasks.fulfilled, (state, action) => {
//       console.log("fullfilled", action.payload);
//       state.data = action.payload;
//       state.isLoading = false;
//     });
//     builder.addCase(fetchTasks.rejected, (state, action) => {
//       console.log("Error", action.payload);
//       state.isError = true;
//       state.isLoading = false;
//     });
//   },
// });

const taskSlice = createSlice({
  name: "tasks",
  initialState: [],
  reducers: {
    addTask: (state, action) => {
      const newTask = {
        id: Date.now(),
        title: action.payload.title,
        description: action.payload.description,
        completed: false,
      };
      state.push(newTask);
    },
    toggleComplete: (state, action) => {
      const index = state.findIndex((task) => task.id === action.payload.id);
      state[index].completed = action.payload.completed;
    },
    deleteTask: (state, action) => {
      return state.filter((task) => task.id !== action.payload.id);
    },
  },
  extraReducers: {
    [fetchTasks.fulfilled]: (state, action) => {
      return action.payload.tasks;
    },
  },
});

export const { addTask, toggleComplete, deleteTask } = taskSlice.actions;

export default taskSlice.reducer;
