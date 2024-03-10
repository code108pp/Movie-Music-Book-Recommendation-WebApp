import React from 'react'

import Navbar from './Navbar/Navbar.js';
import Searchbar from "./Searchbar/Searchbar.js";

const Appbar = ({ setIsLogged }) => {
  return ( 
    <>
        <Navbar setIsLogged={setIsLogged} />
        <Searchbar/>
    </>
  )
}

export default Appbar