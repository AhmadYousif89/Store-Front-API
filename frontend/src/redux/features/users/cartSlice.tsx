import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootStateOrAny } from "react-redux";
import { toast } from "react-toastify";
import axios from "axios";

const cart = JSON.parse(localStorage.getItem("cart") as string);
const orders = JSON.parse(localStorage.getItem("orders") as string);

const sendCartDetailsToDB = createAsyncThunk(
  "cart/send-to-database",
  async (productDetail: object, thunkAPI: RootStateOrAny) => {
    try {
      const token = thunkAPI.getState().auth.user.jwt;
      const product = await axios.post(
        `/api/user/account/orders/${orders.order_id}/products`,
        productDetail,
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );
      return product.data;
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
  cart: cart ? cart : [],
  totalQuantity: 0,
  totalAmount: 0,
  isError: false,
  isSuccess: false,
  isLoading: false,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const productIndex = state.cart.findIndex(
        (product: { _id: string }) => product._id === action.payload._id,
      );
      if (productIndex < 0) {
        const cartProduct = { ...action.payload, quantity: 1 };
        (state.cart as any[]).push(cartProduct);
        localStorage.setItem("cart", JSON.stringify(state.cart));
        toast.success(`${action.payload.p_name} added to your cart`);
      } else {
        (state.cart[productIndex] as { quantity: number }).quantity += 1;
        localStorage.setItem("cart", JSON.stringify(state.cart));
        toast.info(
          `(${(state.cart[productIndex] as { quantity: number }).quantity}) ${
            action.payload.p_name
          } in your cart`,
        );
      }
    },
    displayCartInfo: (state) => {
      let { subtotal, quantity } = state.cart.reduce(
        (
          cart: { subtotal: number; quantity: number },
          item: { price: number; quantity: number },
        ) => {
          const { price, quantity } = item;
          const itemTotalValue = price * quantity;
          cart.subtotal += itemTotalValue;
          cart.quantity += quantity;
          return cart;
        },
        { subtotal: 0, quantity: 0 },
      );

      state.totalAmount = subtotal;
      state.totalQuantity = quantity;
    },
    increment: (state, action) => {
      const productIndex = state.cart.findIndex(
        (product: { _id: string }) => product._id === action.payload._id,
      );
      (state.cart[productIndex] as { quantity: number }).quantity += 1;
      localStorage.setItem("cart", JSON.stringify(state.cart));
    },
    decrement: (state, action) => {
      const productIndex = state.cart.findIndex(
        (product: { _id: string }) => product._id === action.payload._id,
      );
      if (state.cart[productIndex].quantity > 1) {
        (state.cart[productIndex] as { quantity: number }).quantity -= 1;
      } else if (state.cart[productIndex].quantity === 1) {
        const cartList = state.cart.filter(
          (product: { _id: string }) => product._id !== action.payload._id,
        );
        state.cart = cartList;
        toast.error(`${action.payload.p_name} removed from cart`);
      }
      localStorage.setItem("cart", JSON.stringify(state.cart));
    },
    removeProduct: (state, action) => {
      const cartList = state.cart.filter(
        (product: { _id: string }) => product._id !== action.payload._id,
      );
      state.cart = cartList;
      toast.error(`${action.payload.p_name} removed from cart`);
      localStorage.setItem("cart", JSON.stringify(state.cart));
    },
    emptyCart: (state) => {
      state.cart = [];
      localStorage.removeItem("cart");
      toast.success("shopping cart is empty");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(sendCartDetailsToDB.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(sendCartDetailsToDB.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.cart = action.payload;
        toast.success("product added to cart");
      })
      .addCase(sendCartDetailsToDB.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        toast.error(action.payload as string);
      });
  },
});

export const {
  addToCart,
  displayCartInfo,
  increment,
  decrement,
  removeProduct,
  emptyCart,
} = cartSlice.actions;

export { sendCartDetailsToDB };
export default cartSlice.reducer;
