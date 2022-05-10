import React from "react";
import Movie from "./Movie";
import { useState, useContext } from "react";
import TaskContext from "../context/TaskContext";
import SearchBar from "./SearchBar";

export default function Tasks() {
const {movieList} = useContext(TaskContext);
const [search, setSearch] =useState('');

//Needs to fetch movie ids from user's firebase, then fetch each movie info from API.

const result = movieList;

// const result =movieList.filter((task) => 
//   task.title.toLowerCase().includes(search.toLowerCase()))

  if (!result || result.length === 0){
    return (
      <span>
       {/* <SearchBar search={search} setSearch={setSearch} /> */}
        <h1>No Tasks Found</h1>
     </span>);
  }

  return (
    <span>
        {/* <SearchBar search={search} setSearch={setSearch} /> */}
      {result.map((movie) => (
        <Movie 
        favtitle={movie.title} 
        favid ={movie.id}
        // director={movie.director} 
        // category={movie.category} 
        // year={movie.year} 
        // image={movie.image} 
        // trailer={movie.trailer} 
        // ratings={movie.ratings} 
        // checked ={movie.checked}
        // movie = {movie}
        />
      ))}
    </span>
  );
}
