import axios from "@/axios/axios";
import { PayloadAction, createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { CountryType } from "@/types/countryType";
import { getAllCountry } from "./countryApi";

export const fetchCountry = createAsyncThunk("country/fetchAll", async () => {
  const response = await getAllCountry();
  return await response.data;
});

const initialState = {
  isLoading: true,
  countries: [] as CountryType[],
};

export const countrySlide = createSlice({
  name: "country",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchCountry.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchCountry.fulfilled, (state, action) => {
      state.isLoading = false;
      state.countries = action.payload;
    });
  },
});

export const {} = countrySlide.actions;

export default countrySlide.reducer;
