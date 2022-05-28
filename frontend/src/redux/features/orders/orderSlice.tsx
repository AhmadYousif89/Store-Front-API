import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { RootStateOrAny } from "react-redux";
import axios from "axios";

const API_URL = "/api/user/account/orders";

// Create a order
const createOrder = createAsyncThunk(
  "orders/create",
  async (_, thunkAPI: RootStateOrAny) => {
    try {
      const token = thunkAPI.getState().auth.user.jwt;
      const response = await axios.post(API_URL, null, {
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

// Get all orders
const getUserOrders = createAsyncThunk(
  "orders/getAll",
  async (_, thunkAPI: RootStateOrAny) => {
    try {
      const token = thunkAPI.getState().auth.user.jwt;
      const response = await axios.get(API_URL, {
        headers: { Authorization: `Bearer ${token}` },
      });
      localStorage.setItem("orders", JSON.stringify(response.data));
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

// Update order
const updateOrder = createAsyncThunk(
  "orders/update",
  async (orderId: string, thunkAPI: RootStateOrAny) => {
    try {
      const token = thunkAPI.getState().auth.user.jwt;
      const response = await axios.put(`${API_URL}/${orderId}`, {
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

// Delete order
const deleteAllOrder = createAsyncThunk(
  "orders/delete",
  async (_, thunkAPI: RootStateOrAny) => {
    try {
      const token = thunkAPI.getState().auth.user.jwt;
      const response = await axios.delete(API_URL, {
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

const initialState = {
  orders: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
};

const orderSlice = createSlice({
  name: "order",
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
      .addCase(getUserOrders.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getUserOrders.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.orders = action.payload;
      })
      .addCase(getUserOrders.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
        state.orders = [];
      });
    builder
      .addCase(createOrder.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        (state.orders as object[]).push(action.payload);
        localStorage.setItem("orders", JSON.stringify(state.orders));
      })
      .addCase(createOrder.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
        state.orders = [];
      });
    builder
      .addCase(deleteAllOrder.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteAllOrder.fulfilled, (state) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.orders = [];
        localStorage.setItem("orders", JSON.stringify(state.orders));
      })
      .addCase(deleteAllOrder.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
      });
  },
});

export const { reset } = orderSlice.actions;

export { deleteAllOrder, getUserOrders, createOrder, updateOrder };
export default orderSlice.reducer;
