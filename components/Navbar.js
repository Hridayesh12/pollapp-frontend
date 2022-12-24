import React from 'react';
import {Box, AppBar,Toolbar,Typography} from '@mui/material';
import HomeDrawer from './NavComp/HomeDrawer';
import HomeNav from './NavComp/HomeNav';
import PollIcon from '@mui/icons-material/Poll';
import styles from '../styles/NavBar.module.css';
import { motion } from 'framer-motion';
import { useState,useEffect } from 'react';
import { useRouter } from 'next/router';
import pollapp from '../assets/logo.png';
import Image from 'next/image';
const NavBar = () => {
  const router=useRouter();
 const [navbar, setnavbar] = useState(false);
 const changeBackground=()=>{
  if(window.scrollY >= 80){
    setnavbar(true);
  }
  else{
    setnavbar(false);
  }
 }
 useEffect(() => {
  window.addEventListener('scroll',changeBackground);
 }, [navbar])
  return (
    <React.Fragment>
      <AppBar className={navbar  ? styles.nav_after : styles.nav_before} component={motion.div}
  initial={{y:-250}} animate={{y:0}} transition={{type: 'spring', stiffness: 120}}
>
        <Toolbar>
          <Image  src={pollapp} width={20} height={20}  onClick={() => {
          router.push("/");
        }}/>
          <Typography variant="h6" sx={{display: { xs: "none", md: "flex" },ml:2 }} component={motion.div}
  initial={{y:-250}} animate={{y:0}} transition={{type: 'spring', stiffness: 200,delay:0.3}}  onClick={() => {
    router.push("/");
  }}>
            POLLAPP
          </Typography>
          <HomeNav/>
          <HomeDrawer/>
        </Toolbar>
        </AppBar>
    </React.Fragment>
  )
}

export default NavBar