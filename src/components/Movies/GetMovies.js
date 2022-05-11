import React from "react";
import Movie from "./Movie";
import { useState, useEffect } from "react";
import SearchBar from "./SearchBar";

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



export default function GetMovies(search) {
    
    const [movieData, setMovieData] = useState([]);
    const [movieById, setMovieByID] = useState([]);
    const API_KEY = '2cc400c668df650508e7074fd7e11e01';
    const URL_BASE_GENRELIST = "https://api.themoviedb.org/3/genre/movie/list?";
    const URL_BASE_SEARCHMOVIES = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${search}`;
    const MOVIE_ID= "550";
    const URL_DIRECTOR= `https://api.themoviedb.org/3/movie/${MOVIE_ID}?api_key=${API_KEY}&append_to_response=credits`; //result.credits.crew[12].name
    const URL_TRAILER=`http://api.themoviedb.org/3/movie/${MOVIE_ID}?api_key=${API_KEY}&append_to_response=videos;` //link is https://www.youtube.com/watch?v=${result.results[0].key}
    let configData;
    
    // useEffect(() => {
    //   const fetchMovies = async () => {
    //     const searchMovies = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${search}`)
    //       .then(res => res.json());
    //       const searchResult = searchMovies.results;
    //       console.log(searchResult);

    //       const movieIds = searchResult.map(movie => movie.id)};
    //       const movieReq = {method: 'GET', body: JSON.stringify({movieIds}) };

    //       const movieData = await fetch(`https://api.themoviedb.org/3/movie/${MOVIE_ID}?api_key=${API_KEY}&append_to_response=credits`, movieReq)
    //         .then(res => res.json());
    //       console.log(movieData);

    //   }
    //   fetchMovies();
    // }, [search]);

    //search movies from TMDB
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
    }, [search] )

    useEffect (()=>{
    const movieDataById =[];
    const fetchTrailer = async () =>{
      await Promise.all(
        movieData.map(async (movie) => {
          const res = await fetch(`http://api.themoviedb.org/3/movie/${movie.id}?api_key=${API_KEY}&append_to_response=videos`);
          const list = await res.json();
          movieDataById.push(list);
        }))

        setMovieByID(movieDataById);
    }
    fetchTrailer();
  }, [search] )






    // //search movies from TMDB
    // useEffect (()=>{
    //     const fetchMovies = async () =>{
    //         if (search){
    //             try{
    //                 const response =  await fetch(`https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${search}`);
    //                 const movieList = await response.json();
    //                 setMovieData(movieList.results);
    //                 console.log(movieList);
    //             } catch (err) {
    //                 console.log(err);
    //             }
    //           }
    //         }
    //         fetchMovies();
    // }, [search] )


    //console.log(movieData);

    // useEffect (()=>{
    //     const fetchMoviesByID = async () =>{
    //         if (search){
    //             try{
    //                 const response =  await fetch(`http://api.themoviedb.org/3/movie/${MOVIE_ID}?api_key=${API_KEY}&append_to_response=videos`);
    //                 const movieInfo = await response.json();
    //                 setMovieByID([movieInfo]);
    //             } catch (err) {
    //                 console.log(err);
    //             }
    //           }
    //         }
    //         fetchMoviesByID();
    // }, [search] )


    console.log(movieById);

    let movieArray = movieById.map(key => {
      let movie = {
        "id": key.id,
        "title": key.original_title,
        //"director":
        "category": key.genres, //need to link to category names
        "year": key.release_date,
        "image": key.poster_path, //need to fetch
        "trailer": key.video, //need to link
        "ratings": key.vote_average,
      };
      return movie;
    });

    console.log(movieArray);

    // const videoUrls = async () => {
    //     for(let i =0 ;i< 20;i++){
    //         const response =  await fetch(`http://api.themoviedb.org/3/movie/${movieData.id}?api_key=${API_KEY}&append_to_response=videos`);
    //         const json = await response.json();
    //         setMovieByID([...movieData, ...response]);
    //       }
    //    }



//     const getConfig = () => {
//       const result = fetch(`https://api.themoviedb.org/3/configuration?api_key=${API_KEY}`)
//       .then((result)=>{
//           return result.json();
//       })
//       .then((data)=>{
//           let baseImageURL = data.images.secure_base_url;
//           let configData = data.images;
          
//       })
//       .catch(function(err){
//           alert(err);
//       });
//   }



  return (movieArray);
}
