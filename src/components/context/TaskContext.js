import { useState, createContext, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  addDoc,
  doc,
  getDocs,
  collection,
  updateDoc,
  deleteDoc,
  where,
  query,
} from "firebase/firestore";
import { db } from "../../firebase.config";
import { useAuthStatus } from "../hooks/useAuth";

const TaskContext = createContext();

export const TaskProvider = ({children}) => {
    const [isLoading, setIsLoading] = useState();
    const [favoritesList, setFavoritesList] = useState([]);
    const [movieEdit, setMovieEdit] = useState({
        movie: {},
        edit: false,
    });

    const { signedIn, checkingStatus, userUid } = useAuthStatus();

    useEffect(() => {
        const fetchFavorites = async () => {
          const movieListRef = collection(db, "movieList");
          //console.log(userUid);
          const q = query(collection(db, "movieList"), where("user", "==", userUid));
          const querySnapshot = await getDocs(q);
        //const querySnapshot = await getDocs(movieListRef);
          const movieList = [];
          querySnapshot.forEach((doc) => {
            return movieList.push({
              id: doc.id,
              data: doc.data(),
            });
          });
    
          setFavoritesList(movieList);
          console.log("favorite movies:");
          console.log(movieList);
          //setIsLoading(false);
        };
        fetchFavorites();
      }, [signedIn]); //needs to check when page is refreshed
      

    const addMovie= async (newMovie) => {
        newMovie.user = userUid;
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
            await deleteDoc(doc(db, "movieList", id));
    };
    
    const favorite = (id) => {
        setFavoritesList(favoritesList.map((movie)=> movie.id === id ? {...movie, checked: !movie.checked} : movie));
    };

    return <TaskContext.Provider value={{favoritesList, movieEdit, deleteMovie, favorite, addMovie, editMovie, updateMovie}}>{children}</TaskContext.Provider>;
};

export default TaskContext;
