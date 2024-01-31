import React, { useEffect } from "react";
import { getAllCategories, getAllMovies } from "../../store/movies/movieSlice";
import { useSelector } from "react-redux";
import MovieCard from "../MovieCard/MovieCard";
import { useDispatch } from "react-redux";
import { addMovies } from "../../store/movies/movieSlice";
import { getApi } from "../../api/api";
import "./RecommendedMovies.scss";
import Header from "../Header/Header";

const ReccomendedMovieListing = () => {
  const movies = useSelector(getAllMovies);

  const dispatch = useDispatch();

  const fetchMovies = async () => {
    let url = "/movies/recommended";
    const response = await getApi(url);
    dispatch(addMovies(response?.data));
  };

  const movieList = movies?.length > 0 ? (
    movies?.map((movie, index) => (
      <MovieCard key={index} data={movie} rate={false} />
    ))
  ) : "";

  useEffect(() => {
    fetchMovies();
  }, []);

  return (
    <div>
      <Header />
      <div className="movie-wrapper">
        <div className="movie-list">
          <h2>Recommended Movies</h2>
          <div className="movie-container">{movieList}</div>
        </div>
      </div>
    </div>
  );
};

export default ReccomendedMovieListing;
