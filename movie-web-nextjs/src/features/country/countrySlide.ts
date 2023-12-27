import axios from "@/axios/axios";
import { PayloadAction, createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { CountryType } from "@/types/countryType";
import {
  createCountry,
  deleteCountry,
  getAllCountry,
  patchCountry,
} from "./countryApi";

export const fetchCountry = createAsyncThunk("country/fetchAll", async () => {
  const response = await getAllCountry();
  return await response.data;
});
export const addCountry = createAsyncThunk(
  "country/add",
  async (data: CountryType) => {
    const response = await createCountry(data);
    return await response.data;
  }
);
export const updateCountry = createAsyncThunk(
  "country/update",
  async (data: CountryType) => {
    const response = await patchCountry(data);
    return await response.data;
  }
);
export const removeCountry = createAsyncThunk(
  "country/delete",
  async (data: CountryType) => {
    const response = await deleteCountry(data);
    return await response.data;
  }
);

const initialState = {
  isLoading: true,
  countries: [] as CountryType[],
};

export const countrySlide = createSlice({
  name: "country",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCountry.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchCountry.fulfilled, (state, action) => {
        state.isLoading = false;
        state.countries = action.payload;
      })
      .addCase(addCountry.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addCountry.fulfilled, (state, action) => {
        state.isLoading = false;
        state.countries.push(action.payload);
      })
      .addCase(updateCountry.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateCountry.fulfilled, (state, action) => {
        state.isLoading = false;
        console.log(action);

        state.countries = state.countries.map((item) =>
          item.id === action.payload.id
            ? { ...item, name: action.payload.name }
            : item
        );
      })
      .addCase(removeCountry.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(removeCountry.fulfilled, (state, action) => {
        state.isLoading = false;
        console.log(action);

        state.countries = state.countries.filter(
          (item) => item.id !== action.payload
        );
      });
  },
});

export const {} = countrySlide.actions;

export default countrySlide.reducer;
