import { useState, createContext, useEffect, useRef } from "react";
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
    const [changeFavorites, setChangeFavorites] = useState(false);
    const [movieEdit, setMovieEdit] = useState({
        movie: {},
        edit: false,
    });

    const [movieData, setMovieData] = useState([]);
    const [movieById, setMovieByID] = useState([]);
    const API_KEY = '2cc400c668df650508e7074fd7e11e01';


    const { signedIn, checkingStatus, userUid } = useAuthStatus();

    useEffect(() => {
        const fetchFavorites = async () => {
          const movieListRef = collection(db, "movieList");
        //   const q = query(collection(db, "movieList"), where("user", "==", userUid));
        //   const querySnapshot = await getDocs(q);
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

        };
        fetchFavorites();

      }, [signedIn, changeFavorites]); //needs to check when page is refreshed

    
    const GetMovies = (search) => {
        const URL_BASE_SEARCHMOVIES = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${search}`;

        useEffect (()=>{
            const fetchMovies = async () =>{
                if (search){
                    try{
                        const response =  await fetch(`https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${search}`);
                        const movieList = await response.json();
                        setMovieData(movieList.results);
    
                    } catch (err) {
                        console.log(err);
                    }
                  }
                }
              
                fetchMovies();
                
                const movieDataById =[];
                const fetchTrailer = async () =>{
                  await Promise.all(
                    movieData.map(async (movie) => {
                      const res = await fetch(`http://api.themoviedb.org/3/movie/${movie.id}?api_key=${API_KEY}&append_to_response=videos,credits`);
                      const list = await res.json();
                      movieDataById.push(list);
                    }))
                    setMovieByID(movieDataById);
                }
                fetchTrailer();

                
        }, [search] )

        let movieArray = [];

        try{
            if (movieById) {
              movieArray = movieById.map(i => {
              let movie = {
                "id": i.id,
                "title": i.original_title,
                "director": i.credits.crew.filter(i => i.job == "Director")[0].name,
                "category": i.genres, //need to link to category names
                "year": i.release_date,
                "image": i.poster_path, //need to fetch
                "trailer": i.videos, //need to link
                "ratings": i.vote_average
              };
              return movie;
            });
          }
        }catch (err) {
          console.log(err);
        }

          return (movieArray);

    }

    const addMovie= async (newMovie) => {
        newMovie.user = userUid;
        const docRef = await addDoc(collection(db, "movieList"), newMovie);
        setChangeFavorites(true);
        alert("Movie added to Favorites List");
    };

    const editMovie = (id, movie) => {
        setMovieEdit({id, movie, edit: true});
        setChangeFavorites(true);
    };

    const updateMovie = async (id, updMovie) => {
        const docRef = doc(db, "movieList", id);
        await updateDoc(docRef, updMovie);
        setChangeFavorites(true);
    };

    const deleteMovie = async (id) => {
            await deleteDoc(doc(db, "movieList", id));
            setChangeFavorites(true);
    };
    
    const favorite = (id) => {
        setFavoritesList(favoritesList.map((movie)=> movie.id === id ? {...movie, checked: !movie.checked} : movie));
        setChangeFavorites(true);
    };

    return <TaskContext.Provider value={{favoritesList, movieEdit, deleteMovie, favorite, addMovie, editMovie, updateMovie, GetMovies}}>{children}</TaskContext.Provider>;
};

export default TaskContext;