import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { RootStateOrAny } from "react-redux";
import { toast } from "react-toastify";

const cart = JSON.parse(localStorage.getItem("cart") as string);
const user = JSON.parse(localStorage.getItem("user") as string);
const orders = JSON.parse(localStorage.getItem("orders") as string);

const sendCartDetailsToDB = createAsyncThunk(
  "cart/send-to-database",
  async (productDetail: object, thunkAPI: RootStateOrAny) => {
    try {
      const token = user.jwt;
      const response = await axios.post(
        `/api/user/account/orders/${orders.order_id}/products`,
        productDetail,
        {
          headers: { Authorization: `Bearer ${token}` },
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
  cart: cart ? cart : [],
  totalQuantity: 0,
  totalAmount: 0,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const productIndex = state.cart.findIndex(
        (product: { p_id: string }) => product.p_id === action.payload.p_id,
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
      let { total, quantity } = state.cart.reduce(
        (
          item: { price: number; quantity: number },
          cartItem: { total: number; quantity: number },
        ) => {
          const itemTotalValue = item.price * item.quantity; // 500 * 2 = 1000
          cartItem.total += itemTotalValue; // 0 + 1000 , 1 + 1000 ...
          cartItem.quantity += quantity; // 0 + 1 , 1 + 2  ...

          return cartItem;
        },
        { total: 0, quantity: 0 },
      );
      state.totalAmount = total;
      state.totalQuantity = quantity;
    },
    increment: (state, action) => {
      const productIndex = state.cart.findIndex(
        (product: { p_id: string }) => product.p_id === action.payload.p_id,
      );
      (state.cart[productIndex] as { quantity: number }).quantity += 1;
      localStorage.setItem("cart", JSON.stringify(state.cart));
    },
    decrement: (state, action) => {
      const productIndex = state.cart.findIndex(
        (product: { p_id: string }) => product.p_id === action.payload.p_id,
      );
      if (state.cart[productIndex].quantity > 1) {
        (state.cart[productIndex] as { quantity: number }).quantity -= 1;
      } else if (state.cart[productIndex].quantity === 1) {
        const cartList = state.cart.filter(
          (product: { p_id: string }) => product.p_id !== action.payload.p_id,
        );
        state.cart = cartList;
        toast.error(`${action.payload.p_name} removed from cart`);
      }
      localStorage.setItem("cart", JSON.stringify(state.cart));
    },
    removeProduct: (state, action) => {
      const cartList = state.cart.filter(
        (product: { p_id: string }) => product.p_id !== action.payload.p_id,
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
      })
      .addCase(sendCartDetailsToDB.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload as string;
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
