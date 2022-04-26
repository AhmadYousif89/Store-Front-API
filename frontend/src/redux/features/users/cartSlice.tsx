import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { RootStateOrAny } from "react-redux";
import { toast } from "react-toastify";

const cart = JSON.parse(localStorage.getItem("cart") as string);

// const addToCart = createAsyncThunk(
//   "cart/add-to-cart",
//   async (orderData: object, thunkAPI: RootStateOrAny) => {
//     try {
//       const token = user.jwt;
//       let order_id;
//       const response = await axios.post(
//         `/api/user/account/orders/${order_id}/products`,
//         orderData,
//         {
//           headers: { Authorization: `Bearer ${token}` },
//           data: { order_id },
//         },
//       );
//       return response.data;
//     } catch (err) {
//       const message =
//         ((err as any).response &&
//           (err as any).response.data &&
//           (err as any).response.data.message) ||
//         (err as any).message ||
//         (err as any).toString();
//       return thunkAPI.rejectWithValue(message);
//     }
//   },
// );

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
      // searching and retriving product position in the cart by it's id
      const productIndex = state.cart.findIndex(
        (product: any) => product.p_id === action.payload.p_id,
      );
      // checking if we have the particular product
      if (productIndex < 0) {
        // in this case we don't have the product added to the cart
        // so we push it with new key called (productQuantity) and store our cart state in local storage
        const cartProduct = { ...action.payload, productQuantity: 1 };
        (state.cart as any[]).push(cartProduct);
        localStorage.setItem("cart", JSON.stringify(state.cart));
        toast.success(`${action.payload.p_name} added to your cart`);
      } else {
        // in this case we have a product so we just increase it's quantity value by 1
        (
          state.cart[productIndex] as { productQuantity: number }
        ).productQuantity += 1;
        localStorage.setItem("cart", JSON.stringify(state.cart));
        toast.info(
          `(${
            (state.cart[productIndex] as { productQuantity: number })
              .productQuantity
          }) ${action.payload.p_name} in your cart`,
        );
      }
    },
    reset: () => initialState,
  },
  // extraReducers: (builder) => {
  //   builder
  //     .addCase(addToCart.pending, (state) => {
  //       state.isLoading = true;
  //     })
  //     .addCase(addToCart.fulfilled, (state, action) => {
  //       state.isLoading = false;
  //       state.isSuccess = true;
  //       (state.cart as any[]).push(action.payload);
  //       state.message = action.payload.message;
  //     })
  //     .addCase(addToCart.rejected, (state, action) => {
  //       state.isLoading = false;
  //       state.isError = true;
  //       state.cart = [];
  //       state.message = action.payload as string;
  //     });
  // },
});

const { addToCart, reset } = cartSlice.actions;

export { addToCart, reset };
export default cartSlice.reducer;
