import axios from "@/axios/axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import { CategoryType } from "@/types/categoryType";
import {
  createCategory,
  deleteCategory,
  getAllCategory,
  patchCategory,
} from "./categoryApi";

export const fetchCategory = createAsyncThunk("category/fetchAll", async () => {
  const response = await getAllCategory();
  return await response.data;
});
export const addCategory = createAsyncThunk(
  "category/add",
  async (data: CategoryType) => {
    const response = await createCategory(data);
    return await response.data;
  }
);
export const updateCategory = createAsyncThunk(
  "category/update",
  async (data: CategoryType) => {
    const response = await patchCategory(data);
    return await response.data;
  }
);
export const removeCategory = createAsyncThunk(
  "category/delete",
  async (data: CategoryType) => {
    const response = await deleteCategory(data);
    return await response.data;
  }
);

const initialState = {
  isLoading: true,
  categories: [] as CategoryType[],
};

export const categorySlide = createSlice({
  name: "category",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategory.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchCategory.fulfilled, (state, action) => {
        state.isLoading = false;
        state.categories = action.payload;
      })
      .addCase(fetchCategory.rejected, (state, action) => {
        state.isLoading = false;
      })
      .addCase(addCategory.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addCategory.fulfilled, (state, action) => {
        state.isLoading = false;
        state.categories.push(action.payload);
      })
      .addCase(updateCategory.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateCategory.fulfilled, (state, action) => {
        state.isLoading = false;
        console.log(action);

        state.categories = state.categories.map((item) =>
          item.id === action.payload.id
            ? { ...item, name: action.payload.name }
            : item
        );
      })
      .addCase(removeCategory.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(removeCategory.fulfilled, (state, action) => {
        state.isLoading = false;
        console.log(action);

        state.categories = state.categories.filter(
          (item) => item.id !== action.payload
        );
      });
  },
});

export const {} = categorySlide.actions;

export default categorySlide.reducer;
