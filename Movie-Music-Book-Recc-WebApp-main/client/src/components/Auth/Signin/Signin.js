import * as React from "react";
import axios from 'axios';
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Avatar from '@mui/material/Avatar';
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import Fab from "@mui/material/Fab";
// import IconButton from "@mui/material/IconButton";
import {useState} from 'react';
import { useDispatch, useSelector } from "react-redux";
import {useNavigate} from 'react-router-dom'
// import jwt_decode from 'jwt-decode'
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
// import customCss from './style.js'
import './style.css'

import { signin } from '../../../actions/auth.js';
import { doesWatchCountExist } from "../../../api/backend";

// import { makeStyles } from "@material-ui/core/styles";
// import { useState } from "react"

const initialState = { email: "", password:"" };

function Signin({ isSignUp, setIsSignUp, setIsLogged }) {
  const [profile,setProfile] = useState(initialState);
  
  const navigate = useNavigate()
  const dispatch = useDispatch();
  // const [user,setUser] = useState({});
  const [passwordShown,setPasswordShown] = useState(false); 

  // const google = window.google

  function togglePassword(){
    setPasswordShown(!passwordShown);
  }

  async function submit(){
    // const data = await axios.post('http://localhost:3010/signin',{
    //   email:profile.email,
    //   password:profile.password
    // })
    // if(data.data.status == true){
    //   console.log("status is true")
    //   navigate("/home");
    // }
    // else{
    //   alert('Email or Password is incorrect')
    // } 

      console.log("clicked")
    dispatch(signin(profile, setIsLogged, navigate));

    // const {doesExist} = await doesWatchCountExist(JSON.parse(localStorage.getItem('profile')._id));
  }
 
  // function handleCallbackResponse(res){
  //   console.log("encoded JWT ID token"+ res.credential);
  //   var userObject = jwt_decode(res.credential); 
  //   console.log(userObject);
  //   setUser(userObject);
  //   document.getElementById("signInDiv").hidden = true //// hide button after login in
  // }
  
  // function handleSingOut(event){
  //   setUser({});
  //   document.getElementById("signInDiv").hidden = false
  // }

  // useEffect(()=>{
  //   // /* global google*/
  //   google.accounts.id.initialize({
  //     client_id:
  //       "472882567063-bt4odj909cbaiim0t4k94p725o4ptugk.apps.googleusercontent.com",
  //     callback: handleCallbackResponse,
  //   });
 
  //   google.accounts.id.renderButton( //render sign in button
  //     document.getElementById("signInDiv"),
  //     {theme:"outline",size:"large"}
  //   )

  //   google.accounts.id.prompt();  //automatically display accounts to login

  // },[])


  // // const {isLogin,setIsLogin} = useState(false);
  // // const classes = customCss()

  return (
    <>
      <Container >
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'purple' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h3" variant="h3" color="white">
            Sign in
          </Typography>
          <Box component="form"  sx={{ mt: 1 ,width:"60%", color: 'white'}} >
            <Grid container spacing={2}>
              <Grid item xs={12} sm={12}>
              <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              value={profile.email} 
              onChange={(e)=>{setProfile({...profile,email:e.target.value})}}
              sx={{ backgroundColor: 'rgb(62, 62, 62)', borderRadius: '5px', input: { color: 'white' } }}
              InputLabelProps={{
                style: { color: '#fff' },
              }}
            />
              </Grid>
              <Grid item xs={11} sm={11}>
                <TextField
                  required 
                  fullWidth
                  name="password"
                  label="Password"
                  type={passwordShown ? "text" : "password"}
                  id="password"
                  autoComplete="new-password"
                  value={profile.password}
                  onChange={(e) => {
                    setProfile({ ...profile, password: e.target.value });
                  }}
                  sx={{ backgroundColor: 'rgb(62, 62, 62)', borderRadius: '5px', input: { color: 'white' } }}
                  InputLabelProps={{
                    style: { color: '#fff' },
                  }}
                />
              </Grid>
              <Grid item xs={1} sm={1}>
                <Fab
                  size="small"
                  color="blue"
                  sx={{ alignItems: "center", mt: 1, mb: 0 }}
                  onClick={togglePassword}
                >
                  {passwordShown ? (
                    <VisibilityOffIcon
                      sx={{ color: "blue", alignSelf: "center" }}
                    />
                  ) : (
                    <VisibilityIcon
                      sx={{ color: "blue", alignSelf: "center" }}
                    />
                  )}
                  {/* <VisibilityIcon sx={{color:"blue",alignSelf:"center"}}/> */}
                </Fab>
              </Grid>
              <Grid item xs={12} sm={12}>
              {/* <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            /> */}
              </Grid>
              <Grid item xs={12} sm={12}>
              <Button
              // type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 1, mb: 2 }}
              onClick={()=>{
                submit()
              }}
              >
                Sign In
              </Button>
              </Grid>
              <Grid container >
              {/* <Grid item xs sx={{ml:2}}>
                <Link href="#" variant="body2" to="/forgetPassword" sx={{textDecoration:"none"}}>
                  Forgot password?
                </Link>
              </Grid> */}
              <Grid item>
                <Link href="#" variant="body2" sx={{textDecoration:"none"}} onClick={()=>{setIsSignUp(1)}}>
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </>
  );
}

// {
//    Object.keys(user).length !==0 ? <button onClick={(e)=> handleSingOut(e)}>Sign out</button> : console.log() //sign out button show when user logge in or else not
// }
    

export default Signin;

