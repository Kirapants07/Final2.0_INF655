import React from "react";
import Movie from "./Movie";
import { useState, useContext } from "react";
import TaskContext from "../context/TaskContext";
import SearchBar from "./SearchBar";
import FavoriteMovie from "./FavoriteMovie";
import { useAuthStatus } from "../hooks/useAuth";
import { Link } from "react-router-dom";

export default function Tasks() {
const {favoritesList} = useContext(TaskContext);
const [search, setSearch] =useState('');


//Needs to fetch movie ids from user's firebase, then fetch each movie info from API.

const { signedIn, checkingStatus } = useAuthStatus();
if (!signedIn){
  return (
    <span>
     <h1>To view favorite movies, <br /> 
          <Link to="sign-in">Sign In </Link>
           or 
          <Link to="sign-up">Create an Account</Link>
      </h1>
  </span>);
}
else //user is logged in 
{
  
const result = favoritesList;

// const result =movieList.filter((task) => 
//   task.title.toLowerCase().includes(search.toLowerCase()))


  if (!result || result.length === 0){
    return (
      <span>
       {/* <SearchBar search={search} setSearch={setSearch} /> */}
        <h1>No Favorites Found</h1>
     </span>);
  }

  return (
    <span>
      <h1>Favorite movies list</h1>
      {result.map((users) => (
        <FavoriteMovie 
        title={users.data.title} 
        id ={users.data.movie_id}
        fireId = {users.id}
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
}
