import {
  createAsyncThunk,
  createSelector,
  createSlice,
} from "@reduxjs/toolkit";
import axios from "axios";

import { backendUrl } from "../constants";

export const login = createAsyncThunk(
  "account/login",
  async (formData, thunkAPI) => {
    try {
      const requestConfig = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const body = JSON.stringify(formData);
      const response = await axios.post(
        `${backendUrl}/api/account/login`,
        body,
        requestConfig
      );

      console.log(parseJwt(response.data.token));
      return response.data;
    } catch (error) {
      console.log(error);
      if (error.response.status === 404)
        return thunkAPI.rejectWithValue({
          error: { ServerError: "API Not Found" },
        });
      return thunkAPI.rejectWithValue({ error: error.response.data });
    }
  }
);

export const register = createAsyncThunk(
  "account/register",
  async (formData, thunkAPI) => {
    console.log(formData);
    try {
      const requestConfig = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const body = JSON.stringify(formData);
      const response = await axios.post(
        `${backendUrl}/api/account/register`,
        body,
        requestConfig
      );

      return response.data();
    } catch (error) {
      console.log(error.response.data);
      return thunkAPI.rejectWithValue({ error: error.response.data });
    }
  }
);

const accountSlice = createSlice({
  name: "account",
  initialState: {
    token: null,
    isAuthenticated: false,
    loading: false,
    isError: false,
    isSuccess: false,
  },
  reducers: {},
  extraReducers: {
    //Login
    [login.pending]: (state) => {
      state.token = null;
      state.isAuthenticated = false;
      state.loading = true;
      state.isError = false;
      state.isSuccess = false;
    },
    [login.fulfilled]: (state, action) => {
      state.token = action.payload.token;
      state.accountName = parseJwt(action.payload.token).unique_name;
      state.staff = parseJwt(action.payload.token).Staff;
      state.superUser = parseJwt(action.payload.token).SuperUser;

      state.isAuthenticated = true;
      state.loading = false;
      state.isSuccess = true;
    },

    [login.rejected]: (state, action) => {
      state.loading = false;
      state.isError = true;
      // state.error = action.payload.error;
    },
    //Register
    [register.pending]: (state) => {
      state.token = null;
      state.isAuthenticated = false;
      state.loading = true;
      state.isError = false;
      state.isSuccess = false;
    },
    [register.fulfilled]: (state, action) => {
      state.token = action.payload;
      state.isAuthenticated = true;
      state.loading = false;
      state.isSuccess = true;
    },

    [register.rejected]: (state, action) => {
      state.loading = false;
      state.isError = true;
      state.error = action.payload.error;
    },
  },
});

export const selectAccount = createSelector(
  (state) => ({
    loading: state.account.loading,
    token: state.account.token,
    accountName: state.account.accountName,
    staff: state.account.staff,
    superUser: state.account.superUser,
    error: state.account.error,
    isError: state.account.isError,
    isSuccess: state.account.isSuccess,
  }),
  (state) => state
);

export default accountSlice.reducer;

function parseJwt(token) {
  var base64Url = token.split(".")[1];
  var base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
  var jsonPayload = decodeURIComponent(
    atob(base64)
      .split("")
      .map(function (c) {
        return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
      })
      .join("")
  );

  return JSON.parse(jsonPayload);
}
