import React from 'react';
import { useEffect,useState } from 'react';
import { useRouter } from 'next/router';
import {
  createTheme,
  ThemeProvider,
} from "@mui/material/styles";
import PollIcon from '@mui/icons-material/Poll';
import VisibilityIcon from '@mui/icons-material/Visibility';
import StopCircleIcon from '@mui/icons-material/StopCircle';
import LinkIcon from '@mui/icons-material/Link';
import EditIcon from '@mui/icons-material/Edit';
import { Typography ,IconButton, Avatar,Tooltip} from '@mui/material';
import { deepOrange,green, pink } from '@mui/material/colors';
import Chip from '@mui/material/Chip';
import Swal from 'sweetalert2';
import swal from "sweetalert";
import LoopIcon from '@mui/icons-material/Loop';
import { motion } from 'framer-motion';
const CloseLobby = ({lobby}) => {
    const router = useRouter();
    const id =lobby.lobbyId;
    const theme = createTheme();
    theme.typography ={
        fontFamily: ['"Roboto"', "sans-serif"].join(","),
    };
    theme.typography.h3 = {
        fontSize: '1rem',
        '@media (min-width:600px)': {
          fontSize: '1.2rem',
        },
        [theme.breakpoints.up('md')]: {
          fontSize: '1.5rem',
        },
      };
      theme.typography.h4 = {
        fontSize: '0.8rem',
        '@media (min-width:600px)': {
          fontSize: '1rem',
        },
        [theme.breakpoints.up('md')]: {
          fontSize: '1.2rem',
        },
      };
      function lobbystat(){
        router.push('/finalstats/'+id);
      }
  return (
    <motion.div whileHover={{ scale: 1.055 }}
    onHoverStart={e => {}}
    onHoverEnd={e => {}} style={{position:"relative",color:"#439A97",borderRadius:'20px',backgroundColor:"#97DECE"}}>
      <div style={{display:"flex",position:"absolute",right:"-22px",top:"-22px"}}>
        <Chip style={{backgroundColor:"#439A97"}} sx={{color:"#CBEDD5"}} icon={<PollIcon sx={{color:"#CBEDD5 !important"}}/>} label={lobby.pollId.length}/>
      </div>
     <ThemeProvider theme={theme}>
     <div style={{position:"relative",height:"50px",overflow:"auto",marginTop:"8px",marginBottom:"7px",paddingTop:"5px",paddingLeft:"10px"}}>
     <Typography variant='h3'>{lobby.lobbyName}</Typography>
     </div>
      <div style={{position:"relative",height:"60px",overflow:"auto",marginBottom:"7px",paddingTop:"3px",paddingLeft:"10px"}}>
      <Typography variant='h4'>{lobby.lobbyDescription}</Typography>
      </div>
     </ThemeProvider>
     <div style={{display:"flex",alignItems:"center",justifyContent:"space-evenly",flexWrap:"no-wrap",paddingBottom:"5px"}}>
     <Tooltip disableFocusListener title="Reuse Lobby" placement="top">
     <IconButton label="Reuse Lobby">
      <Avatar alt="Reuse Lobby" sx={{ bgcolor: "white", color: "black" }}><LoopIcon/></Avatar>
      </IconButton>
      </Tooltip>
      <Tooltip disableFocusListener title="View Stats" placement="top">
      <IconButton label="View Stats" onClick={lobbystat}>
      <Avatar alt="View Stats" sx={{ bgcolor: green[500] }}><VisibilityIcon/></Avatar>
      </IconButton>
      </Tooltip>
      <Tooltip disableFocusListener title="Stop Responses" placement="top">
      <IconButton label="Stop Responses">
      <Avatar alt="Stop Responses" sx={{ bgcolor: pink[500] }} ><StopCircleIcon/></Avatar>
      </IconButton>
      </Tooltip>
     </div>
    </motion.div>
  )
}

export default CloseLobby