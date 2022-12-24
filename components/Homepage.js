import React from 'react';
import { useEffect } from 'react';
import NavBar from './Navbar';
import Intro from './HomeComp/Intro';
import Box from '@mui/material/Box';
import Features from './HomeComp/Features';
import Steps from './HomeComp/Steps';
import Footer from './Footer';
const Homepage = () => {
  return (
    <div>
        <NavBar/>
        <Intro/>
        <Steps/>
        <Features/>
        <Footer/>
    </div>
  )
}
export default Homepage