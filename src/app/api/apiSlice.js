import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchTasks = createAsyncThunk("fetchTasks", async () => {
  const res = await fetch("http://localhost:3500/");
  return res.json();
});

const apiSlice = createSlice({
  name: "task",
  initialState: {
    isLoading: false,
    data: null,
    isError: false,
  },

  extraReducers: (builder) => {
    builder.addCase(fetchTasks.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(fetchTasks.fulfilled, (state, action) => {
      console.log("fullfilled", action.payload);
      state.data = action.payload;
      state.isLoading = false;
    });
    builder.addCase(fetchTasks.rejected, (state, action) => {
      console.log("Error", action.payload);
      state.isError = true;
      state.isLoading = false;
    });
  },
});

export default apiSlice.reducer;
