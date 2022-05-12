import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const API_URL = "/api/products";

const localProducts = JSON.parse(localStorage.getItem("products") as string);

// Show products
const getProducts = createAsyncThunk("products/getAll", async (_, thunkAPI) => {
  try {
    const response = await axios.get(API_URL);
    localStorage.setItem("products", JSON.stringify(response.data));
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
});

// Get one product
const getProduct = createAsyncThunk(
  "products/single-product",
  async (productId: string, thunkAPI) => {
    try {
      const response = await axios.get(API_URL + `/${productId}`);
      localStorage.setItem("single-product", JSON.stringify(response.data));
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
  products: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
};

const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    reset: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getProducts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getProducts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.products = action.payload.data;
      })
      .addCase(getProducts.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
        state.products = localProducts.data;
      })
      .addCase(getProduct.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getProduct.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        (state.products as any[]).push(action.payload);
      })
      .addCase(getProduct.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
        state.products = [];
      });
  },
});

const { reset } = productSlice.actions;

export { reset, getProducts, getProduct };
export default productSlice.reducer;
