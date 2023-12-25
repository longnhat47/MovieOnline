import axios from "@/axios/axios";
import { PayloadAction, createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { UserLogin, UserType } from "@/types/userType";
import { loginApi } from "./userApi";

export const login = createAsyncThunk("user/login", async (data: UserLogin) => {
  const response = await loginApi(data);
  return await response.data;
});

const initialState = {
  isLoading: true,
  user: {} as any,
};

export const userSlide = createSlice({
  name: "user",
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      localStorage.removeItem("token");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(login.fulfilled, (state, actions) => {
        state.isLoading = false;
        state.user = actions.payload.user;
        localStorage.setItem("token", actions.payload.token.access);
      });
  },
});

export const { logout } = userSlide.actions;

export default userSlide.reducer;
