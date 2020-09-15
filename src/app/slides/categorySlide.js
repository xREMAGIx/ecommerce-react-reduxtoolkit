import {
  createAsyncThunk,
  createSelector,
  createSlice,
} from "@reduxjs/toolkit";
import axios from "axios";
import { backendUrl } from "../constants";

export const loadCategories = createAsyncThunk(
  "categories/loadCategories",
  async (_, thunkAPI) => {
    try {
      const response = await axios.get(`${backendUrl}/api/categories`);

      return response.json();
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error.message });
    }
  }
);

const categoriesSlice = createSlice({
  name: "categories",
  initialState: {
    item: null,
    items: [],
    loading: false,
    isError: false,
    isSuccess: false,
  },
  reducers: {},
  extraReducers: {
    [loadCategories.pending]: (state) => {
      state.items = [];
      state.loading = true;
      state.isError = false;
      state.isSuccess = false;
    },
    [loadCategories.fulfilled]: (state, action) => {
      state.items = action.payload;
      state.loading = false;
      state.isSuccess = true;
    },

    [loadCategories.rejected]: (state, action) => {
      state.loading = false;
      state.isError = true;
      state.error = action.payload.error;
    },
  },
});

export const selectCategories = createSelector(
  (state) => ({
    categories: state.categories.items,
    error: state.categories.error,
  }),
  (state) => state
);

export default categoriesSlice.reducer;
