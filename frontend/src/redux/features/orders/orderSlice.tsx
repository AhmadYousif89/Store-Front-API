import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { RootStateOrAny } from "react-redux";
import axios from "axios";

const API_URL = "/api/user/account/orders";

// Get all orders
const getUserOrders = createAsyncThunk(
  "orders/getAll",
  async (_, thunkAPI: RootStateOrAny) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
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
  },
});

export const { reset } = orderSlice.actions;

export { getUserOrders };
export default orderSlice.reducer;
