import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  isAuthenticated: false,
  isLoading: true,
  user: null,
};

// register action
export const registerUser = createAsyncThunk(
  "/auth/register",


  /*
  Note: with axios any status code other than 2XX treated as error and the request gets rejected which results payload as undefined.
  to handle it pass {rejectWithValue} as additional parameter in the function and use it in the catch blog to fetch the payload even though the request is rejected.

  while fetch resolves any status code.
  */
  async (formData, {rejectWithValue }) => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/register",
        formData,
        {
          withCredentials: true,
        }
      );
      return response.data;
    } catch (error) {
       // Axios error response
       if (error.response) {
        // Extract error message and reject with it
        const { data } = error.response;
        return rejectWithValue(data); // Pass the payload to Redux Toolkit
      } else {
        console.error("Unexpected error:", error.message);
        throw new Error("An unexpected error occurred.");
      }
    }

  //   const res = await fetch("http://localhost:5000/api/auth/register",{
  //     method:"POST",
  //     headers:{
  //         "Content-Type":"application/json"
  //     },
  //     body:JSON.stringify(formData)
  // })

  // const data = await res.json();
  // return data;
  
  }
);

// login action
export const loginUser = createAsyncThunk('/auth/login',
  async (formData, {rejectWithValue}) =>{
    try {
      const response  = await axios.post("http://localhost:5000/api/auth/login",
        formData,
        {withCredentials:true}
      );
      return response.data;
    } catch (error) {
      if(error.response){
        const {data} = error.response;
        return rejectWithValue(data)
      }
      else{
        console.error("Unexpected error:", error.message);
        throw new Error("An unexpected error occurred.");
      }
    }
  }
)


// authentiaction action
export const authCheck = createAsyncThunk('/auth/authcheck',
  async (_, {rejectWithValue}) =>{
    try {
      const response  = await axios.get("http://localhost:5000/api/auth/auth-check",
        {withCredentials:true,
          headers:{
            'Cache-Control':'no-store, no-cache, must-revalidate, proxy-revalidate'
          }
        }
      );
      console.log(response);
      return response.data;

    } catch (error) {
      if(error.response){
        const {data}  = error.response;
        return rejectWithValue(data);
      }
      else{
        console.log("Unexpected error", error.message);
        throw new Error("An unexpected error occured");
      }
    }
  }
)


const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action) => {},
  },
  extraReducers:(builder) =>{
    builder.addCase(registerUser.pending, (state)=>{
        state.isLoading = true;
    }).addCase(registerUser.fulfilled, (state, action)=>{
        state.isLoading = false;
        state.user = null;
        state.isAuthenticated = false
    }).addCase(registerUser.rejected, (state,action)=>{
        state.isLoading = false;
        state.user = null;
        state.isAuthenticated  = false;
    }).addCase(loginUser.pending, (state)=>{
      state.isLoading = true;
    }).addCase(loginUser.fulfilled, (state, action)=>{
      state.isLoading = false,
      state.user = action.payload.success  ? action.payload.user : null
      state.isAuthenticated = action.payload.success
    }).addCase(loginUser.rejected, (state)=>{
      state.isLoading = false;
        state.user = null;
        state.isAuthenticated  = false;
    }).addCase(authCheck.pending, (state)=>{
      state.isLoading = true;
    }).addCase(authCheck.fulfilled, (state, action)=>{
      state.isLoading = false,
      state.user = action.payload.success  ? action.payload.user : null
      state.isAuthenticated = action.payload.success
    }).addCase(authCheck.rejected, (state)=>{
      state.isLoading = false;
        state.user = null;
        state.isAuthenticated  = false;
    })
  }
});

export const { setUser } = authSlice.actions;
export default authSlice.reducer;
