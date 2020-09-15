import {
  createAsyncThunk,
  createSelector,
  createSlice,
} from "@reduxjs/toolkit";
import axios from "axios";

import { backendUrl } from "../constants";

export const loadUsers = createAsyncThunk(
  "users/loadUsers",
  async (_, thunkAPI) => {
    try {
      const response = await axios.get(`${backendUrl}/api/users`);

      return response.json();
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error.message });
    }
  }
);

const usersSlice = createSlice({
  name: "users",
  initialState: {
    item: null,
    items: [],
    loading: false,
    isError: false,
    isSuccess: false,
  },
  reducers: {},
  extraReducers: {
    [loadUsers.pending]: (state) => {
      state.items = [];
      state.loading = true;
      state.isError = false;
      state.isSuccess = false;
    },
    [loadUsers.fulfilled]: (state, action) => {
      state.items = action.payload;
      state.loading = false;
      state.isSuccess = true;
    },

    [loadUsers.rejected]: (state, action) => {
      state.loading = false;
      state.isError = true;
      state.error = action.payload.error;
    },
  },
});

export const selectUsers = createSelector(
  (state) => ({
    users: state.users.items,
    error: state.users.error,
  }),
  (state) => state
);

export default usersSlice.reducer;
