import { useState, createContext } from "react";
import {v4 as uuidv4} from 'uuid';
import TaskData from "../Tasks/TaskData";
 
const TaskContext = createContext();

export const TaskProvider = ({children}) => {

    const [taskList, setTaskList] = useState(TaskData );
    const [taskEdit, setTaskEdit] = useState({
        task: {},
        edit: false,
    });

    const addTask= (newTask) => {
        newTask.id = uuidv4();
        setTaskList([newTask, ...taskList]);
    };

    const editTask = (task) => {
        setTaskEdit({task, edit: true});
    };

    const updateTask = (id, updTask) => {
        setTaskList(taskList.map((task)=> task.id === id ? {...task, ...updTask} : task));
    };

    const deleteTask = (id) => {
        setTaskList(taskList.filter((task) => task.id !== id));
    };
    
    const favorite = (id) => {
        setTaskList(taskList.map((movie)=> movie.id === id ? {...movie, checked: !movie.checked} : movie));
    };

    return <TaskContext.Provider value={{taskList, taskEdit, deleteTask, checkTask: favorite, addTask, editTask, updateTask}}>{children}</TaskContext.Provider>;
};

export default TaskContext;
