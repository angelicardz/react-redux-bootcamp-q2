import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const URL = "https://6x8prpit9f.execute-api.us-east-1.amazonaws.com/api";

export const getProducts = createAsyncThunk(
  "products/getProducts",
  async (_, { rejectWithValue, signal }) => {
    try {
      const response = await fetch(`${URL}/products`, {
        headers: {
          "X-Auth-Token": "",
        },
        signal,
      });

      if (!response.ok) {
        return rejectWithValue("Error fetching products");
      }

      const data = await response.json();

      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const productsSlice = createSlice({
  name: "products",
  initialState: {
    products: [],
    loading: false,
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getProducts.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(getProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload;
      })
      .addCase(getProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const selectAllProducts = (state) => state.products;
export const selectPostsLoading = (state) => state.products.loading;
export const selectPostsError = (state) => state.products.error;

export default productsSlice.reducer;
