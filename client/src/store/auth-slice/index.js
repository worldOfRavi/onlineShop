import { createAsyncThunk, createSlice, isFulfilled } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  isAuthnticated: false,
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
        state.isAuthnticated = false
    }).addCase(registerUser.rejected, (state)=>{
        state.isLaoding = false;
        state.user = null;
        state.isAuthnticated  = false;
    })
  }
});

export const { setUser } = authSlice.actions;
export default authSlice.reducer;
