import React from "react";
import Movie from "./Movie";
import { useState } from "react";
import SearchBar from "./SearchBar";
import GetMovies from './GetMovies';

export default function Movies() {
    const [search, setSearch] = useState('');
    
    const result = GetMovies(search);

  if (!result || result.length === 0){
    return (
      <span>
       <SearchBar search={search} setSearch={setSearch} />
        <h1>No Movies Found</h1>
     </span>);
  }

  return (
    <span>
        <SearchBar search={search} setSearch={setSearch} />
        {result.map((movie) => (
        <Movie 
        title={movie.title} 
        director={movie.director} 
        category={movie.category} 
        year={movie.year} 
        image={movie.image} 
        trailer={movie.trailer} 
        ratings={movie.ratings} 
        checked ={movie.checked}
        movie = {movie}
        />
      ))}
    </span>
  );
}
