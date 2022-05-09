import { useState, createContext, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  addDoc,
  doc,
  getDocs,
  orderBy,
  query,
  limit,
  collection,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";
import { db } from "../../firebase.config";

const TaskContext = createContext();

export const TaskProvider = ({children}) => {
    const [isLoading, setIsLoading] = useState();
    const [movieList, setMovieList] = useState([]);
    const [movieEdit, setMovieEdit] = useState({
        movie: {},
        edit: false,
    });

    useEffect(() => {
        const fetchTask = async () => {
            const movieListRef = doc(db, "movieList");
            const query = query(movieListRef, orderBy("title"), limit(15))
            const querySnapshot = await getDocs(query);
            const movieList = [];
            querySnapshot.forEach((doc) => {
                return movieList.push({
                    id: doc.id, //this is not the moviedb id, but the firebase id
                    data: doc.data(),
                });
            });
    
            setMovieList(movieList);
            setIsLoading(false);
        }
    }, []);

    const addMovie= async (newMovie) => {
        const docRef = await addDoc(collection(db, "movieList"), newMovie);
        console.log("Movie added with id: ", docRef.id);
        setMovieList([movieList]);
    };

    const editMovie = (id, movie) => {
        setMovieEdit({id, movie, edit: true});
    };

    const updateMovie = async (id, updMovie) => {
        const docRef = doc(db, "movieList", id);
        await updateDoc(docRef, updMovie);
    };

    const deleteMovie = async (id) => {
        if (window.confirm("Are you sure you want to delete?")) {
            await deleteDoc(doc(db, "movieList", id));
        }
    };
    
    const favorite = (id) => {
        setMovieList(movieList.map((movie)=> movie.id === id ? {...movie, checked: !movie.checked} : movie));
    };

    return <TaskContext.Provider value={{movieList, movieEdit, deleteMovie, favorite, addMovie, editMovie, updateMovie}}>{children}</TaskContext.Provider>;
};

export default TaskContext;
