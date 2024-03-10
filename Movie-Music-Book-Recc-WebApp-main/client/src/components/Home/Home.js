import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";

import Carousel from "../Carousel/Carousel.js";
import Movieinfo from '../Movieinfo/Movieinfo.js';
import SearchResults from '../SearchResults/SearchResults.js';
import RecommendationResults from '../SearchResults/RecommendationResults.js';
import SearchBarSearchedResults from '../SearchResults/SearchBarSearchedResults.js';
import Watchlist from "../Watchlist/Watchlist.js";
import Timeline from "../Chart/Timeline.js";
import Profilepage from "../Profilepage/Profilepage.js";
import MusicPage from "../MusicPage/MusicPage.js";
import BookPage from "../BookPage/BookPage.js";

import { getReccGenre } from "../../api/backend.js";
import { getReccGenreCall } from "../../actions/genreSelector.js"

import { moviesGenre } from '../../constants/genreId.js';

export default function Home(){

    const dispatch = useDispatch();

    const [reccGenres, setReccGenres] = useState([]);
    const [reccMovies, setReccMovies] = useState([]);
    const [showRecc, setShowRecc] = useState(true)
    var list = []
    const genreList = moviesGenre.sort( () => 0.5 -Math.random() ).slice(0, 2);

//     const fetchMovies = (page, genres) => axios.get(`https://api.themoviedb.org/3/movie/top_rated?api_key=f20575175c2deae7974eb547727d1ace&language=en-US&page=${page}&with_genres=${genres}`);

//     // const getReccGenreCall = async () => {
//     //     // // const data = await getReccGenre(JSON.parse(localStorage.getItem('profile')).profile.email);

//     //     // const data = await getReccGenre(JSON.parse(localStorage.getItem('profile')).profile.email);
//     // }

//     const filterReccMovies = async ( mList ) => {

//         const ids = mList.map( o => o.id );

//         const filteredList = await mList.filter( ( {id}, index ) => !ids.includes(id, index+1) );
// // console.log(filteredList)
//         return filteredList;
//     }

//     const compare = (a, b) => {
//         if( a.vote_average < b.vote_average ) return 1;
//         if( a.vote_average > b.vote_average ) return -1;
//         return 0;
//     }

//     const sortReccMovies = async ( mList ) => {
//         const sortedList = mList.sort( compare );

//         return sortedList;
//     }

//     const fetchReccMovies = async () => {

//         list = [];

//         const m1 = await fetchMovies(1, `${reccGenres[0]},${reccGenres[1]},${reccGenres[2]}`);
//         list = list.concat(m1.data.results);
        
//         const m2 = await fetchMovies(1, `${reccGenres[0]},${reccGenres[1]}`);
//         list = list.concat(m2.data.results);
        
//         const m3 = await fetchMovies(1, `${reccGenres[0]},${reccGenres[2]}`);
//         list = list.concat(m3.data.results);

//         const m4 = await fetchMovies(1, `${reccGenres[1]},${reccGenres[2]}`);
//         list = list.concat(m4.data.results);

//         const m5 = await fetchMovies(1, `${reccGenres[0]}`);
//         list = list.concat(m5.data.results);

//         const m6 = await fetchMovies(1, `${reccGenres[1]}`);
//         list = list.concat(m6.data.results);

//         const m7 = await fetchMovies(1, `${reccGenres[2]}`);
//         list = list.concat(m7.data.results);

//         // console.log(list);
        
//         list = await filterReccMovies(list);

//         list = await sortReccMovies(list);
//         // console.log(list)
//         setTimeout(() => {
//             setReccMovies(list);
//             // console.log(reccMovies)
//         }, 1000);

//     }
   
    useEffect( () => {
        // const getReccGenreCall = async () => {
        //     const data = await getReccGenre(JSON.parse(localStorage.getItem('profile')).profile.email);
        //     setReccGenres(data);
    
        //     console.log(reccGenres);
        // }
        // console.log(JSON.parse(localStorage.getItem('profile')).profile.email)
        // getReccGenreCall();
        dispatch(getReccGenreCall(JSON.parse(localStorage.getItem('profile')).profile.email, setReccGenres))

        // fetchReccMovies();

        // console.log(localStorage.getItem('profile').email)
        // console.log('inside useEffect')
    }, [])
    
    // const reccGenreArray = useSelector((state) => state.genreSelector);
    // console.log(reccGenreArray);
    // setReccGenres(reccGenreArray);
    // console.log("state",reccGenres);

    return(
        <>
            <Routes>
                <Route path="" exact element={
                    <>
                        {
                            showRecc === true ? 
                            <Carousel genre={0} title={'Recommended'} reccMovieList={true} setShowRecc={setShowRecc}/> :
                            ""
                        }
                        <Carousel genre={-100} title={'Recommended'} reccMovieList={false} />
                        {
                            genreList.map((genreObj) => (
                                <Carousel genre={genreObj.id} title={genreObj.name} key={genreObj.id} reccMovieList={false} />
                                ))
                            }
                    </>} 
                />
                <Route path=":genre_name-:genreId" exact element={<SearchResults />} />
                <Route path=":genre_name-:genreId/:movie_id" exact element={<Movieinfo />} />
                <Route path=":movie_id" exact element={<Movieinfo />} />
                <Route path="watchlist/:movie_id" exact element={<Movieinfo />} />
                <Route path="user/recommendation" exact element={<RecommendationResults />} />
                <Route path="user/search-results/:search_text" exact element={<SearchBarSearchedResults  />} />
                <Route path="timeline" exact element={<Timeline />} />
                <Route path="watchlist" exact element={<Watchlist />} />
                <Route path="timeline/:movie_id" exact element={<Movieinfo />} />
                <Route path="user/profile" exact element={<Profilepage />} />
                <Route path="musics" exact element={<MusicPage />} />
                <Route path="books" exact element={<BookPage />} />
            </Routes>
        </>
    )
}
