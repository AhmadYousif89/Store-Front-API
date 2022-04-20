import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { RootStateOrAny } from "react-redux";
import orderService from "./orderServices";

// Get user orders from localStorage
const orders = JSON.parse(localStorage.getItem("orders") as string);
let token;

// Create a order
const createOrder = createAsyncThunk(
  "orders/create",
  async (userId: object, thunkAPI: RootStateOrAny) => {
    try {
      token = thunkAPI.getState().auth.user.jwt.token;
      return await orderService.createOrder(userId, token);
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
const getOrders = createAsyncThunk(
  "orders/getAll",
  async (userId: string, thunkAPI: RootStateOrAny) => {
    try {
      token = thunkAPI.getState().auth.user.jwt.token;
      return await orderService.getUserOrders(userId, token);
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
      token = thunkAPI.getState().auth.user.jwt.token;
      return await orderService.updateOrder(orderId, token);
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
      token = thunkAPI.getState().auth.user.jwt.token;
      return await orderService.delOrder(orderId, token);
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

// Remove user orders
const removeOrders = createAsyncThunk("orders/remove", () => {
  orderService.removeOrders();
});

const initialState = {
  orders: orders ? orders : [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

const orderSlice = createSlice({
  name: "order",
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
      .addCase(getOrders.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getOrders.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.orders = action.payload.data;
        state.message = action.payload.message;
      })
      .addCase(getOrders.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.orders = [];
        state.message = action.payload as string;
      })
      .addCase(removeOrders.fulfilled, (state) => {
        state.orders = [];
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
        state.message = action.payload as string;
      })
      // .addCase(updateOrder.pending, (state) => {
      //   state.isLoading = true;
      // })
      // .addCase(updateOrder.fulfilled, (state, action) => {
      //   state.isLoading = false;
      //   state.isSuccess = true;
      //   state.orders = action.payload;
      //   state.message = action.payload.message as string;
      // })
      // .addCase(updateOrder.rejected, (state, action) => {
      //   state.isLoading = false;
      //   state.isError = true;
      //   state.message = action.payload as string;
      // })
      .addCase(delOrder.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(delOrder.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.orders = action.payload;
        state.message = action.payload.message as string;
      })
      .addCase(delOrder.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload as string;
      });
  },
});

const { reset } = orderSlice.actions;

export { reset, getOrders, createOrder, updateOrder, delOrder, removeOrders };
export default orderSlice.reducer;
