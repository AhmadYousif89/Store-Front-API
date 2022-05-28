import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../features/users/userSlice";
import orderReducer from "../features/orders/orderSlice";
import productReducer from "../features/products/productSlice";
import cartReducer from "../features/users/cartSlice";
import themeReducer from "../features/themes/themeSlice";

export const store = configureStore({
  reducer: {
    theme: themeReducer,
    auth: userReducer,
    cart: cartReducer,
    orders: orderReducer,
    products: productReducer,
  },
});
