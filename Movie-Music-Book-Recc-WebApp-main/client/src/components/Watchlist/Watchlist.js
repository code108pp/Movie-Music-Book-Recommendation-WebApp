import * as React from "react";
import {useState,useEffect} from "react"
import { Stack, Button, Grid, Menu, MenuItem, Avatar } from "@mui/material";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { Box } from "@mui/system";
import {  Typography, CircularProgress } from "@material-ui/core";
import PopupState, { bindTrigger, bindMenu } from "material-ui-popup-state";
import DeleteIcon from "@mui/icons-material/Delete";
import axios from 'axios'
import "./Watchlist.css";

export default function Watchlist() {

  let m = []
  const data = []
  const [list,setList] = useState([]) 
  const [movie,setMovie] = useState([])
  const [toggle,setToggle] = useState(false)

  const person = async () =>
    await axios
      .post("http://localhost:3010/getWatchlist", {
        _id: JSON.parse(localStorage.getItem("profile")).profile._id,
      })
      .then((e) => {
        console.log(e.data.watchlist);
        // console.log(e.data.watchlist);
        setMovie(e.data.watchlist);
      })
      .catch((e) => {
        console.log(e);
      });

  useEffect(()=>{
    async function getWatchlist(){
      // const user = JSON.parse(localStorage.getItem("profile"));
      console.log(JSON.parse(localStorage.getItem("profile")).profile._id);
      const id = JSON.parse(localStorage.getItem("profile")).profile._id;
      
      // const Id = user.profile.id.trim();
      // console.log(Id)
      
        person()
        
        
      // console.log("user ",person) 
    }

    getWatchlist()

    
  },[])

  async function delWatchlist(movieId) {
    await axios
      .post("http://localhost:3010/deleteFromWatchlist", {
        _id: JSON.parse(localStorage.getItem("profile")).profile._id,
        movieId: movieId,
      })
      .then((e) => {
        newWatchlist(movieId);
      });
  }

  function newWatchlist(movieId){
    let newArr = movie
    let i = 0
    console.log("before",newArr)
    newArr.map(e=>{
      if(e.movieId === movieId){
        newArr.splice(i,i+1)
        return newArr
      }
      i++
    }) 
    console.log("afterward",newArr)
    person()
    setMovie(newArr)
  }

// useEffect(()=>{
//   fetchMovie();
// },[toggle])
  
  
  return (
    <>
      {/* <Stack spacing={2} direction="row" marginTop={2.5}>
        <Grid></Grid>
        <Grid></Grid>{" "}
        <PopupState variant="popover" popupId="demo-popup-menu">
          {(popupState) => (
            <React.Fragment>
              <Button variant="contained" {...bindTrigger(popupState)}>
                FILLTER
              </Button>
              <Menu {...bindMenu(popupState)}>
                <MenuItem onClick={popupState.close}>ACTION</MenuItem>
                <MenuItem onClick={popupState.close}>THRILLER</MenuItem>
                <MenuItem onClick={popupState.close}>COMEDY</MenuItem>
              </Menu>
            </React.Fragment>
          )}
        </PopupState>
      </Stack> */}
      {console.log("movie", movie)}
      <div className="parent_container">
        <Grid container item spacing={0}>
          {movie.map((e) => (
            <>
              <Grid item xs={3}>
                <div className="container">  
                  <div className="poster">
                    <Link to={`/${e.movieId}`}>
                      <img
                        className="poster__img"
                        // style={{
                        //   backgroundImage: `url(https://image.tmdb.org/t/p/w185${e.poster})`,
                        // }}
                        src={`https://image.tmdb.org/t/p/w185${e.poster}`}
                        alt="nothing"
                        component={Link}
                        to={`/${e.movieId}`}
                      />
                    </Link>
                    <div className="poster__info">
                      <h1 className="poster__title">{e.title}</h1>
                      <p className="poster__text">
                        <DeleteIcon
                          onClick={() => {
                            delWatchlist(e.movieId);
                          }}
                        />
                      </p>
                    </div>
                  </div>
                </div>
              </Grid>
            </>
          ))}
        </Grid>
      </div>
    </>
  );
}
