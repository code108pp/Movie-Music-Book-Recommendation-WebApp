import React from 'react';
import { Link } from 'react-router-dom';

import { Chip, Typography, Button } from '@material-ui/core';
import StarIcon from '@mui/icons-material/Star';
import { moviesGenre } from '../../../constants/genreId.js';
import useStyles from "./styles.js";

function SearchedMovieCard({ list, genre_name, genre_id }) {
    const classes = useStyles();

    return (
        <Link className={classes.container} to={`/${genre_name}-${genre_id}/${list.id}`} state={{id:`${list.id}`}} style={{ textDecoration: 'none' }}>
            <div className={classes.mediaContainer}>
                <img className={classes.media} src={`https://image.tmdb.org/t/p/w185${list.poster_path}`} alt="../../constants/noImage.png" />
            </div>
            <div className={classes.info}>
                <Typography className={classes.title} gutterBottom>{list.title}</Typography>

                <div className={classes.genreList}>
                    {list.genre_ids.map((genres) => (
                        moviesGenre.map((genreList) => (
                            genres===genreList.id ?
                            <Typography component={Link} to={`/${genreList.name}-${genreList.id}`} className={classes.genreChip} variant='caption' gutterBottom >
                                {genreList.name}
                            </Typography> : ''
                        ))
                    ))}
                </div>

                <Chip className={classes.ratingChip} label={list.vote_average} icon={<StarIcon style={{ color:'rgb(255,215,0)', margin:'0.3rem 0.3rem 0.3rem -0.3rem' }} />} />
            </div>
        </Link>
    )
}

export default SearchedMovieCard