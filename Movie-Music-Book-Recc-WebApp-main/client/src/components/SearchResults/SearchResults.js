import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom';
import { Grid, Typography, CircularProgress } from '@material-ui/core';
import axios from 'axios';
import InfiniteScroll from 'react-infinite-scroll-component';

import SearchedMovieCard from './SearchedMovieCard/SearchedMovieCard';
import useStyles from "./styles.js";

function SearchResults() {
    const classes = useStyles();
    const navigate = useNavigate();
    const [movieList, setMovieList] = useState([]);
    const [page, setPage] = useState(1);
    const [totalResults, setTotalResult] = useState(0);

    const{ genre_name, genreId } = useParams();

    const fetchMovies = (page, genre) => axios.get(`https://api.themoviedb.org/3/discover/movie?api_key=f20575175c2deae7974eb547727d1ace&language=en-US&page=${page}&with_genres=${genre}`);

    const getMovies = async () => {
      const movies = await fetchMovies(page, genreId);
      setMovieList(movies.data.results);
      setTotalResult(totalResults + 20);
    }

    const getMoreMovies = async () => {
      const moreMovies = await fetchMovies(page + 1, genreId);
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
                  {genre_name}
                </Typography>
              </Grid>
              {movieList.map((movie) => (
                <Grid className={classes.items} item xs={4}>
                  <SearchedMovieCard
                    list={movie}
                    key={movie.id}
                    genre_name={genre_name}
                    genre_id={genreId}
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