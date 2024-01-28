// Creating slice for the products reducer here.
// Imports
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

// Async Thunks
// Fetch data
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

// Add Product
export const addProductAsync = createAsyncThunk(
  "products/add",
  async ({ product }) => {
    try {
      const response = await fetch("https://dummyjson.com/products/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: product.title,
          description: product.description,
          price: product.price,
          rating: product.rating,
          thumbnail: product.thumbnail,
          category: product.category,
          brand: product.brand
        }),
      });

      let newProduct;
      if (response.ok) {
        newProduct = await response.json();
      } else {
        throw new Error("Failed To Add Product!");
      }
      return newProduct;
    } catch (error) {
      return Promise.reject(error);
    }
  }
);

// Delete product
export const deleteProductAsync = createAsyncThunk(
  "products/delete",
  async (id, thunkAPI) => {
    try {
      const response = await fetch(`https://dummyjson.com/products/${id}`, {
        method: "DELETE",
      });
      let updatedProducts;
      const currentState = thunkAPI.getState();
      const products = currentState.productReducer.products;
      if (response.ok) {
        updatedProducts = products.filter((product) => product.id !== id);
      }
      return updatedProducts;
    } catch (error) {
      return Promise.reject(error);
    }
  }
);

// Update product
export const updateProductAsync = createAsyncThunk(
  "products/update",
  async ({ id, updatedProduct }) => {
    try {
      const response = await fetch(`https://dummyjson.com/products/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: updatedProduct.title,
          description: updatedProduct.description,
          price: updatedProduct.price,
          rating: updatedProduct.rating,
        }),
      });
      if (!response.ok) {
        throw new Error("Failed To Update Product!");
      }
      const Product = await response.json();
      return Product;
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
  formVisible: false,
  update: false,
  productToUpdate: {},
  selectedProduct: {},
  productLoading: true,
};

// Slice
const productSlice = createSlice({
  name: "Products",
  initialState: INITIAL_STATE,

  // Reducers
  reducers: {
    // Toggling sortPrice 
    sortProducts: (state, action) => {
      state.sortPrice = !state.sortPrice;
    },
    // Toggling form visible
    formToggle: (state, action) => {
      state.formVisible = !state.formVisible;
      if (state.update) {
        state.update = false;
      }
    },
    // Closing form by setting form visible to false
    formClose: (state, action) => {
      state.formVisible = false;
      if (state.update) {
        state.update = false;
      }
    },
    // Setting update to true so the form visible  open to update item with item details
    setUpdate: (state, action) => {
      state.formVisible = !state.formVisible;
      state.update = true;
      state.productToUpdate = action.payload;
    },
    // Fetching product by it's id here
    fetchProductById: (state, action) => {
      const productId = action.payload;  // Assuming action.payload is the product ID
      state.selectedProduct = state.products.find((product) => product.id.toString() === productId.toString());
      state.productLoading = false;
    },
  },

  // Extra Reducers
  extraReducers: (builder) => {
    // Fetch Success
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

    // Fetch Rejected
    builder.addCase(fetchProductsAsync.rejected, (state, action) => {
      // Showing notification
      toast.error("Something Went Wrong!");
      console.log(action.error.message);
    });

    // Add Success
    builder.addCase(addProductAsync.fulfilled, (state, action) => {
      state.products = [action.payload, ...state.products];
      toast.success("Product Added Successfully!");
      // Sorting products by price after deleting the product
      const sortedProducts = [...state.products].sort(
        (a, b) => parseFloat(a.price) - parseFloat(b.price)
      );
      state.sortedProducts = sortedProducts;
      state.formVisible = false;
    });

    // Add Rejected
    builder.addCase(addProductAsync.rejected, (state, action) => {
      toast.error("Failed To Add Product!");
      console.log(action.error.message || action.payload);
    });

    // Delete Success
    builder.addCase(deleteProductAsync.fulfilled, (state, action) => {
      // Adding data to the state
      state.products = action.payload;
      toast.success("Product Removed Successfully!");
      // Sorting products by price after deleting the product
      const sortedProducts = [...state.products].sort(
        (a, b) => parseFloat(a.price) - parseFloat(b.price)
      );
      state.sortedProducts = sortedProducts;
    });

    // Delete Rejected
    builder.addCase(deleteProductAsync.rejected, (state, action) => {
      toast.error("Error While Removing The Product!");
      console.log(action.error.message);
    });

    // Update Success
    builder.addCase(updateProductAsync.fulfilled, (state, action) => {
      state.products = state.products.map((product) =>
        product.id === state.productToUpdate.id ? action.payload : product
      );

      state.formVisible = false;
      toast.success("Product Updated Successfully!");

      // Sorting products by price after updating the product
      const sortedProducts = [...state.products].sort(
        (a, b) => parseFloat(a.price) - parseFloat(b.price)
      );
      state.sortedProducts = sortedProducts;
    });

    // Update Rejected
    builder.addCase(updateProductAsync.rejected, (state, action) => {
      state.formVisible = false;
      toast.error("Failed To Update Product!");
      console.log(action.error.message || action.payload);
    });
  },
});

// Extracting reducer
export const productReducer = productSlice.reducer;

// Extracting Actions
export const {
  sortProducts,
  formToggle,
  setUpdate,
  formClose,
  fetchProductById,
} = productSlice.actions;

// Extracting state
export const productsState = (state) => state.productReducer;
