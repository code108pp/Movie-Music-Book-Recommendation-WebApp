import React, { useState, useEffect } from 'react';

import Signin from './Signin/Signin';
import Signup from './Signup/Signup';
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";


const Auth = ({ setIsLogged }) => {

    const [isSignUp, setIsSignUp] = useState(0); 

    useEffect(()=>{console.log("isSignUp changing")},[isSignUp])

    return (
      <>
      
        {isSignUp ? (
          <Signup  setIsSignUp={setIsSignUp} />
        ) : (
          <Signin  setIsSignUp={setIsSignUp} setIsLogged={setIsLogged} />
        )}
        {/* <Signup />
        <Signin /> */}
      </>
    );
}

export default Auth