import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../features/users/userSlice";
import orderReducer from "../features/orders/orderSlice";

export const store = configureStore({
  reducer: {
    auth: userReducer,
    orders: orderReducer,
  },
});
