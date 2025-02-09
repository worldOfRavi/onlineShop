import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";


const initialState = {
    isloading : false,
    approvedURL : null,
    orderId : null,
    order:null,

}

// function to create a order and initiate a payment
export const createOrderPayment  = createAsyncThunk("/order/createPayment",
    async(orderData, {rejectWithValue}) =>{
        try {
            const response  = await axios.post("http://localhost:5000/api/user/order/create", orderData);
            return response.data
        } catch (error) {
            if (error.response) {
                const { data } = error.response;
                return rejectWithValue(data);
              } else {
                console.log("Unexpected error ", error.message);
                throw new Error("An unexpected error occurred");
              }
        }
    }
)

// function to make the order confirm after the payment
export const captureOrderPayment  = createAsyncThunk("/order/captureOrderPayment",
    async({paymentId, payerId, orderId}, {rejectWithValue}) =>{
        try {
            const response  = await axios.post("http://localhost:5000/api/user/order/capture", {paymentId, payerId, orderId});
            return response.data
        } catch (error) {
            if (error.response) {
                const { data } = error.response;
                return rejectWithValue(data);
              } else {
                console.log("Unexpected error ", error.message);
                throw new Error("An unexpected error occurred");
              }
        }
    }
)
const orderSlice = createSlice({
    name:"orderSlice",
    initialState,
    reducers : {},
    extraReducers :(builder) =>{
        builder.addCase(createOrderPayment.pending , (state)=>{
            state.isloading = true
        }).addCase(createOrderPayment.fulfilled, (state, action)=>{
            state.isloading = false;
            state.approvedURL = action.payload.approvedURL,
            state.orderId = action.payload.orderId;
            // as we come back from the paypal site, this orderId would be unavailable, so that we can store it in the sessionStorage so that we can get it back when we actually need it
            sessionStorage.setItem("currentOrderId", JSON.stringify(action.payload.orderId));
        }).addCase(createOrderPayment.rejected, (state)=>{
            state.isloading = false
        }).addCase(captureOrderPayment.pending , (state)=>{
            state.isloading = true
        }).addCase(captureOrderPayment.fulfilled, (state, action)=>{
            state.isloading = false;
            state.order = action.payload.data
        }).addCase(captureOrderPayment.rejected, (state)=>{
            state.isloading = false
        })
    }
})

export default orderSlice.reducer;