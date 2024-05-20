import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";


const initialState = {
  cart: JSON.parse(localStorage.getItem("cart")) || [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    handleCart: (state, action) => {
      if (!Array.isArray(state.cart)) {
        state.cart = [];
      }
      const present = state.cart.find((item) => item.id === action.payload?.id);
      if (present) {
        toast.error("item is in cart");
        const update = state.cart.map((item) =>
          item.id === action.payload.id
            ? { ...item, quantity: item.quantity + 1 } 
            : item
        );
        state.cart = update; 
        localStorage.setItem("cart", JSON.stringify(update));
      } else {
        state.cart.push({ ...action.payload, quantity: 1 });
        localStorage.setItem("cart", JSON.stringify(state.cart));
      }
    },
    handleAdd: (state, action) => {
      const update = state.cart.map((item) =>
        item.id === action.payload.id && item.quantity<item.stock
          ? { ...item, quantity: item.quantity + 1 } 
          : item
      );
      state.cart = update; 
      localStorage.setItem("cart", JSON.stringify(update));
    },
    handleDec: (state, action) => {
      const update = state.cart.map((item) =>
        item.id === action.payload.id && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 } 
          : item
      );
      state.cart = update;
      localStorage.setItem("cart", JSON.stringify(update));
    },
    remove: (state, action) => {
      const update = state.cart.filter((item) => item.id !== action.payload);
      state.cart = update;
      localStorage.setItem("cart", JSON.stringify(update));
    },
    clearAll: (state, action) => {
      localStorage.setItem("cart", JSON.stringify([]));
      state.cart = [];
    },
  },
});

export const { handleCart, handleAdd, handleDec, remove, clearAll } = cartSlice.actions;

export default cartSlice.reducer;
