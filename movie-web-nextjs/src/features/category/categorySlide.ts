import axios from "@/axios/axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import { CategoryType } from "@/types/categoryType";
import { getAllCategory } from "./categoryApi";

export const fetchCategory = createAsyncThunk("category/fetchAll", async () => {
  const response = await getAllCategory();
  return await response.data;
});

const initialState = {
  isLoading: true,
  categories: [] as CategoryType[],
};

export const categorySlide = createSlice({
  name: "category",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchCategory.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchCategory.fulfilled, (state, action) => {
      state.isLoading = false;
      state.categories = action.payload;
    });
    builder.addCase(fetchCategory.rejected, (state, action) => {
      state.isLoading = false;
    });
  },
});

export const {} = categorySlide.actions;

export default categorySlide.reducer;
