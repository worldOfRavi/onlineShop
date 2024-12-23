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
  async (formData) => {
    const response = await axios.post(
      "http://localhost:5000/api/auth/register",
      formData,
      {
        withCredentials: true,
      }
    );
    return response.data;
  }
);

// login action
export const loginUser = createAsyncThunk('/auth/login',
  async (formData) =>{
    const response  = await axios.post("http://localhost:5000/api/auth/login",
      formData,
      {withCredentials:true}
    );
    return response.data;
  }
)


// authentiaction action
export const authCheck = createAsyncThunk('/auth/authcheck',
  async () =>{
    const response  = await axios.get("http://localhost:5000/api/auth/auth-check",
      {withCredentials:true,
        headers:{
          'Cache-Control':'no-store, no-cache, must-revalidate, proxy-revalidate'
        }
      }
    );
    return response.data;
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
    }).addCase(registerUser.rejected, (state)=>{
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
