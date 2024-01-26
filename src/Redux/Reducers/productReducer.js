// Creating slice for the products reducer here.
// Imports

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

// Async Thunks
export const fetchProductsAsync = createAsyncThunk(
  "products/fetch",
  async () => {
    try {
      const response = await fetch("https://dummyjson.com/products");
      const products = await response.json();
      return products.products;
    } catch (error) {
      return Promise.reject(error);
    }
  }
);

// State
const INITIAL_STATE = {
  products: [],
  sortedProducts: [],
  productsLoading: true,
  sortPrice: false,
};

// Slice
const productSlice = createSlice({
  name: "Products",
  initialState: INITIAL_STATE,
  reducers: {
    sortProducts: (state, action) => {
      state.sortPrice = !state.sortPrice;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchProductsAsync.fulfilled, (state, action) => {
      // Adding data to the state
      state.products = action.payload;
      state.productsLoading = false;
      // Sorting products by price
      const sortedProducts = [...state.products].sort(
        (a, b) => parseFloat(a.price) - parseFloat(b.price)
      );
      state.sortedProducts = sortedProducts;
    });
    builder.addCase(fetchProductsAsync.rejected, (state, action) => {
      // Showing notification
      toast.error("Something Went Wrong!");
      console.log(action.error.message);
    });
  },
});

// Extracting reducer
export const productReducer = productSlice.reducer;

// Extracting Actions
export const { sortProducts } = productSlice.actions;

// Extracting state
export const productsState = (state) => state.productReducer;
