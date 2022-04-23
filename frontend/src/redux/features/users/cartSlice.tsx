import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { RootStateOrAny } from "react-redux";

const user = JSON.parse(localStorage.getItem("user") as string);

const addToCart = createAsyncThunk(
  "cart/add-to-cart",
  async (orderData: object, thunkAPI: RootStateOrAny) => {
    try {
      const token = user.jwt.token;
      let order_id;
      const response = await axios.post(
        `/api/user/account/orders/${order_id}/products`,
        orderData,
        {
          headers: { Authorization: `Bearer ${token}` },
          data: { order_id },
        },
      );
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
  cart: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    reset: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(addToCart.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addToCart.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        (state.cart as any[]).push(action.payload);
        state.message = action.payload.message;
      })
      .addCase(addToCart.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.cart = [];
        state.message = action.payload as string;
      });
  },
});

const { reset } = cartSlice.actions;

export { addToCart, reset };
export default cartSlice.reducer;
