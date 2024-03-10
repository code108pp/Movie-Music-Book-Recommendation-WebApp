import React from "react";
import Button from "@mui/material/Button";
import Grid from '@mui/material/Grid';
// import IconButton from "@mui/material/IconButton";
import TextField from "@mui/material/TextField";
import Fab from "@mui/material/Fab";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import Link from "@mui/material/Link";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import LinearProgress from "@mui/material/LinearProgress";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import {useState} from 'react';
import { useDispatch } from "react-redux";
import {useNavigate} from 'react-router-dom'
import axios from 'axios';
// import  xmlhttprequest from 'xmlhttprequest'
// import jwt_decode from 'jwt-decode'
import "./style.css";

import { signup } from '../../../actions/auth.js';
import { createWatchCount } from "../../../actions/watchCount.js";

const xhr = new XMLHttpRequest();


function Signup({ setIsSignUp }) {
  // const google = window.google;

  const [profile, setProfile] = useState({
    email:"",
    password:"",
    firstName:"",
    middleName:"",
    lastName:"",
  });

  var passwordLength = profile.password.length;
  // console.log(passwordLength)

  // const [confirmPassword,setConfirmPassword] = useState("");
  // var passwordChecking ;
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const [passwordShown,setPasswordShown] = useState(false);
  // const [user, setUSer] = useState({});

  function togglePassword(){
    setPasswordShown(!passwordShown)
    console.log(passwordShown)
  };

  

  async function submit(){
    
    // if(profile.email == "" || profile.password == "" || profile.firstName == ""){
    //   alert("Fill all credentials")
    // }
    // else{
    //     const data  = await axios.post('http://localhost:3010/signup',{
    //     userName:profile.firstName,
    //     email:profile.email,
    //     password:profile.password
    //   })

    //   if(data.data.status == false){
    //     alert("Email already exist")
    //   }else{
    //     setIsSignUp(0);
    //   }
    // }

    if( profile.email == "" || profile.password == "" || profile.firstName == "" ){
      alert("Fill all credentials");
    }
    else {
      // dispatch(signup(profile, navigate));
      dispatch(signup({ userName: profile.firstName, email: profile.email, password: profile.password }, navigate, setIsSignUp));
      
      

    }

  }

  // function checkPassword(){
  //   if(confirmPassword !== profile.password){
  //     console.log(profile.email,profile.password,confirmPassword)
  //     passwordChecking = true
  //   }
  // }

  // function handleCallbackResponse(res) {
  //   console.log("encoded JWT ID token" + res.credential);
  //   var userObject = jwt_decode(res.credential);
  //   console.log(userObject);
  //   setUSer(userObject);
  //   document.getElementById("signInDiv").hidden = true; //// hide button after login in
  // }

  // function handleSingOut(event) {
  //   setUSer({});
  //   document.getElementById("signInDiv").hidden = false;
  // }

  // useEffect(() => {
  //   // /* global google*/
  //   google.accounts.id.initialize({
  //     client_id:
  //       "472882567063-bt4odj909cbaiim0t4k94p725o4ptugk.apps.googleusercontent.com",
  //     callback: handleCallbackResponse,
  //   });

  //   google.accounts.id.renderButton(
  //     //render sign in button
  //     document.getElementById("signInDiv"),
  //     { theme: "outline", size: "large" }
  //   );

  //   google.accounts.id.prompt(); //automatically display accounts to login
  // }, []);

  return (
    <>
      <Container>
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "purple" }}>
            {" "}
            {/* m is margin equal on all side */}
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5" sx={{ color: 'white' }} >
            Sign up
          </Typography>
          <Box
            component="form"
            noValidate
            // onSubmit={handleSubmit}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12} sm={4}>
                <TextField
                  autoComplete="given-name"
                  name="firstName"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  autoFocus
                  value={profile.firstName}
                  onChange={(e) => {
                    setProfile({ ...profile, firstName: e.target.value });
                  }}
                  sx={{ backgroundColor: 'rgb(62, 62, 62)', borderRadius: '5px', input: { color: 'white' } }}
              InputLabelProps={{
                style: { color: '#fff' },
              }}
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField
                  autoComplete="given-name"
                  name="middleName"
                  required
                  fullWidth
                  id="middleName"
                  label="Middle Name"
                  autoFocus
                  value={profile.middleName}
                  onChange={(e) => {
                    setProfile({ ...profile, middleName: e.target.value });
                  }}
                  sx={{ backgroundColor: 'rgb(62, 62, 62)', borderRadius: '5px', input: { color: 'white' } }}
              InputLabelProps={{
                style: { color: '#fff' },
              }}
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  autoComplete="family-name"
                  value={profile.lastName}
                  onChange={(e) => {
                    setProfile({ ...profile, lastName: e.target.value });
                  }}
                  sx={{ backgroundColor: 'rgb(62, 62, 62)', borderRadius: '5px', input: { color: 'white' } }}
              InputLabelProps={{
                style: { color: '#fff' },
              }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  value={profile.email}
                  onChange={(e) => {
                    setProfile({ ...profile, email: e.target.value });
                  }}
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
              <Grid item xs={10} sm={10} sx={{ mt: 1 }}>
                <LinearProgress
                  variant="determinate"
                  value={
                    passwordLength === 0
                      ? 0
                      : passwordLength > 0 && passwordLength <= 2
                      ? 20
                      : passwordLength > 2 && passwordLength <= 4
                      ? 40
                      : passwordLength > 4 && passwordLength <= 6
                      ? 60
                      : passwordLength > 6 && passwordLength <= 8
                      ? 80
                      : passwordLength > 8 && passwordLength <= 10
                      ? 100
                      : passwordLength > 10 && passwordLength <= 12
                      ? 100
                      : 100
                  }
                />
              </Grid>
              <Grid item xs={2} sm={2} sx={{ color:'white' }}>
                {passwordLength <= 2
                  ? "very weak"
                  : passwordLength > 2 && passwordLength <= 4
                  ? "weak"
                  : passwordLength > 4 && passwordLength <= 6
                  ? "strong"
                  : passwordLength > 6 && passwordLength <= 8
                  ? "very strong"
                  : "very strong"}
              </Grid>
            </Grid>
            <Button
              // type="submit"  
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={() => {
                submit();
              }}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="#" variant="body2" sx={{ textDecoration: "none" }} onClick={()=>{setIsSignUp(0)}}>
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </>
  );
}

export default Signup;
