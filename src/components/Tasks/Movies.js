import React from "react";
import Task from "./Task";
import { useState } from "react";
import SearchBar from "./SearchBar";

export default function Tasks() {
    const [search, setSearch] = useState('');
    const [movieData, setMovieData] = useState({});

   const result = fetch(`https://api.themoviedb.org/3/search/movie?api_key=2cc400c668df650508e7074fd7e11e01&query=${search}`)
        .then((res) => res.json())
        .then((json) => {
            this.setMovieData({
                Name: this.results[0].original_title
            });
        })


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
      {result.map((task) => (
        <Task 
        // key={task.id}
        // id={task.id} 
        // title={task.title} 
        // description={task.description} 
        // checked ={task.checked}
        // task = {task}
        />
      ))}
    </span>
  );
}
