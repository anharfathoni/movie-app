import React, { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, generatePath } from "react-router-dom";
// import PropTypes from "prop-types";
import debounce from "lodash/debounce";
import get from "lodash/get";

import services from "services/movies";
import { setStateRedux } from "stores/movie";
import { publicRoutes } from "constants/routes";
import logo from "assets/logo.png";
import Card from "components/card/search";

function Header() {
  const dispatch = useDispatch();
  const history = useHistory();
  const { searchTerm } = useSelector(({ movie }) => movie);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [movieList, setMovieList] = useState([]);

  const debounceSearch = useRef(
    debounce((val) => {
      dispatch(setStateRedux({ searchTerm: val }));
      getListMovie(val);
    }, 1000)
  ).current;

  const onChange = (e) => {
    const val = e.target.value;
    setInput(val);
    debounceSearch(val);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    setMovieList([]);
    history.push({
      pathname: publicRoutes.home.path,
      search: `?s=${input}`,
    });
  };

  const clickHome = () => {
    history.push(publicRoutes.home.path);
  };

  const clickDetailMovie = (imdbID) => () => {
    history.push(generatePath(publicRoutes.detail.path, { imdbID }));
  };

  const getListMovie = async (titleVal, pageVal) => {
    setLoading(true);
    try {
      setMovieList([]);
      const data = await services.searchMovie({
        s: titleVal || searchTerm,
        page: 1,
      });
      const response = get(data, "data.Response");
      if (response === "True") {
        const movies = get(data, "data.Search", []);
        setMovieList(movies);
      } else {
        setMovieList([]);
      }
      setLoading(false);
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };

  useEffect(() => {
    var searchBox = document.getElementById("searchBox");
    window.onclick = function (event) {
      if (event.target !== searchBox) {
        setMovieList([]);
      }
    };
  });
  return (
    <div id='header'>
      <img
        src={logo}
        alt='myMovieList'
        height='45px'
        onClick={clickHome}
        className='pointer'
      />
      <form className='searchContainer' onSubmit={onSubmit}>
        <input
          type='text'
          placeholder='Search'
          className='searchInput'
          onChange={onChange}
          value={input}
        />
        <button
          type='submit'
          className='searchButton'
          onClick={onSubmit}
          disabled={loading}
        >
          {loading ? (
            <i className='fa fa-spinner fa-spin'></i>
          ) : (
            <i className='fa fa-search'></i>
          )}
        </button>
      </form>
      {movieList.length > 0 && (
        <div id='searchBox'>
          {movieList.map((movie, index) => (
            <Card
              key={index}
              onClick={clickDetailMovie(movie.imdbID)}
              Poster={movie.Poster}
              Title={movie.Title}
              Year={movie.Year}
              Type={movie.Type}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default Header;
