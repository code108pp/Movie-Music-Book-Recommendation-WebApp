import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector } from "react-redux";

import { Grid, Typography, CircularProgress } from '@material-ui/core';
import axios from 'axios';
import InfiniteScroll from 'react-infinite-scroll-component';

import SearchedMovieCard from './SearchedMovieCard/SearchedMovieCard';
import useStyles from "./styles.js";

function SearchResults() {
    const classes = useStyles();
    const navigate = useNavigate();

    const reccMovieList = useSelector((state) => state.genreSelector.movieList);
    console.log(reccMovieList)

    const [movieList, setMovieList] = useState([]);
    
    useEffect( () => { 
        setMovieList(reccMovieList);
    }, [])

    return (
      <>
        {/* <div className="">Popular Now</div> */}

        {!movieList.length ? (
          <CircularProgress color="secondary" style={{ margin: "3.3%" }} />
        ) : (
            <Grid
              className={classes.container}
              container
              alignItems="stretch"
              spacing={3}
            >
              <Grid item xs={12}>
                <Typography
                  variant="h3"
                  style={{ color: "rgba(255, 255, 255, 0.8)" }}
                >
                  {/* {genre_name} */}
                  Recommendations
                </Typography>
              </Grid>
              {movieList.map((movie) => (
                <Grid className={classes.items} item xs={4}>
                  <SearchedMovieCard
                    list={movie}
                    key={movie.id}
                    // genre_name={genre_name}
                    // genre_id={genreId}
                  />
                </Grid>
              ))}
            </Grid>
        )}
      </>
    );
}

export default SearchResults