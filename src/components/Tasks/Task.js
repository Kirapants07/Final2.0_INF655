import { useContext } from "react";
import React from "react";
import { FaTrash, FaEdit } from "react-icons/fa";
import { MdOutlineFavoriteBorder, MdOutlineFavorite } from "react-icons/md";
import Card from "../shared/Card";
import TaskContext from "../context/TaskContext";

export default function Task({id, title, description, checked, task: movie}) {
    const {deleteTask, editTask, favorite} = useContext(TaskContext);

    return (
        <Card>
        
            <button checked={false} onClick={() => favorite(movie)} className="favorite">
                 <MdOutlineFavoriteBorder size={20} />
                </button>

            <h2 className="text-display">{title}</h2>
            <p>{description}</p>
            <button onClick={() => editTask(movie)} className="edit">
                <FaEdit size={20} />
            </button>
            <button onClick={() => deleteTask(id)} className="delete">
                <FaTrash size={20} />
            </button>
        </Card>
    )
}

