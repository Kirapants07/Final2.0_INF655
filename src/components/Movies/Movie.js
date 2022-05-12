import { useContext } from "react";
import React from "react";
import { MdOutlineFavoriteBorder, MdOutlineFavorite } from "react-icons/md";
import TaskContext from "../context/TaskContext";
import SmallCard from "../shared/SmallCard";

export default function Movie({ title, movie, setSearch}) {
    const {favorite, addMovie} = useContext(TaskContext);

    return (
        <SmallCard>
                <button checked={false} onClick={(e) => {addMovie(movie); setSearch(""); }} className="favorite" style={{color: "#FF1493"}}>
                        {favorite 
                            ? <MdOutlineFavoriteBorder size={20} />
                            : <MdOutlineFavorite size={20} />
                        }
                        <h2 className="dropdowntext"> {title}</h2>
                </button>
        </SmallCard>
    )
}
