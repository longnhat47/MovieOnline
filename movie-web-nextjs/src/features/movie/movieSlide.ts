import axios from "@/axios/axios";
import { PayloadAction, createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { MovieDetailType, MovieType } from "@/types/movieTypes";

export const fecthAllMovie = createAsyncThunk("movie/fetchAll", async () => {
  const response = await axios.get("/movie");
  return await response.data;
});
export const fecthMovieBySlug = createAsyncThunk(
  "movie/fetchDetail",
  async (slug: string) => {
    const response = await axios.get(`/movie/detail/${slug}`);
    return await response.data;
  }
);

const initialState = {
  isLoading: true,
  movies: [] as MovieType[],
  movieDetail: {} as MovieDetailType,
};

export const movieSlide = createSlice({
  name: "movie",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Fecth All
    builder.addCase(fecthAllMovie.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fecthAllMovie.fulfilled, (state, action) => {
      state.isLoading = false;
      state.movies = action.payload;
    });
    // Fecth Detail
    builder.addCase(fecthMovieBySlug.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fecthMovieBySlug.fulfilled, (state, action) => {
      state.isLoading = false;
      state.movieDetail = action.payload;
    });
  },
});

export const {} = movieSlide.actions;

export default movieSlide.reducer;
