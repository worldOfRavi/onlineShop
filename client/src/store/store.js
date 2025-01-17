import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth-slice/index";
import adminProductReducer from "./admin/product-slice";
import userProductReducer from "./user/product-slice"
import cartSliceReducer from "./user/cart-slice";

const store = configureStore({
    reducer:{
        authReducer,
        adminProductReducer,
        userProductReducer,
        cartSlice:cartSliceReducer
    }
})

export default store;
