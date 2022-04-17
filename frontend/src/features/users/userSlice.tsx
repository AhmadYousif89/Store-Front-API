import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { RootStateOrAny } from "react-redux";
import userService from "./userServices";

// Get user from localStorage
const user = JSON.parse(localStorage.getItem("user") as string);
let token = "";

// Register a user
const register = createAsyncThunk(
  "user/register",
  async (user: object, thunkAPI) => {
    try {
      return await userService.registration(user);
    } catch (err) {
      const message =
        ((err as any).response &&
          (err as any).response.data &&
          (err as any).response.data.message) ||
        (err as any).message ||
        (err as any).toString();
      return thunkAPI.rejectWithValue(message);
    }
  },
);

// Login user
const login = createAsyncThunk("user/login", async (user: object, thunkAPI) => {
  try {
    return await userService.login(user);
  } catch (err) {
    const message =
      ((err as any).response &&
        (err as any).response.data &&
        (err as any).response.data.message) ||
      (err as any).message ||
      (err as any).toString();
    return thunkAPI.rejectWithValue(message);
  }
});

// Update user
const update = createAsyncThunk(
  `user/update`,
  async (user: string, thunkAPI: RootStateOrAny) => {
    try {
      token = thunkAPI.getState().auth.user.jwt.token;
      return await userService.updateUser(user, token);
    } catch (err) {
      const message =
        ((err as any).response &&
          (err as any).response.data &&
          (err as any).response.data.message) ||
        (err as any).message ||
        (err as any).toString();
      return thunkAPI.rejectWithValue(message);
    }
  },
);

// Delete user
const delUser = createAsyncThunk(
  `user/delete`,
  async (user: string, thunkAPI: RootStateOrAny) => {
    try {
      token = thunkAPI.getState().auth.user.jwt.token;
      return await userService.delUser(user, token);
    } catch (err) {
      const message =
        ((err as any).response &&
          (err as any).response.data &&
          (err as any).response.data.message) ||
        (err as any).message ||
        (err as any).toString();
      return thunkAPI.rejectWithValue(message);
    }
  },
);

// Logout user
const logout = createAsyncThunk("user/logout", () => {
  userService.logout();
});

// Setting user's initial state, The initial state that should be used when the reducer is called the first time
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
        state.message = action.payload.message;
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
        state.message = action.payload.message;
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.user = null;
        state.message = action.payload as string;
      })
      .addCase(logout.fulfilled, (state) => {
        state.user = null;
      });
  },
});

const { reset } = userSlice.actions;

export { reset, register, login, update, delUser, logout };
export default userSlice.reducer;
