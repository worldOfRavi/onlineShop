import { createAsyncThunk, createSlice, isFulfilled } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  isAuthenticated: false,
  isLaoding: false,
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

export const loginUser = createAsyncThunk('/auth/login',
  async (formData) =>{
    const response  = await axios.post("http://localhost:5000/api/auth/login",
      formData,
      {withCredentials:true}
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
        state.isLaoding = true;
    }).addCase(registerUser.fulfilled, (state, action)=>{
        state.isLaoding = false;
        state.user = null;
        state.isAuthenticated = false
    }).addCase(registerUser.rejected, (state)=>{
        state.isLaoding = false;
        state.user = null;
        state.isAuthenticated  = false;
    }).addCase(loginUser.pending, (state)=>{
      state.isLaoding = true;
    }).addCase(loginUser.fulfilled, (state, action)=>{
      state.isLaoding = false,
      state.user = action.payload.success  ? action.payload.user : null
      state.isAuthenticated = action.payload.success
    }).addCase(loginUser.rejected, (state)=>{
      state.isLaoding = false;
        state.user = null;
        state.isAuthenticated  = false;
    })
  }
});

export const { setUser } = authSlice.actions;
export default authSlice.reducer;
