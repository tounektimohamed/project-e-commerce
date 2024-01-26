// Creating store here
// Imports
import { configureStore } from "@reduxjs/toolkit";
import { productReducer } from "./Reducers/productReducer";

// Store
const store = configureStore({
  reducer: {
    productReducer,
  },
});

// Exporting here
export default store;
