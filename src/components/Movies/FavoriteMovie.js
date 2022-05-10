import { useContext } from "react";
import React from "react";
import { MdOutlineFavoriteBorder, MdOutlineFavorite } from "react-icons/md";
import Card from "../shared/Card";
import TaskContext from "../context/TaskContext";

export default function Movie({ fireId, id, title, image, director, category, year, trailer, ratings, checked, movie}) {
    const {favorite, deleteMovie, checkMovie, editMovie, addMovie} = useContext(TaskContext);

    return (
        <Card>
            <button onClick={() => deleteMovie(fireId)} className="favorite" style={{color: "#FF1493"}}>
                <div>
                    <MdOutlineFavorite size={20} />
                    <p>Remove From favorites</p>
                </div>

            </button>
            <h1 className="text-display">{title}</h1>


            {/* <img src ={`https://image.tmdb.org/t/p/w185/${image}`} alt="Movie poster" />

            <h1 className="text-display">{title}</h1>
            <p className="text-display">Director: {director}</p>
            <p className="text-display">Categories: {category} NEED TO FETCH NAMED CAT</p>
            <p className="text-display">Release Year: {year.split('-')[0]}</p>
            <p className="text-display">Rating: {ratings}</p>
            <p className="text-display"><a href= {`https://www.youtube.com/watch?v=${trailer}`}>Watch Trailer</a> NEED TO FETCH KEY</p> */}
            {/* <p>{description}</p> */}
        </Card>
    )
}

