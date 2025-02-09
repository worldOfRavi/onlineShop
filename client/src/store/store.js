import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth-slice/index";
import adminProductReducer from "./admin/product-slice";
import userProductReducer from "./user/product-slice"
import cartSliceReducer from "./user/cart-slice";
import addressSliceReducer from "./user/address-slice/index";
import orderSliceReducer from "./user/order-slice/index";

const store = configureStore({
    reducer:{
        authReducer,
        adminProductReducer,
        userProductReducer,
        cartSlice:cartSliceReducer,
        addressSlice:addressSliceReducer,
        orderSlice: orderSliceReducer
    }
})

export default store;
