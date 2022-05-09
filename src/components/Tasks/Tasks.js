import React from "react";
import Task from "./Task";
import { useState, useContext } from "react";
import TaskContext from "../context/TaskContext";
import SearchBar from "./SearchBar";

export default function Tasks() {
const {taskList} = useContext(TaskContext);
const [search, setSearch] =useState('');

const result =taskList.filter((task) => 
  task.title.toLowerCase().includes(search.toLowerCase()))

  if (!result || result.length === 0){
    return (
      <span>
       <SearchBar search={search} setSearch={setSearch} />
        <h1>No Tasks Found</h1>
     </span>);
  }

  return (
    <span>
        <SearchBar search={search} setSearch={setSearch} />
      {result.map((task) => (
        <Task 
        key={task.id}
        id={task.id} 
        title={task.title} 
        description={task.description} 
        checked ={task.checked}
        task = {task}
        />
      ))}
    </span>
  );
}
