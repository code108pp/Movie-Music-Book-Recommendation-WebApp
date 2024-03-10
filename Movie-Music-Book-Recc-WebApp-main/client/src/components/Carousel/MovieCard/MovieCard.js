import React from 'react'
import { Card, CardActions, CardContent, CardMedia, Button, Typography } from '@material-ui/core';
// import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import AddIcon from '@mui/icons-material/Add';
import { Link } from 'react-router-dom';
import useStyles from "./styles.js";
import axios from 'axios';


function MovieCard({ list }) {
    const classes = useStyles();
    
    const addToWatchlist = async (movie_id) => {
        // console.log("json",JSON.parse(localStorage.getItem("profile")).profile.id);
        const movieId = await axios.post(
          "http://localhost:3010/addToWatchlist",
          {
            _id: JSON.parse(localStorage.getItem("profile")).profile._id,
            movieId: movie_id,
          }
        );

        const watchCountData = await axios.patch(
          "http://localhost:3010/updateWatchCount",
          {
            email: JSON.parse(localStorage.getItem("profile")).profile.email,
            genre_ids: list.genre_ids,
          }
        );
        console.log(watchCountData)
        console.log(list.original_title)
    }

    return (
        // <div className={classes.container}>

        <Card className={classes.card} component={Link} to={`/${list.id}`} state={{id:`${list.id}`}}>
            <CardMedia alt='../../../constants/noImage.png' className={classes.media} image={`https://image.tmdb.org/t/p/w185${list.poster_path}`} title={list.original_title} />
            <div className={classes.overlay2}>
                <Button 
                    style={{color: 'white'}} 
                    size="small" 
                    onClick={() => {addToWatchlist(list.id)}}>
                    <AddIcon className={classes.addToWatchlistBtn} fontSize="medium" />
                </Button>
            </div>
            {/* <Typography className={classes.title} variant="body2" gutterBottom >{list.original_title}</Typography> */}
        </Card>
        // </div>
        
    )
}

export default MovieCard