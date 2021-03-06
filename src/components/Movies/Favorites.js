import React from "react";
import { useContext } from "react";
import TaskContext from "../context/TaskContext";
import FavoriteMovie from "./FavoriteMovie";
import { useAuthStatus } from "../hooks/useAuth";
import { Link } from "react-router-dom";

export default function Tasks() {

const {favoritesList} = useContext(TaskContext);
const { signedIn, useremail, userUid } = useAuthStatus();

//user is not logged in
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
  
const result = favoritesList.filter(movie => movie.data.user == userUid);

  if (!result || result.length === 0){
    return (
      <span>
        <h1>No Favorites Found</h1>
     </span>);
  }

  return (
    <span>
      <h1>{useremail}'s Favorites list</h1>
      {result.map((users) => (
        <FavoriteMovie 
        title={users.data.title} 
        id ={users.data.id}
        fireId = {users.id}
        director={users.data.director} 
        category={users.data.category} 
        year={users.data.year} 
        image={users.data.image} 
        trailer={users.data.trailer} 
        ratings={users.data.ratings} 
        checked ={users.data.checked}
        />
      ))}
    </span>
  );
}