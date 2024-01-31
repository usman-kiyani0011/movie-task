import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  movies: [],
  categories: []
};

const movieSlice = createSlice({
  name: "movies",
  initialState,
  reducers: {
    addMovies: (state, { payload }) => {
      state.movies = payload;
    },
    addCategories: (state, { payload }) => {
      state.categories = payload;
    },
  },
});

export const getAllMovies = (state) => state.movies.movies;
export const getAllCategories = (state) => state.movies.categories;

export const { addMovies, addCategories } = movieSlice.actions;
export default movieSlice.reducer;
