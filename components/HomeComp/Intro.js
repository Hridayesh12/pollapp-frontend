import React from 'react';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Lobby from './Lobby';
import LProg from './LProg';

const Intro = () => {
  return (
    <Box sx={{ width: '100vw',backgroundColor:'#E5BA73',height:{xs:'70vh',sm:'100vh'},display:"flex",alignItems:"center",justifyContent:"center"}}>
      <Grid container justifyContent="space-around"
  alignItems="center" direction={{xs:"column",md:"row"}} rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
   
        <Grid item xs='auto'>
       <Lobby/>
        </Grid>
      </Grid>
    </Box>
  )
}

export default Intro