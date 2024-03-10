import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useDispatch, useSelector } from "react-redux";

import { getReccGenre } from "../../api/backend.js";
import { getReccGenreCall } from "../../actions/genreSelector.js"

import MovieCard from './MovieCard/MovieCard';
import { Grid, CircularProgress, Typography, Button } from '@material-ui/core';
// import { motion } from 'framer-motion'; 
// import InfiniteScroll from "react-infinite-scroll-component";
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import { moviesGenre } from '../../constants/genreId.js';

import useStyles from "./styles.js";

function Carousel({ genre, title, reccMovieList, setShowRecc }) {

    const dispatch = useDispatch();

    const [movieList, setMovieList] = useState([]);
    const [reccList, setReccList] = useState([]);
    const [translatePage, setTranslatePage] = useState(0);
    const [cardsOnPage, setCardsOnPage] = useState(10);
    const classes = useStyles();
    const carousel = useRef(0);
    const progressBar = useRef(null);

    var fetchMovies = (page, genre) => axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=f20575175c2deae7974eb547727d1ace&language=en-US&page=${page}`);
    if( genre !== -100){
        fetchMovies = (page, genre) => axios.get(`https://api.themoviedb.org/3/discover/movie?api_key=f20575175c2deae7974eb547727d1ace&language=en-US&page=${page}&with_genres=${genre}`)
    }


    const getMovies = async () => {
        console.log(reccMovieList)
        if ( reccMovieList === false ) {
            const movies1 = await fetchMovies(1, genre);
            const movies2 = await fetchMovies(2, genre);
            setMovieList(movies1.data.results.concat(movies2.data.results));
        }
        else {
            const list = dispatch(getReccGenreCall(JSON.parse(localStorage.getItem('profile')).profile.email)).then( res => {
                console.log(res)
                if ( res === undefined ) {
                    setShowRecc(false)
                }
                else {
                    setShowRecc(true)
                    setMovieList(res);
                }
                // setTimeout(() => {
                //     console.log()
                // }, 2000);
            });

        }
        console.log(movieList)
    }

    useEffect( () => { 
        getMovies();
        progressBar.current.children[0].classList.add(`${classes.active}`)
    }, [])

    const onHandleClick = (num, currentPage) => {
        if( (currentPage === 0 && num === 1) || ( currentPage >= 1 || currentPage <= (40 / cardsOnPage - 2) ) || (currentPage === (40 / cardsOnPage - 1) && num === -1 ) ) {
            setTranslatePage(currentPage + num);

        }
        if ( (currentPage === (40 / cardsOnPage - 1) && num === 1) || (currentPage === 0 && num === -1) ) {
            setTranslatePage( currentPage - ((40 / cardsOnPage - 1) * num));
        }
    }

    return (
        <>

            {/* <div className={classes.carouselTitle}>
                <Typography variant="h4" >
                    Popular Now
                    <ArrowForwardIosIcon 
                        style={{transition: '150ms ease-in-out', stroke: "#000000", strokeWidth: 1.5}}
                        className={classes.titleArrow} 
                        fontSize="small"
                    />
                </Typography>
            </div> */}

                <div ref={carousel} className={classes.container}>
                    <div className={classes.titleContainer}>
                        <div className={classes.carouselTitle}>
                            <Typography className={classes.listName} variant="h4" >
                                {title}
                                <ArrowForwardIosIcon 
                                    style={{transition: '150ms ease-in-out', stroke: "#000000", strokeWidth: 1.5}}
                                    className={classes.titleArrow} 
                                    fontSize="small"
                            />
                            </Typography>
                            <Button component={Link} to={ reccMovieList === false ? `/${title}-${genre}` : '/user/recommendation' } className={classes.viewMore} variant="contained" state={{ genreId:`${genre}` }} >
                            {/* <Button component={Link} to={`/${title}-${genre}`} className={classes.viewMore} variant="contained" state={{ genreId:`${genre}` }} > */}
                                view more
                            </Button>
                            {/* state={{id:`${list.id}`, title:`${title}`}} */}
                        </div>

                        <div ref={progressBar} className={classes.progressBar}>
                                <div className={`${classes.progressItem} ${translatePage===0 ? classes.active : {}}`}></div>
                                <div className={`${classes.progressItem} ${translatePage===1 ? classes.active : {}}`}></div>
                                <div className={`${classes.progressItem} ${translatePage===2 ? classes.active : {}}`}></div>
                                <div className={`${classes.progressItem} ${translatePage===3 ? classes.active : {}}`}></div>

                                

                        </div>
                    </div>

                    {!movieList.length ? <CircularProgress color="secondary" style={{margin: '3.3%'}} /> : (
                        <div className={classes.slider}>
                            <button className={`${classes.handle} ${classes.leftHandle}`} onClick={() => onHandleClick(-1, translatePage)}>
                                <ArrowBackIosNewIcon 
                                    style={{transition: '150ms ease-in-out'}} 
                                    className={classes.leftHandleArrow} 
                                    />
                            </button>

                            <div style={{ '--slider-index': translatePage }} className={classes.moviesList}>
                                {movieList.map((movie) => (
                                    <MovieCard list={movie} key={movie.id} />
                                ))}
                            </div>

                            <button className={`${classes.handle} ${classes.rightHandle}`} onClick={() => onHandleClick(1, translatePage)}>
                                <ArrowForwardIosIcon 
                                    style={{transition: '150ms ease-in-out'}}
                                    className={classes.rightHandleArrow} 
                                    />
                            </button>
                        </div>
                    )}

                </div>



            {/* <h2>2nd Slider</h2> */}
            {/* {!movieList.length ? <CircularProgress color="secondary" /> : (
                <div ref={carousel} className={classes.container}>
                    <div ref={slider} id="slider"
                        drag="x" 
                        dragConstraints={{ right: 0, left: -1247 }}
                        className={classes.slider}
                    >
                        {movieList.map((movie) => (
                            <MovieCard list={movie} key={movie.id} />
                        ))}
                    </div>
                </div>
            )} */}
        </>
    )
}

export default Carousel