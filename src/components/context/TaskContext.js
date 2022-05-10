import { useState, createContext, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  addDoc,
  doc,
  getDocs,
  collection,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";
import { db } from "../../firebase.config";

const TaskContext = createContext();

export const TaskProvider = ({children}) => {
    const [isLoading, setIsLoading] = useState();
    const [favoritesList, setFavoritesList] = useState([]);
    const [changeFavorites, setChangeFavorites] = useState(false);
    const [movieEdit, setMovieEdit] = useState({
        movie: {},
        edit: false,
    });

    useEffect(() => {
        let email = "";
        const fetchFavorites = async () => {
        console.log(email);
          const movieListRef = collection(db, "users");
          const querySnapshot = await getDocs(movieListRef);
          const movieList = [];
          querySnapshot.forEach((doc) => {
            return movieList.push({
              id: doc.id,
              data: doc.data(),
            });
          });
    
          setFavoritesList(movieList);
          setChangeFavorites(false);
          console.log("favorite movies:");
          console.log(movieList);
          //setIsLoading(false);
        };
        fetchFavorites();
      }, [changeFavorites]);
      

    const addMovie= async (newMovie) => {
        const docRef = await addDoc(collection(db, "users"), newMovie);
        console.log("Movie added with id: ", docRef.id);
        setFavoritesList([favoritesList]);
        setChangeFavorites(true);
    };

    const editMovie = (id, movie) => {
        setMovieEdit({id, movie, edit: true});
    };

    const updateMovie = async (id, updMovie) => {
        const docRef = doc(db, "users", id);
        await updateDoc(docRef, updMovie);
    };

    const deleteMovie = async (id) => {
            await deleteDoc(doc(db, "users", id));
            setChangeFavorites(true);
    };
    
    const favorite = (id) => {
        setFavoritesList(favoritesList.map((movie)=> movie.id === id ? {...movie, checked: !movie.checked} : movie));
    };

    return <TaskContext.Provider value={{favoritesList, movieEdit, deleteMovie, favorite, addMovie, editMovie, updateMovie}}>{children}</TaskContext.Provider>;
};

export default TaskContext;
