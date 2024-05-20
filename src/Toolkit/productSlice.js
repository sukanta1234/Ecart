import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
export const STATUS = Object.freeze({
  IDLE: "idle",
  LOADING: "loading",
});
export const productApi = createAsyncThunk(
  "https://dummyjson.com/products",
  async () => {
    let response = await axios.get("https://dummyjson.com/products?limit=10");
    return response.data.products;
  }
);
export const categoryApi = createAsyncThunk(
  "https://dummyjson.com/products/categories",
  async () => {
    let response = await axios.get("https://dummyjson.com/products/categories");
    return response.data;
  }
);
export const categoryWiseApi = createAsyncThunk(
  "https://dummyjson.com/products/category",
  async (item) => {
    let response = await axios.get(
      `https://dummyjson.com/products/category/${item}`
    );
    return response.data.products;
  }
);
export const searchApi = createAsyncThunk("search", async (item) => {
  let response = await axios.get(
    `https://dummyjson.com/products/search?q=${item}`
  );
  return response.data.products;
});
export const singleProductApi = createAsyncThunk(
  "https://dummyjson.com/products/single",
  async (id) => {
    let response = await axios.get(`https://dummyjson.com/products/${id}`);
    return response.data;
  }
);
export const limitApi = createAsyncThunk("limit", async (limit) => {
  let response = await axios.get(
    `https://dummyjson.com/products?limit=10&skip=${limit}`
  );
  return response.data.products;
});

const productSlice = createSlice({
  name: "product",
  initialState: {
    status: STATUS.IDLE,
    Product: [],
    category: [],
    single: [],
  },
  reducers: {},
  extraReducers: (builder) => {
    builder

      .addCase(singleProductApi.pending, (state) => {
        state.status = STATUS.LOADING;
      })
      .addCase(singleProductApi.fulfilled, (state, action) => {
        state.status = STATUS.IDLE;
        state.single = action.payload;
      })
      .addCase(singleProductApi.rejected, (state) => {
        state.status = STATUS.IDLE;
      })
      .addCase(productApi.pending, (state) => {
        state.status = STATUS.LOADING;
      })
      .addCase(productApi.fulfilled, (state, action) => {
        state.status = STATUS.IDLE;
        state.Product = action.payload;
      })
      .addCase(productApi.rejected, (state) => {
        state.status = STATUS.IDLE;
      })

      .addCase(categoryApi.pending, (state) => {
        state.status = STATUS.LOADING;
      })
      .addCase(categoryApi.fulfilled, (state, action) => {
        state.status = STATUS.IDLE;
        state.category = action.payload;
      })
      .addCase(categoryApi.rejected, (state) => {
        state.status = STATUS.IDLE;
      })

      .addCase(categoryWiseApi.pending, (state) => {
        state.status = STATUS.LOADING;
      })
      .addCase(categoryWiseApi.fulfilled, (state, action) => {
        state.status = STATUS.IDLE;
        state.Product = action.payload;
      })
      .addCase(categoryWiseApi.rejected, (state) => {
        state.status = STATUS.IDLE;
      })

      .addCase(searchApi.pending, (state) => {
        state.status = STATUS.LOADING;
      })
      .addCase(searchApi.fulfilled, (state, action) => {
        state.status = STATUS.IDLE;
        state.Product = action.payload;
      })
      .addCase(searchApi.rejected, (state) => {
        state.status = STATUS.IDLE;
      })
      .addCase(limitApi.pending,(state)=>{
        state.status=STATUS.LOADING
      })
      .addCase(limitApi.fulfilled,(state,action)=>{
         state.status=STATUS.IDLE
         state.Product=action.payload
      })
      .addCase(limitApi.rejected,(state)=>{
        state.status=STATUS.IDLE
      })
  },
});
export const { handleCart } = productSlice.actions;
export default productSlice.reducer;
