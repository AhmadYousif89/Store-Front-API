import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootStateOrAny } from 'react-redux';
import { toast } from 'react-toastify';
import axios from 'axios';

const cart = JSON.parse(localStorage.getItem('cart') as string);

const stripCheckout = createAsyncThunk(
  'cart/checkout',
  async (cartDetail: object, thunkAPI: RootStateOrAny) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      const response = await axios.post(`/api/stripe/checkout`, cartDetail, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (response.data.url) {
        window.location.href = response.data.url;
      }
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
  cart: cart ? cart : [],
  totalQuantity: 0,
  totalAmount: 0,
  isError: false,
  isSuccess: false,
  isLoading: false,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    reset: state => {
      state.cart = [];
      state.totalAmount = 0;
      state.totalQuantity = 0;
      localStorage.removeItem('cart');
    },
    addToCart: (state, action) => {
      const productIndex = state.cart.findIndex(
        (product: { _id: string }) => product._id === action.payload._id,
      );
      if (productIndex < 0) {
        const cartProduct = { ...action.payload, quantity: 1 };
        (state.cart as any[]).push(cartProduct);
        localStorage.setItem('cart', JSON.stringify(state.cart));
        toast.success(`${action.payload.p_name} added to your cart`);
      } else {
        (state.cart[productIndex] as { quantity: number }).quantity += 1;
        localStorage.setItem('cart', JSON.stringify(state.cart));
        toast.info(
          `(${(state.cart[productIndex] as { quantity: number }).quantity}) ${
            action.payload.p_name
          } in your cart`,
        );
      }
    },
    displayCartInfo: state => {
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
      localStorage.setItem('cart', JSON.stringify(state.cart));
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
      localStorage.setItem('cart', JSON.stringify(state.cart));
    },
    removeProduct: (state, action) => {
      const cartList = state.cart.filter(
        (product: { _id: string }) => product._id !== action.payload._id,
      );
      state.cart = cartList;
      toast.error(`${action.payload.p_name} removed from cart`);
      localStorage.setItem('cart', JSON.stringify(state.cart));
    },
    emptyCart: state => {
      state.cart = [];
      localStorage.removeItem('cart');
      toast.success('shopping cart is empty');
    },
  },
  extraReducers: builder => {
    builder
      .addCase(stripCheckout.pending, state => {
        state.isLoading = true;
      })
      .addCase(stripCheckout.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
      })
      .addCase(stripCheckout.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        toast.error(action.payload as string);
      });
  },
});

export const {
  reset,
  addToCart,
  displayCartInfo,
  increment,
  decrement,
  removeProduct,
  emptyCart,
} = cartSlice.actions;

export { stripCheckout };
export default cartSlice.reducer;
