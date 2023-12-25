import { combineReducers, configureStore } from "@reduxjs/toolkit";
import categorySlide from "@/features/category/categorySlide";
import countrySlide from "@/features/country/countrySlide";
import movieSlide from "@/features/movie/movieSlide";
import userSlide from "@/features/user/userSlide";

export const store = configureStore({
  reducer: combineReducers({
    category: categorySlide,
    country: countrySlide,
    movie: movieSlide,
    user: userSlide,
  }),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
