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
    const [favoritesList, setFavoritesList] = useState([]);
    const [movieEdit, setMovieEdit] = useState({
        movie: {},
        edit: false,
    });

    useEffect(() => {
        const fetchFavorites = async () => {
          const movieListRef = collection(db, "movieList");
          const q = query(movieListRef, orderBy("title"), limit(10));
          const querySnapshot = await getDocs(q);
          const movieList = [];
          querySnapshot.forEach((doc) => {
            return movieList.push({
              id: doc.id,
              data: doc.data(),
            });
          });
    
          setFavoritesList(movieList);
          setIsLoading(false);
        };
        fetchFavorites();
      }, [favoritesList]);

    const addMovie= async (newMovie) => {
        const docRef = await addDoc(collection(db, "movieList"), newMovie);
        console.log("Movie added with id: ", docRef.id);
        setFavoritesList([favoritesList]);
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
        setFavoritesList(favoritesList.map((movie)=> movie.id === id ? {...movie, checked: !movie.checked} : movie));
    };

    return <TaskContext.Provider value={{movieList: favoritesList, movieEdit, deleteMovie, favorite, addMovie, editMovie, updateMovie}}>{children}</TaskContext.Provider>;
};

export default TaskContext;
