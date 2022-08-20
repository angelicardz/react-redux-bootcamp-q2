import { createSlice } from "@reduxjs/toolkit";

export const myCartSlice = createSlice({
  name: "myCart",
  initialState: {
    myProducts: [],
  },
  reducers: {
    add: (state, action) => {
      const productToAdd = action.payload.product;
      const { id } = productToAdd;

      const productExists = state.myProducts.some(
        (product) => product.id === id
      );

      if (productExists) {
        state.myProducts = state.myProducts.map((product) => {
          return product.id === id
            ? { ...product, quantity: product.quantity + 1 }
            : product;
        });
      } else {
        const product = {
          ...productToAdd,
          quantity: 1,
        };

        state.myProducts.push(product);
      }
    },
    remove: (state, action) => {
      state.myProducts = state.myProducts.filter(
        (product) => product.id !== action.payload.id
      );
    },
    update: (state, action) => {
      const productId = action.payload.id;
      const newQuantity = action.payload.newQuantity;

      state.myProducts = state.myProducts.map((product) => {
        return product.id === productId
          ? { ...product, quantity: newQuantity }
          : product;
      });
    },
  },
});

export const { add, remove, update } = myCartSlice.actions;

export const selectCart = (state) => state.myCart.myProducts;

export default myCartSlice.reducer;
