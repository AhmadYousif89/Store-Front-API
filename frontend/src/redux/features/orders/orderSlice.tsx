import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { RootStateOrAny } from "react-redux";
import axios from "axios";

const API_URL = "/api/user/account/orders/";

// Create a order
const createOrder = createAsyncThunk(
  "orders/create",
  async (userId: object, thunkAPI: RootStateOrAny) => {
    try {
      const token = thunkAPI.getState().auth.user.jwt.token;
      const response = await axios.post(API_URL, userId, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data;
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

// Get all orders
const getUserOrders = createAsyncThunk(
  "orders/getAll",
  async (userId: string, thunkAPI: RootStateOrAny) => {
    try {
      const token = thunkAPI.getState().auth.user.jwt.token;
      const response = await axios.get(`/api/user/${userId}/account/orders`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data;
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

// Update order
const updateOrder = createAsyncThunk(
  "orders/update",
  async (orderId: number, thunkAPI: RootStateOrAny) => {
    try {
      const token = thunkAPI.getState().auth.user.jwt.token;
      const response = await axios.put(API_URL, {
        headers: { Authorization: `Bearer ${token}` },
        data: { orderId },
      });
      return response.data;
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

// Delete order
const delOrder = createAsyncThunk(
  "orders/delete",
  async (orderId: number, thunkAPI: RootStateOrAny) => {
    try {
      const token = thunkAPI.getState().auth.user.jwt.token;
      const response = await axios.delete(API_URL + orderId, {
        headers: { Authorization: `Bearer ${token}` },
        data: orderId,
      });
      return response.data;
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

const initialState = {
  orders: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    reset: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUserOrders.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getUserOrders.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.orders = action.payload.data;
        state.message = action.payload.message;
      })
      .addCase(getUserOrders.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.orders = [];
        state.message = action.payload as string;
      })

      .addCase(createOrder.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.orders = action.payload;
        state.message = action.payload.message as string;
      })
      .addCase(createOrder.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.orders = [];
        state.message = action.payload as string;
      })
      .addCase(delOrder.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(delOrder.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.orders = action.payload;
        state.message = action.payload.message;
      })
      .addCase(delOrder.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.orders = [];
        state.message = action.payload as string;
      });
  },
});

const { reset } = orderSlice.actions;

export { reset, getUserOrders, createOrder, updateOrder, delOrder };
export default orderSlice.reducer;
