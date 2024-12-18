import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth-slice/index";
const store = configureStore({
    reducer:{
        authReducer
    }
})

export default store;
