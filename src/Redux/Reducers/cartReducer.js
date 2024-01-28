// Imports
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  addDoc,
  collection,
  getDocs,
  doc,
  deleteDoc,
  updateDoc,
  getDoc,
} from "firebase/firestore";
import { db } from "../../Config.js/firebaseConfig";
import { toast } from "react-toastify";

// Async Thunks

// Fetch cart items
export const fetchCartItemsAsync = createAsyncThunk("Cart/fetch", async () => {
  const querySnapshot = await getDocs(collection(db, "cart"));
  const cartItems = querySnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
  return cartItems;
});

// Add to cart
export const addToCartAsync = createAsyncThunk(
  "Cart/add",
  async (product, { getState, dispatch }) => {
    try {
      // First fetching all cart items
      dispatch(fetchCartItemsAsync());

      // Getting stateto get cart Items
      const state = getState();
      const { cartItems } = state.cartReducer;

      //   Finding index if item is already there
      const existingItemIndex = cartItems.findIndex(
        (item) => item.product.id === product.id
      );

      //   If existing item
      if (existingItemIndex !== -1) {
        const existingItem = cartItems[existingItemIndex];
        const updatedQty = existingItem.qty + 1;
        const itemRef = doc(collection(db, "cart"), existingItem.id);

        // Updating item quantity in the database
        await updateDoc(itemRef, {
          qty: updatedQty,
        });
        toast.success("Quantity Increased!");
      } else {
        // If the item is not in the cart, add a new entry
        await addDoc(collection(db, "cart"), {
          product,
          qty: 1,
        });
        toast.success("Item Added To Cart Successfully!");
      }
    } catch (error) {
      return Promise.reject(error);
    }
  }
);

// Remove cart
export const removeCartItemAsync = createAsyncThunk(
  "Cart/remove",
  async (id, { getState }) => {
    try {
      const cartDocRef = doc(db, "cart", id);
      await deleteDoc(cartDocRef);
    } catch (error) {
      return Promise.reject(error);
    }
  }
);

// Increase quantity
export const increaseQuantityAsync = createAsyncThunk(
  "Cart/increaseQuantity",
  async (id) => {
    try {
      const docRef = doc(db, "cart", id);
      const itemDoc = await getDoc(docRef);
      // Updating qty
      const currentQty = itemDoc.data().qty;
      await updateDoc(docRef, {
        qty: currentQty + 1,
      });
    } catch (error) {
      return Promise.reject(error);
    }
  }
);

// Decrease Quantity
export const decreaseQuantityAsync = createAsyncThunk(
  "Cart/decreaseQuantity",
  async (id, { dispatch }) => {
    try {
      const docRef = doc(db, "cart", id);
      const itemDoc = await getDoc(docRef);
      // Updating qty
      const currentQty = itemDoc.data().qty;
      if (currentQty <= 1) {
        dispatch(removeCartItemAsync(id));
      } else {
        await updateDoc(docRef, {
          qty: currentQty - 1,
        });
        toast.success("Quantity Decreased Successfully!");
      }
    } catch (error) {
      return Promise.reject(error);
    }
  }
);

// State
const INITIAL_STATE = {
  cartItems: [],
  cartLoading: true,
  cartItem: null,
};

// Slice
const cartSlice = createSlice({
  name: "Cart",
  initialState: INITIAL_STATE,
  // Reducers
  reducers: {
    // Checking is item already in cart or not here
    isItemInCart: (state, action) => {
      const cartItem = state.cartItems.find(
        (item) => item.product.id === action.payload
      );
      if (cartItem) {
        state.cartItem = cartItem;
      }
    },
  },

  // Extra Reducers
  extraReducers: (builder) => {
    // Add items rejected
    builder.addCase(addToCartAsync.rejected, (state, action) => {
      toast.error("Failed To Add To Cart!");
      console.log(action.error.message);
    });

    // Fetch cart items fulfilled
    builder.addCase(fetchCartItemsAsync.fulfilled, (state, action) => {
      state.cartItems = action.payload;
      state.cartLoading = false;
    });

    // Remove cart item fulfilled
    builder.addCase(removeCartItemAsync.fulfilled, (state, action) => {
      toast.success("Item Removed From Cart Successfully!");
    });

    // Remove cart item rejected
    builder.addCase(removeCartItemAsync.rejected, (state, action) => {
      toast.error("Failed To Remove Item From Cart!");
      console.log(action.error.message);
    });

    // Increase quantity fulfilled
    builder.addCase(increaseQuantityAsync.fulfilled, (state, action) => {
      toast.success("Quantity Increased Successfully!");
    });

    // Increase quantity rejected
    builder.addCase(increaseQuantityAsync.rejected, (state, action) => {
      toast.error("Failed To Increase Quantity!");
      console.log(action.error.message);
    });

    // Decrease quantity rejected
    builder.addCase(decreaseQuantityAsync.rejected, (state, action) => {
      toast.error("Failed To Decrease Quantity!");
      console.log(action.error.message);
    });
  },
});

// Extracting reducer
export const cartReducer = cartSlice.reducer;

// Extracting actions
export const { isItemInCart } = cartSlice.actions;

// Extracting state
export const cartState = (state) => state.cartReducer;
