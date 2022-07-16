import { configureStore } from "@reduxjs/toolkit";
import myCartReducer from "./slices/myCartSlice";

export const store = configureStore({
  reducer: {
    myCart: myCartReducer,
  },
});
