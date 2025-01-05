import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth-slice/index";
import productReducer from "./admin/product-slice";

const store = configureStore({
    reducer:{
        authReducer,
        productReducer
    }
})

export default store;
