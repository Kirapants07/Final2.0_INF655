import React, { useContext } from "react";
import Movie from "./Movie";
import { useState } from "react";
import SearchBar from "./SearchBar";
import TaskContext from "../context/TaskContext";


export default function Movies() {
    const [search, setSearch] = useState('');
    const { GetMovies } = useContext(TaskContext);
    
    const result = GetMovies(search);

  if (!search || search.length === 0){
    return (
      <span>
       <SearchBar search={search} setSearch={setSearch} />
     </span>);
  }

  if (!result || result.length === 0){
    return (
        <span>
         <SearchBar search={search} setSearch={setSearch} />
          <h1>Movie Not available</h1>
       </span>);
  }

  return (
    <span className= "dropdown">
        <SearchBar search={search} setSearch={setSearch} />
        <div class="dropdown-content">
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
        setSearch={setSearch}
        />
      ))}
      </div>
    </span>
  );
}
