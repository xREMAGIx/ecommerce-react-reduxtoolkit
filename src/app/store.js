import { configureStore } from "@reduxjs/toolkit";
import productReducer from "./slides/productSlide";
import accountReducer from "./slides/accountSlide";

export default configureStore({
  reducer: {
    products: productReducer,
    account: accountReducer,
  },
});
