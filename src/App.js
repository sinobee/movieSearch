import "./App.css";
import "./bootstrap.min.css";
import React, { useState, useEffect } from "react";
import MovieList from "./MovieList";
import MovieListHanding from "./MovieListHanding";
import SearchBox from "./SearchBox";
import AddFav from "./AddFav";
import favRam from "./favRem";
function App() {
  const [movie, setmovie] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [fav, setfav] = useState([]);
  const [se,setse]=useState("");
  const getMovieRe = async (searchValue) => {
    const url = `http://www.omdbapi.com/?s=${searchValue}&apikey=b8afee05`;
    const res = await fetch(url);
    const resjson = await res.json();

    if (resjson.Search) {
      setmovie(resjson.Search);
      setse("Search results");
    }
  };
  useEffect(() => {
    getMovieRe(searchValue);
    
  }, [searchValue]);
  const saveToLocalStorage = (items) => {
		localStorage.setItem('react-movie-app-favourites', JSON.stringify(items));
	};
  function addFavItemMovie(movie) {
    const newfav = [...fav, movie];
    setfav(newfav);
    saveToLocalStorage(movie);
  }
  function handleRem(movie){
    const newFavouriteList = fav.filter(
			(favourite) => favourite.imdbID !== movie.imdbID
		);
    setfav(newFavouriteList);
    saveToLocalStorage(movie);
  }
  return (
    <div className="container-fluid movie-app">
      <div className="row d-flex align-items-center mt-4 mb-4">
        <MovieListHanding heading="Movies" />
        <SearchBox searchValue={searchValue} setSearchValue={setSearchValue} />
      </div>
      <span>{se}</span>
      <div className="row hei">
    
        <MovieList movies={movie} handleFav={addFavItemMovie}  Favcom={AddFav} />
      </div>
      <div className="row d-flex align-items-center mt-4 mb-4">
        <MovieListHanding heading="Favourites"/>
      </div>
      <div className="row hei">
        <MovieList movies={fav} handleFav={handleRem} Favcom={favRam} />
      </div>
    </div>
  );
}

export default App;
