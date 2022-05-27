import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { RootStateOrAny } from "react-redux";
import { Users } from "../../../types/types";
import axios from "axios";

// Base API URL
const API_URL = "/api/";
// Get user from localStorage
const user = JSON.parse(localStorage.getItem("user") as string);

// Register a user
const register = createAsyncThunk(
  "user/register",
  async (user: Users, thunkAPI) => {
    try {
      const response = await axios.post(API_URL + "register", user);
      if (response.data) {
        localStorage.setItem("user", JSON.stringify(response.data));
      }
      return response.data;
    } catch (err) {
      const message =
        (err as any).response.data.message ||
        (err as any).response.data ||
        (err as any).toString();
      return thunkAPI.rejectWithValue(message);
    }
  },
);

// Login user
const login = createAsyncThunk("user/login", async (user: Users, thunkAPI) => {
  try {
    const response = await axios.post(API_URL + "login", user);
    if (response.data) {
      localStorage.setItem("user", JSON.stringify(response.data));
    }
    return response.data;
  } catch (err) {
    const message =
      (err as any).response.data.message ||
      (err as any).response.data ||
      (err as any).toString();
    return thunkAPI.rejectWithValue(message);
  }
});

// Update user
const update = createAsyncThunk(
  `user/account/update`,
  async (password: string, thunkAPI: RootStateOrAny) => {
    try {
      const token = thunkAPI.getState().auth.user.jwt;
      const response = await axios.put(API_URL + "users/me", password, {
        headers: { Authorization: `Bearer ${token}` },
      });
      localStorage.setItem("user", JSON.stringify(response.data));
      return response.data;
    } catch (err) {
      const message =
        (err as any).response.data.message ||
        (err as any).response.data ||
        (err as any).toString();
      return thunkAPI.rejectWithValue(message);
    }
  },
);

// Delete user
const delUser = createAsyncThunk(
  `user/account/delete`,
  async (_, thunkAPI: RootStateOrAny) => {
    try {
      const token = thunkAPI.getState().auth.user.jwt;
      const response = await axios.delete(API_URL + `users/me`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (response.data) {
        localStorage.removeItem("user");
      }
      return response.data;
    } catch (err) {
      const message =
        (err as any).response.data.message ||
        (err as any).response.data ||
        (err as any).toString();
      return thunkAPI.rejectWithValue(message);
    }
  },
);

// Logout user
const logout = createAsyncThunk(
  "user/logout",
  async (_, thunkAPI: RootStateOrAny) => {
    try {
      localStorage.removeItem("user");
      await axios.post(API_URL + `logout`);
    } catch (err) {
      const message =
        (err as any).response.data.message ||
        (err as any).response.data ||
        (err as any).toString();
      return thunkAPI.rejectWithValue(message);
    }
  },
);

const initialState = {
  user: user ? user : null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    reset: (state) => {
      state.isError = false;
      state.isSuccess = false;
      state.isLoading = false;
      state.message = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(register.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload;
        state.message = "registration success";
      })
      .addCase(register.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.user = null;
        state.message = action.payload as string;
      })
      .addCase(login.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload;
        state.message = "login success";
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.user = null;
        state.message = action.payload as string;
      })
      .addCase(logout.fulfilled, (state) => {
        state.user = null;
        state.isSuccess = true;
      });
  },
});

const { reset } = userSlice.actions;

export { reset, register, login, update, delUser, logout };
export default userSlice.reducer;
