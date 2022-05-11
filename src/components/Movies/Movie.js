import { useContext } from "react";
import React from "react";
import { MdOutlineFavoriteBorder, MdOutlineFavorite } from "react-icons/md";
import Card from "../shared/Card";
import TaskContext from "../context/TaskContext";

export default function Movie({ id, title, image, director, category, year, trailer, ratings, checked, movie}) {
    const {favorite, deleteMovie, checkMovie, editMovie, addMovie} = useContext(TaskContext);

    return (
        <Card>
                <button checked={false} onClick={() => addMovie(movie)} className="favorite" style={{color: "#FF1493"}}>
                    <div>
                        <p>
                        {favorite 
                            ? <MdOutlineFavoriteBorder size={20} />
                            : <MdOutlineFavorite size={20} />
                        }
                        Add to favorites</p>
                    </div>

                </button>
                {image ? <img src ={`https://image.tmdb.org/t/p/w92/${image}`} alt="Movie poster" /> : <p>No image found</p>}

                

                <h2 className="text-display">{title}</h2>
        </Card>
    )
}

