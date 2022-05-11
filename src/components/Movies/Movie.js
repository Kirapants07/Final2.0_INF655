import { useContext } from "react";
import React from "react";
import { MdOutlineFavoriteBorder, MdOutlineFavorite } from "react-icons/md";
import TaskContext from "../context/TaskContext";
import SmallCard from "../shared/SmallCard";

export default function Movie({ id, title, image, director, category, year, trailer, ratings, checked, movie, setSearch}) {
    const {favorite, deleteMovie, checkMovie, editMovie, addMovie} = useContext(TaskContext);

    return (
        <SmallCard>
                <button checked={false} onClick={(e) => {addMovie(movie); setSearch(""); }} className="favorite" style={{color: "#FF1493"}}>
                        {favorite 
                            ? <MdOutlineFavoriteBorder size={20} />
                            : <MdOutlineFavorite size={20} />
                        }
                        <h2 className="dropdowntext"> {title}</h2>
                </button>
                {/* {image ? <img src ={`https://image.tmdb.org/t/p/w92/${image}`} alt="Movie poster" /> : <p>No image found</p>} */}

                


        </SmallCard>
    )
}

