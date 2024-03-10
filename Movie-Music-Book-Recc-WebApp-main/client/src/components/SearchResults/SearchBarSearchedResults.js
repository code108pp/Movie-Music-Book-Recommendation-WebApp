import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom';
import { Grid, Typography, CircularProgress } from '@material-ui/core';
import axios from 'axios';
import InfiniteScroll from 'react-infinite-scroll-component';

import SearchedMovieCard from './SearchedMovieCard/SearchedMovieCard';
import useStyles from "./styles.js";

function SearchResults({ searchQueryText }) {

    const { search_text } = useParams();

    const classes = useStyles();
    const navigate = useNavigate();
    const [movieList, setMovieList] = useState([]);
    const [page, setPage] = useState(1);
    const [totalResults, setTotalResult] = useState(0);

    const searchMovies = (page, searchQuery) => axios.get(`https://api.themoviedb.org/3/search/movie?api_key=f20575175c2deae7974eb547727d1ace&language=en-US&query=${searchQuery}&page=${page}&include_adult=false`);

    const getMovies = async () => {
      const movies = await searchMovies(1, search_text);
      setMovieList(movies.data.results);
      setTotalResult(totalResults + 20);
    }

    const getMoreMovies = async () => {
      const moreMovies = await searchMovies(page + 1, search_text);
      setPage(page + 1);
      setTimeout(async () => {
        setMovieList(movieList.concat(moreMovies.data.results));
        setTotalResult(totalResults + 20);
      }, 500);
    }

    useEffect( () => { 
      getMovies();
    }, [navigate])

    return (
      <>
        {/* <div className="">Popular Now</div> */}

        {!movieList.length ? (
          <CircularProgress color="secondary" style={{ margin: "3.3%" }} />
        ) : (
          <InfiniteScroll
            dataLength={movieList.length} //This is important field to render the next data
            next={getMoreMovies}
            hasMore={true}
            loader={
              <CircularProgress color="secondary" style={{ margin: "3.3%" }} />
            }
            scrollThreshold={0.99}
            endMessage={
              <p style={{ textAlign: "center" }}>
                <b>Yay! You have seen it all</b>
              </p>
            }
          >
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
                  Results for {`"${search_text}"`}
                </Typography>
              </Grid>
              {movieList.map((movie) => (
                <Grid className={classes.items} item xs={4}>
                  <SearchedMovieCard
                    list={movie}
                    key={movie.id}
                  />
                </Grid>
              ))}
            </Grid>
          </InfiniteScroll>
        )}
      </>
    );
}

export default SearchResults