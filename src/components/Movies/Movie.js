import { useContext } from "react";
import React from "react";
import { MdOutlineFavoriteBorder, MdOutlineFavorite } from "react-icons/md";
import Card from "../shared/Card";
import TaskContext from "../context/TaskContext";

export default function Movie({ title, image, director, category, year, trailer, ratings, checked, movie}) {
    //const {favorite} = useContext(TaskContext);

    let favorite = false;
    return (
        <Card>
            <button checked={false} onClick={() => favorite=true} className="favorite" style={{color: "#FF1493"}}>
                <p>
                {favorite 
                    ? <MdOutlineFavoriteBorder size={20} />
                    : <MdOutlineFavorite size={20} />
                }
                Add to favorites
                </p>

            </button>

            <img src ={`https://image.tmdb.org/t/p/w185/${image}`} alt="Movie poster" />

            <h1 className="text-display">{title}</h1>
            <p className="text-display">Director: {director}</p>
            <p className="text-display">Categories: {category} NEED TO FETCH NAMED CAT</p>
            <p className="text-display">Release Year: {year.split('-')[0]}</p>
            <p className="text-display">Rating: {ratings}</p>
            <p className="text-display"><a href= {`https://www.youtube.com/watch?v=${trailer}`}>Watch Trailer</a> NEED TO FETCH KEY</p>
            {/* <p>{description}</p> */}
        </Card>
    )
}

