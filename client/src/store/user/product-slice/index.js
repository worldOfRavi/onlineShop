import {createAsyncThunk, createSlice} from "@reduxjs/toolkit"
import axios from "axios";


const initialState = {
    isLoading:false,
    productList : []
}

// function to fetch the filterproducts from the user view
export const fetchFilteredProducts = createAsyncThunk(
    "user/product",
    async(_,{rejectWithValue})=>{
        try {
            const response  = await axios.get("http://localhost:5000/api/user/products/get",{
                withCredentials:true
            });
             return response.data
             
        } catch (error) {
            if(error.response){
                const {data} = error.response;
                return rejectWithValue(data);
            }
            else{
                console.log("Unexpected error ", error.message);
                throw new Error("An unexpected error occurred")
                
            }
        }
    }
)

const UserProductSlice = createSlice({
    name:"userProductSlice",
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder.addCase(fetchFilteredProducts.pending, (state)=>{
            state.isLoading = true;
        }).addCase(fetchFilteredProducts.fulfilled, (state, action)=>{
            state.isLoading = false;
            state.productList = action.payload.data
        }).addCase(fetchFilteredProducts.rejected, (state)=>{
            state.isLoading = false
        })
    }
})



export const {}  = UserProductSlice.actions;
export default UserProductSlice.reducer;
