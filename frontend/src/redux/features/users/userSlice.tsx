import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { RootStateOrAny } from "react-redux";
import { Users } from "../../../types/types";
import { toast } from "react-toastify";
import axios from "axios";

const API_URL = "/api";
// Get user from localStorage
const user = JSON.parse(localStorage.getItem("user") as string);

// Register a user
const register = createAsyncThunk(
  "user/register",
  async (user: Users, thunkAPI) => {
    try {
      const response = await axios.post(`${API_URL}/auth/register`, user);
      response.data &&
        localStorage.setItem("user", JSON.stringify(response.data));
      return response.data;
    } catch (err) {
      const message =
        (err as any).response.data.message ||
        (err as any).response.data ||
        (err as any).response;
      return thunkAPI.rejectWithValue(message);
    }
  },
);

// Login user
const login = createAsyncThunk("user/login", async (user: Users, thunkAPI) => {
  try {
    const response = await axios.post(`${API_URL}/auth/login`, user);
    response.data &&
      localStorage.setItem("user", JSON.stringify(response.data));
    return response.data;
  } catch (err) {
    const message =
      (err as any).response.data.message ||
      (err as any).response.data ||
      (err as any).response;
    return thunkAPI.rejectWithValue(message);
  }
});

// Logout user
const logout = createAsyncThunk(
  "user/logout",
  async (_, thunkAPI: RootStateOrAny) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      const response = await axios.delete(`${API_URL}/auth/logout`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data;
    } catch (err) {
      const message =
        (err as any).response.data.message ||
        (err as any).response.data ||
        (err as any).response;
      return thunkAPI.rejectWithValue(message);
    }
  },
);

// Update user
const update = createAsyncThunk(
  `user/account/update-password`,
  async (password: object, thunkAPI: RootStateOrAny) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      const response = await axios.put(`${API_URL}/users/me`, password, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data;
    } catch (err) {
      const message =
        (err as any).response.data.message ||
        (err as any).response.data ||
        (err as any).response;
      return thunkAPI.rejectWithValue(message);
    }
  },
);

// Delete user
const delUser = createAsyncThunk(
  `user/account/delete`,
  async (_, thunkAPI: RootStateOrAny) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      const response = await axios.delete(`${API_URL}/users/me`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      response.data && localStorage.removeItem("user");
      return response.data;
    } catch (err) {
      const message =
        (err as any).response.data.message ||
        (err as any).response.data ||
        (err as any).response;
      return thunkAPI.rejectWithValue(message);
    }
  },
);

const initialState = {
  user: user ? user : null,
  isError: false,
  isSuccess: false,
  isLoading: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    reset: (state) => {
      state.isError = false;
      state.isSuccess = false;
      state.isLoading = false;
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
        toast.success("Registration success", { position: "top-center" });
      })
      .addCase(register.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.user = null;
        toast.error(action.payload as string);
      });
    builder
      .addCase(login.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload;
        toast.success("Login success", { position: "top-center" });
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.user = null;
        toast.error(action.payload as string);
      });
    builder
      .addCase(logout.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(logout.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = null;
        localStorage.removeItem("user");
        toast.info(action.payload, { position: "top-center" });
      });
    builder
      .addCase(update.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(update.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = null;
        localStorage.removeItem("user");
        toast.success(
          `
          ${action.payload.message}
           please re-login with your new password`,
          {
            position: "top-center",
          },
        );
      })
      .addCase(update.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        toast.error(action.payload as string);
      });
  },
});

export const { reset } = userSlice.actions;

export { register, login, update, delUser, logout };
export default userSlice.reducer;
