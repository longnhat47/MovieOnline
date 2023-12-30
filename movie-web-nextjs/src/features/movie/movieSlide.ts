import axios from "@/axios/axios";
import { PayloadAction, createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  MovieCreateType,
  MovieDetailType,
  MovieType,
} from "@/types/movieTypes";
import { createMovie, deleteMovie, patchMovie } from "./movieApi";

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
export const addMovie = createAsyncThunk(
  "movie/add",
  async (data: MovieCreateType) => {
    const response = await createMovie(data);
    return await response.data;
  }
);
export const updateMovie = createAsyncThunk(
  "movie/update",
  async (data: MovieCreateType) => {
    const response = await patchMovie(data);
    return await response.data;
  }
);
export const removeMovie = createAsyncThunk(
  "movie/delete",
  async (data: MovieType) => {
    const response = await deleteMovie(data);
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
    builder
      .addCase(fecthAllMovie.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fecthAllMovie.fulfilled, (state, action) => {
        state.isLoading = false;
        state.movies = action.payload;
      })
      // Fecth Detail
      .addCase(fecthMovieBySlug.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fecthMovieBySlug.fulfilled, (state, action) => {
        state.isLoading = false;
        state.movieDetail = action.payload;
      })
      .addCase(fecthMovieBySlug.rejected, (state) => {
        state.isLoading = false;
      })
      // Add Movie
      .addCase(addMovie.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addMovie.fulfilled, (state, action) => {
        state.isLoading = false;
        state.movies.push(action.payload);
      })
      .addCase(addMovie.rejected, (state) => {
        state.isLoading = false;
      })
      // Update Movie
      .addCase(updateMovie.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateMovie.fulfilled, (state, action) => {
        state.isLoading = false;
        console.log(action);

        state.movies = state.movies.map((item) =>
          item.id === action.payload.id
            ? { ...item, name: action.payload.name }
            : item
        );
      })
      .addCase(updateMovie.rejected, (state) => {
        state.isLoading = false;
      })
      // Delete Movie
      .addCase(removeMovie.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(removeMovie.fulfilled, (state, action) => {
        state.isLoading = false;
        console.log(action);

        state.movies = state.movies.filter(
          (item) => item.id !== action.payload
        );
      })
      .addCase(removeMovie.rejected, (state) => {
        state.isLoading = false;
      });
  },
});

export const {} = movieSlide.actions;

export default movieSlide.reducer;
