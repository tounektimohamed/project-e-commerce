// Creating store here
// Imports
import { configureStore } from "@reduxjs/toolkit";
import { productReducer } from "./Reducers/productReducer";
import { cartReducer } from "./Reducers/cartReducer";

// Store
const store = configureStore({
  reducer: {
    productReducer,
    cartReducer
  },
});

// Exporting here
export default store;
