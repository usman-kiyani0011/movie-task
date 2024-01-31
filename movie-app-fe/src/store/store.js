import { configureStore } from "@reduxjs/toolkit";
import moviesReducer from "./movies/movieSlice";
import profileReducer from "./profile/profileSlice";

export const store = configureStore({
  reducer: {
    movies: moviesReducer,
    profile: profileReducer,
  },
});
