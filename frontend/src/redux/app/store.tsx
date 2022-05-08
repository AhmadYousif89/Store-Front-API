import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../features/users/userSlice";
import orderReducer from "../features/orders/orderSlice";
import productReducer from "../features/products/productSlice";
import cartReducer from "../features/users/cartSlice";

export const store = configureStore({
  reducer: {
    auth: userReducer,
    orders: orderReducer,
    products: productReducer,
    cart: cartReducer,
  },
});
