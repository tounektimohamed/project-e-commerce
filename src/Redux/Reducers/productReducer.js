// Creating slice for the products reducer here.
// Imports

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

// Async Thunks
export const fetchProductsAsync = createAsyncThunk(
  "products/fetch",
  async ({ dispatch }) => {
    try {
      const response = await fetch("https://dummyjson.com/products");
      const products = await response.json();
      return products;
    } catch (error) {
      console.log(error);
    }
  }
);

// State
const INITIAL_STATE = {
  products: [],
  productsLoading: true,
};

// Slice
const productSlice = createSlice({
  name: "Products",
  initialState: INITIAL_STATE,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchProductsAsync.fulfilled, (state, action) => {
      // Adding data to the state
      state.products = action.payload;
      state.productsLoading = false;
    });
    builder.addCase(fetchProductsAsync.rejected, (state, action) => {
      // Showing notification
      toast.error("Something Went Wrong!");
    });
  },
});

// Extracting reducer
export const productReducer = productSlice.reducer;

// Extracting Actions

// Extracting state
export const productsState = (state) => state.productReducer;
