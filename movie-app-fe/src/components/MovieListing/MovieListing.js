import React, { useEffect, useState } from "react";
import { addCategories, getAllCategories, getAllMovies } from "../../store/movies/movieSlice";
import { useSelector } from "react-redux";
import MovieCard from "../MovieCard/MovieCard";
import { useDispatch } from "react-redux";
import { addMovies } from "../../store/movies/movieSlice";
import { getApi } from "../../api/api";
import "./MovieListing.scss";
import { Input, Select } from 'antd';
import Header from "../Header/Header";
const { Option } = Select;

const MovieListing = () => {
  const movies = useSelector(getAllMovies);
  const categores = useSelector(getAllCategories);

  const dispatch = useDispatch();
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [searchKeyword, setSearchKeyword] = useState('');

  const handleSearchChange = (e) => {
    setSearchKeyword(e.target.value);
  };

  const handleCategoryChange = (value) => {
    setSelectedCategory(value);
  };

  const fetchMovies = async () => {
    let url = "/movies/list-movies";
    if (searchKeyword) {
      url += `?search=${searchKeyword}`;
    }
    if (selectedCategory) {
      url += url.includes("?") ? `&categoryId=${selectedCategory}` : `?categoryId=${selectedCategory}`;
    }
    const response = await getApi(url);
    dispatch(addMovies(response?.data));
  };


  const fetchCategories = async () => {
    const response = await getApi('/movies/list-categores');
    dispatch(addCategories(response?.data));
  };

  const movieList = movies?.length > 0 ? (
    movies?.map((movie, index) => (
      <MovieCard key={index} data={movie} />
    ))
  ) : "";

  useEffect(() => {
    fetchMovies();
  }, [searchKeyword, selectedCategory]);

  useEffect(() => {
    fetchCategories();
  }, []);
  return (
    <div>
      <Header />
      <div className="movie-wrapper">
        <div className="movie-list">
          <div className="flex gap-3 my-3">
            <h2>Movies</h2>
            <Input
              placeholder="Search movie"
              value={searchKeyword}
              onChange={handleSearchChange}
              style={{ width: 200 }}
            />
            <Select
              placeholder="Search Category"
              value={selectedCategory}
              onChange={handleCategoryChange}
              style={{ width: 200, marginLeft: 10 }}
            >
              {categores.map((category) => (
                <Option key={category._id} value={category._id}>
                  {category.name}
                </Option>
              ))}
            </Select>
          </div>
          <div className="movie-container">{movieList}</div>
        </div>
      </div>
    </div>
  );
};

export default MovieListing;
