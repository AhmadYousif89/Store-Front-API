import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { RootStateOrAny } from "react-redux";
import { toast } from "react-toastify";
import { Products } from "../../../types/types";
const API_URL = "/api/products";

const localProducts = JSON.parse(localStorage.getItem("products") as string);
const localProduct = JSON.parse(
  localStorage.getItem("single-product") as string,
);

// Show products
const getAllProducts = createAsyncThunk(
  "products/getAll",
  async (_, thunkAPI) => {
    try {
      const response = await axios.get(API_URL);
      response.data &&
        localStorage.setItem("products", JSON.stringify(response.data));
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

// Get one product
const getProduct = createAsyncThunk(
  "products/single-product",
  async (productId: string, thunkAPI) => {
    try {
      const response = await axios.get(API_URL + `/${productId}`);
      response.data &&
        localStorage.setItem("single-product", JSON.stringify(response.data));
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

// Create product
const createProduct = createAsyncThunk(
  "products/create-product",
  async (product: Products, thunkAPI: RootStateOrAny) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      const response = await axios.post(API_URL, product, {
        headers: { Authorization: `Bearer ${token}` },
      });
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
  products: [] as unknown as [Products],
  createdProduct: null,
  filtered: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
};

const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    reset: () => initialState,
    searchByName: (state, action) => {
      state.filtered = state.products.filter((product) =>
        product.name?.toLowerCase().includes(action.payload),
      ) as [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllProducts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllProducts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.products = action.payload;
      })
      .addCase(getAllProducts.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
        state.products = localProducts;
      });
    builder
      .addCase(getProduct.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getProduct.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.products = [action.payload];
      })
      .addCase(getProduct.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
        state.products = [localProduct];
      });
    builder
      .addCase(createProduct.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createProduct.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.createdProduct = action.payload;
        toast.success("Product created");
      })
      .addCase(createProduct.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.createdProduct = null;
        toast.error(action.payload as string);
      });
  },
});

export const { reset, searchByName } = productSlice.actions;

export { getAllProducts, getProduct, createProduct };
export default productSlice.reducer;
